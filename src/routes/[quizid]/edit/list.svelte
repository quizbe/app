<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { useQuizContext } from '$lib/context';
	import type { Question } from '$lib/types';
	import Trash from '~icons/ph/trash';
	import Pen from '~icons/ph/pen';
	import Copy from '~icons/ph/copy';
	import Plus from '~icons/ph/plus';
	import Warning from '~icons/ph/warning';
	import Clock from '~icons/ph/clock';
	import Sparkle from '~icons/ph/sparkle';
	import SelectSingle from '$lib/components/select-single.svelte';
	import { LABEL_OF_TYPES, TIMELIMIT_KEYS_QUESTION, TIMELIMIT_QUESTION } from '$lib/schemas';

	type Props = {
		questions: Question[];
		new_question: number;
	};
	let { questions, new_question = $bindable() }: Props = $props();
	const quiz = useQuizContext();
</script>

<div
	class={[
		'p-4 max-h-[calc(100vh-var(--spacing)*18)]',
		quiz.editing < 0 ? 'overflow-y-auto' : 'overflow-hidden',
	]}
>
	{#each questions as question, idx (idx)}
		<div class="max-w-7xl mx-auto border border-zinc-200 p-4 rounded-xl flex flex-col gap-4">
			<div class="flex-1 flex gap-2">
				<Button
					size="sm"
					label="{idx + 1}. {LABEL_OF_TYPES[question.type]}"
					ui={{
						base: 'border-b bg-white cursor-default hover:(border-b) active:(border-b)',
					}}
				/>

				<SelectSingle
					size="sm"
					icon={Clock}
					bind:value={() => question.time.toFixed(), (v) => (question.time = parseFloat(v))}
					items={TIMELIMIT_KEYS_QUESTION.map((v) => ({
						label: TIMELIMIT_QUESTION[v],
						value: v.toString(),
					}))}
				/>

				<SelectSingle
					size="sm"
					icon={Sparkle}
					bind:value={() => question.points.toFixed(), (v) => (question.points = parseFloat(v))}
					items={Array.from({ length: 20 }).map((_, i) => ({
						label: `${i + 1} Point${i > 0 ? 's' : ''}`,
						value: (i + 1).toString(),
					}))}
				/>

				<span class="flex-1"></span>

				<Button icon={Pen} size="sm" label="Edit" onclick={() => (quiz.editing = idx)} />
				<Button icon={Copy} size="sm" onclick={() => questions.splice(idx + 1, 0, question)} />
				<Button
					icon={Trash}
					size="sm"
					ui={{ base: 'bg-red-50 border-red-200 text-red' }}
					onclick={() => questions.splice(idx, 1)}
				/>
			</div>

			{#if question.type === 'multiple'}
				<div class="flex gap-4">
					{#if !question.text || !question.media}
						<div class="flex-1 flex items-center justify-center gap-2 h-32">
							<Warning />
							No question provided
						</div>
					{/if}

					{#if question.answers.every((v) => !v.media || !v.text)}
						<div class="flex-1 flex items-center justify-center gap-2 h-32">
							<Warning />
							No answers provided
						</div>
					{/if}
				</div>
			{/if}
		</div>

		{#if idx + 1 < questions.length}
			<div
				class="py-2 max-w-7xl mx-auto flex items-center gap-4 opacity-0 transition hover:(opacity-100) focus-within:(opacity-100)"
			>
				<span class="flex-1 h-px bg-svelte-200"></span>
				<Button
					icon={Plus}
					size="xs"
					label="New question"
					ui={{ base: 'bg-svelte-50 border-svelte-200 text-svelte' }}
					onclick={() => (new_question = idx + 1)}
				/>
				<span class="flex-1 h-px bg-svelte-200"></span>
			</div>
		{/if}
	{/each}

	<div class="py-8 max-w-7xl mx-auto flex justify-center">
		<Button
			icon={Plus}
			label="New question"
			ui={{ base: 'bg-svelte-50 border-svelte-200 text-svelte' }}
			onclick={() => (new_question = questions.length)}
		/>
	</div>
</div>
