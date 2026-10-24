<script lang="ts">
	import { page } from '$app/state';
	import { nav, assets, siteName } from '#lib/data/site.ts';
	import { scrollProgress } from '#lib/motion.ts';

	let mobileOpen = $state(false);
	let openDropdown = $state<string | null>(null);
	let lifted = $state(false);

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	$effect(() => {
		const onScroll = () => (lifted = window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header class="site-head" class:lifted>
	<nav class="shell flex items-center justify-between gap-6 py-3.5">
		<!-- The crest alone is the wordmark: it already carries the name in its ring. -->
		<a href="/" class="group flex items-center" onclick={() => (mobileOpen = false)}>
			<img
				src={assets.logo}
				alt={siteName}
				width="64"
				height="64"
				class="h-12 w-12 crest-badge ring-1 ring-bark/35 crest sm:h-14 sm:w-14 md:h-16 md:w-16"
			/>
		</a>

		<!-- Desktop -->
		<ul class="hidden items-center gap-1 md:flex">
			{#each nav as item (item.href)}
				<li class="relative">
					{#if item.children}
						<button
							type="button"
							class="nav-link"
							class:active={isActive(item.href)}
							aria-expanded={openDropdown === item.text}
							onclick={() => (openDropdown = openDropdown === item.text ? null : item.text)}
						>
							{item.text}
							<span aria-hidden="true" class="text-[0.7em] opacity-70">▼</span>
						</button>
						{#if openDropdown === item.text}
							<ul class="nav-menu">
								{#each item.children as child (child.href)}
									<li>
										<a href={child.href} onclick={() => (openDropdown = null)}>
											{child.text}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					{:else}
						<a
							href={item.href}
							class="nav-link"
							class:active={isActive(item.href)}
							aria-current={isActive(item.href) ? 'page' : undefined}
						>
							{item.text}
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		<button
			type="button"
			class="rounded-lg p-2 text-primary md:hidden"
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				{#if mobileOpen}
					<path
						d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
					/>
				{:else}
					<path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile -->
	{#if mobileOpen}
		<ul class="border-t border-bark/25 bg-paper/95 px-5 pb-4 backdrop-blur md:hidden">
			{#each nav as item (item.href)}
				<li>
					<a
						href={item.href}
						class="block py-2.5 font-medium"
						class:text-bronze={isActive(item.href)}
						onclick={() => (mobileOpen = false)}>{item.text}</a
					>
				</li>
				{#if item.children}
					{#each item.children as child (child.href)}
						<li>
							<a
								href={child.href}
								class="block py-1.5 pl-4 text-sm text-moss"
								onclick={() => (mobileOpen = false)}>{child.text}</a
							>
						</li>
					{/each}
				{/if}
			{/each}
		</ul>
	{/if}

	<!-- Reading progress: the banner rule again, this time doing a job. -->
	<span class="progress-rail" use:scrollProgress aria-hidden="true"></span>
</header>
