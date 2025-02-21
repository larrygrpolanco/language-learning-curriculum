// src/routes/+page.ts
// Just import and return the JSON - that's it!

//Working for typescript issue
import coursesData from '$lib/data/courses.json';

export const load = () => ({
  courses: coursesData.courses
});


// Not working code, use this to fix the rest of the pages

// import courses from '$lib/data/courses.json';

// export const load = () => ({ courses });
