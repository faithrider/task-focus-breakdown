<!-- src/lib/components/StepBuilder.svelte -->
<script lang="ts">
  import { steps, bigTask, addRootStep, computeProgress, setFocus, resetAll } from '$lib/stores/taskStore';
  import StepItem from './StepItem.svelte';
  import { get } from 'svelte/store';

  let newTop = '';
  let message = '';

  function addTop() {
    if (!newTop.trim()) {
      message = 'Step cannot be empty';
      clearMessageLater();
      return;
    }
    addRootStep(newTop.trim());
    newTop = '';
    message = 'Main step added';
    clearMessageLater();
  }

  function clearMessageLater() {
    setTimeout(() => (message = ''), 1800);
  }

  // restart flow: clear everything and open modal (we'll toggle modal from parent page)
  // Here we export an event to the page to open modal; parent can listen
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function startNewTask() {
    // reset store
    resetAll();
    dispatch('restart'); // parent listens and opens modal
  }

  $: progress = computeProgress(get(steps));
</script>

<div class="card">
  <div class="header">
    <h2>Task: <span class="muted">{$bigTask}</span></h2>
    <div class="progress">{progress.done} / {progress.total} ({progress.percent}%)</div>
  </div>

  {#if message}
    <div class="notice">{message}</div>
  {/if}

  <div class="add-top">
    <input placeholder="Add a main step" bind:value={newTop} on:keydown={(e) => e.key === 'Enter' && addTop()} />
    <button on:click={addTop}>Add</button>
  </div>

  <div class="list">
    {#if $steps.length === 0}
      <p class="muted">No steps yet — add a micro-step to get started.</p>
    {/if}

    {#each $steps as s (s.id)}
      <StepItem step={s} depth={0} />
    {/each}
  </div>

  <div class="footer">
    <button on:click={startNewTask} class="ghost">Start a new task (restart)</button>
  </div>
</div>

<style>
  .card { background:white; padding:1rem; border-radius:10px; box-shadow:0 6px 18px rgba(15,23,42,0.06); max-width:900px; }
  .header { display:flex; justify-content:space-between; align-items:center; }
  .muted { color:#6b7280; font-weight:600; }
  .progress { color:#374151; font-size:.95rem; }
  .notice { background:#eaf4ff; border-left:4px solid #4aa3ff; padding:8px 12px; margin:8px 0; border-radius:4px; color:#054a7c; }
  .add-top { display:flex; gap:.6rem; margin-top:.6rem; }
  input { padding:.6rem; border-radius:8px; border:1px solid #e6edf3; flex:1; }
  button { padding:.55rem 0.9rem; border-radius:8px; border:0; background:#2563eb; color:white; cursor:pointer; }
  .ghost { background:transparent; border:1px solid #e6edf3; color:#374151; }
  .list { margin-top:.8rem; }
  .footer { margin-top:1rem; display:flex; justify-content:flex-end; }
</style>
