<!-- src/lib/components/TaskModal.svelte -->
<script lang="ts">
  import { showTaskModal } from '$lib/stores/ui';
  import { createRootTask } from '$lib/stores/taskStore';
  import { get } from 'svelte/store';

  let value = '';

  function close() {
    showTaskModal.set(false);
    value = '';
  }

  function submit() {
    if (!value.trim()) return;
    createRootTask(value.trim());
    showTaskModal.set(false);
    value = '';
  }
</script>

{#if $showTaskModal}
  <div class="overlay" role="dialog" aria-modal="true">
    <div class="modal">
      <h2>What task feels overwhelming right now?</h2>

      <input placeholder="e.g., Finish my project" bind:value={value} on:keydown={(e) => e.key === 'Enter' && submit()} />

      <div class="actions">
        <button on:click={close} class="ghost">Cancel</button>
        <button on:click={submit} class="primary">Start</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(2,6,23,0.45);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:999;
  }
  .modal {
    width: 380px;
    background: white;
    padding: 1.2rem;
    border-radius: 10px;
    box-shadow: 0 12px 30px rgba(2,6,23,0.3);
    text-align:center;
  }
  input { width:100%; padding:.6rem; margin-top:.8rem; border-radius:8px; border:1px solid #e6edf3; }
  .actions { margin-top:1rem; display:flex; justify-content:space-between; gap:.6rem; }
    .actions :global(button) { flex:1; }
</style>
