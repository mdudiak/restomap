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

	const forward = (event) => dispatch('popup', event.detail);

	const popup = new mapbox.Popup({ offset: 25 }).setText(label);
	popup.on('open', forward);
	const marker = new mapbox.Marker({
		anchor: 'bottom',
		color: markerColor
	})
		.setLngLat([lon, lat])
		.setPopup(popup)
		.addTo(map);
	$markers.push(marker);
</script>
