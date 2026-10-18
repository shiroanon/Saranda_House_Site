import { error } from '@sveltejs/kit';
import type { Models } from 'node-appwrite';

/** Only users carrying this Appwrite label may open the admin panel. */
export const ADMIN_LABEL = 'admin';

export function isAdmin(user: Models.User | null | undefined): boolean {
	return Boolean(user?.labels?.includes(ADMIN_LABEL));
}

export function requireAdmin(user: Models.User | null | undefined): void {
	if (!isAdmin(user)) error(403, 'Admin access required.');
}
