<script lang="ts">
	import { createQuiz, deleteQuiz, loadQuizzes, saveQuiz } from '$lib/storage';
	import type { Quiz } from '$lib/types';
	import { onMount } from 'svelte';
	import SealQuestion from '~icons/ph/seal-question';
	import FilePlus from '~icons/ph/file-plus';
	import Pen from '~icons/ph/pen';
	import Rocket from '~icons/ph/rocket';
	import DotSixVertical from '~icons/ph/dots-six-vertical';
	import Trash from '~icons/ph/trash';
	import Copy from '~icons/ph/copy';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Dropdown from '$lib/components/dropdown.svelte';
	import Button from '$lib/components/button.svelte';
	import { nanoid } from 'nanoid';
	import { watch } from 'runed';
	import dayjs from 'dayjs';
	import relative from 'dayjs/plugin/relativeTime';

	dayjs.extend(relative);

	const quizzes = $state<Quiz[]>([]);
	let loading = $state(true);

	onMount(async () => {
		for (const quiz of await loadQuizzes()) {
			if (quizzes.find((v) => v.id === quiz.id)) continue;
			quizzes.push(quiz);
		}

		loading = false;
	});

	watch(
		() => $state.snapshot(quizzes),
		(current, previous) => {
			if (loading) return;
			for (const quiz of current) saveQuiz(quiz);

			if (!previous) return;
			for (const quiz of previous) {
				if (current.find((v) => v.id === quiz.id)) continue;
				deleteQuiz(quiz.id);
			}
		},
	);
</script>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*18)] flex flex-col gap-4">
	{#if loading}
		{@render header()}

		<div class="mx-auto max-w-7xl grid gap-4 w-full">
			{#each { length: 10 }, idx (idx)}
				<div class="flex p-4 items-center gap-2 border border-zinc-200 rounded-2xl">
					<span class="grid gap-4">
						<div class="h-4 w-32 bg-zinc-500 animate-pulse rounded"></div>
						<div class="h-4 w-64 bg-zinc-200 animate-pulse rounded"></div>
					</span>

					<span class="flex-1"></span>

					<span class="h-10 w-20 bg-zinc-200 animate-pulse rounded-md"></span>
					<span class="h-10 w-20 bg-zinc-200 animate-pulse rounded-md"></span>
					<span class="size-10 bg-zinc-200 animate-pulse rounded-md"></span>
				</div>
			{/each}
		</div>
	{:else if quizzes.length < 1}
		<div class="flex-1 grid place-items-center">
			<div
				class="flex flex-col items-center justify-center gap-4 bg-white w-full max-w-7xl h-xl rounded-2xl border border-zinc-100"
			>
				<span class="p-2 rounded-md bg-svelte-50 text-svelte">
					<SealQuestion class="size-6" />
				</span>

				<h1 class="font-medium text-xl">No quizzes yet</h1>
				<p>Start the learning process by creating a brand new quiz.</p>

				<div class="h-4"></div>

				<Button
					size="lg"
					ui={{ base: 'bg-svelte-50 text-svelte border-svelte-100' }}
					onclick={createQuiz}
					icon={FilePlus}
					label="Create quiz"
				/>
			</div>
		</div>
	{:else}
		{@render header()}

		<div class="max-w-7xl mx-auto grid w-full gap-4">
			{#each quizzes as quiz, idx (idx)}
				<a
					class="p-4 flex gap-2 items-center bg-white border border-zinc-200 rounded-2xl transition hover:(bg-zinc-50)"
					href="/{quiz.id}"
					target="_self"
				>
					<span>
						<div class="font-semibold">{quiz.title}</div>
						<div class="text-zinc-700 flex items-center gap-2">
							{quiz.questions.length} Qs
							<span class="size-1 rounded-full bg-zinc-500 block"></span>
							{quiz.created === quiz.updated ? 'Created' : 'Updated'}
							{dayjs(quiz.updated).fromNow()}
						</div>
					</span>

					<span class="flex-1"></span>

					<Button
						icon={Pen}
						label="Edit"
						onclick={(e) => {
							e.preventDefault();
							goto(resolve('/[quizid]/edit', { quizid: quiz.id }));
						}}
					/>

					<Button
						role="link"
						icon={Rocket}
						label="Host"
						onclick={(e) => {
							e.preventDefault();
							goto(resolve('/[quizid]/host', { quizid: quiz.id }));
						}}
					/>

					<Dropdown
						items={[
							{
								label: 'Copy',
								icon: Copy,
								action() {
									quizzes.splice(idx + 1, 0, {
										...quiz,
										title: quiz.title + ' Copy',
										id: nanoid(),
										created: Date.now(),
										updated: Date.now(),
									});
								},
							},
							{
								label: 'Delete',
								icon: Trash,
								class: 'text-red hover:(bg-red-50 text-red)',
								action() {
									quizzes.splice(idx, 1);
								},
							},
						]}
						icon={DotSixVertical}
					/>
				</a>
			{/each}
		</div>
	{/if}
</div>

{#snippet header()}
	<div class="flex mx-auto max-w-7xl gap-4 py-4 w-full">
		<span class="text-3xl font-medium">Quizzes</span>

		<span class="flex-1"></span>

		<Button
			icon={FilePlus}
			ui={{ base: 'bg-svelte-50 text-svelte border-svelte-100' }}
			label="Create quiz"
		/>
	</div>
{/snippet}
