<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
</script>

<svelte:head>
	<title>Media — Saranda Admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<header class="flex flex-wrap items-end justify-between gap-3">
	<div>
		<h1 class="text-3xl font-bold">Media</h1>
		<p class="mt-1 max-w-[70ch] opacity-80">
			Uploads land in the Appwrite <code class="rounded bg-primary/10 px-1">media</code> bucket.
			Copy a URL and paste it into any image field.
		</p>
	</div>
	<span class="text-sm opacity-70">{data.total} file{data.total === 1 ? '' : 's'}</span>
</header>

{#if form?.errors?.length}
	<ul class="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-800">
		{#each form.errors as message, i (`${i}-${message}`)}
			<li>{message}</li>
		{/each}
	</ul>
{/if}

{#if form?.message}
	<p class="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm text-green-900">{form.message}</p>
{/if}

<section class="green-glass-container mt-6 p-6">
	<h2 class="mb-4 text-xl font-bold">Upload</h2>
	<form
		method="POST"
		action="?/upload"
		enctype="multipart/form-data"
		use:enhance
		class="flex flex-wrap items-end gap-4"
	>
		<label class="grow">
			<span class="mb-1 block text-sm font-semibold">Files</span>
			<input type="file" name="files" multiple accept="image/*" class="text-sm" />
		</label>
		<button
			type="submit"
			class="rounded-lg bg-secondary px-5 py-2 font-semibold text-primary-darker hover:bg-secondary-ligher"
			>Upload</button
		>
	</form>
</section>

<section class="mt-10">
	<h2 class="mb-4 text-xl font-bold">Recent uploads</h2>

	{#if data.files.length === 0}
		<p class="green-glass-container p-6 text-center opacity-80">No files uploaded yet.</p>
	{:else}
		<ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.files as file (file.$id)}
				<li class="green-glass-container overflow-hidden">
					{#if file.isImage}
						<img src={file.url} alt={file.name} loading="lazy" class="h-40 w-full object-cover" />
					{:else}
						<div class="flex h-40 items-center justify-center opacity-60">{file.type}</div>
					{/if}
					<div class="p-4">
						<p class="truncate font-medium" title={file.name}>{file.name}</p>
						<p class="text-xs opacity-70">{kb(file.size)}</p>
						<label class="mt-2 block">
							<span class="text-xs opacity-70">URL</span>
							<input
								type="text"
								readonly
								value={file.url}
								class="w-full rounded-lg border border-primary/25 bg-neutral-light-lighter px-2 py-1 text-xs"
								onfocus={(event) => event.currentTarget.select()}
							/>
						</label>
						<form
							method="POST"
							action="?/delete"
							class="mt-3 text-right"
							use:enhance
						>
							<input type="hidden" name="$id" value={file.$id} />
							<button
								type="submit"
								class="text-sm font-semibold text-red-700 hover:underline"
								onclick={(event) => {
									if (!confirm(`Delete ${file.name}? Content still pointing at it will break.`))
										event.preventDefault();
								}}>Delete</button
							>
						</form>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</section>
