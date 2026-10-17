import {
	APPWRITE_API_KEY,
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT_ID,
	APPWRITE_SITE_API_ENDPOINT,
	APPWRITE_SITE_PROJECT_ID
} from '$app/env/private';
import { Account, Client, Storage, TablesDB, Users } from 'node-appwrite';

/**
 * Endpoint and project ID.
 *
 * On Appwrite Sites both are injected for you (`APPWRITE_SITE_*`); locally we fall
 * back to our own `.env` values.
 */
function config() {
	const endpoint = APPWRITE_SITE_API_ENDPOINT ?? APPWRITE_ENDPOINT;
	const projectId = APPWRITE_SITE_PROJECT_ID ?? APPWRITE_PROJECT_ID;

	if (!endpoint || !projectId) {
		throw new Error(
			'Missing Appwrite configuration. On Appwrite Sites these are injected for you; ' +
				'locally, set APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID in .env'
		);
	}

	return { endpoint, projectId };
}

/**
 * The session cookie name Appwrite expects: `a_session_<PROJECT_ID>`.
 * Using it verbatim means the browser SDK shares the session SSR established.
 */
export function sessionCookieName(): string {
	return `a_session_${config().projectId}`;
}

/**
 * Admin client — bypasses permissions and rate limits.
 *
 * On Appwrite Sites, Appwrite mints a short-lived "ephemeral" API key and sends it
 * on the `x-appwrite-key` header of every SSR request, so there is no long-lived
 * secret to store. Locally we fall back to `APPWRITE_API_KEY` from `.env`.
 *
 * A new client is created per call: each key belongs to the request that carried it.
 */
export function createAdminClient(request: Request) {
	const { endpoint, projectId } = config();
	const key = request.headers.get('x-appwrite-key') ?? APPWRITE_API_KEY;

	if (!key) {
		throw new Error(
			'No admin API key available. Appwrite Sites sends one on the x-appwrite-key header; ' +
				'locally, set APPWRITE_API_KEY in .env'
		);
	}

	const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(key);

	const userAgent = request.headers.get('user-agent');
	if (userAgent) client.setForwardedUserAgent(userAgent);

	return decorate(client);
}

/**
 * Session client — acts on behalf of the signed-in visitor.
 *
 * Create one per request and never share it between requests, or one user's
 * session could leak into another user's request.
 */
export function createSessionClient(session?: string) {
	const { endpoint, projectId } = config();
	const client = new Client().setEndpoint(endpoint).setProject(projectId);

	if (session) client.setSession(session);

	return decorate(client);
}

function decorate(client: Client) {
	return {
		client,
		account: new Account(client),
		users: new Users(client),
		tablesDB: new TablesDB(client),
		storage: new Storage(client)
	};
}
