// src/lib/types.ts
export interface BaseContent {
  order: number;
  type: string;
  title: string;
  slug: string;
}

export interface Section extends BaseContent {
  audioFiles: string[];
  imageFiles: string[];
}

export interface Unit extends BaseContent {
  sections: Section[];
}

export interface Module extends BaseContent {
  units: Unit[];
}

export interface Course extends BaseContent {
  modules: Module[];
}