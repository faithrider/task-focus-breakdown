<!-- src/routes/focus/+page.svelte -->
<script lang="ts">
  import { activeFocusId, steps, setFocus } from '$lib/stores/taskStore';
  import Timer from '$lib/components/Timer.svelte';
  import { goto } from '$app/navigation';
  import type { Step } from '$lib/stores/taskStore';

  let timerMode = $state<'work' | 'break'>('work');
  let focusId = $state<string | null>(null);
  let stepTree = $state<Step[]>([]);
  let currentStep: Step | null = $state(null);

  $effect(() => {
    focusId = $activeFocusId;
    stepTree = $steps;
  });

  function find(nodes: Step[], id: string | null): Step | null {
    if (!id) return null;
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children?.length) {
        const f = find(n.children, id);
        if (f) return f;
      }
    }
    return null;
  }

  $effect(() => {
    currentStep = find(stepTree, focusId);
  });

  function exit() {
    setFocus(null);
    goto('/');
  }
</script>

<div class="focus-screen" class:break-mode={timerMode === 'break'} style="background-color: {timerMode === 'break' ? '#1d4620' : 'transparent'}">
  <div class="card">
    {#if currentStep}
      <div class="label">Current Focus</div>

      <h1 class="task">{currentStep.text}</h1>

      <Timer bind:timerMode />

      <button class="ghost" onclick={exit}>
        Exit Focus
      </button>

    {:else}
      <div>No focus set. Return to the builder and click Focus.</div>
      <button onclick={() => goto('/')}>Go back</button>
    {/if}
  </div>
</div>

<style>
  .focus-screen {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at 20% 20%, #123159, #0a1b33 55%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem;
    transition: background 600ms ease;
  }
  .focus-screen.break-mode {
    background: radial-gradient(circle at 20% 20%, #6897be, #294f6f 55%);
  }
  .card {
    background: white;
    padding: 1.6rem 1.8rem;
    border-radius: 18px;
    width: min(900px, 94%);
    text-align: center;
    box-shadow: 0 26px 60px rgba(4, 12, 32, 0.35);
  }
  .label {
    font-weight: 700;
    color: #1f2a44;
    letter-spacing: 0.02em;
  }
  .task {
    margin: 1.4rem 0 1.6rem;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 800;
    color: #0b1530;
    line-height: 1.1;
  }
  .ghost {
    margin-top: 1.4rem;
  }
</style>
