<script lang="ts">
	import { goto } from '$app/navigation';
	import { setResource, type ResourceContext } from '$lib/contexts';
	import { RESOURCE } from '$lib/schemas';
	import { useResourceStorage } from '$lib';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { Button, Modal, Select } from 'uisv';
	import { safeParse } from 'valibot';

	const STORAGE_OPTION = {
		localfirst: 'Local First',
		localonly: 'Local Only',
		serverfirst: 'Server First',
		serveronly: 'Server Only',
	};

	let { children, params } = $props();

	const resource = $state<ResourceContext>({ editing: -1, loading: true, current: undefined });

	onMount(async () => {
		if (resource.current !== undefined) return (resource.loading = false);
		const data = await useResourceStorage().get(params.resourceid);
		const { success, output } = safeParse(RESOURCE, data);
		if (!success) return goto('/');
		resource.current = output;
		resource.loading = false;
	});

	watch(
		() => $state.snapshot(resource),
		({ current, loading }) => {
			if (current === undefined || loading) return;
			useResourceStorage().set(current.id, current);
		},
	);

	setResource(resource);
</script>

<svelte:head>
	<title>{resource.current ? resource.current.title + ' - ' : ''}Quizbe</title>
</svelte:head>

<nav
	class="sticky w-full top-0 flex gap-4 p-4 z-10 bg-surface-base/75 backdrop-blur border-b border-surface-accented"
>
	<Button
		variant="subtle"
		color="error"
		icon="i-ph:caret-left"
		label="Exit"
		href="/{resource.current?.id}"
	/>

	<span class="flex-1"></span>

	<Modal
		trigger={{ variant: 'outline', color: 'surface', icon: 'i-ph:gear', label: 'Settings' }}
		title="Settings"
	>
		{#if resource.current}
			<Select
				bind:value={
					() => {
						if (!resource.current) return '';
						return STORAGE_OPTION[resource.current.storage];
					},
					(newval) => {
						if (!resource.current) return;
						for (const [key, val] of Object.entries(STORAGE_OPTION)) {
							if (val !== newval) continue;
							resource.current.storage = key as keyof typeof STORAGE_OPTION;
						}
					}
				}
				items={Object.values(STORAGE_OPTION)}
				ui={{ content: 'z-9999' }}
			/>
		{/if}
	</Modal>
</nav>

{@render children()}
