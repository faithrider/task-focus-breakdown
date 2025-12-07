<!-- src/lib/components/StepItem.svelte -->
<script lang="ts">
  import StepItem from './StepItem.svelte'; // recursive import allowed
  import type { Step } from '$lib/stores/taskStore';
  import { addChild, toggleDone, editText, removeNode, setFocus } from '$lib/stores/taskStore';
  import { goto } from '$app/navigation';

  export let step!: Step;
  export let depth: number = 0;

  let adding = '';
  let editing = false;
  let editValue = '';

  function addSub() {
    if (!adding.trim()) return;
    addChild(step.id, adding.trim());
    adding = '';
  }

  function startEdit() {
    editing = true;
    editValue = step.text;
  }

  function saveEdit() {
    if (!editValue.trim()) return;
    editText(step.id, editValue.trim());
    editing = false;
  }

  function toggle() {
    toggleDone(step.id);
  }

  function removeThis() {
    if (!confirm('Remove this step and all substeps?')) return;
    removeNode(step.id);
  }

  function focusThis() {
    setFocus(step.id);
    goto('/focus');
  }
</script>

<div class="row" style="margin-left: {depth * 14}px;">
  <div class="left">
    <input type="checkbox" checked={step.done} onchange={toggle} />
  </div>

  <div class="body">
    <div class="line">
      {#if !editing}
        <div class="text" class:done={step.done}>{step.text}</div>
      {:else}
        <input bind:value={editValue} onkeydown={(e) => e.key === 'Enter' && saveEdit()} />
      {/if}

      <div class="controls">
        <button onclick={() => (editing ? saveEdit() : startEdit())}>{editing ? 'Save' : 'Edit'}</button>
        <button class="focus-btn" onclick={focusThis}>Enter Focus Mode</button>
        <button onclick={removeThis}>Del</button>
      </div>
    </div>

    <div class="add-sub">
      <input class="sub-input" placeholder="Add a substep" bind:value={adding} onkeydown={(e) => e.key === 'Enter' && addSub()} />
      <button onclick={addSub}>Add</button>
    </div>

    {#if step.children.length > 0}
      <div class="children">
        {#each step.children as child (child.id)}
          <StepItem step={child} depth={depth + 1} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .row { display:flex; gap:.6rem; padding:.3rem 0; align-items:flex-start; }
  .left { width:28px; display:flex; align-items:center; }
  .body { flex:1; }
  .line { display:flex; justify-content:space-between; align-items:center; gap:.6rem; }
  .text { font-size:1rem; }
  .done { text-decoration: line-through; color:#6b7280; opacity:.7; }
  .controls button { margin-left:6px; background:transparent; border:0; cursor:pointer; font-size:.85rem; color:#374151; }
  :global(.dark-mode .controls button) { color: #f0f4f8; }
  .focus-btn {
    background:#0a63c2;
    color:white;
    border:0;
    padding:0.45rem 0.85rem;
    border-radius:10px;
    font-weight:700;
    box-shadow:0 6px 16px rgba(10,99,194,0.25);
    transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
  }
  .focus-btn:hover { background:#0d74e3; box-shadow:0 8px 20px rgba(10,116,227,0.3); transform: translateY(-1px); }
  .focus-btn:active { transform: translateY(0); box-shadow:0 4px 12px rgba(10,99,194,0.25); }
  :global(.dark-mode .focus-btn) { background:#1084d8; }
  :global(.dark-mode .focus-btn:hover) { background:#1a91e6; }
  .add-sub { margin-top:.4rem; display:flex; gap:.5rem; align-items:center; }
  .sub-input { flex:1; padding:.45rem; border:1px solid #e6edf3; border-radius:8px; }
  .children { margin-top:.6rem; }
  input[type="checkbox"] { width:18px; height:18px; }
</style>
