import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:content";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

/**
 * Loads JSON page content from src/content/pages into virtual:content.
 * Replaces the GoDaddy Airo content-plugin for standalone hosting.
 */
export function contentPlugin(rootDir = process.cwd()): Plugin {
	return {
		name: "content-plugin",
		resolveId(id) {
			if (id === VIRTUAL_ID) return RESOLVED_ID;
		},
		load(id) {
			if (id !== RESOLVED_ID) return;
			const pagesDir = join(rootDir, "src/content/pages");
			if (!existsSync(pagesDir)) {
				return "export {};";
			}
			const files = readdirSync(pagesDir).filter((f) => f.endsWith(".json"));
			const exports = files.map((file) => {
				const name = file.replace(/\.json$/, "");
				const raw = readFileSync(join(pagesDir, file), "utf-8");
				JSON.parse(raw); // validate
				return `export const ${name} = ${raw};`;
			});
			return exports.join("\n");
		},
	};
}
