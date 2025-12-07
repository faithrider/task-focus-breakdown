<!-- src/lib/components/Timer.svelte -->
<script lang="ts">
  import { onDestroy } from 'svelte';
  import { workTime, breakTime } from '$lib/stores/ui';
  let running = $state(false);
  let workSeconds = $derived($workTime * 60);
  let breakSeconds = $derived($breakTime * 60);
  let seconds = $state(1500);
  let { timerMode = $bindable('work') } = $props<{ timerMode?: 'work' | 'break' }>();
  let interval = $state<number | null>(null);

  $effect(() => {
    seconds = workSeconds;
  });

  function tick() {
    if (!running) return;
    seconds -= 1;
    if (seconds <= 0) {
      if (timerMode === 'work') {
        timerMode = 'break';
        seconds = breakSeconds;
      } else {
        timerMode = 'work';
        seconds = workSeconds;
      }
    }
  }

  function start() {
    if (interval) return;
    running = true;
    interval = setInterval(tick, 1000) as unknown as number;
  }

  function pause() {
    running = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    pause();
    timerMode = 'work';
    seconds = workSeconds;
  }

  function adjWork(delta: number) {
    workTime.update(w => Math.max(1, w + delta));
    if (timerMode === 'work' && !running) {
      seconds = workSeconds;
    }
  }

  function adjBreak(delta: number) {
    breakTime.update(b => Math.max(1, b + delta));
    if (timerMode === 'break' && !running) {
      seconds = breakSeconds;
    }
  }

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  function format(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }
</script>

<div class="timer-card">
  <div class="mode">{timerMode === 'work' ? 'Work' : 'Break'}</div>
  <div class="clock">{format(seconds)}</div>
  
  <div class="durations">
    <div class="duration-group">
      <label for="work-minus">Work</label>
      <div class="duration-control">
        <button id="work-minus" class="arrow" onclick={() => adjWork(-1)} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && adjWork(-1)}>−</button>
        <span>{$workTime}m</span>
        <button id="work-plus" class="arrow" onclick={() => adjWork(1)} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && adjWork(1)}>+</button>
      </div>
    </div>
    <div class="duration-group">
      <label for="break-minus">Break</label>
      <div class="duration-control">
        <button id="break-minus" class="arrow" onclick={() => adjBreak(-1)} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && adjBreak(-1)}>−</button>
        <span>{$breakTime}m</span>
        <button id="break-plus" class="arrow" onclick={() => adjBreak(1)} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && adjBreak(1)}>+</button>
      </div>
    </div>
  </div>

  <div class="controls">
    {#if running}
      <button onclick={pause}>Pause</button>
    {:else}
      <button onclick={start}>Start</button>
    {/if}
    <button onclick={reset}>Reset</button>
  </div>
</div>

<style>
  .timer-card { background: white; padding: 1rem; border-radius: 10px; text-align:center; box-shadow:0 6px 18px rgba(15,23,42,0.06); }
  .mode { font-weight:700; color:#0f172a; }
  .clock { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; font-size:2rem; margin:.8rem 0 1rem; }
  .durations { display:flex; gap:1.2rem; justify-content:center; margin-bottom:1rem; }
  .duration-group { display:flex; flex-direction:column; align-items:center; }
  .duration-group label { font-size:0.85rem; color:#6b7280; font-weight:600; margin-bottom:0.3rem; }
  .duration-control { display:flex; align-items:center; gap:0.5rem; }
  .arrow { width:28px; height:28px; padding:0; border-radius:6px; background:#f3f4f6; border:1px solid #d1d5db; cursor:pointer; font-size:1rem; font-weight:700; color:#374151; }
  .arrow:hover { background:#e5e7eb; }
  .duration-control span { font-weight:700; color:#1f2937; min-width:40px; }
  .controls { display:flex; gap:.6rem; justify-content:center; }
  button { padding:.45rem .8rem; border-radius:8px; border:0; cursor:pointer; background:#eef2ff; color:#1e3a8a; }
</style>
