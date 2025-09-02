import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: string;
}

const SEOHead = ({
  title = "Bernardo Gomes — Desenvolvedor de Software",
  description = "Desenvolvedor full-stack especializado em aplicações web rápidas e acessíveis. Crio soluções com Next.js, Node.js e AWS. Vamos construir algo incrível juntos!",
  keywords = ["desenvolvedor", "software", "web", "cloud", "nextjs", "node", "aws", "react", "typescript", "portfolio"],
  ogImage = "https://bebitterbebetter.com.br/images/logos/bebitter-logo.png",
  canonical,
  type = "website"
}: SEOHeadProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update Open Graph type
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', type);
    }

    // Update Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Update Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }

    // Update canonical URL if provided
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Update Open Graph URL based on current location
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const currentUrl = canonical || window.location.href.split('?')[0].split('#')[0];
      ogUrl.setAttribute('content', currentUrl);
    }

    // Update HTML lang attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';

  }, [title, description, keywords, ogImage, canonical, type, language]);

  return null; // This component doesn't render anything
};

export default SEOHead;
