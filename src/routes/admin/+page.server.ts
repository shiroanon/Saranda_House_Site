import {
	listEditions,
	listEvents,
	listLinks,
	listMeetupEvents,
	listPeople,
	listRegions
} from '#lib/server/content.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [events, regions, meetups, people, editions, links] = await Promise.all([
		listEvents(true),
		listRegions(),
		listMeetupEvents(),
		listPeople(),
		listEditions(),
		listLinks()
	]);

	// Keyed by resource id; the dashboard indexes it with `resource.id`.
	const counts: Record<string, number> = {
		events: events.length,
		'meetup-regions': regions.length,
		'meetup-events': meetups.length,
		people: people.length,
		newsletter: editions.length,
		links: links.length
	};

	return { counts };
};
