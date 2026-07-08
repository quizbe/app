<script lang="ts">
	import { useQuizContext } from '$lib/context';
	import { BLANK_QUESTIONS, COLORS_OF_TYPES, ICONS_OF_TYPES, LABEL_OF_TYPES } from '$lib/schemas';
	import { useDialogVariant } from '$lib/variants';
	import { Dialog } from 'bits-ui';

	type Props = {
		question: number;
	};

	let { question = $bindable() }: Props = $props();
	const quiz = useQuizContext();
</script>

<Dialog.Root
	open={question >= 0}
	onOpenChange={(v) => {
		if (v) return;
		question = -1;
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
										quiz.current.questions.splice(question, 0, BLANK_QUESTIONS[type]);
										quiz.editing = question;
										question = 0;
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
