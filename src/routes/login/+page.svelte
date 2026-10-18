<script lang="ts">
	import { enhance } from '$app/forms';
	import { assets } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Sign in — Saranda Admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-5 py-16">
	<div class="green-glass-container w-full max-w-md p-8">
		<div class="mb-6 flex items-center gap-3">
			<img src={assets.logo} alt="" width="44" height="44" class="rounded-full" />
			<div>
				<h1 class="text-xl font-bold">Saranda Admin</h1>
				<p class="text-sm opacity-70">Sign in to manage the site</p>
			</div>
		</div>

		{#if form?.error}
			<p class="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800">{form.error}</p>
		{/if}

		<form method="POST" use:enhance class="flex flex-col gap-4">
			<label class="block">
				<span class="mb-1 block text-sm font-semibold">Email</span>
				<input
					type="email"
					name="email"
					value={form?.email ?? ''}
					required
					autocomplete="username"
					class="w-full rounded-lg border border-primary/25 bg-neutral-light-lighter px-3 py-2 outline-none focus:border-secondary-darker"
				/>
			</label>
			<label class="block">
				<span class="mb-1 block text-sm font-semibold">Password</span>
				<input
					type="password"
					name="password"
					required
					autocomplete="current-password"
					class="w-full rounded-lg border border-primary/25 bg-neutral-light-lighter px-3 py-2 outline-none focus:border-secondary-darker"
				/>
			</label>
			<button
				type="submit"
				class="rounded-lg bg-secondary px-6 py-2.5 font-semibold text-primary-darker hover:bg-secondary-ligher"
				>Sign in</button
			>
		</form>

		<p class="mt-5 text-xs opacity-70">
			Accounts need the <code class="rounded bg-primary/10 px-1">admin</code> label in Appwrite →
			Auth → Users.
		</p>
	</div>
</div>
