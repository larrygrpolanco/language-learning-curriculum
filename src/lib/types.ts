// src/lib/types.ts

// Base metadata for all content types
export interface ParsedPath {
  order: number;
  title: string;
  type: string;
  slug: string;
}

// Base content interface
interface BaseContent {
  order: number;
  title: string;
  slug: string;
}

// Section (like comprehension, production, etc.)
export interface Section extends BaseContent {
  type: string;
  audioPath?: string;
  imagePaths: string[];
}

// Unit containing multiple sections
export interface Unit extends BaseContent {
  sections: Section[];
}

// Module containing multiple units
export interface Module extends BaseContent {
  units: Unit[];
}

// Course structure
export interface Course extends BaseContent {
  modules: Module[];
}