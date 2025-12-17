<script lang="ts">
	import { loadQuizzes } from '$lib/storage';
	import type { Quiz } from '$lib/types';
	import { useButtonVariant } from '$lib/variants';
	import { onMount } from 'svelte';
	import SealQuestion from '~icons/ph/seal-question';
	import FilePlus from '~icons/ph/file-plus';

	const quizzes = $state<Quiz[]>([]);
	let loading = $state(true);

	onMount(async () => {
		for (const quiz of await loadQuizzes()) {
			if (quizzes.find((v) => v.id === quiz.id)) continue;
			quizzes.push(quiz);
		}

		loading = false;
	});
</script>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*18)] flex flex-col">
	{#if loading}
		{#each { length: 10 }, idx (idx)}
			<div class="p-4 mx-auto max-w-7xl">{idx}</div>
		{/each}
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

				<button
					class={useButtonVariant().root({
						size: 'lg',
					})}
				>
					<FilePlus class="size-6" /> Create Quiz
				</button>
			</div>
		</div>
	{:else}
		{#each quizzes as quiz, idx (idx)}
			<div class="p-4 mx-auto max-w-7xl">{quiz}</div>
		{/each}
	{/if}
</div>
