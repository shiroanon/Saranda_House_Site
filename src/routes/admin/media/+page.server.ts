import { fail } from '@sveltejs/kit';
import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
	createAdminClient,
	createPublicClient,
	mediaUrl,
	MEDIA_BUCKET
} from '#lib/server/appwrite.ts';
import { requireAdmin } from '#lib/server/auth.ts';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 60;

export const load: PageServerLoad = async (event) => {
	requireAdmin(event.locals.user);

	// The bucket grants read("any"), so listing works without a key.
	const { storage } = createPublicClient();
	const result = await storage.listFiles({
		bucketId: MEDIA_BUCKET,
		queries: [Query.limit(PAGE_SIZE), Query.orderDesc('$createdAt')]
	});

	return {
		total: result.total,
		files: result.files.map((file) => ({
			$id: file.$id,
			name: file.name,
			size: file.sizeOriginal,
			type: file.mimeType,
			url: mediaUrl(file.$id),
			isImage: file.mimeType.startsWith('image/')
		}))
	};
};

export const actions: Actions = {
	upload: async (event) => {
		requireAdmin(event.locals.user);

		const form = await event.request.formData();
		const files = form
			.getAll('files')
			.filter((entry): entry is File => entry instanceof File && entry.size > 0);

		if (files.length === 0) return fail(400, { errors: ['Choose at least one file.'] });

		const admin = createAdminClient(event.request);

		try {
			for (const file of files) {
				await admin.storage.createFile({
					bucketId: MEDIA_BUCKET,
					fileId: ID.unique(),
					file: InputFile.fromBuffer(await file.arrayBuffer(), file.name)
				});
			}
		} catch (cause) {
			return fail(400, { errors: [(cause as Error).message] });
		}

		return {
			errors: [],
			message: `Uploaded ${files.length} file${files.length === 1 ? '' : 's'}.`
		};
	},

	delete: async (event) => {
		requireAdmin(event.locals.user);

		const form = await event.request.formData();
		const fileId = String(form.get('$id') ?? '').trim();
		if (!fileId) return fail(400, { errors: ['Missing file id.'] });

		const admin = createAdminClient(event.request);

		try {
			await admin.storage.deleteFile({ bucketId: MEDIA_BUCKET, fileId });
		} catch (cause) {
			return fail(400, { errors: [(cause as Error).message] });
		}

		return { errors: [], message: 'File deleted.' };
	}
};
