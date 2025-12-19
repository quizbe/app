<script lang="ts">
	import { isComponent, isSnippet } from '$lib/utils';
	import type { Component, Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { useButtonVariant } from '$lib/variants';

	type Props = SvelteHTMLElements['button'] & {
		children?: Snippet;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		icon?: string | Snippet | Component;
		label?: string;
		ui?: {
			base?: ClassNameValue;
			icon?: ClassNameValue;
		};
	};

	let { children, size = 'md', icon, ui = {}, label, ...rest }: Props = $props();

	const classes = $derived(useButtonVariant({ size }));
</script>

<button
	class={classes.base({
		class: [ui.base, icon && !(children || label) ? 'px-0 aspect-square' : ''],
	})}
	{...rest}
>
	{#if isSnippet(icon)}
		{@render icon?.()}
	{:else if isComponent(icon)}
		{@const Icon = icon}
		<Icon class={[classes.icon({ class: ui.icon })]} />
	{/if}

	{label}

	{@render children?.()}
</button>
