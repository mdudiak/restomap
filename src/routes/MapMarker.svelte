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

	const popup = new mapbox.Popup({ offset: 50 }).setText(label);
	// popup.on('open', forward);
	const marker = new mapbox.Marker({
		anchor: 'bottom',
		color: markerColor
	}).setLngLat([lon, lat]);

	const element = marker.getElement();
	element.id = 'marker';
	element.addEventListener('mouseenter', () => popup.addTo(map));
	element.addEventListener('mouseleave', () => popup.remove());
	element.addEventListener('click', forward);

	marker.setPopup(popup);
	marker.addTo(map);
	// const marker = new mapbox.Marker({
	// 	anchor: 'bottom',
	// 	color: markerColor
	// })
	// 	.setLngLat([lon, lat])
	// 	.setPopup(popup)
	// 	.addTo(map);

	$markers.push(marker);
</script>
