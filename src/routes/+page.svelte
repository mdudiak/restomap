<script>
	import '../app.css';
	import Map from './Map.svelte';
	import MapMarker from './MapMarker.svelte';
	import Card from './Card.svelte';
	import { markers } from '../stores.js';

	export let data;

	const { restos } = data;

	const categories = restos.map((el) => el.category);
	const uniqueAmounts = categories.reduce(function (obj, cat) {
		if (!obj[cat]) {
			obj[cat] = 1;
		} else {
			obj[cat]++;
		}
		return obj;
	}, {});

	const uniqueCategories = Object.keys(uniqueAmounts);
	console.log(uniqueCategories);

	// for (i=0; i<categories.length; i++) {
	// 	let inc = 0;
	// if (category[i] !== uniqueCategories[inc]) {
	// 	uniqueCategories.push(category[i]);
	// 	inc++
	// }
	// if (category[i] !== uniqueCategories[inc + 1]) {
	// 	uniqueCategories.push(category[i+1]);
	// 	inc++
	// }
	// if (category[i] !== uniqueCategories[inc + 2]) {
	// 	uniqueCategories.push(category[i+2]);
	// 	inc++
	// }
	// }

	console.log(categories);

	let choices = [];

	function getChoices(choice) {
		choices = restos.filter((resto) => resto.category === choice);
		return choices;
	}

	const removeMarkers = () => {
		$markers.forEach((el) => el.remove());
	};

	let popupInfo = [];

	$: popupInfo;

	const getPopupInfo = (label, details, url) => {
		popupInfo = [label, details, url];
	};

	$: choices, removeMarkers();
</script>

<div class="page">
	<div class="container">
		<div class="card-wrapper">
			{#key popupInfo}
				<Card label={popupInfo[0]} details={popupInfo[1]} url={popupInfo[2]} />
			{/key}
		</div>
		<div class="map-wrapper">
			<Map lat={45.50286} lon={-73.569299} zoom={12}>
				{#key choices}
					{#each choices as resto, index}
						<MapMarker
							lat={resto.lat}
							lon={resto.lon}
							label={resto.label}
							bind={$markers[index]}
							on:popup={() => getPopupInfo(resto.label, resto.details, resto.url)}
						/>
					{/each}
				{/key}
			</Map>
		</div>
		<!-- {#if $markers[index].popup.isOpen()}
						<Card label={resto.label} details={resto.details} url={resto.url}/>
					{/if} -->
		<ul>
			{#each uniqueCategories as category}
				<li>
					<button on:click={() => getChoices(category)}>{category}</button>
				</li>
			{/each}
			<!-- <li>
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
			</li> -->
		</ul>
	</div>
</div>

<style>
	.page {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.container {
		width: 90vw;
		height: 90vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr) 0.5fr;
		place-content: center;
		place-items: center;
		gap: 1rem;
	}

	.map-wrapper {
		width: 100%;
		height: 100%;
		grid-row: 2 / 4;
		grid-column: 1 / -1;
	}

	.card-wrapper {
		width: 100%;
		height: 100%;
		grid-row: 1 / 2;
		grid-column: 1 / -1;
	}

	ul {
		width: 100%;
		height: 100%;
		grid-row: 4 / -1;
		grid-column: 1 / -1;
		border-radius: 5px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
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
