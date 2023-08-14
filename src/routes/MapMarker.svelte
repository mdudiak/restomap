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
	export let markerColor = '#f15bb5';

	const forward = (event) => dispatch('click', event);

	const markerHeight = 50;
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

	const marker = new mapbox.Marker({
		anchor: 'bottom',
		color: markerColor,
		rotation: 15
	})
		.setLngLat([lon, lat])
		.setPopup(popup)
		.addTo(map);

	const element = marker.getElement();
	element.id = 'marker';
	element.addEventListener('mouseenter', () => popup.addTo(map));
	element.addEventListener('mouseleave', () => popup.remove());
	element.addEventListener('click', forward);

	$markers.push(marker);
</script>
