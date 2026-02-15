<script lang="ts">
	import { useQuizContext } from '$lib/context';
	import Multiple from '$lib/components/editor/multiple.svelte';
	import type { Question } from '$lib/types';
	const quiz = useQuizContext();

	function updateQuestion(question: Question) {
		if (!quiz.current) return;
		quiz.current.questions[quiz.editing] = question;
	}
</script>

<div
	class={[
		'bg-white fixed inset-0 top-18 transition flex items-center items-center',
		quiz.editing < 0 ? 'opacity-0 pointer-events-none' : '',
	]}
>
	<div
		class="max-w-7xl mx-auto w-full bg-zinc-50 p-4 aspect-video rounded-xl border border-zinc-100"
	>
		{#if quiz.editing >= 0}
			{@const question = quiz.current?.questions[quiz.editing]}

			{#if question?.type === 'multiple'}
				<Multiple bind:question={() => question, (v) => updateQuestion(v)} />
			{/if}
		{/if}
	</div>
</div>
