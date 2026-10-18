import { redirect } from '@sveltejs/kit';
import { createSessionClient, sessionCookieName } from '#lib/server/appwrite.ts';
import type { Actions, PageServerLoad } from './$types';

async function signOut(cookies: import('@sveltejs/kit').Cookies, session?: string) {
	if (session) {
		await createSessionClient(session)
			.account.deleteSession('current')
			.catch(() => undefined);
	}
	cookies.delete(sessionCookieName(), { path: '/' });
}

export const load: PageServerLoad = async ({ cookies }) => {
	await signOut(cookies, cookies.get(sessionCookieName()));
	redirect(303, '/login');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		await signOut(cookies, cookies.get(sessionCookieName()));
		redirect(303, '/login');
	}
};
