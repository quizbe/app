import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import {
	presetWind4,
	presetWebFonts,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	plugins: [
		sveltekit(),
		unocss({
			transformers: [transformerCompileClass(), transformerDirectives(), transformerVariantGroup()],
			presets: [
				presetWind4({ preflights: { reset: true } }),
				presetWebFonts({
					fonts: {
						sans: ['Poppins:100,200,300,400,500,600,700,800,900']
					}
				})
			]
		})
	]
});
