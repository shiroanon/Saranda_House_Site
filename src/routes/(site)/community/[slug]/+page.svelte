<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.community.title} — Saranda</title>
	<meta name="description" content={data.community.intro} />
</svelte:head>

<PageHero
	title={data.community.title}
	kicker="Community"
	subtitle={data.community.intro}
	image={data.community.images[0] ?? assets.mist1}
>
	<a class="btn-gold" href={data.community.joinUrl} target="_blank" rel="noopener noreferrer">
		Join the community
		<span aria-hidden="true">↗</span>
		<span class="sr-only">(opens in a new tab)</span>
	</a>
</PageHero>

{#if data.community.events.length}
	<section class="shell pt-10 pb-14 md:pt-16" use:reveal>
		<SectionHead label="What we run" count={`${data.community.events.length}`} />

		<div class="flex flex-col">
			{#each data.community.events as event, i (event.name)}
				<article class="border-t border-primary/12 py-8 first:border-t-0 first:pt-0" data-reveal>
					<div class="grid gap-3 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-8">
						<span class="pt-1 role md:text-right" aria-hidden="true">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div class="min-w-0">
							<h2 class="display-face text-title font-semibold">{event.name}</h2>
							<p class="mt-3 max-w-[68ch] leading-relaxed text-parchment/80">
								{event.description}
							</p>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>
{/if}

{#if data.community.images.length}
	<section class="band py-12 md:py-16" use:reveal>
		<div class="shell">
			<SectionHead label="From the gallery" count={`${data.community.images.length}`} />

			<div class="columns-2 gap-3 md:columns-3 lg:columns-4">
				{#each data.community.images as image, i (`${data.community.slug}-${i}`)}
					<figure class="mb-3 break-inside-avoid" data-reveal>
						<img class="photo" src={image} alt="" loading="lazy" />
					</figure>
				{/each}
			</div>
		</div>
	</section>
{/if}

<div class="pb-16"></div>
