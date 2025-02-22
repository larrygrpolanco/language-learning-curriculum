/**
 * This type system models a language learning platform's content hierarchy:
 * Course (e.g., Korean) -> Module (e.g., Basic Conversation) -> 
 * Unit (e.g., Greetings) -> Section (e.g., Comprehension Practice)
 */

/**
 * Defines valid section types for language learning content.
 * Each type represents a different learning activity.
 */
export type SectionType = 
  | 'comprehension'  // Listening and understanding exercises
  | 'production'     // Speaking practice
  | 'dictation'      // Writing what you hear
  | 'drill'          // Repetitive practice exercises
  | 'test'           // Assessment activities
  | 'default';       // Generic content type

/**
 * Base interface providing common properties for all content levels.
 * The folder naming convention "1-name-type" determines these values.
 */
export interface BaseContent {
  order: number;     // Numeric prefix from folder name
  title: string;     // Human-readable name
  slug: string;      // URL-friendly identifier
}

/**
 * Section represents atomic learning content with associated media.
 * Maps to folders like "1-comprehension-basic/audio.mp3"
 */
export interface Section extends BaseContent {
  type: SectionType;
  audioFiles: string[];  // Paths to audio recordings
  imageFiles: string[];  // Paths to textbook/workbook pages
}

/**
 * Unit groups related learning sections (e.g., "1-greetings").
 * Each unit typically covers one major learning objective.
 */
export interface Unit extends BaseContent {
  sections: Section[];
}

/**
 * Module represents a major course component (e.g., "1-basic-conversation").
 * Modules group related units that build upon each other.
 */
export interface Module extends BaseContent {
  units: Unit[];
}

/**
 * Course is the top-level structure representing a language course.
 * Each course (e.g., Korean, Mandarin) contains multiple modules.
 */
export interface Course extends BaseContent {
  modules: Module[];
}

// Route parameter types for type-safe navigation
export interface RouteParams {
  course: string;
  module?: string;
  unit?: string;
}

// Page data types for each route
export interface PageData {
  course?: Course;
  module?: Module;
  unit?: Unit;
}