import { tv } from 'tailwind-variants';

export const useButtonVariant = tv({
	slots: {
		root: 'flex items-center cursor-pointer transition-all bg-zinc-50 border border-zinc-200 font-medium active:(border-b)',
		icon: '',
	},
	variants: {
		size: {
			xs: {
				root: '',
				icon: '',
			},
			sm: {
				root: '',
				icon: '',
			},
			md: {
				root: 'h-10 gap-2 px-4 rounded-xl border-b-6 hover:border-b-3',
				icon: '',
			},
			lg: {
				root: 'h-12 gap-2 px-4 rounded-xl border-b-6 hover:border-b-3',
				icon: '',
			},
			xl: {
				root: '',
				icon: '',
			},
		},
	},
});
