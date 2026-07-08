<script lang="ts">
	import { Button, type ButtonProps } from 'uisv';
	import { tv } from 'tailwind-variants';

	let { size = 'md', ui = {}, ...rest }: ButtonProps = $props();

	const variants = $derived(
		tv({
			slots: {
				base: 'cursor-pointer border bg-zinc-50 border-zinc-200 flex items-center transition-all justify-center font-medium not-disabled:active:(border-b-1)',
				icon: '',
			},
			variants: {
				size: {
					xs: {
						base: 'gap-1 text-xs px-2 rounded-md h-6 border-b-3 not-disabled:hover:(border-b-2)',
						icon: '',
					},
					sm: {
						base: 'gap-2 text-sm px-2 rounded-lg h-8 border-b-5 not-disabled:hover:(border-b-3)',
						icon: '',
					},
					md: {
						base: 'gap-2 px-4 rounded-lg h-10 border-b-5 not-disabled:hover:(border-b-3)',
						icon: '',
					},
					lg: {
						base: 'gap-4 px-6 rounded-xl h-12 border-b-7 not-disabled:hover:(border-b-4)',
						icon: '',
					},
					xl: {
						base: 'gap-4 px-6 rounded-2xl h-16 border-b-6 not-disabled:hover:(border-b-3)',
						icon: '',
					},
				},
			},
		})({ size }),
	);
</script>

<Button
	{size}
	{...rest}
	ui={{ base: [variants.base(), ui.base], icon: [variants.icon(), ui.icon] }}
/>
