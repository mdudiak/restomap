<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { mapbox, key } from './mapbox';
	import { markers } from '../stores';

	const { getMap } = getContext(key);
	const map = getMap();
	const dispatch = createEventDispatcher();

	export let lat;
	export let lon;
	export let label;
	export let markerColor = 'rgba(241, 91, 181, .8)';

	const forward = (event) => {
		dispatch('click', event);
		event.target.style.filter = `invert(80%) drop-shadow(1px 1px 2px ${markerColor}) drop-shadow(-1px -1px 2px ${markerColor})`;
	};

	const markerHeight = 34;
	const markerRadius = 10;
	const linearOffset = 25;
	const popupOffsets = {
		top: [0, 0],
		'top-left': [0, 0],
		'top-right': [0, 0],
		bottom: [0, -markerHeight],
		'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
		'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
		left: [markerRadius, (markerHeight - markerRadius) * -1],
		right: [-markerRadius, (markerHeight - markerRadius) * -1]
	};

	const popup = new mapbox.Popup({
		className: 'markerPopup',
		offset: popupOffsets,
		closeButton: false
	}).setText(label);

	const el = document.createElement('div');
	el.className = 'marker';
	el.style.backgroundImage = 'url(src/lib/icons/Icon_Black.png)';
	el.style.width = '29px';
	el.style.height = '34px';
	el.style.backgroundSize = 'cover';
	// el.style.filter =
	// 	'invert(80%)  drop-shadow(1px 1px 2px var(--marker-color)) drop-shadow(-1px -1px 2px var(--marker-color))';
	el.style.filter = `invert(0%)  drop-shadow(1px 1px 2px ${markerColor}) drop-shadow(-1px -1px 2px ${markerColor})`;

	const marker = new mapbox.Marker({
		anchor: 'bottom',
		rotation: 15,
		element: el
	})
		.setLngLat([lon, lat])
		.setPopup(popup)
		.addTo(map);

	el.addEventListener('mouseenter', () => popup.addTo(map));
	el.addEventListener('mouseleave', () => popup.remove());
	el.addEventListener('click', forward);

	$markers.push(marker);
</script>

<!-- <style>
	div {
		background-image: url(logo);
		width: 29px;
		height: 34px;
		background-size: cover;
		filter: invert(80%) drop-shadow(1px 1px 2px markerColor) drop-shadow(-1px -1px 2px markerColor);
		cursor: pointer;
	}
</style> -->
