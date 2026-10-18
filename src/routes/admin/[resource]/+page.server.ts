import { error, fail } from '@sveltejs/kit';
import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { createAdminClient, mediaUrl, MEDIA_BUCKET } from '#lib/server/appwrite.ts';
import { requireAdmin } from '#lib/server/auth.ts';
import { DATABASE_ID } from '#lib/server/content.ts';
import { getResource, type Field, type Row } from '#lib/admin/resources.ts';
import type { Actions, PageServerLoad } from './$types';

type Admin = ReturnType<typeof createAdminClient>;

/** Appwrite datetime columns want full ISO 8601; date inputs give YYYY-MM-DD. */
const toIso = (value: string) =>
	/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00.000+00:00` : value;

async function upload(admin: Admin, file: File): Promise<string> {
	const fileId = ID.unique();
	await admin.storage.createFile({
		bucketId: MEDIA_BUCKET,
		fileId,
		file: InputFile.fromBuffer(await file.arrayBuffer(), file.name)
	});
	return mediaUrl(fileId);
}

/** Turn raw form fields into a row payload, uploading any files that came along. */
async function collect(admin: Admin, fields: Field[], form: FormData) {
	const data: Record<string, unknown> = {};
	const errors: string[] = [];

	for (const field of fields) {
		switch (field.type) {
			case 'image': {
				const file = form.get(`${field.key}_file`);
				if (file instanceof File && file.size > 0) {
					data[field.key] = await upload(admin, file);
				} else {
					data[field.key] = String(form.get(field.key) ?? '').trim() || null;
				}
				break;
			}
			case 'images': {
				const list = String(form.get(field.key) ?? '')
					.split('\n')
					.map((line) => line.trim())
					.filter(Boolean);
				for (const file of form.getAll(`${field.key}_file`)) {
					if (file instanceof File && file.size > 0) list.push(await upload(admin, file));
				}
				data[field.key] = list.length ? list : null;
				break;
			}
			case 'boolean':
				data[field.key] = form.get(field.key) === 'on';
				break;
			case 'number': {
				const raw = String(form.get(field.key) ?? '').trim();
				data[field.key] = raw === '' ? null : Number(raw);
				break;
			}
			case 'date': {
				const raw = String(form.get(field.key) ?? '').trim();
				data[field.key] = raw ? toIso(raw) : null;
				break;
			}
			default: {
				data[field.key] = String(form.get(field.key) ?? '').trim() || null;
			}
		}

		const value = data[field.key];
		const empty =
			value === null || value === undefined || value === '' || (Array.isArray(value) && !value.length);
		if (field.required && empty) errors.push(`${field.label} is required.`);
	}

	return { data, errors };
}

export const load: PageServerLoad = async (event) => {
	requireAdmin(event.locals.user);

	const resource = getResource(event.params.resource);
	if (!resource) error(404, `Unknown section "${event.params.resource}"`);

	const admin = createAdminClient(event.request);
	const orderBy = resource.orderBy ?? 'sort';
	const result = await admin.tablesDB.listRows({
		databaseId: DATABASE_ID,
		tableId: resource.table,
		queries: [
			Query.limit(500),
			resource.orderDesc ? Query.orderDesc(orderBy) : Query.orderAsc(orderBy)
		]
	});

	const rows = result.rows as unknown as Row[];
	const editId = event.url.searchParams.get('edit');

	return {
		resourceId: resource.id,
		rows,
		editing: (editId ? rows.find((row) => row.$id === editId) : null) ?? null,
		total: result.total
	};
};

export const actions: Actions = {
	save: async (event) => {
		requireAdmin(event.locals.user);

		const resource = getResource(event.params.resource);
		if (!resource) error(404, 'Unknown section');

		const admin = createAdminClient(event.request);
		const form = await event.request.formData();
		const { data, errors } = await collect(admin, resource.fields, form);
		if (errors.length) return fail(400, { errors });

		const rowId = String(form.get('$id') ?? '').trim();

		try {
			if (rowId) {
				await admin.tablesDB.updateRow({
					databaseId: DATABASE_ID,
					tableId: resource.table,
					rowId,
					data
				});
			} else {
				await admin.tablesDB.createRow({
					databaseId: DATABASE_ID,
					tableId: resource.table,
					rowId: ID.unique(),
					data
				});
			}
		} catch (cause) {
			return fail(400, { errors: [(cause as Error).message] });
		}

		return { errors: [], message: `${resource.singular} saved.` };
	},

	delete: async (event) => {
		requireAdmin(event.locals.user);

		const resource = getResource(event.params.resource);
		if (!resource) error(404, 'Unknown section');

		const form = await event.request.formData();
		const rowId = String(form.get('$id') ?? '').trim();
		if (!rowId) return fail(400, { errors: ['Missing row id.'] });

		const admin = createAdminClient(event.request);

		try {
			await admin.tablesDB.deleteRow({
				databaseId: DATABASE_ID,
				tableId: resource.table,
				rowId
			});
		} catch (cause) {
			return fail(400, { errors: [(cause as Error).message] });
		}

		return { errors: [], message: `${resource.singular} deleted.` };
	}
};
