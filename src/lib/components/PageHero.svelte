<script lang="ts">
	import { assets } from '#lib/data/site.ts';
	import { intro } from '#lib/motion.ts';
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle = '',
		kicker = '',
		image = assets.mist1,
		children
	}: {
		title: string;
		subtitle?: string;
		/** Small mono label above the title — what kind of page this is. */
		kicker?: string;
		image?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="page-hero" use:intro>
	<img src={image} alt="" class="hero-art" />
	<div class="hero-scrim"></div>

	<div class="shell pt-16 pb-14 md:pt-20 md:pb-16">
		{#if kicker}
			<p class="eyebrow text-gold" data-intro="soft">{kicker}</p>
		{/if}

		<h1
			class="display-face mt-4 text-headline leading-[1.02] font-semibold text-parchment"
		>
			<span class="block overflow-hidden pb-[0.1em]">
				<span class="block" data-intro="rise">{title}</span>
			</span>
		</h1>

		<div class="mt-6 flex items-center gap-3 text-gold">
			<span class="rule-line" data-intro-rule></span>
			<span class="rule-dot"></span>
		</div>

		{#if subtitle}
			<p class="mt-5 max-w-[46ch] text-lg text-parchment/85" data-intro="soft">{subtitle}</p>
		{/if}

		{#if children}
			<div class="mt-7" data-intro="soft">{@render children()}</div>
		{/if}
	</div>
</section>
