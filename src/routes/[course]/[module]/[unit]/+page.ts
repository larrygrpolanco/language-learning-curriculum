// src/routes/[course]/[module]/[unit]/+page.ts
import { getCourseStructure, courseExists } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const exists = await courseExists(params.course);
  if (!exists) {
    throw error(404, 'Course not found');
  }

  const course = await getCourseStructure(`courses/${params.course}`);
  const module = course.modules.find(m => m.slug === params.module);
  const unit = module?.units.find(u => u.slug === params.unit);

  if (!module || !unit) {
    throw error(404, 'Unit not found');
  }

  return { course, module, unit };
}
