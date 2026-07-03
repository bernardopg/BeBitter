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
