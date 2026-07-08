<script lang="ts">
	import { Kbd, Modal, Tabs } from 'uisv';
	import { useMediaStorage } from '$lib';
	import { onMount } from 'svelte';

	type Props = {
		open?: boolean;
		onselected?: (src: string) => unknown;
		ondeselected?: () => unknown;
	};

	let { open = $bindable(), ondeselected = () => {}, onselected = () => {} }: Props = $props();
	const storage = useMediaStorage();
	const medias = $state<{ id: string; src: string }[]>([]);
	let loading = $state(true);
	let tab = $state(0);

	onMount(async () => {
		for (const id of await storage.keys()) {
			const src = await storage.get(id);
			if (src === null) continue;
			medias.push({ id, src });
		}

		loading = false;
	});
</script>

<Modal bind:open title="Media Selector">
	{#snippet description()}
		<!-- <span class="mt-1 text-label-muted text-sm">
			Use
			<Kbd value="ctrl" color="surface" size="sm" />
			+
			<Kbd value="V" color="surface" size="sm" />
			to paste from your clipboard
		</span> -->
	{/snippet}

	<!-- <Tabs
		bind:value={tab}
		color="surface"
		variant="link"
		items={[
			{ label: 'Images', icon: 'i-ph:image' },
			{ label: 'Upload', icon: 'i-ph:upload' },
		]}
		ui={{ root: '-mx-6 -mt-4 mb-4', list: 'px-6' }}
	/> -->

	{#if tab === 0}
		{#each medias as media (media.id)}
			{media}
		{/each}

		{#if !medias.length}
			<div class="h-32 flex flex-col justify-center items-center gap-2">
				<span class="text-label-muted">No images uploaded.</span>
			</div>
		{/if}
	{:else}
		<div></div>
	{/if}
</Modal>
