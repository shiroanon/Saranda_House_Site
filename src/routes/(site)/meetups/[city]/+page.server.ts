import { error } from '@sveltejs/kit';
import { listRegions, listMeetupEvents } from '#lib/server/content.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [regions, events] = await Promise.all([listRegions(), listMeetupEvents(params.city)]);
	const region = regions.find((r) => r.city === params.city);

	if (!region && events.length === 0) {
		error(404, `No meetups found for "${params.city}"`);
	}

	return { city: params.city, image: region?.image ?? null, events };
};
