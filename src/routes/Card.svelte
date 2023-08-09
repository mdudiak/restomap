<script>
	import { fly, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	export let label;
	export let details;
	export let url;
	export let address;

	const forward = (event) => dispatch('click', event.detail);
</script>

<!-- in:fly={{ x: 100, duration: 300 }}
	out:fly={{ x: -100, duration: 300, delay: 800 }} -->
<div class="card">
	{#if !url}
		<h1>Where to go?</h1>
		<p>Use the buttons below for curated options</p>
		<p>- or -</p>
		<p><i>IDK, It's all French to me...</i></p>
		<p>&#8595</p>
		<button on:click={forward}>Pourquoi pas?</button>
	{:else}
		<h1>{label}</h1>
		<p>{details}</p>
		<p>{address}</p>
		<a href={url}>{url}</a>
	{/if}

	<!-- <a href={url || random}>{url || `Pourquoi pas?`}</a> -->
</div>

<style>
	h1 {
		font-size: var(--size-800);
	}

	p {
		font-size: var(--size-600);
	}

	a {
		font-size: var(--size-600);
	}

	a:hover {
		color: magenta;
	}

	/* .margin_bottom_small {
		margin-block-end: 1rem;
	} */

	.card {
		/* width: clamp(200px, 30vw, 500px);
		aspect-ratio: 4/3; */
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		text-align: center;
		padding: 4rem;
		border-radius: 5px;
		border: 1px solid var(--color-purp);
		box-shadow: 2px 2px 4px var(--color-shadow);
	}

	button {
		border: none;
		background: none;
		font-size: var(--size-600);
		font-family: monospace;
	}

	button:hover {
		color: magenta;
	}

	@media (prefers-color-scheme: dark) {
		.card {
			color: var(--color-glow);
			border: 1px solid var(--color-purp);
		}

		a {
			color: var(--color-orange);
		}

		button {
			color: var(--color-orange);
		}
	}
</style>
