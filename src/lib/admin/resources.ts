/**
 * Declarative description of everything the admin panel manages.
 *
 * This module is imported by both the server (to build queries and validate) and
 * the client (to render inputs), so it must stay free of server-only imports.
 */

export type FieldType =
	| 'text'
	| 'textarea'
	| 'date'
	| 'number'
	| 'boolean'
	| 'select'
	| 'image'
	| 'images';

export type Field = {
	/** Column key in the Appwrite table. */
	key: string;
	label: string;
	type: FieldType;
	required?: boolean;
	options?: { value: string; label: string }[];
	help?: string;
	/** Render across the full width of the form grid. */
	full?: boolean;
};

export type Row = Record<string, unknown> & { $id: string };

export type Resource = {
	/** URL segment, e.g. /admin/events */
	id: string;
	/** Appwrite table id. */
	table: string;
	title: string;
	singular: string;
	description: string;
	fields: Field[];
	/**
	 * Column the admin list is ordered by. Defaults to `sort`, which every table has
	 * except `meetup_events` — meetup albums are ordered by their date instead.
	 */
	orderBy?: string;
	/** Order newest-first. Only meaningful alongside `orderBy`. */
	orderDesc?: boolean;
	/** Primary text for a row in the list. */
	label: (row: Row) => string;
	/** Secondary text for a row in the list. */
	summary?: (row: Row) => string;
};

const text = (value: unknown) => (value == null ? '' : String(value));

export const resources: Resource[] = [
	{
		id: 'events',
		table: 'events',
		title: 'Events',
		singular: 'Event',
		description: 'House events shown on /events. Unpublished events stay hidden from the site.',
		fields: [
			{ key: 'title', label: 'Title', type: 'text', required: true, full: true },
			{ key: 'description', label: 'Description', type: 'textarea', full: true, help: 'Blank lines separate paragraphs.' },
			{ key: 'date', label: 'Date', type: 'date' },
			{ key: 'sort', label: 'Sort order', type: 'number', help: 'Lower numbers appear first.' },
			{ key: 'image', label: 'Poster', type: 'image', full: true },
			{ key: 'published', label: 'Published', type: 'boolean' }
		],
		label: (row) => text(row.title),
		summary: (row) => text(row.date).slice(0, 10)
	},
	{
		id: 'meetup-regions',
		table: 'meetup_regions',
		title: 'Meetup regions',
		singular: 'Region',
		description: 'The city cards on /meetups. The city name also links a region to its meetups.',
		fields: [
			{ key: 'city', label: 'City', type: 'text', required: true, help: 'Lower-case, e.g. lucknow' },
			{ key: 'image', label: 'Region map', type: 'image' },
			{ key: 'sort', label: 'Sort order', type: 'number' }
		],
		label: (row) => text(row.city)
	},
	{
		id: 'meetup-events',
		table: 'meetup_events',
		title: 'Meetup albums',
		singular: 'Meetup',
		description: 'Past meetups shown on /meetups/<city>. The city must match a region.',
		fields: [
			{ key: 'city', label: 'City', type: 'text', required: true, help: 'Must match a region city.' },
			{ key: 'name', label: 'Name', type: 'text', required: true },
			{ key: 'date', label: 'Date', type: 'date' },
			{ key: 'description', label: 'Description', type: 'textarea', full: true },
			{ key: 'images', label: 'Photos', type: 'images', full: true, help: 'One URL per line; uploads are appended.' },
			{ key: 'collage', label: 'Collage photos', type: 'images', full: true, help: 'Up to four photos shown in the collage at the top of the meetup. Leave blank to use the first four of Photos.' }
		],
		// This table has no `sort` column — a meetup's place in the list is its date,
		// which is also how the public page orders them.
		orderBy: 'date',
		orderDesc: true,
		label: (row) => text(row.name),
		summary: (row) => text(row.city)
	},
	{
		id: 'people',
		table: 'people',
		title: 'People',
		singular: 'Person',
		description: 'Council members, regional coordinators and teams shown on /know_us.',
		fields: [
			{ key: 'name', label: 'Name', type: 'text', required: true },
			{ key: 'role', label: 'Role', type: 'text', required: true },
			{
				key: 'group',
				label: 'Group',
				type: 'select',
				required: true,
				options: [
					{ value: 'upper', label: 'Upper House Council' },
					{ value: 'lower', label: 'Lower House Council' },
					{ value: 'team', label: 'Team member' }
				]
			},
			{ key: 'team', label: 'Team name', type: 'text', help: 'Only for team members, e.g. WebOps' },
			{ key: 'photo', label: 'Photo', type: 'image', full: true },
			{
				key: 'photoPosition',
				label: 'Photo focal point',
				type: 'select',
				options: [
					{ value: '', label: 'Default (face high)' },
					{ value: 'center top', label: 'Top' },
					{ value: 'center 10%', label: 'Upper' },
					{ value: 'center 24%', label: 'Face high' },
					{ value: 'center 40%', label: 'Upper middle' },
					{ value: 'center 50%', label: 'Middle' },
					{ value: 'center 65%', label: 'Lower middle' },
					{ value: 'center bottom', label: 'Bottom' }
				],
				help: 'Where the face sits in the frame. Pick the option that keeps the head in shot.'
			},
			{ key: 'sort', label: 'Sort order', type: 'number' }
		],
		label: (row) => text(row.name),
		summary: (row) => [text(row.role), text(row.team)].filter(Boolean).join(' · ')
	},
	{
		id: 'newsletter',
		table: 'newsletter',
		title: 'Newsletter',
		singular: 'Edition',
		description: 'Editions listed on /newsletter.',
		fields: [
			{ key: 'title', label: 'Title', type: 'text', required: true, full: true },
			{ key: 'blurb', label: 'Body', type: 'textarea', full: true, help: 'Blank lines separate paragraphs.' },
			{ key: 'sort', label: 'Sort order', type: 'number' }
		],
		label: (row) => text(row.title)
	},
	{
		id: 'links',
		table: 'links',
		title: 'Links',
		singular: 'Link',
		description: 'Entries listed on /links.',
		fields: [
			{ key: 'title', label: 'Title', type: 'text', required: true, full: true },
			{ key: 'url', label: 'URL', type: 'text', required: true, full: true },
			{ key: 'category', label: 'Category', type: 'text', help: 'Optional grouping, e.g. Handbooks' },
			{ key: 'sort', label: 'Sort order', type: 'number' }
		],
		label: (row) => text(row.title),
		summary: (row) => text(row.category)
	}
];

export function getResource(id: string): Resource | null {
	return resources.find((resource) => resource.id === id) ?? null;
}
