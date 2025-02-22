// src/routes/[course]/[module]/[unit]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { courses } = await parent();
	const course = courses.find((c) => c.slug === params.course);
	const module = course?.modules.find((m) => m.slug === params.module);
	const unit = module?.units.find((u) => u.slug === params.unit);

	if (!course || !module || !unit) {
		throw error(404, 'Unit not found');
	}

	return { course, module, unit };
};
