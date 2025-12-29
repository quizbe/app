<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { useQuizContext } from '$lib/context';
	import {
		BLANK_QUESTIONS,
		ICONS_OF_TYPES,
		LABEL_OF_TYPES,
		COLORS_OF_TYPES,
		TIMELIMIT_KEYS_QUESTION,
		TIMELIMIT_QUESTION,
	} from '$lib/schemas';
	import Trash from '~icons/ph/trash';
	import Pen from '~icons/ph/pen';
	import Copy from '~icons/ph/copy';
	import Plus from '~icons/ph/plus';
	import Warning from '~icons/ph/warning';
	import Clock from '~icons/ph/clock';
	import Sparkle from '~icons/ph/sparkle';
	import { Dialog } from 'bits-ui';
	import { useDialogVariant } from '$lib/variants';
	import SelectSingle from '$lib/components/select-single.svelte';

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
{/if}

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
				<div class="h-full flex flex-col gap-4">
					<div class="flex-1 flex gap-4">
						<div></div>
						<div></div>
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
			{/if}
		{/if}
	</div>
</div>

<Dialog.Root
	open={new_question >= 0}
	onOpenChange={(v) => {
		if (v) return;
		new_question = -1;
	}}
>
	<Dialog.Portal>
		<Dialog.Overlay class={useDialogVariant().overlay({ size: 'md' })}>
			<Dialog.Content class={useDialogVariant().content({ size: 'md', class: 'p-8' })}>
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
										quiz.current.questions.splice(new_question, 0, BLANK_QUESTIONS[type]);
										quiz.editing = new_question;
										new_question = 0;
									}}
								>
									<Icon
										class={[
											color.class,
											'size-8 p-1 rounded-md transition group-hover:(bg-zinc-100)',
										]}
									/>
									{LABEL_OF_TYPES[type]}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</Dialog.Content>
		</Dialog.Overlay>
	</Dialog.Portal>
</Dialog.Root>
