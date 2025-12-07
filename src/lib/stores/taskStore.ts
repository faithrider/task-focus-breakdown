// src/lib/stores/taskStore.ts
import { writable, get } from 'svelte/store';

export type Step = {
  id: string;
  text: string;
  done: boolean;
  children: Step[];
};

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const LS_KEY = 'nsn-v1';

export const bigTask = writable<string>(''); // the root task label (single-task flow)
export const steps = writable<Step[]>([]);
export const activeFocusId = writable<string | null>(null);

// Persistence: load once
try {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { bigTask?: string; steps?: Step[]; activeFocusId?: string | null };
      if (parsed.bigTask) bigTask.set(parsed.bigTask);
      if (parsed.steps) steps.set(parsed.steps);
      if (parsed.activeFocusId) activeFocusId.set(parsed.activeFocusId);
    }
  }
} catch (e) {
  // ignore
}

function persist() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ bigTask: get(bigTask), steps: get(steps), activeFocusId: get(activeFocusId) })
      );
    }
  } catch {}
}

// helpers: tree operations
type Modifier = (node: Step) => Step;

function mapTree(list: Step[], fn: Modifier): Step[] {
  return list.map((n) => {
    const mapped = fn(n);
    if (mapped.children && mapped.children.length) {
      return { ...mapped, children: mapTree(mapped.children, fn) };
    }
    return mapped;
  });
}

function findAndModify(list: Step[], id: string, fn: Modifier): { list: Step[]; found: boolean } {
  let found = false;
  const newList = list.map((n) => {
    if (n.id === id) {
      found = true;
      return fn(n);
    }
    if (n.children && n.children.length) {
      const res = findAndModify(n.children, id, fn);
      if (res.found) {
        found = true;
        return { ...n, children: res.list };
      }
    }
    return n;
  });
  return { list: newList, found };
}

// public API

export function createRootTask(label: string) {
  bigTask.set(label);
  const root: Step = { id: makeId(), text: label, done: false, children: [] };
  steps.set([root]); // replace steps with single root node
  persist();
}

export function addRootStep(text: string) {
  const node: Step = { id: makeId(), text, done: false, children: [] };
  steps.update((s) => [node, ...s]);
  persist();
}

export function addChild(parentId: string, text: string) {
  steps.update((s) => {
    const res = findAndModify(s, parentId, (n) => ({ ...n, children: [{ id: makeId(), text, done: false, children: [] }, ...(n.children || [])] }));
    persist();
    return res.list;
  });
}

export function editText(id: string, text: string) {
  steps.update((s) => {
    const res = findAndModify(s, id, (n) => ({ ...n, text }));
    persist();
    return res.list;
  });
}

export function removeNode(id: string) {
  function removeRec(list: Step[]): Step[] {
    return list.filter((n) => {
      if (n.id === id) return false;
      if (n.children && n.children.length) n.children = removeRec(n.children);
      return true;
    });
  }
  steps.update((s) => {
    const newTree = removeRec(s);
    // if removed the focused node, clear focus
    const fid = get(activeFocusId);
    if (fid === id) activeFocusId.set(null);
    persist();
    return newTree;
  });
}

export function toggleDone(id: string, setTo?: boolean) {
  // set node and all descendants, then normalize ancestors (parents)
  steps.update((s) => {
    let toggled = false;

    function setNodeAndDesc(n: Step, val: boolean): Step {
      const newChildren = n.children.map((c) => setNodeAndDesc(c, val));
      return { ...n, done: val, children: newChildren };
    }

    function toggleNode(node: Step, targetId: string, desired?: boolean): Step {
      if (node.id === targetId) {
        toggled = true;
        const val = typeof desired === 'boolean' ? desired : !node.done;
        return setNodeAndDesc({ ...node }, val);
      }
      if (node.children && node.children.length) {
        return { ...node, children: node.children.map((c) => toggleNode(c, targetId, desired)) };
      }
      return node;
    }

    let after = s.map((n) => toggleNode(n, id, setTo));

    if (!toggled) return s;

    // ensure if any child unchecked, ancestors unchecked
    function clearIfChildUnchecked(n: Step): Step {
      if (!n.children || n.children.length === 0) return n;
      const newChildren = n.children.map(clearIfChildUnchecked);
      const anyChildUnchecked = newChildren.some((c) => !c.done);
      const done = anyChildUnchecked ? false : n.done;
      return { ...n, children: newChildren, done };
    }

    const finalTree = after.map(clearIfChildUnchecked);
    persist();
    return finalTree;
  });
}

export function setFocus(id: string | null) {
  activeFocusId.set(id);
  persist();
}

export function resetAll() {
  bigTask.set('');
  steps.set([]);
  activeFocusId.set(null);
  try {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_KEY);
  } catch {}
}

// progress utility
export function computeProgress(list: Step[]) {
  let total = 0;
  let done = 0;
  function walk(nodes: Step[]) {
    for (const n of nodes) {
      total += 1;
      if (n.done) done += 1;
      if (n.children && n.children.length) walk(n.children);
    }
  }
  walk(list);
  return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}
