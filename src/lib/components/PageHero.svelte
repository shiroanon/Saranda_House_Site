<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle = '',
		image = '/media/site/mist_forest1.25b52791.webp',
		children
	}: {
		title: string;
		subtitle?: string;
		image?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="relative isolate overflow-hidden">
	<img src={image} alt="" class="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
	<div class="absolute inset-0 -z-10 bg-neutral-light/40"></div>
	<div class="mx-auto max-w-[120ch] px-5 py-16 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-primary drop-shadow-sm md:text-5xl">
			{title}
		</h1>
		{#if subtitle}
			<p class="mx-auto mt-3 max-w-[70ch] text-lg text-primary-darker/90">{subtitle}</p>
		{/if}
		{#if children}
			<div class="mt-5">{@render children()}</div>
		{/if}
	</div>
</section>
