import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import {
	presetWind4,
	presetWebFonts,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import unicons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		unocss({
			theme: {
				colors: {
					svelte: {
						DEFAULT: '#FF3E00',
						50: '#FFECE5',
						100: '#FFD8CC',
						200: '#FFB299',
						300: '#FF8B66',
						400: '#FF6533',
						500: '#FF3E00',
						600: '#CC3200',
						700: '#992500',
						800: '#661900',
						900: '#330C00',
						950: '#1A0600',
					},
				},
			},
			transformers: [transformerCompileClass(), transformerDirectives(), transformerVariantGroup()],
			presets: [
				presetWind4({ preflights: { reset: true } }),
				presetWebFonts({
					fonts: {
						sans: ['Poppins:100,200,300,400,500,600,700,800,900'],
					},
				}),
			],
			content: {
				pipeline: {
					include: [
						/\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
						'src/**/*.{js,ts}',
					],
				},
			},
		}),
		unicons({
			compiler: 'svelte',
		}),
	],
});
