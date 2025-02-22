// src/lib/server/fs-utils.ts

import { promises as fs } from 'fs';
import { join } from 'path';
import type { ParsedPath, Course, Module, Unit, Section } from '$lib/types';

/**
 * Creates a URL-friendly slug from a string by:
 * - Converting to lowercase
 * - Replacing non-alphanumeric characters with hyphens
 * - Removing leading and trailing hyphens
 */
function createSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// parsePath function in src/lib/server/fs-utils.ts

/**
 * Extracts metadata from a folder name
 * For sections: "1-comprehension" -> { order: 1, type: "comprehension", ... }
 * For modules/units: "module-1-basics" -> { order: 1, type: "module", ... }
 */
function parsePath(path: string, contentType: 'section' | 'module' | 'unit' = 'section'): ParsedPath {
  const parts = path.split('-');
  const order = parseInt(parts[0]);
  
  let type: string;
  let titleParts: string[];
  
  if (contentType === 'section') {
    // For sections, use the second part as type (e.g., "comprehension")
    type = parts[1] || 'general';
    titleParts = parts.slice(2);
  } else {
    // For modules and units, use their content type
    type = contentType;
    titleParts = parts.slice(1);
  }

  const title = titleParts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    order,
    title,
    type,
    slug: createSlug(title)
  };
}

/**
 * Scans a directory for media files and returns paths to audio and images
 * Assumes MP3 for audio and JPG/JPEG/PNG for images
 */
async function getMediaFiles(dir: string) {
  try {
    const files = await fs.readdir(dir);
    return {
      audioPath: files.find(f => f.endsWith('.mp3')),
      imagePaths: files
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        .map(f => join(dir, f))
    };
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return { audioPath: undefined, imagePaths: [] };
  }
}

/**
 * Extracts a readable course name from the file path
 * Example: "/static/courses/korean" -> "Korean"
 */
function getCourseNameFromPath(path: string): string {
  const lastSegment = path.split('/').pop();
  if (lastSegment) {
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
  return 'Unknown Course';
}

/**
 * Builds a complete course structure by scanning the filesystem
 * Follows the hierarchy: Course -> Modules -> Units -> Sections
 */
export async function getCourseStructure(coursePath: string): Promise<Course> {
  const moduleNames = await fs.readdir(coursePath);
  const modules = await Promise.all(
    moduleNames
      .filter(name => name.startsWith('module-'))
      .map(async moduleName => {
        const moduleMeta = parsePath(moduleName, 'module');
        const modulePath = join(coursePath, moduleName);
        
        // Get all unit directories in this module
        const unitNames = await fs.readdir(modulePath);
        const units = await Promise.all(
          unitNames
            .filter(name => name.startsWith('unit-'))
            .map(async unitName => {
              const unitMeta = parsePath(unitName);
              const unitPath = join(modulePath, unitName);
              
              // Get all section directories in this unit
              const sectionNames = await fs.readdir(unitPath);
              const sections = await Promise.all(
                sectionNames
                  .filter(name => /^\d+-/.test(name))  // Match directories starting with numbers
                  .map(async sectionName => {
                    const sectionMeta = parsePath(sectionName);
                    const sectionPath = join(unitPath, sectionName);
                    const { audioPath, imagePaths } = await getMediaFiles(sectionPath);
                    
                    return {
                      ...sectionMeta,
                      audioPath: audioPath ? join(sectionPath, audioPath) : undefined,
                      imagePaths
                    };
                  })
              );
              
              // Sort sections by their numeric order
              sections.sort((a, b) => a.order - b.order);
              
              return {
                ...unitMeta,
                sections
              };
            })
        );
        
        // Sort units by their numeric order
        units.sort((a, b) => a.order - b.order);
        
        return {
          ...moduleMeta,
          units
        };
      })
  );
  
  // Sort modules by their numeric order
  modules.sort((a, b) => a.order - b.order);
  
  // Create and return the complete course structure
  return {
    order: 1,  // Courses are currently standalone, so order is fixed at 1
    title: getCourseNameFromPath(coursePath),
    slug: createSlug(coursePath.split('/').pop() || ''),
    modules
  };
}