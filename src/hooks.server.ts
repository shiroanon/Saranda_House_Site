import type { Handle } from '@sveltejs/kit/hooks';
import type { Models } from 'node-appwrite';
import { createSessionClient, sessionCookieName } from '#lib/server/appwrite.ts';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get(sessionCookieName());

	// Always build a client so signed-out routes can still hit public endpoints.
	let services = createSessionClient(session);
	let user: Models.User | null = null;

	if (session) {
		try {
			user = await services.account.get();
		} catch {
			// Expired or revoked session — fall back to a signed-out client.
			event.cookies.delete(sessionCookieName(), { path: '/' });
			services = createSessionClient();
		}
	}

	event.locals.user = user;
	event.locals.client = services.client;
	event.locals.account = services.account;
	event.locals.tablesDB = services.tablesDB;
	event.locals.storage = services.storage;

	return resolve(event);
};
