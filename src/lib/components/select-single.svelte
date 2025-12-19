<script lang="ts">
	import { useSelectVariant } from '$lib/variants';
	import { Select } from 'bits-ui';
	import type { Component } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import CaretUpDown from '~icons/ph/caret-up-down';

	type Props = {
		value: string;
		items: Array<{
			value: string;
			label: string;
			icon?: Component;
			ui?: { icon?: ClassNameValue; item?: ClassNameValue };
		}>;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		open?: boolean;
		icon?: Component;
		ui?: {
			trigger?: ClassNameValue;
			icon?: ClassNameValue;
			content?: ClassNameValue;
			item?: ClassNameValue;
		};
	};

	let {
		value = $bindable(),
		items,
		size = 'md',
		open = $bindable(false),
		icon,
		ui = {},
	}: Props = $props();
</script>

<Select.Root bind:value bind:open type="single">
	<Select.Trigger
		class={useSelectVariant().trigger({
			size,
			class: [open ? 'border-b hover:(border-b)' : '', ui.trigger],
		})}
	>
		{#if icon}
			{@const Icon = icon}

			<Icon class={useSelectVariant().icon({ size, class: [ui.icon] })} />
		{/if}

		{items.find((i) => i.value === value)?.label}

		<CaretUpDown class="size-3" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content class={useSelectVariant().content({ size, class: [ui.content] })}>
			<Select.ScrollUpButton />
			<Select.Viewport class="flex flex-col gap-1">
				{#each items as item, idx (idx)}
					{@const ItemIcon = item.icon}

					<Select.Item
						value={item.value}
						class={useSelectVariant().item({ size, class: [ui.item, item.ui?.item] })}
					>
						{#if ItemIcon}
							<ItemIcon class={item.ui?.icon} />
						{/if}

						{item.label}
					</Select.Item>
				{/each}
				<Select.ScrollDownButton />
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
