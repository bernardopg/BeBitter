import DOMPurify from "dompurify";

const SAFE_EXTERNAL_PROTOCOLS = new Set(["http:", "https:"]);

export const sanitizeReadmeHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

export const sanitizeExternalUrl = (
  url: string | null | undefined,
  fallback: string | null = null
): string | null => {
  if (!url) {
    return fallback;
  }

  try {
    const parsedUrl = new URL(url);
    return SAFE_EXTERNAL_PROTOCOLS.has(parsedUrl.protocol)
      ? parsedUrl.toString()
      : fallback;
  } catch {
    return fallback;
  }
};
