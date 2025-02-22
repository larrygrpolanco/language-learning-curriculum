// src/lib/types.ts

// Base interface for content metadata extracted from folder names
export interface ContentMeta {
  order: number;
  title: string;
  slug: string;
}

// Represents a section (like comprehension, production, etc.)
export interface Section extends ContentMeta {
  type: string;          // e.g., "comprehension", "production"
  audioPath?: string;    // Path to audio file if it exists
  imagePaths: string[];  // Array of paths to related images
}

// Represents a unit (collection of sections)
export interface Unit extends ContentMeta {
  sections: Section[];
}

// Represents a module (collection of units)
export interface Module extends ContentMeta {
  units: Unit[];
}

// Represents a complete course
export interface Course extends ContentMeta {
  modules: Module[];
}

// Helper type for parsing folder names
export interface ParsedPath {
  order: number;
  title: string;
  type: string;  // Changed from optional to required
  slug: string;
}