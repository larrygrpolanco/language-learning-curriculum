// src/lib/utils/fs.ts
import { promises as fs } from 'fs';
import path from 'path';
import type { Course, Module, Unit, Section } from '$lib/types';

// Supported file extensions
const AUDIO_EXTS = ['.mp3'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png'];

/**
 * Parses a folder name into its components (order, type, title)
 * Example: "1-comprehension-basic" -> { order: 1, type: "comprehension", title: "Basic" }
 */
function parseFolderName(name: string) {
	const parts = name.split('-');
	const order = parseInt(parts[0], 10);

	// For sections, type is the second part, for modules/units it's their level
	const type = parts.length > 2 ? parts[1] : 'default';

	// Join remaining parts and capitalize for title
	const title = parts
		.slice(parts.length > 2 ? 2 : 1)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return {
		order: isNaN(order) ? 999 : order,
		type,
		title: title || name,
		slug: name.toLowerCase()
	};
}

/**
 * Gets ordered list of media files from a section directory
 */
async function getMediaFiles(sectionPath: string) {
	const files = await fs.readdir(sectionPath);

	// Group files by type and sort by numeric prefix
	const audioFiles = files
		.filter((f) => AUDIO_EXTS.includes(path.extname(f)))
		.sort((a, b) => {
			const aNum = parseInt(a.split('-')[0]) || 0;
			const bNum = parseInt(b.split('-')[0]) || 0;
			return aNum - bNum;
		})
		.map((f) => path.join(sectionPath, f));

	const imageFiles = files
		.filter((f) => IMAGE_EXTS.includes(path.extname(f)))
		.sort((a, b) => {
			const aNum = parseInt(a.split('-')[0]) || 0;
			const bNum = parseInt(b.split('-')[0]) || 0;
			return aNum - bNum;
		})
		.map((f) => path.join(sectionPath, f));

	return {
		audioFiles,
		imageFiles
	};
}

/**
 * Recursively builds course structure by reading directory
 */
export async function getCourseStructure(coursePath: string): Promise<Course> {
	const courseInfo = parseFolderName(path.basename(coursePath));

	// Read module directories
	const moduleDirs = (await fs.readdir(coursePath, { withFileTypes: true }))
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	// Process each module
	const modules: Module[] = await Promise.all(
		moduleDirs.map(async (moduleName) => {
			const modulePath = path.join(coursePath, moduleName);
			const moduleInfo = parseFolderName(moduleName);

			// Read unit directories
			const unitDirs = (await fs.readdir(modulePath, { withFileTypes: true }))
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name);

			// Process each unit
			const units: Unit[] = await Promise.all(
				unitDirs.map(async (unitName) => {
					const unitPath = path.join(modulePath, unitName);
					const unitInfo = parseFolderName(unitName);

					// Read section directories
					const sectionDirs = (await fs.readdir(unitPath, { withFileTypes: true }))
						.filter((dirent) => dirent.isDirectory())
						.map((dirent) => dirent.name);

					// Process each section
					const sections: Section[] = await Promise.all(
						sectionDirs.map(async (sectionName) => {
							const sectionPath = path.join(unitPath, sectionName);
							const sectionInfo = parseFolderName(sectionName);
							const { audioFiles, imageFiles } = await getMediaFiles(sectionPath);

							return {
								...sectionInfo,
								audioFiles,
								imageFiles
							};
						})
					);

					// Sort sections by order
					sections.sort((a, b) => a.order - b.order);

					return {
						...unitInfo,
						sections
					};
				})
			);

			// Sort units by order
			units.sort((a, b) => a.order - b.order);

			return {
				...moduleInfo,
				units
			};
		})
	);

	// Sort modules by order
	modules.sort((a, b) => a.order - b.order);

	return {
		...courseInfo,
		modules
	};
}

// Helper function to check if a course exists
export async function courseExists(courseName: string): Promise<boolean> {
	try {
		await fs.access(path.join('courses', courseName));
		return true;
	} catch {
		return false;
	}
}