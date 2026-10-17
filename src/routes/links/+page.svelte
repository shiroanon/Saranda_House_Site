<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { usefulLinks } from '#lib/data/links.ts';
	import { assets, socials } from '#lib/data/site.ts';

	const categoryOf = (title: string) => {
		if (/grading/i.test(title)) return 'Grading';
		if (/handbook/i.test(title)) return 'Handbooks';
		if (/guideline|reference|interaction/i.test(title)) return 'Guidelines & Reference';
		return 'Other';
	};

	const groups = usefulLinks.reduce<Record<string, typeof usefulLinks>>((acc, link) => {
		const key = categoryOf(link.title);
		(acc[key] ??= []).push(link);
		return acc;
	}, {});
</script>

<svelte:head>
	<title>Links — Saranda</title>
	<meta
		name="description"
		content="Handbooks, grading documents and other useful links for Saranda House."
	/>
</svelte:head>

<PageHero
	title="Links"
	subtitle="Handbooks, grading documents and other useful links."
	image={assets.loneTree}
/>

<section class="flex flex-wrap gap-4 px-5 py-6 text-center">
	<div class="mx-auto max-w-[100ch]">
		<h2 class="text-lg font-bold">Stay connected</h2>
		<div class="mt-3 flex flex-wrap justify-center gap-3">
			{#each socials as s (s.href)}
				<a
					href={s.href}
					target="_blank"
					rel="noreferrer"
					class="rounded-lg border border-primary/20 bg-neutral-light px-4 py-2 text-sm font-semibold hover:bg-secondary/60"
					>{s.text}</a
				>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-[120ch] px-5 pb-16">
	<div class="flex flex-col gap-10">
		{#each Object.entries(groups) as [name, items] (name)}
			<div>
				<h2 class="mb-4 text-2xl font-bold">{name}</h2>
				<div class="grid gap-4 md:grid-cols-2">
					{#each items as link (link.url + link.title)}
						<a
							href={link.url}
							target="_blank"
							rel="noreferrer"
							class="flex items-center justify-between gap-4 green-glass-container p-4 hover:bg-secondary/40"
						>
							<span class="font-medium">{link.title}</span>
							<span aria-hidden="true" class="text-secondary-darker">↗</span>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
