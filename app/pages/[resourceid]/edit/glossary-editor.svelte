<script lang="ts">
	import type { Glossary } from '$lib/schemas';
	import { Button, Card } from 'uisv';
	import NoData from '$lib/assets/undraw-no-data.svg';
	import GlossaryTerm from './glossary-term.svelte';

	type Props = {
		glossary: Glossary;
	};

	let { glossary = $bindable() }: Props = $props();
</script>

{#each { length: glossary.terms.length }, idx (idx)}
	<Card variant="outline" ui={{ base: 'group' }}>
		<table class="w-full text-left border-separate border-spacing-2 border-spacing-x-4">
			<thead>
				<tr>
					<th class="font-semibold text-md">
						{idx + 1}. TERM
					</th>
					<th>
						<div class="flex items-center">
							<span class="font-semibold text-md grow">DEFINITION</span>

							<div class="flex gap-2 group-hover:opacity-100 opacity-0 transition">
								<Button
									icon="i-ph:trash"
									color="surface"
									variant="ghost"
									onclick={() => glossary.terms.splice(idx, 1)}
								/>

								<Button
									icon="i-ph:copy"
									color="surface"
									variant="ghost"
									onclick={() => glossary.terms.splice(idx, 0, glossary.terms[idx])}
								/>
							</div>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<GlossaryTerm bind:term={glossary.terms[idx]} />
			</tbody>
		</table>
	</Card>
{/each}

{#if !glossary.terms.length}
	<div class="mx-auto flex flex-col h-42 gap-4 items-center mb-px">
		<img class="size-32" src={NoData} alt="No data" />

		<span>You have 0 terms.</span>
	</div>
{/if}

<div class="flex justify-center">
	<Button
		label="Create term"
		icon="i-ph:plus"
		variant="subtle"
		onclick={() => {
			glossary.terms.push({
				categories: [],
				definition: {
					media: '',
					text: '',
				},
				media: '',
				text: '',
			});
		}}
	/>
</div>
