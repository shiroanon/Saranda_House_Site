import { Query } from 'node-appwrite';
import { createPublicClient } from './appwrite.ts';
import { pastEvents } from '#lib/data/events.ts';
import { meetups, meetupCities, cityImages } from '#lib/data/meetups.ts';
import { upperCouncil, lowerCouncil, teams, type Person } from '#lib/data/people.ts';
import { editions } from '#lib/data/newsletter.ts';
import { usefulLinks } from '#lib/data/links.ts';

/**
 * Content access layer.
 *
 * Every section the admin panel manages lives in Appwrite TablesDB. Reads go
 * through a keyless client (the tables grant `read("any")`), so public pages keep
 * rendering even when no API key is available.
 *
 * If Appwrite is unreachable, loaders fall back to the static modules under
 * `src/lib/data`, which double as the seed data.
 */

export const DATABASE_ID = 'saranda';

export const TABLE = {
	events: 'events',
	meetupRegions: 'meetup_regions',
	meetupEvents: 'meetup_events',
	people: 'people',
	newsletter: 'newsletter',
	links: 'links'
} as const;

export type TableId = (typeof TABLE)[keyof typeof TABLE];

export type EventRow = {
	$id: string;
	title: string;
	description?: string;
	date?: string;
	image?: string;
	published?: boolean;
	sort?: number;
};

export type RegionRow = { $id: string; city: string; image?: string; sort?: number };

export type MeetupEventRow = {
	$id: string;
	city: string;
	name: string;
	date?: string;
	description?: string;
	images?: string[];
};

/** A row in the Appwrite `people` table: a person, plus where they sit in the house. */
export type PersonRow = Person & {
	$id: string;
	group: 'upper' | 'lower' | 'team';
	team?: string;
	sort?: number;
};

export type NewsletterRow = {
	$id: string;
	title: string;
	date?: string;
	blurb?: string;
	url?: string;
	sort?: number;
};

export type LinkRow = {
	$id: string;
	title: string;
	url: string;
	category?: string;
	sort?: number;
};

export { toDate } from '../format.ts';

const PAGE_SIZE = 100;

/** Page through every matching row (Appwrite caps a single response). */
async function listRows<T>(table: TableId, queries: string[] = []): Promise<T[]> {
	const { tablesDB } = createPublicClient();
	const rows: T[] = [];

	for (let offset = 0; ; offset += PAGE_SIZE) {
		const result = await tablesDB.listRows({
			databaseId: DATABASE_ID,
			tableId: table,
			queries: [...queries, Query.limit(PAGE_SIZE), Query.offset(offset)]
		});
		rows.push(...(result.rows as unknown as T[]));
		if (result.rows.length < PAGE_SIZE) break;
	}

	return rows;
}

/** Run a loader against Appwrite, falling back to static seed data on failure. */
async function withFallback<T>(
	label: string,
	run: () => Promise<T[]>,
	fallback: () => T[]
): Promise<T[]> {
	try {
		return await run();
	} catch (error) {
		console.warn(`[content] ${label}: using static data — ${(error as Error).message}`);
		return fallback();
	}
}

/* ------------------------------------------------------------------ events */

const staticEvents = (): EventRow[] =>
	pastEvents.map((e, i) => ({
		$id: `static-${i}`,
		title: e.title,
		description: e.description,
		image: e.image ?? undefined,
		published: true,
		sort: i
	}));

export async function listEvents(includeUnpublished = false): Promise<EventRow[]> {
	return withFallback(
		'events',
		() =>
			listRows<EventRow>(TABLE.events, [
				...(includeUnpublished ? [] : [Query.equal('published', [true])]),
				Query.orderAsc('sort')
			]),
		includeUnpublished ? () => [] : staticEvents
	);
}

/* ----------------------------------------------------------------- meetups */

const staticRegions = (): RegionRow[] =>
	meetupCities.map((city, i) => ({
		$id: `static-${city}`,
		city,
		image: cityImages[city],
		sort: i
	}));

const staticMeetupEvents = (city?: string): MeetupEventRow[] => {
	const cities = city ? [city] : Object.keys(meetups);
	return cities.flatMap((c) =>
		(meetups[c]?.events ?? []).map((e, i) => ({
			$id: `static-${c}-${i}`,
			city: c,
			name: e.name,
			date: e.date ?? undefined,
			description: e.description,
			images: e.images
		}))
	);
};

export async function listRegions(): Promise<RegionRow[]> {
	return withFallback(
		'meetup_regions',
		() => listRows<RegionRow>(TABLE.meetupRegions, [Query.orderAsc('sort')]),
		staticRegions
	);
}

export async function listMeetupEvents(city?: string): Promise<MeetupEventRow[]> {
	return withFallback(
		'meetup_events',
		() =>
			listRows<MeetupEventRow>(TABLE.meetupEvents, [
				...(city ? [Query.equal('city', [city])] : []),
				Query.orderDesc('date')
			]),
		() => staticMeetupEvents(city)
	);
}

/* ------------------------------------------------------------------ people */

const staticPeople = (): PersonRow[] => {
	let sort = 0;
	return [
		// Spreading the person keeps name, role, photo and every link in one shape, so the
		// fallback cannot drift from what the seed writes to Appwrite.
		...upperCouncil.map((p) => ({
			$id: `static-u-${sort}`,
			...p,
			group: 'upper' as const,
			sort: sort++
		})),
		...lowerCouncil.map((p) => ({
			$id: `static-l-${sort}`,
			...p,
			group: 'lower' as const,
			sort: sort++
		})),
		...teams.flatMap((t) =>
			t.members.map((p) => ({
				$id: `static-t-${sort}`,
				...p,
				group: 'team' as const,
				team: t.title,
				sort: sort++
			}))
		)
	];
};

export async function listPeople(): Promise<PersonRow[]> {
	return withFallback(
		'people',
		() => listRows<PersonRow>(TABLE.people, [Query.orderAsc('sort')]),
		staticPeople
	);
}

/* -------------------------------------------------------------- newsletter */

export async function listEditions(): Promise<NewsletterRow[]> {
	return withFallback(
		'newsletter',
		() => listRows<NewsletterRow>(TABLE.newsletter, [Query.orderAsc('sort')]),
		() =>
			editions.map((e, i) => ({
				$id: `static-${i}`,
				title: e.title,
				date: e.date,
				blurb: e.blurb,
				url: e.url,
				sort: i
			}))
	);
}

/* ------------------------------------------------------------------- links */

export async function listLinks(): Promise<LinkRow[]> {
	return withFallback(
		'links',
		() => listRows<LinkRow>(TABLE.links, [Query.orderAsc('sort')]),
		() => usefulLinks.map((l, i) => ({ $id: `static-${i}`, title: l.title, url: l.url, sort: i }))
	);
}
