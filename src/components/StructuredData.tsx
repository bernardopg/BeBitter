import { IMAGES } from "@/constants/images";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";

interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width: number;
  height: number;
  caption: string;
}

interface PersonSchema {
  "@context": string;
  "@type": "Person";
  name: string;
  alternateName: string[];
  description: string;
  image: ImageObject;
  url: string;
  sameAs: string[];
  jobTitle: string;
  worksFor: {
    "@type": "Organization";
    name: string;
  };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    url: string;
    availableLanguage: string[];
  };
}

interface WebsiteSchema {
  "@context": string;
  "@type": "WebSite";
  name: string;
  alternateName: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Person";
    name: string;
    image: string;
  };
  inLanguage: string;
  copyrightHolder: {
    "@type": "Person";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

type StructuredDataSchema = PersonSchema | WebsiteSchema;

interface StructuredDataProps {
  pageType?: 'person' | 'website' | 'article';
  title?: string;
  description?: string;
  url?: string;
}

export const StructuredData = ({ 
  pageType = 'person',
  title = "Bernardo Gomes",
  description = "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows",
  url
}: StructuredDataProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    const currentUrl = url || window.location.href.split("?")[0].split("#")[0];
    const profileImageUrl = `${window.location.origin}${IMAGES.PROFILE_IMAGE}`;
    const logoUrl = `${window.location.origin}${IMAGES.BEBITTER_LOGO}`;

    // Remove existing structured data
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => script.remove());

    let structuredData: StructuredDataSchema;

    if (pageType === 'person') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bernardo Gomes",
        "alternateName": ["Bernardo Pereira Gomes", "BeBitter"],
        "description": language === 'en'
          ? "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows"
          : "Engenheiro de frontend, criador de automações e estudante de Medicina construindo produtos refinados para web, Linux e fluxos de trabalho em saúde",
        "image": {
          "@type": "ImageObject",
          "url": profileImageUrl,
          "width": 500,
          "height": 500,
          "caption": "Foto de perfil de Bernardo Gomes"
        },
        "url": currentUrl,
        "sameAs": [
          CONFIG.GITHUB_URL,
          CONFIG.LINKEDIN_URL,
          CONFIG.INSTAGRAM_URL,
          CONFIG.X_URL,
          CONFIG.TIKTOK_URL,
          CONFIG.WORDPRESS_URL
        ],
        "jobTitle": language === 'en' ? "Frontend Engineer" : "Engenheiro de Frontend",
        "worksFor": {
          "@type": "Organization",
          "name": "BeBitter & BeBetter"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belo Horizonte",
          "addressRegion": "MG",
          "addressCountry": "BR"
        },
        "knowsAbout": [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
          "FastAPI",
          "Frontend Development",
          "Automation",
          "Linux",
          "Product Engineering",
          "Healthcare Technology",
          "Open Source"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "professional",
          "url": CONFIG.WHATSAPP_URL,
          "availableLanguage": ["pt-BR", "en-US"]
        }
      };
    } else if (pageType === 'website') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BeBitter - Bernardo Gomes",
        "alternateName": "BeBitter",
        "description": description,
        "url": currentUrl,
        "author": {
          "@type": "Person",
          "name": "Bernardo Gomes"
        },
        "publisher": {
          "@type": "Person",
          "name": "Bernardo Gomes",
          "image": profileImageUrl
        },
        "inLanguage": language === 'en' ? "en-US" : "pt-BR",
        "copyrightHolder": {
          "@type": "Person",
          "name": "Bernardo Gomes"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${currentUrl}?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
    }

    // Add breadcrumb navigation
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        }
      ]
    };

    // Create combined structured data
    const combinedData = {
      "@context": "https://schema.org",
      "@graph": [structuredData, breadcrumbData]
    };

    // Add to document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.bebitterStructuredData = 'true';
    script.textContent = JSON.stringify(combinedData, null, 2);
    document.head.appendChild(script);

    // Add additional meta tags for rich snippets
    const updateOrCreateMeta = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(isProperty ? 'property' : 'name', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Enhanced meta tags for better SEO
    updateOrCreateMeta('og:image:width', '500', true);
    updateOrCreateMeta('og:image:height', '500', true);
    updateOrCreateMeta('og:image:type', 'image/jpeg', true);
    updateOrCreateMeta('og:image:alt', 'Foto de perfil de Bernardo Gomes', true);
    updateOrCreateMeta('og:locale', language === 'en' ? 'en_US' : 'pt_BR', true);
    updateOrCreateMeta('twitter:image:width', '500');
    updateOrCreateMeta('twitter:image:height', '500');
    updateOrCreateMeta('twitter:image:alt', 'Foto de perfil de Bernardo Gomes');
    updateOrCreateMeta('twitter:creator', '@cooldeflecha');
    updateOrCreateMeta('twitter:site', '@cooldeflecha');

  }, [pageType, title, description, url, language]);

  return null;
};

export default StructuredData;
