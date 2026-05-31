<script lang="ts">
	import type { Question } from '$lib/types';
	import Plus from '~icons/ph/plus';
	import Image from '~icons/ph/image';
	import FilmStrip from '~icons/ph/film-strip';
	import Speaker from '~icons/ph/speaker-high';
	import Paperclip from '~icons/ph/paperclip';
	import Button from '$lib/components/button.svelte';
	import { TextareaAutosize } from 'runed';
	import { Dialog } from 'bits-ui';
	import { useDialogVariant } from '$lib/variants';

	type Props = {
		question: Extract<Question, { type: 'multiple' }>;
	};

	let { question = $bindable() }: Props = $props();
	let textarea = $state<HTMLTextAreaElement>();
	let insert_media = $state(true);

	new TextareaAutosize({
		element: () => textarea,
		input: () => question.text,
	});
</script>

<div class="h-full flex flex-col gap-4">
	<div class="flex-1 flex gap-4">
		{#if question.media}
			<div></div>
		{/if}

		<div
			role="none"
			tabindex="-1"
			class="flex-1 grid place-items-center cursor-text transition focus-within:bg-neutral-100 hover:bg-neutral-100 rounded-lg relative"
			onclick={(e) => {
				if (e.currentTarget?.tagName === textarea?.tagName) return;

				textarea?.focus();
			}}
		>
			<Button
				size="sm"
				icon={Paperclip}
				ui={{ base: 'absolute left-2 top-2' }}
				onclick={() => (insert_media = true)}
			/>

			<textarea
				bind:this={textarea}
				bind:value={question.text}
				class="text-center w-full appearance-none outline-none resize-none"
				placeholder="Enter question here"
			></textarea>
		</div>
	</div>

	<div class="flex gap-2 items-center">
		{#each question.answers as answer, idx (idx)}
			<div class={['flex-1 h-60']}>
				{JSON.stringify(answer)}
			</div>
		{/each}

		{#if question.answers.length < 5}
			<Button
				icon={Plus}
				onclick={() =>
					question.answers.push({
						correct: false,
						media: '',
						text: '',
					})}
			/>
		{/if}
	</div>
</div>

<Dialog.Root bind:open={insert_media}>
	<Dialog.Portal>
		<Dialog.Overlay class={useDialogVariant().overlay({ size: 'md' })}>
			<Dialog.Content class={useDialogVariant().content({ size: 'md' })}>
				<h1 class="font-medium text-lg">Insert media</h1>

				<button>Drag and drop or browse files</button>
			</Dialog.Content>
		</Dialog.Overlay>
	</Dialog.Portal>
</Dialog.Root>
