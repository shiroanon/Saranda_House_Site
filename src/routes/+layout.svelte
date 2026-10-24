<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	/*
	 * Where each page sits in the top bar. A move to a later tab slides the old page out
	 * to the left and brings the new one in from the right; a move back up the bar slides
	 * the other way. Routes outside the bar (login, admin) fall back to a forward slide.
	 */
	const ROUTE_ORDER = [
		'/',
		'/know_us',
		'/events',
		'/meetups',
		'/newsletter',
		'/community/tech',
		'/community/esports',
		'/community/culturals',
		'/links'
	];

	function routeRank(pathname: string): number | null {
		const path = pathname.replace(/\/+$/, '') || '/';

		// City albums live under the Meet Ups tab.
		if (path === '/meetups' || path.startsWith('/meetups/')) return 3;

		// Community children keep the dropdown's order.
		if (path.startsWith('/community/')) {
			const slug = path.split('/')[2];
			const index = ['tech', 'esports', 'culturals'].indexOf(slug);
			return index === -1 ? 5 : 5 + index;
		}

		const index = ROUTE_ORDER.indexOf(path);
		return index === -1 ? null : index;
	}

	/*
	 * Route changes slide like a strip of panels rather than swapping in place. The bar is
	 * lifted out as a fixed tab strip; the old panel travels off-screen and the next one
	 * follows it in. Both panels share one duration and easing, so their edges stay
	 * stitched and no background flashes through the seam. The page reads as one surface
	 * with a changing panel — a single-page tab switch rather than two documents.
	 *
	 * The transition is skipped entirely when the visitor asks for less motion or the
	 * browser has no View Transitions API; navigation then behaves exactly as before.
	 */
	let transitionId = 0;

	onNavigate((navigation) => {
		if (typeof document === 'undefined' || !document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const from = navigation.from?.url;
		const to = navigation.to?.url;

		// Navigating to the same URL is not a panel change.
		if (!to || (from && from.href === to.href)) return;

		const root = document.documentElement;
		const fromRank = routeRank(from?.pathname ?? '');
		const toRank = routeRank(to.pathname);
		root.dataset.navDirection =
			fromRank !== null && toRank !== null && toRank < fromRank ? 'back' : 'forward';
		// Lets the bar settle its tab indicator instantly, so the captured header is not
		// frozen mid-wipe.
		root.dataset.viewTransition = '';

		const id = ++transitionId;

		return new Promise<void>((resolve) => {
			const transition = document.startViewTransition(async () => {
				// Let SvelteKit commit the route…
				resolve();
				// …and wait for its data, DOM update and scroll reset before the new frame
				// is captured, so the incoming page is never caught half-drawn.
				await navigation.complete;
			});

			transition.finished.finally(() => {
				if (id !== transitionId) return;
				delete root.dataset.viewTransition;
				delete root.dataset.navDirection;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="image" href="/media/site/lush-forest-back.55f0a252.webp" />
</svelte:head>

{@render children()}
