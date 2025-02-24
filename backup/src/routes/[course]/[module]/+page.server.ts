// src/routes/[course]/[module]/+page.server.ts
import { error } from '@sveltejs/kit';
import { readCourseStructure } from '$lib/server/courseReader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const courses = await readCourseStructure();
	const course = courses.find((c) => c.slug === params.course);
	const module = course?.modules.find((m) => m.slug === params.module);

	if (!course || !module) {
		throw error(404, 'Module not found');
	}

	return { course, module };
};
