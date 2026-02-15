<script lang="ts">
	import type { Question } from '$lib/types';
	import Plus from '~icons/ph/plus';
	import Button from '$lib/components/button.svelte';
	import { TextareaAutosize } from 'runed';

	type Props = {
		question: Extract<Question, { type: 'multiple' }>;
	};

	let { question = $bindable() }: Props = $props();
	let textarea = $state<HTMLTextAreaElement>();

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
			class="flex-1 grid place-items-center"
			onclick={(e) => {
				if (e.currentTarget?.tagName === textarea?.tagName) return;

				textarea?.focus();
			}}
		>
			<textarea
				bind:this={textarea}
				bind:value={question.text}
				class="text-center w-full appearance-none outline-none"
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
