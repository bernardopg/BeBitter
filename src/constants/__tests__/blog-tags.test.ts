import { describe, expect, it } from "vitest";

import { blogPosts } from "../blog-posts";
import { blogTagLabel } from "../blog-tags";

describe("blogTagLabel", () => {
  it("translates Portuguese tags in English and keeps them in Portuguese", () => {
    expect(blogTagLabel("IA & Automação", "en")).toBe("AI & Automation");
    expect(blogTagLabel("IA & Automação", "pt")).toBe("IA & Automação");
  });

  it("keeps language-neutral tags unchanged", () => {
    expect(blogTagLabel("React", "en")).toBe("React");
  });

  it("leaves no Portuguese-only tag untranslated in English", () => {
    const portugueseOnly = /[ãáâçéêíóôõú]|^(IA|Banco de Dados|Acessibilidade)\b/i;
    const untranslated = [...new Set(blogPosts.flatMap((p) => p.tags))]
      .map((tag) => blogTagLabel(tag, "en"))
      .filter((label) => portugueseOnly.test(label));
    expect(untranslated).toEqual([]);
  });
});
