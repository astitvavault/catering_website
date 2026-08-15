import type { Plugin } from "vite";

export const FORMAT_OVERRIDES_MODULE_ID = "virtual:format-overrides";
const RESOLVED_ID = "\0virtual:format-overrides";

/**
 * Provides an empty virtual:format-overrides module.
 * Sidecar format editing was an Airo builder feature — not used on Netlify.
 */
export function formatOverridesPlugin(_rootDir?: string): Plugin {
	return {
		name: "format-overrides-plugin",
		resolveId(id) {
			if (id === FORMAT_OVERRIDES_MODULE_ID) return RESOLVED_ID;
		},
		load(id) {
			if (id !== RESOLVED_ID) return;
			return `export default { version: 1, scopes: {} };`;
		},
	};
}
