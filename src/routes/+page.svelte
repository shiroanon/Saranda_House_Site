<script lang="ts">
	import { assets, siteName, siteTagline } from '#lib/data/site.ts';
	import { communities } from '#lib/data/communities.ts';

	const about =
		'Saranda, The House of Excellence and Innovation, is one of the 12 student houses in the IIT Madras BS degree program. We cultivate a vibrant community by organizing regular meetups, hands-on workshops, tech showcases, eSports tournaments, and cultural festivals. Saranda brings together passionate learners to connect, innovate, and grow beyond boundaries.';

	const cards = Object.values(communities);
</script>

<svelte:head>
	<title>{siteName} — {siteTagline}</title>
	<meta name="description" content={about} />
</svelte:head>

<!-- Hero -->
<section class="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden">
	<img src={assets.forestBack} alt="" class="absolute inset-0 -z-20 h-full w-full object-cover" />
	<img
		src={assets.forestFront}
		alt=""
		class="absolute inset-x-0 bottom-0 -z-10 w-full object-cover opacity-90"
	/>
	<div class="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-dark/30 to-transparent"></div>
	<div class="animate-heroslideup px-5 py-24 text-center">
		<h1 class="text-6xl font-bold tracking-tight text-neutral-light drop-shadow-lg md:text-8xl">
			{siteName}
		</h1>
		<p
			class="mt-4 text-lg font-medium tracking-widest text-secondary uppercase drop-shadow md:text-xl"
		>
			{siteTagline}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a
				href="/know_us"
				class="rounded-lg bg-secondary px-6 py-2.5 font-semibold text-primary-darker hover:bg-secondary-ligher"
				>Know Us</a
			>
			<a
				href="/events"
				class="rounded-lg border border-neutral-light/70 bg-neutral-dark/40 px-6 py-2.5 font-semibold text-neutral-light backdrop-blur hover:bg-neutral-dark/60"
				>Explore Events</a
			>
		</div>
	</div>
</section>

<!-- About -->
<section class="mx-auto max-w-[120ch] px-5 py-16">
	<div class="green-glass-container p-8 md:p-12">
		<h2 class="text-3xl font-bold">About Us</h2>
		<p class="mt-4 text-lg leading-relaxed">{about}</p>
		<p class="mt-4 text-lg leading-relaxed">
			Check out our <a href="/meetups" class="font-semibold underline decoration-secondary"
				>meetups</a
			>
			and <a href="/newsletter" class="font-semibold underline decoration-secondary">newsletter</a>.
		</p>
	</div>
</section>

<!-- Communities -->
<section id="communities_section_id" class="mx-auto max-w-[120ch] px-5 pb-8">
	<h2 class="mb-6 text-center text-3xl font-bold">Our Communities</h2>
	<div class="grid gap-6 md:grid-cols-3">
		{#each cards as c (c.slug)}
			<article class="flex flex-col green-glass-container p-6">
				{#if c.images.length}
					<img
						src={c.images[0]}
						alt={c.title}
						loading="lazy"
						class="mb-4 h-44 w-full rounded-lg object-cover"
					/>
				{/if}
				<h3 class="text-xl font-bold">{c.title}</h3>
				<p class="mt-2 grow text-sm leading-relaxed opacity-90">{c.intro}</p>
				<a
					href={`/community/${c.slug}`}
					class="mt-4 font-semibold text-secondary-darker hover:underline">Explore Community →</a
				>
			</article>
		{/each}
	</div>
</section>
