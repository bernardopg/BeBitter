/**
 * Convenção de nomes das imagens Open Graph geradas no build
 * (scripts/generate-og-images.ts). Compartilhado entre runtime e scripts.
 */
export function ogImageNameForPath(path: string): string {
  const clean = path.replace(/\/+$/, "");
  if (clean === "" || clean === "/") return "home";
  return clean.replace(/^\//, "").replace(/\//g, "-");
}

export function ogImageUrlForPath(baseUrl: string, path: string): string {
  return `${baseUrl}/images/og/${ogImageNameForPath(path)}.png`;
}

/** Versões adicionais da capa para resultados de artigos. */
export const articleImageVariants = [
  { suffix: "16x9", width: 1200, height: 675 },
  { suffix: "4x3", width: 1200, height: 900 },
  { suffix: "1x1", width: 1200, height: 1200 },
] as const;

export function articleImageUrls(baseUrl: string, path: string): string[] {
  const name = ogImageNameForPath(path);
  return articleImageVariants.map(({ suffix }) => `${baseUrl}/images/og/${name}-${suffix}.png`);
}
