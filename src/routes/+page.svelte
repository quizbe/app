<script lang="ts">
	import { loadQuizzes } from '$lib/storage';
	import type { Quiz } from '$lib/types';
	import { onMount } from 'svelte';

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

<div class="p-4 sticky top-0 bg-white border-b border-zinc-200 h-16 flex overflow-hidden">
	<a class="font-bold text-2xl" href="/">Quizbe</a>

	<span class="flex-1"></span>
</div>

<div class="p-4">
	{#if loading}
		{#each { length: 10 }, idx (idx)}
			<div class="p-4 mx-auto max-w-7xl">{idx}</div>
		{/each}
	{/if}
</div>
