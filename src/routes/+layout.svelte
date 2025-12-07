<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { darkMode } from '$lib/stores/ui';
	import { page } from '$app/stores';

	let { children } = $props();

	$effect(() => {
		if (typeof document !== 'undefined') {
			const inFocus = $page.route.id === '/focus';
			document.body.classList.toggle('dark-mode', $darkMode && !inFocus);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mode-toggle" role="button" tabindex="0" onclick={() => darkMode.update(d => !d)} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && darkMode.update(d => !d)}>
	{#if $darkMode}
		☀️
	{:else}
		🌙
	{/if}
</div>

{@render children()}

<style>
	:global(body) {
		margin: 0;
		font-family: 'Georgia', serif;
		background: #f5f8fc;
		color: #0f172a;
		transition: background 200ms ease, color 200ms ease;
	}

	:global(body.dark-mode) {
		background: #0f172a;
		color: #f0f4f8;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(.container) {
		max-width: 760px;
		margin: 0 auto;
		padding: 2rem 1.25rem;
	}

	:global(button) {
		font-family: inherit;
	}

	:global(button.primary) {
		background: #0a63c2;
		color: white;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		padding: 0.9rem 1rem;
		font-weight: 600;
	}

	:global(.dark-mode button.primary) {
		background: #1084d8;
	}

	:global(.dark-mode button.primary:hover) {
		background: #1a91e6;
	}

	:global(button.ghost) {
		background: transparent;
		border: 1px solid #d4dde8;
		color: #1f2937;
		border-radius: 10px;
		cursor: pointer;
		padding: 0.6rem 0.9rem;
	}

	:global(.dark-mode button.ghost) {
		border-color: #2d3a4a;
		color: #f0f4f8;
	}

	:global(.dark-mode button.ghost:hover) {
		background: #1a2332;
	}

	:global(button.reset) {
		background: transparent;
		border: 1px solid #9cb1c6;
		border-radius: 10px;
		cursor: pointer;
		padding: 0.7rem;
		width: 100%;
		color: inherit;
	}

	:global(.dark-mode button.reset) {
		border-color: #2d3a4a;
		color: #f0f4f8;
	}

	:global(.focus-btn) {
		background: #0a63c2 !important;
		color: white !important;
	}

	:global(.dark-mode h1),
	:global(.dark-mode h2),
	:global(.dark-mode h3),
	:global(.dark-mode h4),
	:global(.dark-mode h5),
	:global(.dark-mode h6) {
		color: #dfebf7;
	}

	:global(.dark-mode .main-title) {
		color: #dfebf7 !important;
	}

	:global(input),
	:global(textarea) {
		font-family: inherit;
		border-radius: 10px;
		border: 1px solid #d8e1ea;
	}

	:global(.dark-mode input),
	:global(.dark-mode textarea) {
		background: #1a2332;
		color: #dfebf7;
		border: 1px solid #dfebf7;
		border-color: #2d3a4a;
	}

	:global(.card) {
		background: white;
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
	}

	:global(.dark-mode .card) {
		background: #0f1419;
		border-color: #1e2535;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	}

	.mode-toggle {
		position: fixed;
		bottom: 1.2rem;
		right: 1.2rem;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: white;
		border: 2px solid #d1d5db;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		cursor: pointer;
		transition: transform 120ms ease, box-shadow 120ms ease, background 200ms ease;
		box-shadow: 0 6px 12px rgba(15, 23, 42, 0.1);
		z-index: 100;
	}

	:global(.dark-mode) .mode-toggle {
		background: #1f2937;
		border-color: #374151;
	}

	.mode-toggle:hover {
		transform: scale(1.1);
		box-shadow: 0 8px 16px rgba(15, 23, 42, 0.15);
	}

	.mode-toggle:active {
		transform: scale(0.95);
	}
</style>