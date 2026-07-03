import { IMAGES } from "@/constants/images";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { ogImageUrlForPath } from "@/utils/og";
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

interface SoftwareMeta {
  repoUrl: string;
  language?: string | null;
  license?: string | null;
  stars?: number;
  topics?: string[];
  dateCreated?: string;
  dateModified?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  pageType?: 'person' | 'website' | 'article' | 'service' | 'software';
  title?: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  wordCount?: number;
  readingTimeMinutes?: number;
  software?: SoftwareMeta;
  faq?: FaqItem[];
}

export const StructuredData = ({
  pageType = 'person',
  title = "Bernardo Gomes",
  description = "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows",
  url,
  datePublished,
  dateModified,
  author,
  keywords,
  wordCount,
  readingTimeMinutes,
  software,
  faq,
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
          CONFIG.GITLAB_URL,
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
    } else if (pageType === 'article') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "url": currentUrl,
        "datePublished": datePublished ?? new Date().toISOString(),
        "dateModified": dateModified ?? datePublished ?? new Date().toISOString(),
        "author": {
          "@type": "Person",
          "name": author ?? "Bernardo Gomes",
          "url": "https://bebitterbebetter.com.br",
        },
        "publisher": {
          "@type": "Person",
          "name": "Bernardo Gomes",
          "image": profileImageUrl,
        },
        "image": profileImageUrl,
        "inLanguage": "pt-BR",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        ...(keywords?.length ? { "keywords": keywords.join(", ") } : {}),
        ...(wordCount ? { "wordCount": wordCount } : {}),
        ...(readingTimeMinutes
          ? { "timeRequired": `PT${readingTimeMinutes}M` }
          : {}),
        ...(keywords?.length ? { "articleSection": keywords[0] } : {}),
      } as unknown as StructuredDataSchema;
    } else if (pageType === 'software' && software) {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": title,
        "description": description,
        "url": currentUrl,
        "codeRepository": software.repoUrl,
        ...(software.language
          ? { "programmingLanguage": software.language }
          : {}),
        ...(software.license ? { "license": software.license } : {}),
        ...(software.topics?.length
          ? { "keywords": software.topics.join(", ") }
          : {}),
        ...(software.dateCreated ? { "dateCreated": software.dateCreated } : {}),
        ...(software.dateModified
          ? { "dateModified": software.dateModified }
          : {}),
        ...(typeof software.stars === "number"
          ? {
              "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/LikeAction",
                "userInteractionCount": software.stars,
              },
            }
          : {}),
        "author": {
          "@type": "Person",
          "name": "Bernardo Gomes",
          "url": "https://bebitterbebetter.com.br",
        },
        "isAccessibleForFree": true,
      } as unknown as StructuredDataSchema;
    } else if (pageType === 'service') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Bernardo Gomes — Frontend, Automação e Software sob medida",
        "description": description,
        "url": currentUrl,
        "image": profileImageUrl,
        "logo": logoUrl,
        "priceRange": "$$",
        "areaServed": ["BR", "Worldwide", "Remote"],
        "availableLanguage": ["pt-BR", "en-US"],
        "founder": { "@type": "Person", "name": "Bernardo Gomes" },
        "provider": {
          "@type": "Person",
          "name": "Bernardo Gomes",
          "url": "https://bebitterbebetter.com.br",
          "sameAs": [CONFIG.GITHUB_URL, CONFIG.GITLAB_URL, CONFIG.LINKEDIN_URL],
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belo Horizonte",
          "addressRegion": "MG",
          "addressCountry": "BR",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": CONFIG.WHATSAPP_URL,
          "availableLanguage": ["pt-BR", "en-US"],
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": language === 'en' ? "Services" : "Serviços",
          "itemListElement": [
            "Frontend Product Engineering",
            language === 'en' ? "Automation and workflows" : "Automações e workflows",
            language === 'en' ? "Internal tools and dashboards" : "Ferramentas internas e dashboards",
            "Linux-native tooling",
          ].map((name) => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": name },
          })),
        },
      } as unknown as StructuredDataSchema;
    } else {
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

    // FAQPage (quando a página tem FAQ visível correspondente)
    const faqData = faq?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        }
      : null;

    // Create combined structured data
    const combinedData = {
      "@context": "https://schema.org",
      "@graph": [structuredData, breadcrumbData, ...(faqData ? [faqData] : [])]
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

    // Enhanced meta tags for better SEO — imagem OG gerada por rota no build
    const ogImage = ogImageUrlForPath(
      window.location.origin,
      window.location.pathname
    );
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:image:width', '1200', true);
    updateOrCreateMeta('og:image:height', '630', true);
    updateOrCreateMeta('og:image:type', 'image/png', true);
    updateOrCreateMeta('og:image:alt', title, true);
    updateOrCreateMeta('og:locale', language === 'en' ? 'en_US' : 'pt_BR', true);
    updateOrCreateMeta('twitter:image', ogImage);
    updateOrCreateMeta('twitter:image:alt', title);
    updateOrCreateMeta('twitter:creator', '@cooldeflecha');
    updateOrCreateMeta('twitter:site', '@cooldeflecha');

  }, [pageType, title, description, url, language, datePublished, dateModified, author, keywords, wordCount, readingTimeMinutes, software, faq]);

  return null;
};

export default StructuredData;
