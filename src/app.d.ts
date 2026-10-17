// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Account, Client, Models, Storage, TablesDB } from 'node-appwrite';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/** The signed-in user, or null for a guest. */
			user: Models.User | null;
			/** A fresh per-request client. Never share it between requests. */
			client: Client;
			account: Account;
			tablesDB: TablesDB;
			storage: Storage;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
