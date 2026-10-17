import { error } from '@sveltejs/kit';
import { meetups, cityImages } from '#lib/data/meetups.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const region = meetups[params.city];
	if (!region) {
		error(404, `No meetups found for "${params.city}"`);
	}
	return {
		region,
		image: cityImages[params.city] ?? null
	};
};
