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

	const logo = `<svg version="1.0" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 517.07 597.06" style="enable-background:new 0 0 517.07 597.06;" xml:space="preserve">
<g>
	<path d="M258.53,0L0,149.27V447.8l258.53,149.27L517.07,447.8V149.27L258.53,0z M105.33,467.63l-69.77-40.74V170.26l185.86-107.6   v80.26l-116.09,67.98V467.63z M221.42,331.45v202.6l-70.33-39.63V232.66l70.33-41.3v75.79h74.79V63.66l68.65,39.07v263.88   l-69.21,40.19v-75.35H221.42z M481.51,428.56L295.09,534.05v-80.37l116.09-65.86V130.08l70.33,39.63V428.56z"/>
</g>
</svg>`;

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
		color: markerColor
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
