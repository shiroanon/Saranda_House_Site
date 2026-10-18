<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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

<section class="shell pt-14 pb-16 md:pt-16" use:reveal>
	<SectionHead label="Editions" count={`${data.editions.length}`} />

	{#if data.editions.length === 0}
		<p class="card p-8 text-center opacity-80">No editions yet — subscribe and catch the first one.</p>
	{:else}
		<ol class="flex flex-col">
			{#each data.editions as edition (edition.$id)}
				<li class="border-t border-primary/12 py-10 first:border-t-0 first:pt-2" data-reveal>
					<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-8">
						<h2 class="display-face text-headline leading-[1.05] font-semibold text-balance">
							{edition.title}
						</h2>

						<span class="shrink-0">
							<span class="eyebrow text-gold">Edition</span>
						</span>
					</div>

					{#if edition.blurb}
						<p class="mt-4 max-w-[62ch] leading-relaxed text-parchment/75">{edition.blurb}</p>
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
</section>