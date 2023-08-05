<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';

	import 'mapbox-gl/dist/mapbox-gl.css';

	setContext(key, { getMap: () => map });

	export let lat;
	export let lon;
	export let zoom;

	let container;
	let map;

	function load() {
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [lon, lat],
			zoom
		});
	}

	onMount(() => load());

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" />
</svelte:head>

<div bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
	}
</style>
