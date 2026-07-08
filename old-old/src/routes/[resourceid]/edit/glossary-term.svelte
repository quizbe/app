<script lang="ts">
	import MediaSelector from '$lib/components/media-selector.svelte';
	import type { Glossary } from '$lib/schemas';
	import { TextareaAutosize } from 'runed';
	import { Modal } from 'uisv';

	type Props = {
		term: Glossary['terms'][number];
	};

	let { term = $bindable() }: Props = $props();
	let definition_textarea = $state<HTMLTextAreaElement>();
	let text_textarea = $state<HTMLTextAreaElement>();

	new TextareaAutosize({ element: () => definition_textarea, input: () => term.definition.text });
	new TextareaAutosize({ element: () => text_textarea, input: () => term.text });
</script>

<tr>
	<td class="">
		<div class="relative">
			<textarea
				bind:this={text_textarea}
				bind:value={term.text}
				placeholder="Enter term"
				class={[
					'w-full outline-none h-16 bg-surface-muted rounded p-4 resize-none',
					term.media ? '' : '',
				]}></textarea>

			<Modal></Modal>
		</div>
	</td>

	<td class="">
		<textarea
			bind:this={definition_textarea}
			bind:value={term.definition.text}
			placeholder="Enter definition"
			class="w-full outline-none h-16 bg-surface-muted rounded p-4 resize-none"></textarea>
	</td>
</tr>

<MediaSelector open={true} />
