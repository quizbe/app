import { tv } from 'tailwind-variants';

export const useButtonVariant = tv({
	slots: {
		base: 'cursor-pointer border bg-zinc-50 border-zinc-200 flex items-center transition-all justify-center font-medium active:(border-b-1)',
		icon: '',
	},
	variants: {
		size: {
			xs: {
				base: 'gap-1 text-xs px-2 rounded-md h-6 border-b-3 hover:(border-b-2)',
				icon: '',
			},
			sm: {
				base: 'gap-2 text-sm px-2 rounded-lg h-8 border-b-5 hover:(border-b-3)',
				icon: '',
			},
			md: {
				base: 'gap-2 px-4 rounded-lg h-10 border-b-5 hover:(border-b-3)',
				icon: '',
			},
			lg: {
				base: 'gap-4 px-6 rounded-xl h-12 border-b-7 hover:(border-b-4)',
				icon: '',
			},
			xl: {
				base: 'gap-4 px-6 rounded-2xl h-16 border-b-6 hover:(border-b-3)',
				icon: '',
			},
		},
	},
});

export const useDialogVariant = tv({
	slots: {
		overlay: '',
		content: '',
	},
});

export const useSelectVariant = tv({
	slots: {
		trigger:
			'cursor-pointer border bg-zinc-50 border-zinc-200 flex items-center transition-all justify-center font-medium active:(border-b-1)',
		icon: '',
		content: 'bg-white border border-zinc-200 mt-1 min-w-[--bits-select-anchor-width]',
		item: 'cursor-pointer flex items-center transition font-medium text-zinc-700 hover:(bg-zinc-200 text-black)',
	},
	variants: {
		size: {
			xs: {
				trigger: 'gap-1 text-xs px-2 rounded-md h-6 border-b-3 hover:(border-b-2)',
				content: 'p-1 rounded-md',
				item: 'px-2 h-5 gap-1 text-xs rounded',
			},
			sm: {
				trigger: 'gap-2 text-sm px-2 rounded-lg h-8 border-b-5 hover:(border-b-3)',
				content: 'p-1 rounded-md z-20',
				item: 'px-2 h-7 gap-1 text-sm rounded',
			},
			md: {
				trigger: 'gap-2 px-4 rounded-lg h-10 border-b-5 hover:(border-b-3)',
				content: 'p-2 rounded-lg',
				item: 'px-2 h-9 gap-2 rounded',
			},
			lg: {
				trigger: 'gap-4 px-6 rounded-xl h-12 border-b-7 hover:(border-b-4)',
				content: 'p-3 rounded-lg',
				item: 'px-2 h-11 text-lg gap-2 rounded',
			},
			xl: {
				trigger: 'gap-4 px-6 rounded-2xl h-16 border-b-6 hover:(border-b-3)',
				content: 'p-4 rounded-xl',
				item: 'px-2 h-13 text-xl gap-4 rounded',
			},
		},
	},
});

export const useDropdownVariant = tv({
	slots: {
		trigger:
			'cursor-pointer border bg-zinc-50 border-zinc-200 flex items-center transition-all justify-center font-medium active:(border-b-1)',
		icon: '',
		content: 'bg-white border border-zinc-200 mt-1 min-w-[--bits-select-anchor-width]',
		item: 'cursor-pointer flex items-center transition font-medium text-zinc-700 hover:(bg-zinc-200 text-black)',
	},
	variants: {
		size: {
			xs: {
				trigger: 'gap-1 text-xs px-2 rounded-md h-6 border-b-3 hover:(border-b-2)',
				content: 'p-1 rounded-md',
				item: 'px-2 h-5 gap-1 text-xs rounded',
			},
			sm: {
				trigger: 'gap-2 text-sm px-2 rounded-lg h-8 border-b-5 hover:(border-b-3)',
				content: 'p-1 rounded-md z-20',
				item: 'px-2 h-7 gap-1 text-sm rounded',
			},
			md: {
				trigger: 'gap-2 px-4 rounded-lg h-10 border-b-5 hover:(border-b-3)',
				content: 'p-2 rounded-lg',
				item: 'px-2 h-9 gap-2 rounded',
			},
			lg: {
				trigger: 'gap-4 px-6 rounded-xl h-12 border-b-7 hover:(border-b-4)',
				content: 'p-3 rounded-lg',
				item: 'px-2 h-11 text-lg gap-2 rounded',
			},
			xl: {
				trigger: 'gap-4 px-6 rounded-2xl h-16 border-b-6 hover:(border-b-3)',
				content: 'p-4 rounded-xl',
				item: 'px-2 h-13 text-xl gap-4 rounded',
			},
		},
	},
});
