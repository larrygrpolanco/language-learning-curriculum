// src/routes/[course]/+page.server.ts
import { getCourseStructure } from '$lib/server/fs-utils';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const coursePath = join('static', 'courses', params.course);
    const course = await getCourseStructure(coursePath);
    
    return { course };
  } catch (e) {
    console.error('Error loading course:', e);
    throw error(404, 'Course not found');
  }
}
