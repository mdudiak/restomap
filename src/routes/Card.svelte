<script>
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
	<svg
		version="1.0"
		id="Layer_3"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 517.07 597.06"
		style="enable-background:new 0 0 517.07 597.06;"
		xml:space="preserve"
	>
		<g>
			<path
				d="M258.53,0L0,149.27V447.8l258.53,149.27L517.07,447.8V149.27L258.53,0z M105.33,467.63l-69.77-40.74V170.26l185.86-107.6   v80.26l-116.09,67.98V467.63z M221.42,331.45v202.6l-70.33-39.63V232.66l70.33-41.3v75.79h74.79V63.66l68.65,39.07v263.88   l-69.21,40.19v-75.35H221.42z M481.51,428.56L295.09,534.05v-80.37l116.09-65.86V130.08l70.33,39.63V428.56z"
			/>
		</g>
	</svg>
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
</div>

<style>
	h1 {
		font-size: var(--size-800);
		z-index: 1;
	}

	p {
		font-size: var(--size-600);
		z-index: 1;
	}

	a {
		font-size: var(--size-600);
		z-index: 1;
	}

	a:hover {
		color: magenta;
	}

	svg {
		grid-row: 1/-1;
		grid-column: 1/-1;
	}

	.card {
		position: relative;
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

	svg {
		position: absolute;
		top: 50%;
		right: 40%;
		transform: translate(80%, -50%);
		height: 95%;
		z-index: 0;
	}

	button {
		border: none;
		background: none;
		font-size: var(--size-600);
		font-family: monospace;
		z-index: 1;
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
