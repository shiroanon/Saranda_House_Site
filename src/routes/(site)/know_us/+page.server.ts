import { listPeople } from '#lib/server/content.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const people = await listPeople();

	const teamNames: string[] = [];
	for (const person of people) {
		if (person.group !== 'team') continue;
		const name = person.team ?? 'Team';
		if (!teamNames.includes(name)) teamNames.push(name);
	}

	return {
		upper: people.filter((p) => p.group === 'upper'),
		lower: people.filter((p) => p.group === 'lower'),
		teams: teamNames.map((title) => ({
			title,
			members: people.filter((p) => p.group === 'team' && (p.team ?? 'Team') === title)
		}))
	};
};
