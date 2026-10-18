<script lang="ts">
	import { enhance } from '$app/forms';
	import FieldInput from '#lib/components/admin/FieldInput.svelte';
	import { getResource } from '#lib/admin/resources.ts';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const resource = $derived(getResource(data.resourceId)!);
	const editing = $derived(data.editing);
</script>

<svelte:head>
	<title>{resource.title} — Saranda Admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<header class="flex flex-wrap items-end justify-between gap-3">
	<div>
		<h1 class="text-3xl font-bold">{resource.title}</h1>
		<p class="mt-1 max-w-[70ch] opacity-80">{resource.description}</p>
	</div>
	<span class="text-sm opacity-70">{data.total} total</span>
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
	<h2 class="mb-4 text-xl font-bold">
		{editing ? `Edit ${resource.singular.toLowerCase()}` : `New ${resource.singular.toLowerCase()}`}
	</h2>

	{#key editing?.$id ?? 'new'}
		<form
			method="POST"
			action="?/save"
			enctype="multipart/form-data"
			use:enhance
			class="grid gap-4 sm:grid-cols-2"
		>
			{#if editing}
				<input type="hidden" name="$id" value={editing.$id} />
			{/if}

			{#each resource.fields as field (field.key)}
				<FieldInput {field} value={editing?.[field.key]} />
			{/each}

			<div class="flex flex-wrap gap-3 sm:col-span-2">
				<button
					type="submit"
					class="rounded-lg bg-secondary px-5 py-2 font-semibold text-primary-darker hover:bg-secondary-ligher"
				>
					{editing ? 'Save changes' : `Create ${resource.singular.toLowerCase()}`}
				</button>
				{#if editing}
					<a
						href={`/admin/${resource.id}`}
						class="rounded-lg border border-primary/25 px-5 py-2 font-semibold hover:bg-secondary/30"
						>Cancel</a
					>
				{/if}
			</div>
		</form>
	{/key}
</section>

<section class="mt-10">
	<h2 class="mb-4 text-xl font-bold">All {resource.title.toLowerCase()} ({data.rows.length})</h2>

	{#if data.rows.length === 0}
		<p class="green-glass-container p-6 text-center opacity-80">Nothing here yet.</p>
	{:else}
		<div class="overflow-x-auto rounded-xl border border-primary/15">
			<table class="w-full text-left text-sm">
				<thead class="bg-primary/10">
					<tr>
						<th class="px-4 py-2">Name</th>
						<th class="px-4 py-2">Details</th>
						<th class="px-4 py-2 text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.rows as row (row.$id)}
						<tr class="border-t border-primary/10 even:bg-primary/[0.03]">
							<td class="px-4 py-2 font-medium">{resource.label(row)}</td>
							<td class="px-4 py-2 opacity-80">{resource.summary?.(row) ?? ''}</td>
							<td class="px-4 py-2 text-right whitespace-nowrap">
								<a
									href={`?edit=${row.$id}`}
									class="font-semibold text-secondary-darker hover:underline">Edit</a
								>
								<form method="POST" action="?/delete" class="ml-3 inline" use:enhance>
									<input type="hidden" name="$id" value={row.$id} />
									<button
										type="submit"
										class="font-semibold text-red-700 hover:underline"
										onclick={(event) => {
											if (!confirm(`Delete “${resource.label(row)}”?`)) event.preventDefault();
										}}>Delete</button
									>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
