// src/lib/courses.ts

// Type definitions for course data structure
export interface CourseData {
  title: string;
  slug: string;
  order: number;
  type: string;
  modules: {
    order: number;
    type: string;
    title: string;
    slug: string;
    units: {
      order: number;
      type: string;
      title: string;
      slug: string;
      sections: {
        order: number;
        type: string;
        title: string;
        slug: string;
        audioFiles: string[];
        imageFiles: string[];
      }[];
    }[];
  }[];
}

// Utility functions to get course data
export async function getCourses(): Promise<CourseData[]> {
  const { courses } = await import('virtual:course-structure');
  return courses;
}

export async function getCourse(slug: string): Promise<CourseData | undefined> {
  const courses = await getCourses();
  return courses.find(c => c.slug === slug);
}