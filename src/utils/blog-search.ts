import type { BlogPost } from "@/constants/blog-posts";

/**
 * Busca client-side nos posts do blog.
 *
 * ponytail: 13 posts cabem num filter linear — sem índice invertido nem
 * fuse.js. Reavaliar se a contagem passar de ~200 posts, quando o custo por
 * tecla começa a aparecer.
 */

/** Minúsculas e sem acento, para "Automacao" casar com "Automação". */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * Filtra por termo livre em título, resumo e tags — nos dois idiomas, para que
 * a busca funcione igual independente do idioma ativo.
 *
 * Todos os termos precisam casar (AND), cada um em qualquer campo: "react
 * performance" acha o post que tem "React" no título e "performance" na tag.
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return posts;

  return posts.filter((post) => {
    const haystack = normalize(
      [post.title, post.titleEn, post.excerpt, post.excerptEn, ...post.tags].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}
