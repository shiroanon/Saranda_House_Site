/**
 * Seed Appwrite with the content scraped from the old Saranda site.
 *
 * Run with Bun (it loads `.env` for you):
 *
 *   bun scripts/seed-appwrite.ts          # fill tables that are still empty
 *   bun scripts/seed-appwrite.ts --force  # wipe managed tables first
 *
 * Tables and the media bucket are created separately (they already exist in the
 * project); this script only inserts rows.
 */
import { Client, ID, Query, TablesDB } from 'node-appwrite';

import { pastEvents } from '../src/lib/data/events.ts';
import { cityImages, meetups, meetupCities } from '../src/lib/data/meetups.ts';
import { lowerCouncil, teams, upperCouncil } from '../src/lib/data/people.ts';
import { editions } from '../src/lib/data/newsletter.ts';
import { usefulLinks } from '../src/lib/data/links.ts';

const DATABASE_ID = 'saranda';
const PAGE_SIZE = 100;
const force = process.argv.includes('--force');

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
	console.error(
		'Missing APPWRITE_ENDPOINT / APPWRITE_PROJECT_ID / APPWRITE_API_KEY. ' +
			'They live in .env — create it from .env.example if you have not yet.'
	);
	process.exit(1);
}

const tablesDB = new TablesDB(
	new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey)
);

/** Appwrite datetime columns need full ISO 8601. */
const iso = (date: string | null) => (date ? `${date}T00:00:00.000+00:00` : null);

type SeedRow = Record<string, unknown> & { $id: string };

const seeds: { table: string; rows: SeedRow[] }[] = [];

/* ------------------------------------------------------------------ events */

seeds.push({
	table: 'events',
	rows: pastEvents.map((event, index) => ({
		$id: ID.unique(),
		title: event.title,
		description: event.description,
		image: event.image,
		published: true,
		sort: index
	}))
});

/* ----------------------------------------------------------- meetup regions */

seeds.push({
	table: 'meetup_regions',
	rows: meetupCities.map((city, index) => ({
		$id: ID.unique(),
		city,
		image: cityImages[city] ?? null,
		sort: index
	}))
});

/* ------------------------------------------------------------ meetup events */

seeds.push({
	table: 'meetup_events',
	rows: meetupCities.flatMap((city) =>
		meetups[city].events.map((event) => ({
			$id: ID.unique(),
			city,
			name: event.name,
			date: iso(event.date),
			description: event.description || null,
			images: event.images.length ? event.images : null
		}))
	)
});

/* ------------------------------------------------------------------ people */

let personSort = 0;
seeds.push({
	table: 'people',
	rows: [
		...upperCouncil.map((person) => ({
			$id: ID.unique(),
			...person,
			group: 'upper',
			team: null,
			sort: personSort++
		})),
		...lowerCouncil.map((person) => ({
			$id: ID.unique(),
			...person,
			group: 'lower',
			team: null,
			sort: personSort++
		})),
		...teams.flatMap((team) =>
			team.members.map((person) => ({
				$id: ID.unique(),
				...person,
				group: 'team',
				team: team.title,
				sort: personSort++
			}))
		)
	]
});

/* -------------------------------------------------------------- newsletter */

seeds.push({
	table: 'newsletter',
	rows: editions.map((edition, index) => ({
		$id: ID.unique(),
		title: edition.title,
		date: edition.date,
		blurb: edition.blurb,
		url: edition.url,
		sort: index
	}))
});

/* ------------------------------------------------------------------- links */

seeds.push({
	table: 'links',
	rows: usefulLinks.map((link, index) => ({
		$id: ID.unique(),
		title: link.title,
		url: link.url,
		category: null,
		sort: index
	}))
});

/* -------------------------------------------------------------------- seed */

async function clear(table: string) {
	let removed = 0;

	// Re-query from offset 0 each pass: deleting rows shifts the list down.
	for (;;) {
		const page = await tablesDB.listRows({
			databaseId: DATABASE_ID,
			tableId: table,
			queries: [Query.limit(PAGE_SIZE)]
		});

		if (page.rows.length === 0) break;

		for (const row of page.rows) {
			await tablesDB.deleteRow({ databaseId: DATABASE_ID, tableId: table, rowId: row.$id });
		}

		removed += page.rows.length;
	}

	return removed;
}

async function insert(table: string, rows: SeedRow[]) {
	const chunkSize = 50;

	for (let i = 0; i < rows.length; i += chunkSize) {
		await tablesDB.createRows({
			databaseId: DATABASE_ID,
			tableId: table,
			rows: rows.slice(i, i + chunkSize)
		});
	}
}

for (const { table, rows } of seeds) {
	const existing = await tablesDB.listRows({
		databaseId: DATABASE_ID,
		tableId: table,
		queries: [Query.limit(1)]
	});

	if (existing.total > 0 && !force) {
		console.log(
			`• ${table}: ${existing.total} rows already present — skipped (use --force to reseed)`
		);
		continue;
	}

	if (force && existing.total > 0) {
		const removed = await clear(table);
		console.log(`• ${table}: removed ${removed}`);
	}

	await insert(table, rows);
	console.log(`• ${table}: inserted ${rows.length}`);
}

console.log('\nDone.');
