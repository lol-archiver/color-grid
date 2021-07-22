import { defineConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginLegacy from '@vitejs/plugin-legacy';

export default defineConfig({
	plugins: [
		pluginVue(),
		pluginLegacy({ targets: ['defaults', 'not IE 11'] }),
	],
	base: './',
	build: {
		emptyOutDir: false,
		outDir: '../lol-colorgrid-prod',
		target: 'es2015'
	}
});