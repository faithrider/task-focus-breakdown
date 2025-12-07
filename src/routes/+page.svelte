<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { bigTask, steps, createRootTask, resetAll } from '$lib/stores/taskStore';
  import StepItem from '$lib/components/StepItem.svelte';

  let newRoot = '';
  let showWarning = false;

  function start() {
    if (!newRoot.trim()) {
      showWarning = true;
      return;
    }
    createRootTask(newRoot.trim());
    showWarning = false;
  }

</script>

<div class={`container ${$bigTask ? '' : 'hero'}`}>
  <!-- Ask user initial question if no bigTask yet -->
  {#if !$bigTask}
    <h1 class="title">What task is overwhelming you?</h1>

    <input
      class="big-input"
      bind:value={newRoot}
      placeholder="e.g., Finish research paper"
    />

    {#if showWarning}
      <div class="warning">Please enter a task.</div>
    {/if}

    <button class="primary" on:click={start}>
      Start Breaking It Down
    </button>
  {:else}
    <!-- Builder screen -->
    <h1 class="main-title">{$bigTask}</h1>

    {#each $steps as step}
      <StepItem {step} />
    {/each}

    <button class="reset" on:click={resetAll}>
      Reset Everything
    </button>
  {/if}

</div>

<style>
  .title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .big-input {
    width: 100%;
    padding: 1rem;
    margin-bottom: .7rem;
  }
  .warning {
    color: #b91c1c;
    margin-bottom: .5rem;
  }
  .main-title {
    font-size: 2rem;
    margin-bottom: 1.4rem;
    color: #084074;
  }
  .reset { margin-top: 1.6rem; }

  .hero {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .hero .big-input {
    max-width: 520px;
    text-align: center;
  }

  .hero .primary {
    align-self: center;
    width: 240px;
    margin-top: 0.6rem;
  }
</style>
