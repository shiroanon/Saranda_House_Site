<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="image" href="/media/site/lush-forest-back.55f0a252.webp" />
</svelte:head>

<Navbar />

<main class="min-h-screen">
	{@render children()}
</main>

<Footer />
