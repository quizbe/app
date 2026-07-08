<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Resource } from '$lib/schemas';
	import { createResource, getResources } from '$lib/utilities/resource';
	import { onMount } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { Icon, Button, Modal } from 'uisv';
	import dayjs from 'dayjs';
	import relative_time from 'dayjs/plugin/relativeTime';

	dayjs.extend(relative_time);

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
	let loading = $state(true);

	onMount(async () => {
		for (const res of await getResources()) {
			if (resources.find((x) => x.id === res.id)) continue;
			resources.push(res);
		}

		loading = false;
	});
</script>

<div
	class="min-h-[calc(100vh-var(--spacing)*16)] p-4 flex flex-col gap-4 items-center justify-center"
>
	{#if loading}
		<Icon name="i-ph:spinner-ball" class="animate-spin size-10 text-primary" />

		<span class="text-primary font-semibold">LOADING . . .</span>
	{:else if resources.length}
		<div class="grow w-full container space-y-4">
			<header class="flex gap-4 justify-between">
				<h1 class="text-2xl font-semibold">Resources</h1>

				<Modal trigger={{ label: 'Create', icon: 'i-ph:plus' }}>What</Modal>
			</header>

			<div class="grid md:grid-cols-2 xl:grid-cols-3">
				{#each resources as resource, idx (idx)}
					<a
						class="p-4 border rounded-md border-surface-accented hover:bg-surface-muted transition flex items-center gap-4"
						href="/{resource.id}"
					>
						<img
							class="size-12 rounded border border-surface-accented"
							src="https://api.dicebear.com/10.x/shapes/svg?seed={resource.id}"
							alt={resource.id}
						/>

						<div class="grow grid grid-rows-2">
							<span class="font-semibold flex items-center">
								{resource.title}
							</span>

							<span class="flex items-center text-sm text-label-muted">
								{resource.kind === 'glossary'
									? `${resource.terms.length} terms`
									: `${resource.questions.length} questions`}

								• {resource.updated === resource.created ? 'Created' : 'Updated'}
								{dayjs(resource.updated).fromNow()}
							</span>
						</div>

						<span class="flex gap-2">
							<Button
								color="surface"
								variant="outline"
								label="Edit"
								onclick={(e) => {
									e.preventDefault();
									goto(`/${resource.id}/edit`);
								}}
							/>

							<Button
								color="surface"
								variant="outline"
								icon="i-ph:dots-three"
								onclick={(e) => {
									e.preventDefault();
								}}
							/>
						</span>
					</a>
				{/each}
			</div>
		</div>
	{:else}
		{@render no_resources()}
	{/if}
</div>

{#snippet no_resources()}
	<h1 class="py-8 text-lg">Let's get started by creating a brand new resource!</h1>

	<div class="grid grid-cols-2 gap-8 container w-full">
		{#each KINDS as kind (kind.kind)}
			<Button
				class="border border-transparent rounded-lg transition hover:border-surface-accented p-8"
				onclick={async () => goto(`/${await createResource(kind.kind)}/edit`)}
			>
				<div class={['size-16 grid place-items-center mx-auto rounded-lg', kind.class]}>
					<Icon name={kind.icon} class={['size-12 text-white']} />
				</div>

				<p class="capitalize pt-4 font-semibold">{kind.kind}</p>
				<p class="text-sm text-muted">{kind.text}</p>
			</Button>
		{/each}
	</div>
{/snippet}
