<script lang="ts">
	import { page } from '$app/state';
	import { resources } from '#lib/admin/resources.ts';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const links = $derived([
		{ href: '/admin', label: 'Dashboard' },
		...resources.map((r) => ({ href: `/admin/${r.id}`, label: r.title })),
		{ href: '/admin/media', label: 'Media' }
	]);

	const isActive = (href: string) =>
		href === '/admin' ? page.url.pathname === '/admin' : page.url.pathname.startsWith(href);
</script>

<div class="min-h-screen">
	<header class="sticky top-0 z-40 bg-primary text-neutral-light">
		<div class="mx-auto flex max-w-[120ch] items-center justify-between gap-4 px-5 py-3">
			<a href="/admin" class="font-bold tracking-wide">Saranda Admin</a>
			<div class="flex items-center gap-4 text-sm">
				<a href="/" target="_blank" rel="noreferrer" class="hover:underline">View site ↗</a>
				<span class="hidden opacity-70 sm:inline">{data.user?.email}</span>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="rounded-lg border border-neutral-light/30 px-3 py-1.5 hover:bg-neutral-light/10"
						>Sign out</button
					>
				</form>
			</div>
		</div>
		<nav class="mx-auto flex max-w-[120ch] gap-1 overflow-x-auto px-5 pb-2 text-sm">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="whitespace-nowrap rounded-lg px-3 py-1.5 {isActive(link.href)
						? 'bg-secondary font-semibold text-primary-darker'
						: 'hover:bg-neutral-light/10'}">{link.label}</a
				>
			{/each}
		</nav>
	</header>

	<main class="mx-auto max-w-[120ch] px-5 py-8">
		{@render children()}
	</main>
</div>
