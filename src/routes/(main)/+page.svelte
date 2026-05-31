<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Resource } from '$lib/schemas';
	import { createResource, getResources } from '$lib/utilities/resource';
	import { onMount } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { Icon } from 'uisv';

	const KINDS: { kind: Resource['kind']; text: string; icon: string; class: ClassValue }[] = [
		{
			kind: 'quiz',
			text: 'Interactive questions',
			icon: 'i-ph:list-checks',
			class: 'bg-green-600',
		},
		{
			kind: 'glossary',
			text: 'Terms and their definition',
			icon: 'i-ph:cards-three-fill',
			class: 'bg-red-600',
		},
	];
	const resources = $state<Resource[]>([]);

	onMount(async () => {
		for (const res of await getResources()) {
			if (resources.find((x) => x.id === res.id)) continue;
			resources.push(res);
		}
	});
</script>

<div
	class="min-h-[calc(100vh-var(--spacing)*16)] p-4 flex flex-col gap-4 items-center justify-center"
>
	{#if resources.length < 1}
		<h1 class="py-8 text-lg">Let's get started by creating a brand new resource!</h1>

		<div class="grid grid-cols-2 gap-8 container w-full">
			{#each KINDS as kind (kind.kind)}
				<button
					class="border border-transparent rounded-lg transition hover:border-surface-accented p-8"
					onclick={async () => goto(`/${await createResource(kind.kind)}/edit`)}
				>
					<div class={['size-16 grid place-items-center mx-auto rounded-lg', kind.class]}>
						<Icon name={kind.icon} class={['size-12 text-white']} />
					</div>

					<p class="capitalize pt-4 font-semibold">{kind.kind}</p>
					<p class="text-sm text-muted">{kind.text}</p>
				</button>
			{/each}
		</div>
	{/if}
</div>
