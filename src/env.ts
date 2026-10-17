import { defineEnvVars } from '@sveltejs/kit/env';

/** Appwrite-injected variables are absent locally, and vice versa. */
const optional = (value: string | undefined) => value || undefined;

/**
 * Environment variables, declared so they are typed and validated.
 * These are all server-only; read them from `$app/env/private`.
 */
export const variables = defineEnvVars({
	APPWRITE_SITE_API_ENDPOINT: {
		schema: optional,
		description: 'API endpoint, injected by Appwrite Sites.'
	},
	APPWRITE_SITE_PROJECT_ID: {
		schema: optional,
		description: 'Project ID, injected by Appwrite Sites.'
	},
	APPWRITE_ENDPOINT: {
		schema: optional,
		description: 'API endpoint for local development.'
	},
	APPWRITE_PROJECT_ID: {
		schema: optional,
		description: 'Project ID for local development.'
	},
	APPWRITE_API_KEY: {
		schema: optional,
		description:
			'Server-only API key for local development. Unset on Appwrite Sites, which sends an ephemeral key on the x-appwrite-key header instead.'
	}
});
