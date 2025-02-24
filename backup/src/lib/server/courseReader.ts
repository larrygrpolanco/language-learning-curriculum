// src/lib/server/courseReader.ts
import { readdir } from 'fs/promises';
import { join } from 'path';

// Base path for all course content
const COURSES_PATH = 'courses';

// Helper to parse folder names like "1-basic-conversation"
function parseFolderName(name: string) {
	const parts = name.split('-');
	const order = parseInt(parts[0], 10);
	const title = parts
		.slice(1)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return {
		order: isNaN(order) ? 999 : order,
		title,
		slug: name
	};
}

// Helper to get media files from a section directory
async function getMediaFiles(sectionPath: string) {
	const files = await readdir(sectionPath);

	return {
		audioFiles: files
			.filter((f) => f.endsWith('.mp3'))
			.sort()
			.map((f) => join(sectionPath, f)),
		imageFiles: files
			.filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))
			.sort()
			.map((f) => join(sectionPath, f))
	};
}

// Main function to read course structure
export async function readCourseStructure() {
	const courses = [];

	// Read course directories (korean, mandarin, etc.)
	const courseDirs = await readdir(COURSES_PATH, { withFileTypes: true });

	for (const courseDir of courseDirs.filter((d) => d.isDirectory())) {
		const coursePath = join(COURSES_PATH, courseDir.name);
		const courseInfo = parseFolderName(courseDir.name);

		// Read module directories
		const moduleDirs = await readdir(coursePath, { withFileTypes: true });
		const modules = [];

		for (const moduleDir of moduleDirs.filter((d) => d.isDirectory())) {
			const modulePath = join(coursePath, moduleDir.name);
			const moduleInfo = parseFolderName(moduleDir.name);

			// Read unit directories
			const unitDirs = await readdir(modulePath, { withFileTypes: true });
			const units = [];

			for (const unitDir of unitDirs.filter((d) => d.isDirectory())) {
				const unitPath = join(modulePath, unitDir.name);
				const unitInfo = parseFolderName(unitDir.name);

				// Read section directories
				const sectionDirs = await readdir(unitPath, { withFileTypes: true });
				const sections = [];

				for (const sectionDir of sectionDirs.filter((d) => d.isDirectory())) {
					const sectionPath = join(unitPath, sectionDir.name);
					const sectionInfo = parseFolderName(sectionDir.name);

					// Get media files
					const { audioFiles, imageFiles } = await getMediaFiles(sectionPath);

					sections.push({
						...sectionInfo,
						audioFiles,
						imageFiles
					});
				}

				// Sort sections by order
				sections.sort((a, b) => a.order - b.order);

				units.push({
					...unitInfo,
					sections
				});
			}

			// Sort units by order
			units.sort((a, b) => a.order - b.order);

			modules.push({
				...moduleInfo,
				units
			});
		}

		// Sort modules by order
		modules.sort((a, b) => a.order - b.order);

		courses.push({
			...courseInfo,
			modules
		});
	}

	return courses;
}
