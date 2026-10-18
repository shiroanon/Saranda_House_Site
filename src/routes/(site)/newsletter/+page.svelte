<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Blurbs are authored with blank lines between paragraphs. */
	const paragraphs = (blurb: string) =>
		blurb
			.split(/\n{2,}/)
			.map((p) => p.trim())
			.filter(Boolean);
</script>

<svelte:head>
	<title>Newsletter — Saranda</title>
	<meta name="description" content="The Saranda Express — every edition of the house newsletter." />
</svelte:head>

<PageHero
	title="The Saranda Express"
	kicker="Newsletter"
	subtitle="{data.editions.length} editions of house news, chronicles, and things worth reading."
	image={assets.bg3}
/>

<section class="shell pt-14 pb-16 md:pt-16 md:pb-20" use:reveal>
	<SectionHead label="Editions" count={`${data.editions.length}`} />

	{#if data.editions.length === 0}
		<p class="card p-8 text-center opacity-80">No editions yet — subscribe and catch the first one.</p>
	{:else}
		<ol class="flex flex-col">
			{#each data.editions as edition, i (edition.$id)}
				<li
					class="grid gap-6 border-t border-primary/12 py-10 first:border-t-0 first:pt-0 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10"
					data-reveal
				>
					<!-- The issue date leads, in mono — it is real data, so it reads like a record. -->
					<div class="md:pt-2">
						<span class="role text-gold">{edition.date ?? `No. ${i + 1}`}</span>
					</div>

					<div class="min-w-0">
						<h2 class="display-face text-title leading-[1.08] font-semibold text-balance">
							{edition.title}
						</h2>

						{#if edition.blurb}
							<div class="mt-4 flex max-w-[68ch] flex-col gap-3.5 text-parchment/75">
								{#each paragraphs(edition.blurb) as paragraph, p (p)}
									<p class="leading-relaxed">{paragraph}</p>
								{/each}
							</div>
						{/if}

						{#if edition.url}
							<a
								class="text-link mt-6 inline-flex items-center gap-2"
								href={edition.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Read the edition
								<span aria-hidden="true">→</span>
								<span class="sr-only">(opens in a new tab)</span>
							</a>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	{/if}
</section>
