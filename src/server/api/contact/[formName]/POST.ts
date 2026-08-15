/**
 * Local/dev contact form handler.
 * On Netlify production, submissions go through Netlify Forms (see contact.tsx).
 * This endpoint remains for `npm run dev` so the form works without Netlify.
 */
import type { Request, Response } from "express";

interface RateBucket {
	count: number;
	resetAt: number;
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateBuckets = new Map<string, RateBucket>();

setInterval(() => {
	const now = Date.now();
	for (const [ip, bucket] of rateBuckets) {
		if (now > bucket.resetAt) rateBuckets.delete(ip);
	}
}, RATE_WINDOW_MS);

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const bucket = rateBuckets.get(ip);

	if (!bucket || now > bucket.resetAt) {
		rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
		return false;
	}

	if (bucket.count >= RATE_LIMIT) return true;

	bucket.count++;
	return false;
}

function getVisitorIp(req: Request): string {
	const xff = req.headers["x-forwarded-for"];
	if (typeof xff === "string" && xff.trim()) {
		return xff.split(",")[0]?.trim() ?? "";
	}
	return req.socket?.remoteAddress ?? req.ip ?? "unknown";
}

export default async function handler(req: Request, res: Response): Promise<void> {
	const body = req.body;
	const visitorIp = getVisitorIp(req);

	if (body?._gotcha || body?.["bot-field"]) {
		res.status(200).json({ success: true });
		return;
	}

	const email = typeof body?.email === "string" ? body.email.trim() : "";
	const name = typeof body?.name === "string" ? body.name.trim() : "";
	const message = typeof body?.message === "string" ? body.message.trim() : "";

	if (!email || !name || !message) {
		res.status(400).json({ success: false, error: "name, email, and message are required" });
		return;
	}

	if (isRateLimited(visitorIp)) {
		res.status(429).json({ success: false, error: "Too many requests" });
		return;
	}

	console.log("[contact] enquiry (local/dev)", {
		formName: req.params.formName,
		name,
		email,
		phone: body?.phone,
		message: message.slice(0, 200),
	});

	res.status(200).json({ success: true });
}
