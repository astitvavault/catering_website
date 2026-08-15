/**
 * Cookie consent UI was tied to GoDaddy C2 / Airo analytics.
 * That pipeline is unused on Netlify, so this component is a no-op.
 * Keep the export so existing imports and error-boundary wiring stay valid.
 */
export default function CookieBanner() {
  return null;
}
