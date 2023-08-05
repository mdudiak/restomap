import mapbox from 'mapbox-gl';
// import MAPBOX_ACCESS_TOKEN from '$app/environment';

// mapbox.accessToken = MAPBOX_ACCESS_TOKEN;

mapbox.accessToken =
	'pk.eyJ1IjoibWR1ZGlhayIsImEiOiJjbGJzZGl6djMwMXZzM29wZmQ5NGIzemluIn0.WLiCcoHOFGD2SimgRxd48w';

const key = Symbol();

export { mapbox, key };
