// Home page data loader - Loads the list of available courses
import type { PageLoad } from './$types';
import type { CoursesList } from '$lib/types';

export const load: PageLoad = async () => {
  try {
    // Import the courses list from our data directory
    const coursesList = await import('$lib/data/courses.json') as CoursesList;
    return { courses: coursesList.courses };
  } catch (error) {
    return { 
      courses: [],
      error: 'Failed to load courses' 
    };
  }
};