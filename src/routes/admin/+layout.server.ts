import { redirect } from '@sveltejs/kit';
import { isAdmin } from '#lib/server/auth.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const admin = isAdmin(locals.user);
	if (!admin) {
		redirect(303, `/login?next=${encodeURIComponent(url.pathname + url.search)}`);
	}
	return { admin, user: locals.user };
};
