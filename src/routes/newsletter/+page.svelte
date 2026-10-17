<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { editions } from '#lib/data/newsletter.ts';
	import { assets } from '#lib/data/site.ts';

	// The crawled blurbs repeat the edition title, then a date, then the body.
	const clean = (blurb: string, title: string) =>
		blurb
			.replace(title, '')
			.replace(/^\s*(Sept|Sep|May|Jan|Dec|Oct|Aug|Jun|Jul|Apr|Mar|Feb|Nov)\w*\s+\d{4}\s*/, '')
			.trim();
</script>

<svelte:head>
	<title>Newsletter — Saranda</title>
	<meta name="description" content="The Saranda Express — the Saranda House newsletter." />
</svelte:head>

<PageHero
	title="The Saranda Express"
	subtitle="The Saranda House newsletter — student voices, creative corner and opportunities."
	image={assets.mist1}
/>

<section class="mx-auto flex max-w-[100ch] flex-col gap-8 px-5 py-12">
	{#each editions as edition (edition.title)}
		<article class="green-glass-container p-7">
			<h2 class="text-2xl font-bold">{edition.title}</h2>
			<div class="mt-3 space-y-3 leading-7 opacity-90">
				{#each clean(edition.blurb, edition.title).split('\n\n') as para}
					<p>{para}</p>
				{/each}
			</div>
		</article>
	{/each}
</section>
