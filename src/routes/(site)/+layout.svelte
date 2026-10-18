<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Navbar />

<main class="min-h-screen">
	{@render children()}
</main>

<Footer />
