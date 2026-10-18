<script lang="ts">
	import { resources } from '#lib/admin/resources.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin — Saranda</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1 class="text-3xl font-bold">Dashboard</h1>
<p class="mt-2 opacity-80">
	Content managed here is stored in Appwrite and read by the public site at request time.
</p>

<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
	{#each resources as resource (resource.id)}
		<a href={`/admin/${resource.id}`} class="green-glass-container block p-6 hover:bg-secondary/20">
			<div class="flex items-baseline justify-between gap-3">
				<h2 class="text-xl font-bold">{resource.title}</h2>
				<span class="text-2xl font-bold text-secondary-darker"
					>{data.counts[resource.id] ?? 0}</span
				>
			</div>
			<p class="mt-2 text-sm opacity-80">{resource.description}</p>
		</a>
	{/each}

	<a href="/admin/media" class="green-glass-container block p-6 hover:bg-secondary/20">
		<div class="flex items-baseline justify-between gap-3">
			<h2 class="text-xl font-bold">Media</h2>
			<span class="text-secondary-darker">↗</span>
		</div>
		<p class="mt-2 text-sm opacity-80">Upload images and copy their URLs for use anywhere.</p>
	</a>
</div>
