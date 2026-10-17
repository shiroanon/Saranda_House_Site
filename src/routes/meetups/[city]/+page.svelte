<script lang="ts">
	import { assets } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const formatDate = (iso: string | null) =>
		iso
			? new Date(iso).toLocaleDateString('en-IN', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			: null;
</script>

<svelte:head>
	<title>{data.region.city} meetups — Saranda</title>
	<meta name="description" content={`Past Saranda meetups in the ${data.region.city} region.`} />
</svelte:head>

<section class="relative isolate overflow-hidden">
	<img
		src={data.image ?? assets.mist1}
		alt=""
		class="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
	/>
	<div class="absolute inset-0 -z-10 bg-neutral-light/50"></div>
	<div class="mx-auto max-w-[120ch] px-5 py-14 text-center">
		<h1 class="text-4xl font-bold capitalize md:text-5xl">{data.region.city} region</h1>
		<a
			href="/meetups"
			class="mt-5 inline-block rounded-lg border border-primary/20 bg-neutral-light px-4 py-2 text-sm font-semibold hover:bg-secondary/60"
			>‹ Back to all regions</a
		>
	</div>
</section>

<section class="mx-auto flex max-w-[120ch] flex-col gap-10 px-5 py-12">
	{#each data.region.events as event, i (`${event.name}-${event.date ?? ''}-${i}`)}
		<article class="green-glass-container p-6 pb-8">
			<div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
				<h2 class="text-2xl font-bold capitalize">{event.name}</h2>
				{#if formatDate(event.date)}
					<time datetime={event.date ?? ''} class="font-semibold text-secondary-darker"
						>{formatDate(event.date)}</time
					>
				{/if}
			</div>
			{#if event.description}
				<p class="mb-4 leading-6 opacity-90">{event.description}</p>
			{/if}
			{#if event.images.length}
				<div class="columns-2 gap-2 md:columns-3 lg:columns-4 [&>img]:mb-2">
					{#each event.images as src, i (`${i}-${src}`)}
						<img
							{src}
							alt={`${event.name} photo`}
							loading="lazy"
							class="w-full album-photo rounded-md"
						/>
					{/each}
				</div>
			{/if}
		</article>
	{/each}
</section>
