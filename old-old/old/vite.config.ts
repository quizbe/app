import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unicons from 'unplugin-icons/vite';
import { uisv } from 'uisv/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		uisv({
			colors: {
				primary: {
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
			fonts: {
				fonts: {
					sans: ['Poppins:100,200,300,400,500,600,700,800,900'],
				},
			},
		}),
		unicons({
			compiler: 'svelte',
		}),
	],
});
