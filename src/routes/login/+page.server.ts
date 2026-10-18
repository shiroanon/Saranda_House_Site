import { fail, redirect } from '@sveltejs/kit';
import {
	createEmailPasswordSession,
	createSessionClient,
	sessionCookieName
} from '#lib/server/appwrite.ts';
import { isAdmin } from '#lib/server/auth.ts';
import type { Actions, PageServerLoad } from './$types';

const nextFrom = (url: URL) => {
	const next = url.searchParams.get('next');
	return next && next.startsWith('/') ? next : '/admin';
};

export const load: PageServerLoad = async ({ locals, url }) => {
	if (isAdmin(locals.user)) redirect(303, nextFrom(url));
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { email, error: 'Email and password are required.' });
		}

		const secret = await createEmailPasswordSession(email, password).catch(() => null);

		if (!secret) {
			return fail(400, { email, error: 'Incorrect email or password.' });
		}

		// The session is real, but only labelled admins get in.
		const { account } = createSessionClient(secret);

		let user;
		try {
			user = await account.get();
		} catch {
			return fail(400, { email, error: 'Could not start a session. Please try again.' });
		}

		if (!isAdmin(user)) {
			await account.deleteSession('current').catch(() => undefined);
			return fail(403, { email, error: 'That account is not an admin.' });
		}

		cookies.set(sessionCookieName(), secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 24 * 365
		});

		redirect(303, nextFrom(url));
	}
};
