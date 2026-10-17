<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { assets } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const heroImage = $derived(data.community.images[0] ?? assets.mist1);
	const gallery = $derived(data.community.images.slice(1));
</script>

<svelte:head>
	<title>{data.community.title} — Saranda</title>
	<meta name="description" content={data.community.intro} />
</svelte:head>

<PageHero title={data.community.title} image={heroImage} />

<section class="mx-auto max-w-[120ch] px-5 py-12">
	<div class="flex flex-col items-start gap-5 green-glass-container p-8 md:p-10">
		<p class="text-lg leading-relaxed">{data.community.intro}</p>
		<div class="flex flex-wrap gap-3">
			<a
				href={data.community.joinUrl}
				target="_blank"
				rel="noreferrer"
				class="rounded-lg bg-secondary px-6 py-2.5 font-semibold text-primary-darker hover:bg-secondary-ligher"
				>Join the Community</a
			>
			<a
				href="/events"
				class="rounded-lg border border-primary/20 px-6 py-2.5 font-semibold hover:bg-secondary/50"
				>Check out the events →</a
			>
		</div>
	</div>
</section>

{#if data.community.events.length}
	<section class="mx-auto max-w-[120ch] px-5 pb-12">
		<h2 class="mb-6 text-3xl font-bold">Events hosted under our care</h2>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.community.events as event (event.name)}
				<article class="flex flex-col green-glass-container p-6">
					<h3 class="mb-2 text-xl font-bold">{event.name}</h3>
					<p class="text-sm leading-relaxed opacity-90">{event.description}</p>
				</article>
			{/each}
		</div>
	</section>
{/if}

{#if gallery.length}
	<section class="mx-auto max-w-[120ch] px-5 pb-16">
		<h2 class="mb-6 text-3xl font-bold">Gallery</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each gallery as src, i (`${i}-${src}`)}
				<img
					{src}
					alt={data.community.title}
					loading="lazy"
					class="h-64 w-full album-photo rounded-lg object-cover"
				/>
			{/each}
		</div>
	</section>
{/if}
