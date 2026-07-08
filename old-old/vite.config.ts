import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import uisv from 'uisv/vite';

export default defineConfig({
	plugins: [sveltekit(), uisv({ fonts: { fonts: { sans: 'Montserrat:400,500,600,900' } } })],
});
