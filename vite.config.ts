import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { courseStructurePlugin } from './vite-plugin-course-structure.js'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), courseStructurePlugin()]
});
