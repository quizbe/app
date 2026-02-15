<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import CaretLeft from '~icons/ph/caret-left';
	import Gear from '~icons/ph/gear';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { loadQuiz, saveQuiz } from '$lib/storage';
	import { goto } from '$app/navigation';
	import { Dialog } from 'bits-ui';
	import { useDialogVariant } from '$lib/variants';
	import { setQuizContext, type QuizContext } from '$lib/context';
	import { watch } from 'runed';
	import {
		BLANK_QUESTIONS,
		ICONS_OF_TYPES,
		LABEL_OF_TYPES,
		TIMELIMIT_KEYS_QUESTION,
		TIMELIMIT_QUESTION,
	} from '$lib/schemas';
	import SelectSingle from '$lib/components/select-single.svelte';
	import { type Question } from '$lib/types';
	import Icon from '$lib/components/icon.svelte';
	import Clock from '~icons/ph/clock';
	import Sparkle from '~icons/ph/sparkle';

	let settings = $state(false);
	const quiz = $state<QuizContext>({ current: null, loading: true, editing: -1 });
	const { children } = $props();

	onMount(async () => {
		if (quiz.current) return (quiz.loading = false);
		if (!page.params.quizid) return goto('/');
		const res = await loadQuiz(page.params.quizid);
		if (!res) return goto('/');
		quiz.current = res;
		quiz.loading = false;
	});

	watch(
		() => $state.snapshot(quiz),
		(value) => {
			if (value.loading || !value.current) return;
			saveQuiz(value.current);
		},
	);

	setQuizContext(quiz);
</script>

<div
	class="h-18 p-4 sticky top-0 bg-white border-b border-zinc-200 flex items-center gap-2 overflow-hidden"
>
	{#if quiz.editing < 0}
		<Icon class="h-8 text-svelte" />

		<div class="h-4 w-px bg-zinc-200 ml-2"></div>

		<button
			class="px-4 h-10 rounded-lg w-64 text-left transition cursor-pointer hover:(bg-zinc-100)"
			onclick={() => (settings = true)}
		>
			{quiz.current?.title || 'Untitled quiz'}
		</button>

		<span class="flex-1"></span>

		<Button icon={Gear} label="Settings" onclick={() => (settings = true)} />

		<a href="/{page.params.quizid}" class="flex items-center h-full">
			<Button
				icon={CaretLeft}
				label="Exit"
				ui={{ base: 'bg-red-50 border-red-200 text-red-500' }}
			/>
		</a>
	{:else}
		{@const question = quiz.current?.questions[quiz.editing]}

		{#if question}
			<Button icon={CaretLeft} onclick={() => (quiz.editing = -1)} />

			<SelectSingle
				bind:value={
					() => question.type,
					(v) => {
						if (!quiz.current || question.type === v) return;

						quiz.current.questions[quiz.editing] = {
							...BLANK_QUESTIONS[v as Question['type']],
							points: question.points,
							time: question.time,
						};
					}
				}
				items={Object.keys(LABEL_OF_TYPES).map((v) => ({
					label: LABEL_OF_TYPES[v as Question['type']],
					icon: ICONS_OF_TYPES[v as Question['type']],
					value: v,
				}))}
				icon={ICONS_OF_TYPES[question.type]}
			/>

			<span class="flex-1"></span>

			<SelectSingle
				icon={Clock}
				bind:value={() => question.time.toString(), (v) => (question.time = parseFloat(v))}
				items={TIMELIMIT_KEYS_QUESTION.map((v) => ({
					label: TIMELIMIT_QUESTION[v],
					value: v.toString(),
				}))}
			/>

			<SelectSingle
				icon={Sparkle}
				bind:value={() => question.points.toString(), (v) => (question.points = parseFloat(v))}
				items={Array.from({ length: 20 }).map((_, i) => ({
					label: `${i + 1} Point${i > 0 ? 's' : ''}`,
					value: (i + 1).toString(),
				}))}
			/>
		{/if}
	{/if}
</div>

<Dialog.Root bind:open={settings}>
	<Dialog.Portal>
		<Dialog.Overlay class={useDialogVariant().overlay({ size: 'md' })}>
			<Dialog.Content class={useDialogVariant().content({ size: 'md' })}>what</Dialog.Content>
		</Dialog.Overlay>
	</Dialog.Portal>
</Dialog.Root>

{@render children()}
