import { useAnalytics } from "@/components/Analytics";
import { BlogCover } from "@/components/BlogCover";
import { CONFIG } from "@/constants/config";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts, type ContentSection } from "@/constants/blog-posts";
import { useLanguage } from "@/hooks/useLanguage";
import { m as motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

function renderSection(section: ContentSection, index: number) {
  switch (section.type) {
    case "heading":
      if (section.level === 2) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold mt-10 mb-4 text-foreground"
          >
            {section.content}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="text-xl font-semibold mt-8 mb-3 text-foreground"
        >
          {section.content}
        </h3>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="text-muted-foreground leading-relaxed mb-4"
        >
          {section.content}
        </p>
      );

    case "code":
      return (
        <div key={index} className="my-6">
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-1.5 rounded-t-lg border border-border border-b-0">
            <span className="text-xs text-muted-foreground font-mono">
              {section.language}
            </span>
          </div>
          <pre className="bg-muted/30 border border-border rounded-b-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
              {section.content}
            </code>
          </pre>
        </div>
      );

    case "list":
      return (
        <ul
          key={index}
          className="list-disc list-inside space-y-2 mb-4 text-muted-foreground"
        >
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const styles = {
        info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
        tip: "bg-green-500/10 border-green-500/30 text-green-400",
      };
      const icons = { info: "ℹ️", warning: "⚠️", tip: "💡" };
      return (
        <div
          key={index}
          className={`flex gap-3 p-4 rounded-lg border my-6 ${styles[section.variant]}`}
        >
          <span className="text-lg flex-shrink-0">{icons[section.variant]}</span>
          <p className="text-sm leading-relaxed">{section.content}</p>
        </div>
      );
    }
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const startTimeRef = useRef<number>(0);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;

    trackEvent({
      event_name: "blog_post_view",
      event_category: "Blog",
      event_label: post.slug,
      custom_parameters: {
        post_title: post.titleEn || post.title,
        post_tags: post.tags.join(","),
        reading_time: post.readingTime,
        post_date: post.date,
      },
    });

    startTimeRef.current = Date.now();
    scrollMilestonesRef.current = new Set();

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackEvent({
            event_name: "blog_scroll_depth",
            event_category: "Blog Engagement",
            event_label: post.slug,
            value: milestone,
            custom_parameters: {
              post_title: post.titleEn || post.title,
              scroll_depth_pct: milestone,
            },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) {
        trackEvent({
          event_name: "blog_time_spent",
          event_category: "Blog Engagement",
          event_label: post.slug,
          value: timeSpent,
          custom_parameters: {
            post_title: post.titleEn || post.title,
            time_seconds: timeSpent,
            reading_time_minutes: post.readingTime,
          },
        });
      }
    };
  }, [post, trackEvent]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t("blog.notFound")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("blog.notFoundDescription")}
          </p>
          <Button asChild>
            <Link to="/blog">{t("blog.backToBlog")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const title = language === "en" && post.titleEn ? post.titleEn : post.title;
  const excerpt =
    language === "en" && post.excerptEn ? post.excerptEn : post.excerpt;

  const formattedDate = new Date(post.date).toLocaleDateString(
    language === "en" ? "en-US" : "pt-BR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const canonicalUrl = `https://bebitterbebetter.com.br/blog/${post.slug}`;

  const wordCount = post.content.reduce((total, section) => {
    const text =
      "content" in section ? section.content : section.items.join(" ");
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);

  return (
    <>
      <SEOHead
        title={`${post.titleEn || post.title} | Bernardo Gomes`}
        description={post.excerptEn || post.excerpt}
        keywords={post.tags}
        canonical={canonicalUrl}
        type="article"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />
      <StructuredData
        pageType="article"
        title={post.titleEn || post.title}
        description={post.excerptEn || post.excerpt}
        url={canonicalUrl}
        datePublished={post.date}
        dateModified={post.updatedAt ?? post.date}
        author={post.author}
        keywords={post.tags}
        wordCount={wordCount}
        readingTimeMinutes={post.readingTime}
      />

      <div className="relative min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[360px] gradient-hero pointer-events-none" aria-hidden />
        <div className="container relative z-10 mx-auto px-4 pt-16 pb-28 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="ghost" size="sm" className="mb-6 group">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {t("blog.backToBlog")}
              </Link>
            </Button>

            <BlogCover
              slug={post.slug}
              tags={post.tags}
              className="mb-8 aspect-[2/1] w-full rounded-2xl border"
              iconClassName="h-56 w-56"
            />

            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                <span>
                  {t("blog.publishedOn")}{" "}
                  <time dateTime={post.date}>{formattedDate}</time>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} {t("blog.readingTime")}
                </span>
                <span>·</span>
                <span>
                  {t("blog.by")} {post.author}
                </span>
              </div>
            </header>

            <article>
              {post.content.map((section, i) => renderSection(section, i))}
            </article>

            <footer className="mt-12 pt-8 border-t border-border">
              <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8 text-center">
                <h2 className="text-xl font-bold mb-2">
                  {language === "en"
                    ? "Got a product, automation, or idea in motion?"
                    : "Tem um produto, automação ou ideia em andamento?"}
                </h2>
                <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                  {language === "en"
                    ? "Let's talk about scope, constraints, and impact."
                    : "Vamos falar sobre escopo, restrições e impacto."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild variant="gradient" className="btn-enhanced">
                    <a href={CONFIG.WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      {language === "en" ? "Open WhatsApp" : "Abrir WhatsApp"}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t("blog.backToBlog")}
                    </Link>
                  </Button>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      </div>
    </>
  );
}
