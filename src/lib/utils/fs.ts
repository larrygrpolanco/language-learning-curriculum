// src/lib/utils/fs.ts
import type { ParsedPath, Course, Module, Unit, Section } from '$lib/types';

/**
 * Creates a URL-friendly slug from a string
 */
function createSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Extracts metadata from a folder name
 */
function parsePath(path: string, contentType: 'section' | 'module' | 'unit' = 'section'): ParsedPath {
  const parts = path.split('-');
  const order = parseInt(parts[0]);
  
  let type: string;
  let titleParts: string[];
  
  if (contentType === 'section') {
    type = parts[1] || 'general';
    titleParts = parts.slice(2);
  } else {
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
 * Gets media file paths for a section
 */
function getMediaPaths(courseName: string, moduleSlug: string, unitSlug: string, sectionSlug: string) {
  const basePath = `/courses/${courseName}/${moduleSlug}/${unitSlug}/${sectionSlug}`;
  return {
    audioPath: `${basePath}/audio.mp3`,
    imagePaths: [`${basePath}/page1.jpg`, `${basePath}/page2.jpg`] // You'll need to know image names
  };
}

/**
 * Extracts course name from path
 */
function getCourseNameFromPath(path: string): string {
  const lastSegment = path.split('/').pop();
  if (lastSegment) {
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
  return 'Unknown Course';
}

/**
 * Builds course structure from static paths
 */
export async function getCourseStructure(courseName: string): Promise<Course> {
  // This is where you'd define your course structure
  // Example for Korean course:
  const moduleStructure = [
    {
      name: 'module-1-basics',
      units: [
        {
          name: 'unit-1-greetings',
          sections: ['1-comprehension-basic', '2-production-practice']
        }
      ]
    }
    // Add more modules as needed
  ];

  const modules = moduleStructure.map(moduleData => {
    const moduleMeta = parsePath(moduleData.name, 'module');
    
    const units = moduleData.units.map(unitData => {
      const unitMeta = parsePath(unitData.name, 'unit');
      
      const sections = unitData.sections.map(sectionName => {
        const sectionMeta = parsePath(sectionName, 'section');
        const media = getMediaPaths(courseName, moduleMeta.slug, unitMeta.slug, sectionMeta.slug);
        
        return {
          ...sectionMeta,
          ...media
        };
      });

      sections.sort((a, b) => a.order - b.order);
      
      return {
        ...unitMeta,
        sections
      };
    });

    units.sort((a, b) => a.order - b.order);
    
    return {
      ...moduleMeta,
      units
    };
  });

  modules.sort((a, b) => a.order - b.order);

  return {
    order: 1,
    title: getCourseNameFromPath(courseName),
    slug: createSlug(courseName),
    modules
  };
}