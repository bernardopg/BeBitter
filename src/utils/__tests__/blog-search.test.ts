import { describe, expect, it } from "vitest";

import type { BlogPost } from "@/constants/blog-posts";
import { normalize, searchPosts } from "../blog-search";

const post = (overrides: Partial<BlogPost>): BlogPost =>
  ({
    slug: "slug",
    title: "Título",
    titleEn: "Title",
    excerpt: "Resumo",
    excerptEn: "Excerpt",
    content: [],
    date: "2026-01-01",
    author: "Bernardo Gomes",
    tags: [],
    readingTime: 1,
    ...overrides,
  }) as BlogPost;

const posts: BlogPost[] = [
  post({
    slug: "automacao-saude",
    title: "Automação em saúde",
    titleEn: "Healthcare automation",
    excerpt: "O que aprendi automatizando fluxos clínicos",
    excerptEn: "What I learned automating clinical workflows",
    tags: ["Python", "Automação"],
  }),
  post({
    slug: "react-19",
    title: "React 19 na prática",
    titleEn: "React 19 in practice",
    excerpt: "Novidades e migração",
    excerptEn: "What's new and how to migrate",
    tags: ["React", "Performance"],
  }),
];

describe("normalize", () => {
  it("lowercases and strips diacritics", () => {
    expect(normalize("Automação")).toBe("automacao");
    expect(normalize("MIGRAÇÃO Ágil")).toBe("migracao agil");
  });
});

describe("searchPosts", () => {
  it("returns every post for an empty or whitespace-only query", () => {
    expect(searchPosts(posts, "")).toHaveLength(2);
    expect(searchPosts(posts, "   ")).toHaveLength(2);
  });

  it("matches regardless of accents and case", () => {
    expect(searchPosts(posts, "automacao").map((p) => p.slug)).toEqual([
      "automacao-saude",
    ]);
    expect(searchPosts(posts, "AUTOMAÇÃO").map((p) => p.slug)).toEqual([
      "automacao-saude",
    ]);
  });

  it("matches on the other language, so results do not depend on the active one", () => {
    expect(searchPosts(posts, "healthcare").map((p) => p.slug)).toEqual([
      "automacao-saude",
    ]);
  });

  it("matches on tags and excerpts", () => {
    expect(searchPosts(posts, "performance").map((p) => p.slug)).toEqual(["react-19"]);
    expect(searchPosts(posts, "clinicos").map((p) => p.slug)).toEqual([
      "automacao-saude",
    ]);
  });

  it("requires every term to match, each in any field", () => {
    expect(searchPosts(posts, "react migracao").map((p) => p.slug)).toEqual([
      "react-19",
    ]);
    expect(searchPosts(posts, "react python")).toEqual([]);
  });
});
