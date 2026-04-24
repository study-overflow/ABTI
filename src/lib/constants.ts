// Production URL. We deploy to both http://zzhang.tech/abti and
// http://123.57.39.204/abti (same server). Share text / QR codes use the
// nicer one.
export const PROD_URL = "http://zzhang.tech/abti";

/**
 * Runtime site URL for share text + QR.
 * - In the browser on the prod host → use window.location.origin + basePath (auto-works for either domain/IP).
 * - Anywhere else (dev, static build) → fall back to PROD_URL so dev-only
 *   "http://localhost:3000" never leaks into generated share material.
 */
export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // On the actual deployed hosts, use the real origin (so 123.57.39.204 and
    // zzhang.tech each share their own URL).
    if (host === "zzhang.tech" || host === "123.57.39.204") {
      return `${window.location.origin}${BASE_PATH}`;
    }
  }
  return PROD_URL;
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an absolute public-asset path with basePath (e.g. "/characters/X.png"). */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export const SITE_NAME = "ABTI";
export const SITE_FULL_NAME = "Anthropic Being Type Indicator";
export const SITE_TAGLINE = "AI 时代人类主体性测试";
export const AUTHOR_NAME = "再揖别 · 主题团日";
