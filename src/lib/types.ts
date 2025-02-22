// src/lib/types.ts

/**
 * Base interface for shared properties across all content types
 */
export interface BaseContent {
  order: number;     // Numeric order from folder name (e.g., "1" from "1-basic")
  type: string;      // Content type from folder name (e.g., "comprehension", "default")
  title: string;     // Display title derived from folder name
  slug: string;      // URL-friendly version of the name
}

/**
 * Section represents the lowest level content with media files
 */
export interface Section extends BaseContent {
  audioFiles: string[];  // Array of paths to audio files, sorted by numeric prefix
  imageFiles: string[];  // Array of paths to image files, sorted by numeric prefix
}

/**
 * Unit contains multiple sections
 */
export interface Unit extends BaseContent {
  sections: Section[];   // Array of sections, sorted by order
}

/**
 * Module contains multiple units
 */
export interface Module extends BaseContent {
  units: Unit[];        // Array of units, sorted by order
}

/**
 * Course is the top level structure
 */
export interface Course extends BaseContent {
  modules: Module[];    // Array of modules, sorted by order
}

// Optional: Type for the virtual module's exported data
export interface CourseData {
  courses: Course[];
}