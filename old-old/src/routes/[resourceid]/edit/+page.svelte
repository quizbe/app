<script lang="ts">
	import { useResource } from '$lib/contexts';
	import { Button, Card, Icon } from 'uisv';
	import NoData from '$lib/assets/undraw-no-data.svg';
	import { type Glossary } from '$lib/schemas';
	import GlossaryEditor from './glossary-editor.svelte';

	const resource = useResource();
</script>

<div
	class="min-h-[calc(100vh-var(--spacing)*16-1px)] p-4 flex flex-col gap-4 items-center justify-center"
>
	{#if resource.loading}
		<Icon name="i-ph:spinner-ball" class="animate-spin size-10 text-primary" />

		<span class="text-primary font-semibold">LOADING . . .</span>
	{:else if resource.current}
		<div class="container grow-w-full flex flex-col gap-4">
			{#if resource.current.kind === 'glossary'}
				<GlossaryEditor bind:glossary={resource.current} />
			{/if}
		</div>
	{/if}
</div>
