// src/routes/+page.server.ts
import { getCourseStructure } from '$lib/server/fs-utils';
import { join } from 'path';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    // Read the courses directory to get available courses
    const coursesPath = join('static', 'courses');
    const korean = await getCourseStructure(join(coursesPath, 'korean'));
    const mandarin = await getCourseStructure(join(coursesPath, 'mandarin'));
    
    return {
      courses: [korean, mandarin]
    };
  } catch (e) {
    console.error('Error loading courses:', e);
    throw error(500, 'Failed to load courses');
  }
}
