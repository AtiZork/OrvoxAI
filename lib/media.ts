import { API_URL } from "./config";

/** Turn relative upload paths (/uploads/...) into absolute API URLs for static hosting. */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  if (url.startsWith("/")) {
    return `${API_URL}${url}`;
  }
  return url;
}
