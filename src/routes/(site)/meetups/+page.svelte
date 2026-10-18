<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Meet Ups — Saranda</title>
	<meta name="description" content="Explore Saranda meetups by region across India." />
</svelte:head>

<PageHero
	title="Meet Ups"
	kicker="Regional chapters"
	subtitle="{data.regions.length} regions · {data.total} meetups hosted so far. Find the one closest to you."
	image={assets.mist2}
/>

<section class="shell pt-14 pb-16 md:pt-16" use:reveal>
	<SectionHead label="By region" count={`${data.regions.length}`} />

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.regions as region (region.$id)}
			<a href={`/meetups/${region.city}`} class="pennant group" data-reveal>
				<div class="photo-box h-56">
					<img src={region.image ?? assets.mist1} alt="" loading="lazy" />
				</div>

				<div class="flex items-end justify-between gap-3 p-5">
					<div class="min-w-0">
						<h3 class="display-face text-xl leading-tight font-semibold capitalize">
							{region.city}
						</h3>
						<span
							class="mt-2.5 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16"
							aria-hidden="true"
						></span>
					</div>

					<p class="role shrink-0 text-right">
						{data.counts[region.city] ?? 0} meetup{data.counts[region.city] === 1 ? '' : 's'}
					</p>
				</div>
			</a>
		{/each}
	</div>
</section>
