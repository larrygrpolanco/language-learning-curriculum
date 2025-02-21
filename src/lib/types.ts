// src/lib/types.ts

// Basic shared properties
interface BaseContent {
  id: string;
  title: string;
  description: string;
}

// Image type for consistency
interface ImageContent {
  src: string;
  alt: string;
  caption?: string;
}

// Section represents a single learning segment
interface Section extends BaseContent {
  type: 'comprehension' | 'production' | 'drill' | 'exercise' | 'dictation';
  content: string;
  audio?: string;
  images?: ImageContent[];
}

// Unit contains multiple sections
interface Unit extends BaseContent {
  sectionOrder: string[];
  sections: Record<string, Section>;
}

// Module contains reference to multiple units
interface Module extends BaseContent {
  unitOrder: string[];
}

// Course is our top level structure
interface Course extends BaseContent {
  moduleOrder: string[];
}

// This type represents our courses listing file
interface CoursesList {
  courses: Course[];
}

export type {
  Course,
  Module,
  Unit,
  Section,
  ImageContent,
  CoursesList
};