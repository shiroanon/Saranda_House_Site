import { listRegions, listMeetupEvents } from '#lib/server/content.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [regions, events] = await Promise.all([listRegions(), listMeetupEvents()]);

	const counts: Record<string, number> = {};
	for (const event of events) counts[event.city] = (counts[event.city] ?? 0) + 1;

	return { regions, counts, totalMeetups: events.length };
};
