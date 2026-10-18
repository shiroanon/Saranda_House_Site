<script lang="ts">
	import type { Field } from '#lib/admin/resources.ts';

	let { field, value }: { field: Field; value: unknown } = $props();

	const str = (v: unknown) => (v == null ? '' : String(v));
	const list = $derived(Array.isArray(value) ? (value as string[]) : []);

	const input =
		'w-full rounded-lg border border-primary/25 bg-neutral-light-lighter px-3 py-2 text-sm outline-none focus:border-secondary-darker';
</script>

<label class="block {field.full ? 'sm:col-span-2' : ''}">
	<span class="mb-1 block text-sm font-semibold">
		{field.label}{#if field.required}<span class="text-red-600"> *</span>{/if}
	</span>

	{#if field.type === 'textarea'}
		<textarea name={field.key} rows="5" class={input}>{str(value)}</textarea>
	{:else if field.type === 'select'}
		<select name={field.key} class={input} required={field.required}>
			<option value="">— choose —</option>
			{#each field.options ?? [] as option (option.value)}
				<option value={option.value} selected={str(value) === option.value}>{option.label}</option>
			{/each}
		</select>
	{:else if field.type === 'boolean'}
		<input type="checkbox" name={field.key} checked={value === true} class="size-5" />
	{:else if field.type === 'image'}
		<div class="flex items-center gap-3">
			{#if value}
				<img src={str(value)} alt="" class="h-16 w-16 shrink-0 rounded-lg object-cover" />
			{/if}
			<input type="file" name={`${field.key}_file`} accept="image/*" class="text-xs" />
		</div>
		<input
			type="text"
			name={field.key}
			value={str(value)}
			placeholder="/media/… or https://…"
			class="{input} mt-2"
		/>
	{:else if field.type === 'images'}
		<div class="flex flex-wrap gap-2">
			{#each list as src, i (`${i}-${src}`)}
				<img src={src} alt="" class="h-14 w-14 rounded object-cover" />
			{/each}
		</div>
		<input type="file" name={`${field.key}_file`} accept="image/*" multiple class="mt-2 text-xs" />
		<textarea name={field.key} rows="4" class="{input} mt-2">{list.join('\n')}</textarea>
	{:else}
		<input
			type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
			name={field.key}
			value={field.type === 'date' ? str(value).slice(0, 10) : str(value)}
			required={field.required}
			class={input}
		/>
	{/if}

	{#if field.help}
		<span class="mt-1 block text-xs opacity-70">{field.help}</span>
	{/if}
</label>
