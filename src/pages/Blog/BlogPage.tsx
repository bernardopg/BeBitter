import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { blogPosts } from "@/constants/blog-posts";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { useState } from "react";
import { BlogCard } from "./BlogCard";

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <SEOHead
        title={`${t("blog.meta.title")} | Bernardo Gomes`}
        description={t("blog.meta.description")}
        keywords={
          language === "en"
            ? [
                "software engineering blog",
                "react",
                "typescript",
                "linux",
                "frontend",
              ]
            : [
                "blog engenharia de software",
                "react",
                "typescript",
                "linux",
                "frontend",
              ]
        }
        canonical="https://bebitterbebetter.com.br/blog"
        type="website"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />
      <StructuredData
        pageType="website"
        title={`${t("blog.meta.title")} | Bernardo Gomes`}
        description={t("blog.meta.description")}
        url="https://bebitterbebetter.com.br/blog"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold uppercase tracking-widest gradient-text mb-2">
              {t("blog.subtitle")}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("blog.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("blog.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTag === null
                  ? "gradient-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("blog.filterAll")}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "gradient-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
