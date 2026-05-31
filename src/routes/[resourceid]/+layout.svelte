<script lang="ts">
	import { goto } from '$app/navigation';
	import { setResource, type ResourceContext } from '$lib/contexts';
	import { RESOURCE } from '$lib/schemas';
	import { useResourceStorage } from '$lib/utilities/resource';
	import { onMount } from 'svelte';
	import { Button } from 'uisv';
	import { safeParse } from 'valibot';

	let { children, params } = $props();

	const resource = $state<ResourceContext>({ editing: -1, loading: true, current: undefined });

	onMount(async () => {
		if (resource.current) return (resource.loading = false);
		const data = await useResourceStorage().get(params.resourceid);
		const { success, output } = safeParse(RESOURCE, data);
		if (!success) return goto('/');
		resource.current = output;
		resource.loading = false;
	});

	setResource(resource);
</script>

<svelte:head>
	<title>{resource.current ? resource.current.title + ' - ' : ''}Quizbe</title>
</svelte:head>

<nav
	class="sticky w-full top-0 flex gap-2 p-2 z-10 bg-white/75 backdrop-blur border-b border-surface-accented"
>
	{#if resource.current}
		{#if resource.editing < 0}
			<Button
				variant="subtle"
				color="error"
				icon="i-ph:caret-left"
				label="Exit"
				href="/{resource.current.id}"
			/>

			<span class="flex-1"></span>

			<Button variant="outline" color="surface" icon="i-ph:gear" label="Settings" />
		{/if}
	{/if}
</nav>

{@render children()}
