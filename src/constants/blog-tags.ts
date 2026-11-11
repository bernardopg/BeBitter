import type { Language } from "@/contexts/language-context";

/**
 * Tags dos posts ficam em português nos dados (blog-posts*.ts) e funcionam como
 * chave do filtro. Este mapa só traduz o rótulo exibido; tags ausentes daqui
 * (React, Frontend, SEO…) já são iguais nos dois idiomas.
 */
const TAG_LABELS_EN: Record<string, string> = {
  Acessibilidade: "Accessibility",
  "Banco de Dados": "Databases",
  IA: "AI",
  "IA & Automação": "AI & Automation",
  Saúde: "Health",
  Segurança: "Security",
};

export function blogTagLabel(tag: string, language: Language): string {
  return language === "en" ? (TAG_LABELS_EN[tag] ?? tag) : tag;
}

/** Rótulos nos dois idiomas, para a busca achar "security" e "segurança". */
export function blogTagSearchTerms(tag: string): string[] {
  const en = TAG_LABELS_EN[tag];
  return en ? [tag, en] : [tag];
}
