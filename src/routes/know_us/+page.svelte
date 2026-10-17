<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { upperCouncil, lowerCouncil, teams } from '#lib/data/people.ts';
	import { assets } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Know Us — Saranda</title>
	<meta
		name="description"
		content="Meet the Saranda House council, regional coordinators and teams."
	/>
</svelte:head>

<PageHero
	title="Know Us"
	subtitle="The people who run Saranda — the House Council, Regional Coordinators and our teams."
	image={assets.bg3}
/>

<section class="mx-auto max-w-[120ch] px-5 py-12">
	<h2 class="mb-6 text-3xl font-bold">Upper House Council</h2>
	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each upperCouncil as p (p.name)}
			<article class="overflow-hidden green-glass-container text-center">
				<img src={p.photo} alt={p.name} loading="lazy" class="h-72 w-full object-cover" />
				<div class="p-4">
					<h3 class="text-xl font-bold">{p.name}</h3>
					<p class="opacity-80">{p.role}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-[120ch] px-5 pb-12">
	<h2 class="mb-6 text-3xl font-bold">Lower House Council</h2>
	<p class="mb-6 opacity-80">Regional Coordinators representing every region Saranda covers.</p>
	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
		{#each lowerCouncil as p (p.name + p.role)}
			<article class="overflow-hidden green-glass-container text-center">
				<img src={p.photo} alt={p.name} loading="lazy" class="h-56 w-full object-cover" />
				<div class="p-4">
					<h3 class="font-bold">{p.name}</h3>
					<p class="text-sm opacity-80">{p.role}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-[120ch] px-5 pb-16">
	<h2 class="mb-6 text-3xl font-bold">Our Teams</h2>
	<div class="flex flex-col gap-10">
		{#each teams as team (team.title)}
			<div>
				<h3 class="mb-4 text-xl font-semibold text-secondary-darker">{team.title}</h3>
				<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each team.members as p (team.title + p.name + p.role)}
						<article class="overflow-hidden green-glass-container text-center">
							<img src={p.photo} alt={p.name} loading="lazy" class="h-52 w-full object-cover" />
							<div class="p-4">
								<h4 class="font-bold">{p.name}</h4>
								<p class="text-sm opacity-80">{p.role}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
