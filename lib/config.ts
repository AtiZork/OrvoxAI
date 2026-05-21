/**
 * API base URL (no trailing slash).
 * Same-domain cPanel: set NEXT_PUBLIC_API_URL= (empty) so requests use /api/...
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://api.orvoxai.com";
