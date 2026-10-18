<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets, socials } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/**
	 * The rows in Appwrite carry no category, so infer one from the title. Titles are
	 * descriptive enough that a small keyword match beats showing fourteen links as "Other".
	 */
	const categoryOf = (title: string) => {
		if (/grading/i.test(title)) return 'Grading';
		if (/handbook/i.test(title)) return 'Handbooks';
		if (/guideline|reference|interaction/i.test(title)) return 'Guidelines & Reference';
		return 'Other';
	};

	/** Every reference, grouped by category, in the order the categories first appear. */
	const groups = $derived.by(() => {
		const byCategory = new Map<string, typeof data.links>();
		for (const link of data.links) {
			const key = link.category || categoryOf(link.title);
			if (!byCategory.has(key)) byCategory.set(key, []);
			byCategory.get(key)!.push(link);
		}
		return [...byCategory.entries()];
	});

	const host = (url: string) => {
		try {
			return new URL(url).hostname.replace(/^www\./, '');
		} catch {
			return '';
		}
	};
</script>

<svelte:head>
	<title>Links — Saranda</title>
	<meta name="description" content="Useful links and resources for IITM BS students." />
</svelte:head>

<PageHero
	title="Links"
	kicker="Useful links"
	subtitle="{data.links.length} references we keep coming back to — handbook, guidelines, and regional help."
	image={assets.woodPlank}
/>

{#each groups as [category, links] (category)}
	<section class="shell pt-12 pb-6 first:pt-14 md:first:pt-16" use:reveal>
		<SectionHead label={category} count={`${links.length}`} />

		<ul>
			{#each links as link (link.$id)}
				<li data-reveal>
					<a
						class="link-row group"
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span
							class="display-face text-[1.35rem] leading-tight font-semibold underline-offset-[5px] group-hover:underline"
						>
							{link.title}
						</span>

						{#if host(link.url)}
							<span class="role grow">{host(link.url)}</span>
						{/if}

						<span class="text-link shrink-0">
							Open <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1"
								>→</span
							>
							<span class="sr-only">(opens in a new tab)</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<!-- ──────────────────────────────────────────────────────────────────  social -->
<section class="band mt-10 py-14" use:reveal>
	<div class="shell">
		<SectionHead label="Stay connected" />
		<ul class="mt-6 flex flex-wrap gap-3">
			{#each socials as s (s.href)}
				<li data-reveal>
					<a class="region-chip" href={s.href} target="_blank" rel="noopener noreferrer">
						{s.text}
						<span aria-hidden="true">↗</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<div class="pb-16"></div>