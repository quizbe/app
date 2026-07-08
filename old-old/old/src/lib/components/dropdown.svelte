<script lang="ts">
	import { useDropdownVariant } from '$lib/variants';
	import { DropdownMenu, type WithoutChild } from 'bits-ui';
	import type { Component } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	type Props = DropdownMenu.RootProps & {
		value?: string;
		items: Array<{
			icon?: Component;
			label: string;
			value?: string;
			action?: () => unknown;
			class?: ClassNameValue;
		}>;
		contentprops?: WithoutChild<DropdownMenu.ContentProps>;
		icon?: Component;
		label?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		ui?: {
			root?: ClassNameValue;
			icon?: ClassNameValue;
			content?: ClassNameValue;
			item?: ClassNameValue;
		};
	};

	let {
		open = $bindable(false),
		value = $bindable(),
		contentprops,
		items,
		label,
		icon: Icon,
		size = 'md',
		ui = {},
		...rest
	}: Props = $props();
</script>

<DropdownMenu.Root bind:open {...rest}>
	<DropdownMenu.Trigger
		class={useDropdownVariant().trigger({
			size,
			class: [!label && 'aspect-square px-0', ui.root],
		})}
	>
		{#if Icon}
			<Icon class={useDropdownVariant().icon({ size, class: ui.icon })} />
		{/if}

		{label}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{...contentprops}
			class={useDropdownVariant().content({ size, class: ui.content })}
		>
			<!-- "px-4 h-8 rounded-lg cursor-pointer flex items-center gap-2 hover:(bg-zinc-100) -->
			{#each items as item, idx (idx)}
				{@const Icon = item.icon}
				<DropdownMenu.Item
					class={useDropdownVariant().item({ size, class: [ui.item, item.class] })}
					onclick={item.action}
				>
					{#if Icon}
						<Icon />
					{/if}

					{item.label}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
