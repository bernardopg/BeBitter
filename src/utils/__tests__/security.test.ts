import { describe, expect, it } from "vitest";

import { sanitizeExternalUrl, sanitizeReadmeHtml } from "../security";

describe("sanitizeReadmeHtml", () => {
  it("removes executable content from rendered README HTML", () => {
    const sanitized = sanitizeReadmeHtml(
      '<img src="x" onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">click</a><p>safe</p>'
    );

    expect(sanitized).toContain('<img src="x">');
    expect(sanitized).toContain("<p>safe</p>");
    expect(sanitized).not.toContain("onerror");
    expect(sanitized).not.toContain("<script");
    expect(sanitized).not.toContain("javascript:");
  });
});

describe("sanitizeExternalUrl", () => {
  it("keeps safe http and https URLs", () => {
    expect(sanitizeExternalUrl("https://example.com/demo")).toBe(
      "https://example.com/demo"
    );
    expect(sanitizeExternalUrl("http://example.com/demo")).toBe(
      "http://example.com/demo"
    );
  });

  it("rejects unsafe or malformed URLs", () => {
    expect(sanitizeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeExternalUrl("not-a-url")).toBeNull();
    expect(sanitizeExternalUrl("javascript:alert(1)", "https://fallback.test")).toBe(
      "https://fallback.test"
    );
  });
});
