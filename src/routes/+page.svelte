<script>
	import '../app.css';
	import Map from './Map.svelte';
	import MapMarker from './MapMarker.svelte';

	import Card from './Card.svelte';

	import { markers, currentColor } from '../stores.js';

	export let data;
	const { restos } = data;

	let dark = false;
	let motherShip;

	const uniqueCategoriesObj = new Object();
	restos.forEach((el) => (uniqueCategoriesObj[el.category] = el.markerColor));

	const uniqueCategories = Object.keys(uniqueCategoriesObj);

	let choices = [];

	function getChoices(choice) {
		choices = restos.filter((resto) => resto.category === choice);
		return choices;
	}

	const removeMarkers = () => {
		$markers.forEach((el) => el.remove());
	};

	const changeMarker = (event, color) => {
		$markers.forEach((el) => {
			if (Number(el._element.dataset.createdAt) < event.timeStamp) {
				el._element.style.filter = `invert(10%)  drop-shadow(1px 1px 2px ${color}) drop-shadow(-1px -1px 2px ${color})`;
				el._element.dataset.createdAt = 100000;
			}
			return el;
		});
	};

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const randoResto = () => {
		let random = restos[Object.keys(restos)[`${getRandomInt(restos.length)}`]];
		choices.push(random);
		choices = choices;
	};

	let popupInfo = [];

	$: popupInfo;

	const getPopupInfo = (label, details, url, address) => {
		popupInfo = [label, details, url, address];
	};

	const getUserPref = () => {
		matchMedia('(prefers-color-scheme: dark)').matches ? (dark = true) : (dark = false);
	};

	$: choices, removeMarkers();
</script>

<svelte:window on:change={getUserPref()} />

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Montreal restaurant map" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="page">
	<div class="container">
		<div class="card-wrapper">
			{#key popupInfo}
				<Card
					label={popupInfo[0]}
					details={popupInfo[1]}
					url={popupInfo[2]}
					address={popupInfo[3]}
					on:click={() => {
						randoResto();
					}}
				/>
			{/key}
		</div>
		<div class="map-wrapper">
			<Map {dark} lat={45.52} lon={-73.569299} zoom={11}>
				{#key choices}
					<MapMarker
						lat={45.50289552120013}
						lon={-73.56935620291614}
						label={'mother ship'}
						bind={motherShip}
						home={true}
						on:click={(event) => {
							changeMarker(event, $currentColor[0]);
							getPopupInfo(
								'Renaissance Montreal Downtown Hotel',
								'',
								'http://bitly.ws/RPx9',
								'1250 Blvd Robert-Bourassa, Montréal, QC H3B 3B8'
							);
						}}
					/>
					{#each choices as resto, index}
						<MapMarker
							lat={resto.lat}
							lon={resto.lon}
							label={resto.label}
							markerColor={resto.markerColor}
							bind={$markers[index]}
							on:click={(event) => {
								changeMarker(event, $currentColor[0]);
								getPopupInfo(resto.label, resto.details, resto.url, resto.address);
							}}
						/>
					{/each}
				{/key}
			</Map>
		</div>

		<ul>
			<li>
				<button on:click={() => (choices = [...restos])}>all</button>
			</li>
			{#each uniqueCategories as category}
				<li>
					<button
						style={`--color-glow: ${uniqueCategoriesObj[category]}`}
						on:click={() => {
							getChoices(category);
						}}>{category}</button
					>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.page {
		width: 100vw;
		height: 100vh;
		position: relative;
		color: var(--color-primary);
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

		padding-block-end: 1rem;
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
		border: 1px solid var(--color-purp);
		box-shadow: 2px 2px 4px var(--color-shadow);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		justify-content: space-evenly;
		padding: 1rem;
		gap: 1rem;
	}

	li {
		list-style: none;
	}

	button {
		padding: 10px;
		height: 100%;
		width: 100%;
		background: none;
		border-radius: 5px;
		box-shadow: 2px 2px 4px var(--color-shadow);
		transition: all 0.25s;
		color: var(--color-primary);
		border: 1px solid var(--color-purp);
		font-family: monospace;
	}

	button:hover {
		box-shadow: 4px 4px 8px var(--color-shadow);
		color: var(--color-secondary);
		background-color: var(--color-glow);
		border: 3px solid var(--color-secondary);
		filter: drop-shadow(1px 1px 2px var(--color-primary))
			drop-shadow(-1px -1px 2px var(--color-glow));
	}

	button:focus {
		color: var(--color-secondary);
		background-color: var(--color-glow);
		border: 3px solid var(--color-secondary);
		filter: drop-shadow(1px 1px 2px var(--color-primary))
			drop-shadow(-1px -1px 2px var(--color-glow));
	}

	@media screen and (min-width: 600px) {
		ul {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}

	@media (prefers-color-scheme: dark) {
		.page {
			background-color: var(--color-primary);
			/* background-image: var(--gradient-8); */
		}

		ul {
			border: 1px solid var(--color-purp);
		}

		button {
			color: white;
			filter: drop-shadow(1px 1px 2px var(--color-orange))
				drop-shadow(-1px -1px 2px var(--color-logo));

			background-color: var(--color-primary);
		}

		button:hover {
			color: var(--color-primary);
			background-color: var(--color-glow);
			border: 3px solid var(--color-secondary);
			filter: drop-shadow(1px 1px 2px var(--color-secondary))
				drop-shadow(-1px -1px 2px var(--color-glow));
		}

		button:focus {
			color: var(--color-primary);
			background-color: var(--color-glow);
			border: 3px solid var(--color-secondary);
			filter: drop-shadow(1px 1px 2px var(--color-secondary))
				drop-shadow(-1px -1px 2px var(--color-glow));
		}
	}
</style>
