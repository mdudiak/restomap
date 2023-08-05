<script>
	import Map from './Map.svelte';
	import MapMarker from './MapMarker.svelte';
	import { markers } from '../stores.js';
	import Card from './Card.svelte';

	export let data;

	const { restos } = data;

	let choices = [];

	function getChoices(choice) {
		choices = restos.filter((resto) => resto.category === choice);
		return choices;
	}

	const removeMarkers = () => {
		$markers.forEach((el) => el.remove());
	};

	$: choices, removeMarkers();
</script>

<div class="container">
	<div class="map-wrapper">
		<Map lat={45.50286} lon={-73.569299} zoom={12}>
			{#key choices}
				{#each choices as resto, index}
					<MapMarker lat={resto.lat} lon={resto.lon} label={resto.label} bind={$markers[index]} />
				{/each}
			{/key}
		</Map>
	</div>
	<!-- {#if $markers[index].popup.isOpen()}
						<Card label={resto.label} details={resto.details} url={resto.url}/>
					{/if} -->
	<aside>
		<ul>
			<li>
				<button on:click={() => getChoices('coffee')}>Coffee</button>
			</li>
			<li>
				<button on:click={() => getChoices('brunch')}>Brunch</button>
			</li>
			<li>
				<button on:click={() => getChoices('dinner')}>Dinner</button>
			</li>
			<li>
				<button on:click={() => getChoices('drinks')}>Drinks</button>
			</li>
		</ul>
	</aside>
</div>

<style>
	.container {
		width: 90vw;
		height: 90vh;
		margin: 0 auto;
		display: grid;
		place-content: center;
		place-items: center;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr) 0.5fr;
	}

	.map-wrapper {
		width: 100%;
		height: 100%;
		grid-row: 1 / 3;
		grid-column: 1 / -1;
	}

	aside {
		width: 100%;
		grid-row: 3 / -1;
		grid-column: 1 / -1;
		border-radius: 5px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
	}

	ul {
		place-self: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
	}

	li {
		list-style: none;
	}

	button {
		padding: 10px;
		aspect-ratio: 4 / 3;
		background: none;
		border-radius: 5px;
		box-shadow: none;
		border: 2px solid rgba(0, 0, 0, 0.5);
	}
</style>
