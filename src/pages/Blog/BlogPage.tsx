import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/constants/blog-posts";
import { useLanguage } from "@/hooks/useLanguage";
import { searchPosts } from "@/utils/blog-search";
import { m as motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Digitar continua fluido mesmo se a lista crescer: o campo atualiza na hora,
  // a filtragem da grade acompanha em segundo plano.
  const deferredQuery = useDeferredValue(query);

  const sorted = useMemo(() => {
    const byTag = activeTag
      ? blogPosts.filter((p) => p.tags.includes(activeTag))
      : blogPosts;

    // Destaques primeiro, depois por data (mais recentes acima)
    return [...searchPosts(byTag, deferredQuery)].sort((a, b) => {
      if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [activeTag, deferredQuery]);

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

      <div className="relative min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[420px] grid-bg opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[420px] gradient-hero pointer-events-none" aria-hidden />
        <div className="container relative z-10 mx-auto px-4 pt-16 pb-28 max-w-7xl">
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
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              {/* O "x" nativo do type=search só existe em parte dos navegadores
                  e não é estilizável — escondemos e usamos o botão abaixo. */}
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("blog.searchPlaceholder")}
                aria-label={t("blog.searchLabel")}
                className="pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("blog.searchClear")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
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

          {/* Leitor de tela é avisado do resultado; quem enxerga vê a grade mudar */}
          <p className="sr-only" role="status" aria-live="polite">
            {t("blog.resultsCount").replace("{count}", String(sorted.length))}
          </p>

          {sorted.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {t("blog.noResults")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
