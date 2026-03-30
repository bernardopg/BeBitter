import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { GitHubIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import { CONFIG } from "@/constants/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/contexts/projects-context";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import {
  Code,
  ExternalLink,
  FolderOpen,
  Search,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const LANG_COLOR: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Shell: "bg-gray-500",
  C: "bg-slate-500",
  "C++": "bg-slate-600",
  Nix: "bg-indigo-400",
  QML: "bg-teal-500",
};

interface Project {
  title: string;
  description: string | null;
  technologies: string[];
  githubUrl: string;
  featured: boolean;
  stars: number;
  language?: string | null;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();
  const slug = project.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className={`group h-full card-enhanced relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
          project.featured
            ? "ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 to-transparent"
            : ""
        }`}
      >
        {project.featured && (
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-primary/30" />
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base group-hover:text-primary transition-colors truncate">
                {project.title}
              </CardTitle>
              {project.featured && (
                <Badge
                  variant="secondary"
                  className="mt-1 text-xs gradient-primary text-white border-0"
                >
                  ⭐ {t("projects.featured")}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <Star className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{project.stars}</span>
            </div>
          </div>

          <CardDescription className="text-sm leading-relaxed line-clamp-2 mt-2">
            {project.description ?? t("projects.empty.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {project.language && (
            <div className="flex items-center gap-1.5 mb-3">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  LANG_COLOR[project.language] ?? "bg-muted-foreground"
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {project.language}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="btn-enhanced flex-1 text-xs"
            >
              <Link to={`/projects/${slug}`}>
                <FolderOpen className="mr-1.5 h-3 w-3" />
                {t("projects.page.viewProject")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="px-2"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver no GitHub"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const { t, language } = useLanguage();
  const { projects, featuredProjects, totalStars, projectsLoading, projectsError } =
    useProjects();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"stars" | "name">("stars");

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const allTechs = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      for (const tech of p.technologies) {
        counts[tech] = (counts[tech] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tech]) => tech);
  }, [projects]);

  const filtered = useMemo(() => {
    let list = [...projects];

    if (activeFilter === "featured") {
      list = list.filter((p) => p.featured);
    } else if (activeFilter !== "all") {
      list = list.filter((p) => p.technologies.includes(activeFilter));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === "stars") {
      list.sort((a, b) => b.stars - a.stars);
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [projects, activeFilter, search, sortBy]);

  const title =
    language === "en"
      ? "Projects — Bernardo Gomes"
      : "Projetos — Bernardo Gomes";

  return (
    <>
      <SEOHead
        title={title}
        description={t("projects.page.description")}
        keywords={
          language === "en"
            ? ["projects", "portfolio", "react", "typescript", "python", "open source", "bernardo gomes"]
            : ["projetos", "portfólio", "react", "typescript", "python", "open source", "bernardo gomes"]
        }
        canonical="https://bebitterbebetter.com.br/projects"
        type="website"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />
      <StructuredData
        pageType="website"
        title={title}
        description={t("projects.page.description")}
        url="https://bebitterbebetter.com.br/projects"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("projects.page.subtitle")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t("projects.page.title")}
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("projects.page.description")}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                value: projectsLoading ? "…" : projects.length,
                label: t("projects.stats.total"),
              },
              {
                value: projectsLoading ? "…" : totalStars,
                label: t("projects.stats.stars"),
              },
              {
                value: projectsLoading ? "…" : featuredProjects.length,
                label: t("projects.stats.featured"),
              },
            ].map(({ value, label }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-muted/30 border">
                <div className="text-2xl font-bold gradient-text">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Search + Filter */}
          <motion.div
            className="mb-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("projects.page.search")}
                className="pl-10 pr-10"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              <button
                onClick={() => setActiveFilter("all")}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === "all"
                    ? "gradient-primary text-white"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {t("projects.page.filter.all")}
              </button>
              <button
                onClick={() => setActiveFilter("featured")}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === "featured"
                    ? "gradient-primary text-white"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                ⭐ {t("projects.page.filter.featured")}
              </button>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveFilter(tech)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === tech
                      ? "gradient-primary text-white"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between max-w-sm mx-auto">
              <span className="text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "projeto" : "projetos"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t("projects.page.sortBy")}:</span>
                <button
                  onClick={() => setSortBy(sortBy === "stars" ? "name" : "stars")}
                  className="text-xs text-primary hover:underline"
                >
                  {sortBy === "stars" ? t("projects.page.sort.stars") : t("projects.page.sort.name")}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Error */}
          {projectsError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("projects.error")}</p>
            </div>
          )}

          {/* Loading Skeleton */}
          {projectsLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border p-6 space-y-4"
                >
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded" />
                    <div className="h-2 bg-muted rounded w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-5 bg-muted rounded w-12" />
                    <div className="h-5 bg-muted rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {!projectsLoading && filtered.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!projectsLoading && filtered.length === 0 && !projectsError && (
            <div className="text-center py-20">
              <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground mb-4">
                {t("projects.page.noResults")}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
              >
                <X className="mr-2 h-4 w-4" />
                {t("projects.page.clearFilter")}
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          {!projectsLoading && (
            <motion.div
              className="text-center mt-16 pt-12 border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-muted-foreground mb-4">
                {language === "en"
                  ? "Find all repositories on GitHub"
                  : "Veja todos os repositórios no GitHub"}
              </p>
              <Button asChild variant="outline" className="btn-enhanced">
                <a
                  href={`https://github.com/${CONFIG.GITHUB_USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  @bernardopg
                  <ExternalLink className="ml-2 h-3 w-3 opacity-60" />
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
