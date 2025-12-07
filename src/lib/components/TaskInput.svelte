<script lang="ts">
  import { bigTask, steps } from '$lib/stores/taskStore';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let inputValue: string = '';

  function start() {
    if (inputValue.trim() === '') return;
    bigTask.set(inputValue.trim());
    // reset steps only if empty (so user can resume previous)
    steps.update((s) => (s.length === 0 ? s : s));
    dispatch('started');
  }
</script>

<div class="task-input card">
  <h2>What task feels overwhelming?</h2>
  <input bind:value={inputValue} placeholder="e.g., Finish my semester project" />
  <div class="controls">
    <button on:click={start}>Break it down</button>
  </div>
</div>

<style>
  .card {
    padding: 1rem;
    border-radius: 10px;
    max-width: 760px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 6px 18px rgba(15,23,42,0.06);
  }
  h2 { margin: 0 0 .6rem 0; }
  input {
    width: 100%;
    padding: .65rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #e6edf3;
  }
  .controls { margin-top: .6rem; display:flex; gap:.5rem; }
  button { padding: .6rem 1rem; border-radius: 8px; cursor:pointer; background:#2563eb;color:white;border:0; }
</style>
