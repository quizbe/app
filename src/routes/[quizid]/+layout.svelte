<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import CaretLeft from '~icons/ph/caret-left';
	import { page } from '$app/state';
	import type { Quiz } from '$lib/types';
	import { onMount, setContext } from 'svelte';
	import { loadQuiz } from '$lib/storage';
	import { goto } from '$app/navigation';

	const quiz = $state<Quiz>(
		page.data.quiz || {
			id: '',
			title: '',
			authors: [],
			created: 0,
			updated: 0,
			local: true,
			questions: [],
		},
	);

	onMount(async () => {
		if (quiz.id || !page.params.quizid) return;

		const res = await loadQuiz(page.params.quizid);
		if (!res) return goto('/');

		for (const key of Object.keys(res)) {
			// @ts-expect-error errrrm
			quiz[key] = res[key];
		}
	});

	setContext('quiz', quiz);
</script>

<div class="h-18 p-4 sticky top-0 bg-white border-b border-zinc-200 flex overflow-hidden">
	<a href="/{page.params.quizid}" class="flex items-center h-full px-2">
		<Button icon={CaretLeft} />
	</a>

	<button class="px-4 h-10 rounded-lg w-64 text-left transition cursor-pointer hover:(bg-zinc-100)">
		{quiz.title || 'Untitled quiz'}
	</button>

	<span class="flex-1"></span>
</div>
