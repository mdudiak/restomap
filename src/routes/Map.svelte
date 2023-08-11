<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import 'mapbox-gl/dist/mapbox-gl.css';

	export let lat;
	export let lon;
	export let zoom;
	export let dark = false;

	setContext(key, { getMap: () => map });

	let container;
	let map;

	let mapStyle;

	$: dark
		? (mapStyle = 'mapbox://styles/mapbox/dark-v11')
		: (mapStyle = 'mapbox://styles/mapbox/light-v11');

	function load() {
		map = new mapbox.Map({
			container,
			style: mapStyle,
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
		border: 1px solid var(--color-purp);
	}
</style>
