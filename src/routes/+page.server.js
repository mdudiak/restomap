import { restaurants } from './restos.js';

export const load = async () => {
	return {
		restos: restaurants.map((resto) => ({
			label: resto.label,
			lat: resto.lat,
			lon: resto.lon,
			details: resto.details,
			url: resto.url,
			category: resto.category
		}))
	};
};
