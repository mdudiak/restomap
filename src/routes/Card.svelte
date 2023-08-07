<script>
	import { fly } from 'svelte/transition';

	export let label;
	export let details;
	export let url;
</script>

<div
	class="card"
	in:fly={{ x: 100, duration: 300, delay: 500 }}
	out:fly={{ x: -100, duration: 300 }}
>
	<h1>{label || 'Where to go?'}</h1>
	<p>{details || 'Use the buttons below for curated options'}</p>
	<a href={url || '/'}>{url || `Allons'y!`}</a>
</div>

<style>
	.card {
		/* width: clamp(200px, 30vw, 500px);
		aspect-ratio: 4/3; */
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		border-radius: 5px;
		box-shadow: 2px 2px 4px var(--color-shadow);
	}

	@media (prefers-color-scheme: dark) {
		.card {
			color: var(--color-secondary);
			box-shadow: 2px 2px 4px var(--color-glow);
			border: 1px solid var(--color-purp);
		}
	}
</style>
