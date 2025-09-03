import { useLanguage } from "@/hooks/useLanguage";
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

const SEOHead = ({
  title = "Bernardo Gomes — Desenvolvedor de Software",
  description = "Desenvolvedor full-stack em aplicações web rápidas e acessíveis. Especializado em Next.js, Node.js e AWS. Vamos construir juntos!",
  keywords = [
    "desenvolvedor",
    "software",
    "web",
    "cloud",
    "nextjs",
    "node",
    "aws",
    "react",
    "typescript",
    "portfolio",
  ],
  ogImage = "https://bebitterbebetter.com.br/images/logos/bebitter-logo.png",
  canonical,
  type = "website",
  robots = "index, follow",
  publisher = "Bernardo Gomes",
}: SEOHeadProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // Update robots meta tag
    const metaRobots = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement | null;
    if (metaRobots) {
      metaRobots.setAttribute("content", robots);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.setAttribute("name", "robots");
      newMeta.setAttribute("content", robots);
      document.head.appendChild(newMeta);
    }

    // Update publisher meta tag
    const metaPublisher = document.querySelector(
      'meta[name="publisher"]'
    ) as HTMLMetaElement | null;
    if (metaPublisher) {
      metaPublisher.setAttribute("content", publisher);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.setAttribute("name", "publisher");
      newMeta.setAttribute("content", publisher);
      document.head.appendChild(newMeta);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    // Update Open Graph type
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute("content", type);
    }

    // Update Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute("content", ogImage);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }

    // Update Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute("content", ogImage);
    }

    // Update Twitter card
    const twitterCard = document.querySelector(
      'meta[name="twitter:card"]'
    ) as HTMLMetaElement | null;
    if (twitterCard) {
      twitterCard.setAttribute("content", "summary_large_image");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.setAttribute("name", "twitter:card");
      newMeta.setAttribute("content", "summary_large_image");
      document.head.appendChild(newMeta);
    }

    // Update canonical URL if provided
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Update author meta tag
    const metaAuthor = document.querySelector(
      'meta[name="author"]'
    ) as HTMLMetaElement | null;
    if (metaAuthor) {
      metaAuthor.setAttribute("content", "Bernardo Gomes");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.setAttribute("name", "author");
      newMeta.setAttribute("content", "Bernardo Gomes");
      document.head.appendChild(newMeta);
    }

    // Update article:author meta tag
    const articleAuthor = document.querySelector(
      'meta[property="article:author"]'
    ) as HTMLMetaElement | null;
    if (articleAuthor) {
      articleAuthor.setAttribute("content", "Bernardo Gomes");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.setAttribute("property", "article:author");
      newMeta.setAttribute("content", "Bernardo Gomes");
      document.head.appendChild(newMeta);
    }

    // Update Open Graph URL based on current location
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const currentUrl =
        canonical || window.location.href.split("?")[0].split("#")[0];
      ogUrl.setAttribute("content", currentUrl);
    }

    // Update HTML lang attribute
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
  }, [
    title,
    description,
    keywords,
    ogImage,
    canonical,
    type,
    language,
    robots,
    publisher,
  ]);

  return null;
};

export default SEOHead;
