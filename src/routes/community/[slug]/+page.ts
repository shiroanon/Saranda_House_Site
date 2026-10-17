import { error } from '@sveltejs/kit';
import { communities } from '#lib/data/communities.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const community = communities[params.slug];
	if (!community) {
		error(404, `No community called "${params.slug}"`);
	}
	return { community };
};
