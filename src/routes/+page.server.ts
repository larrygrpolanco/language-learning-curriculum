// src/routes/+page.server.ts
import { readCourseStructure } from '$lib/server/courseReader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const courses = await readCourseStructure();
	return { courses };
};
