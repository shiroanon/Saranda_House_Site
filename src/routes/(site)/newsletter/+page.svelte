<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/**
	 * Blurbs are authored with real line breaks: a blank line starts a new paragraph, and
	 * single lines inside one paragraph are list items. Keep that shape rather than
	 * collapsing the May edition's three bullets into a single run-on paragraph.
	 */
	const blocks = (blurb: string) =>
		blurb
			.split(/\n{2,}/)
			.map((block) =>
				block
					.split('\n')
					.map((line) => line.trim())
					.filter(Boolean)
			)
			.filter((lines) => lines.length > 0);
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
							<div class="mt-4 flex max-w-[68ch] flex-col gap-4 text-parchment/75">
								{#each blocks(edition.blurb) as lines, b (b)}
									<div class="flex flex-col gap-1">
										{#each lines as line, l (l)}
											<p class="leading-relaxed">{line}</p>
										{/each}
									</div>
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
