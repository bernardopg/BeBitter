import { useLanguage } from "@/hooks/useLanguage";
import { IMAGES } from "@/constants/images";
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: string;
  robots?: string;
  publisher?: string;
}

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

function ensureMeta(name: string, content: string, prop = false) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const SEOHead = ({
  title = "Bernardo Gomes — Frontend, automation and Linux",
  description = "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows.",
  keywords = [
    "frontend engineer",
    "automation",
    "linux",
    "react",
    "typescript",
    "python",
    "fastapi",
    "healthcare workflows",
    "portfolio",
  ],
  ogImage = `${window.location.origin}${IMAGES.PROFILE_IMAGE}`,
  canonical,
  type = "website",
  robots = "index, follow",
  publisher = "Bernardo Gomes",
}: SEOHeadProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";

    const url =
      canonical || window.location.href.split("?")[0].split("#")[0];

    ensureMeta("description", description);
    ensureMeta("keywords", keywords.join(", "));
    ensureMeta("robots", robots);
    ensureMeta("publisher", publisher);
    ensureMeta("author", "Bernardo Gomes");
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", ogImage);
    ensureMeta("og:title", title, true);
    ensureMeta("og:description", description, true);
    ensureMeta("og:type", type, true);
    ensureMeta("og:image", ogImage, true);
    ensureMeta("og:url", url, true);
    ensureMeta("article:author", "Bernardo Gomes", true);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, keywords, ogImage, canonical, type, language, robots, publisher]);

  return null;
};

export default SEOHead;
