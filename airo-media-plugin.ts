import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Plugin, Connect } from "vite";

type MediaEntry = {
	currentUrl?: string;
	mediaType?: string;
};

function loadMedia(rootDir: string): Record<string, MediaEntry> {
	const candidates = [join(rootDir, "airo-media.json"), join(rootDir, "public/airo-media.json")];
	for (const path of candidates) {
		if (!existsSync(path)) continue;
		try {
			return JSON.parse(readFileSync(path, "utf-8")) as Record<string, MediaEntry>;
		} catch {
			/* try next */
		}
	}
	return {};
}

function slotFromPath(pathname: string): string | null {
	const match = pathname.match(/^\/airo-assets\/(?:images|videos)\/(.+?)(?:\.[a-z0-9]+)?$/i);
	return match?.[1] ?? null;
}

function writeRedirects(rootDir: string, media: Record<string, MediaEntry>): void {
	const lines: string[] = [
		"# Generated from airo-media.json — do not edit by hand",
		"# Image/video slots → CDN URLs (must appear before SPA fallback)",
	];

	for (const [slot, entry] of Object.entries(media)) {
		if (!entry?.currentUrl || !/^https?:\/\//i.test(entry.currentUrl)) continue;
		const kind = entry.mediaType === "video" ? "videos" : "images";
		lines.push(`/airo-assets/${kind}/${slot}  ${entry.currentUrl}  200!`);
	}

	lines.push("", "# SPA fallback for React Router", "/*    /index.html   200", "");
	writeFileSync(join(rootDir, "public/_redirects"), lines.join("\n"), "utf-8");
}

/**
 * Dev: redirect /airo-assets/* to CDN URLs from airo-media.json.
 * Build: write public/_redirects for Netlify.
 */
export function airoMediaPlugin(rootDir = process.cwd()): Plugin {
	const media = loadMedia(rootDir);

	return {
		name: "airo-media",
		configureServer(server) {
			server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
				const pathname = (req.url || "").split("?")[0] || "";
				const slot = slotFromPath(pathname);
				if (!slot) return next();
				const url = media[slot]?.currentUrl;
				if (!url) return next();
				res.statusCode = 302;
				res.setHeader("Location", url);
				res.end();
			});
		},
		buildStart() {
			writeRedirects(rootDir, media);
		},
	};
}
