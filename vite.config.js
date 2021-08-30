import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { defineConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginLegacy from '@vitejs/plugin-legacy';


const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		pluginVue(),
		pluginLegacy({ targets: ['defaults', 'not IE 11'] }),
	],
	root: resolve(__dirname, 'app'),
	base: './',
	build: {
		emptyOutDir: false,
		outDir: '../../lol-colorgrid-prod',
		target: 'es2015'
	}
});