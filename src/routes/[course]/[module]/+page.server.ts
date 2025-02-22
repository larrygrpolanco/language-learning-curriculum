// src/routes/[course]/[module]/+page.server.ts
import { getCourseStructure } from '$lib/server/fs-utils';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    // Load the full course structure
    const coursePath = join('static', 'courses', params.course);
    const course = await getCourseStructure(coursePath);
    
    // Find the requested module
    const module = course.modules.find(m => m.slug === params.module);
    if (!module) {
      throw error(404, 'Module not found');
    }
    
    return {
      course,
      module
    };
  } catch (e) {
    console.error('Error loading module:', e);
    throw error(404, 'Content not found');
  }
}
