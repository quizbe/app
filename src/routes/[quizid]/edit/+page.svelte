<script lang="ts">
	import { useQuizContext } from '$lib/context';
	import { BLANK_QUESTIONS, ICONS_OF_TYPES, LABEL_OF_TYPES, COLORS_OF_TYPES } from '$lib/schemas';
	import Editor from './editor.svelte';
	import NewDialog from './new-dialog.svelte';
	import List from './list.svelte';

	const quiz = useQuizContext();
	let new_question = $state(-1);
</script>

{#if quiz.current?.questions.length === 0}
	<div class="h-[calc(100vh-var(--spacing)*18)] flex flex-col gap-4 items-center justify-center">
		<div class="relative flex items-center justify-center h-2px bg-zinc-100 w-full max-w-7xl mb-12">
			<span class="absolute whitespace-nowrap bg-white px-4 font-medium">
				Create your first question
			</span>
		</div>

		{#each COLORS_OF_TYPES as color, idx (idx)}
			<div class="w-full max-w-7xl mx-auto">
				<h3 class="font-medium text-zinc-500 py-4">{color.label}</h3>
				<div class="grid lg:grid-cols-5 gap-4">
					{#each color.types as type, tidx (tidx)}
						{@const Icon = ICONS_OF_TYPES[type]}

						<button
							class="flex items-center gap-2 px-4 h-12 font-medium text-lg group cursor-pointer transition rounded-lg hover:(bg-zinc-100)"
							onclick={() => {
								if (!quiz.current) return;
								quiz.current.questions.push(BLANK_QUESTIONS[type]);
								quiz.editing = 0;
							}}
						>
							<Icon
								class={[color.class, 'size-8 p-1 rounded-md transition group-hover:(bg-zinc-100)']}
							/>
							{LABEL_OF_TYPES[type]}
						</button>
					{/each}
				</div>
			</div>
		{/each}

		<div></div>
	</div>
{:else if quiz.current}
	{@const questions = quiz.current.questions}

	<List bind:new_question {questions} />
{/if}

<Editor />

<NewDialog bind:question={new_question} />
