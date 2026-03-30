import SEOHead from "@/components/SEOHead";
import { GitHubIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/contexts/projects-context";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  FolderOpen,
  GitFork,
  Star,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
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

const formatDate = (iso: string, language: string) => {
  return new Date(iso).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Estilos aplicados ao HTML renderizado pelo GitHub API.
// O GitHub retorna HTML com URLs absolutas, emojis e imagens já resolvidos.
const README_PROSE_STYLES = [
  "text-sm leading-relaxed text-muted-foreground",
  // Headings
  "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:pb-2 [&_h1]:border-b",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:pb-1 [&_h2]:border-b",
  "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2",
  "[&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-3 [&_h4]:mb-1",
  // Paragraphs
  "[&_p]:mb-3 [&_p]:leading-relaxed",
  // Lists
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1",
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1",
  "[&_li]:leading-relaxed",
  // Code
  "[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-foreground",
  "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:text-xs",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs",
  // Links
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary/80",
  // Blockquote
  "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3",
  // Tables
  "[&_table]:w-full [&_table]:text-xs [&_table]:mb-4 [&_table]:border-collapse",
  "[&_th]:text-left [&_th]:font-semibold [&_th]:p-2 [&_th]:border [&_th]:border-muted [&_th]:bg-muted/30",
  "[&_td]:p-2 [&_td]:border [&_td]:border-muted",
  "[&_tr:nth-child(even)]:bg-muted/10",
  // Horizontal rule
  "[&_hr]:border-muted [&_hr]:my-6",
  // Images — absolutas graças ao GitHub HTML renderer
  "[&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-3 [&_img]:mx-auto [&_img]:block",
  // Details/summary
  "[&_details]:my-3 [&_summary]:cursor-pointer [&_summary]:font-medium",
  // Alerts (GitHub markdown alerts)
  "[&_.markdown-alert]:rounded-lg [&_.markdown-alert]:p-4 [&_.markdown-alert]:mb-4 [&_.markdown-alert]:border",
].join(" ");

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { data: project, isPending, isError, error } = useProjectDetail(slug ?? "");
  const { projects } = useProjects();

  const [mainRef, mainInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [readmeRef, readmeInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [relatedRef, relatedInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const related = projects
    .filter(
      (p) =>
        p.title !== slug &&
        p.technologies.some((t) => project?.topics.includes(t))
    )
    .slice(0, 3);

  const pageTitle = project
    ? `${project.name} — Bernardo Gomes`
    : t("projects.detail.notFound");
  const readmeHtml = project?.readme ?? null;

  if (isError) {
    const is404 = (error as Error).message.includes("not found");
    return (
      <>
        <SEOHead
          title={pageTitle}
          description={t("projects.detail.notFoundDesc")}
          canonical={`https://bebitterbebetter.com.br/projects/${slug}`}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3">
              {is404 ? t("projects.detail.notFound") : "Erro ao carregar"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t("projects.detail.notFoundDesc")}
            </p>
            <Button asChild variant="outline">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("projects.detail.back")}
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={project?.description ?? t("projects.page.description")}
        keywords={project?.topics ?? []}
        canonical={`https://bebitterbebetter.com.br/projects/${slug}`}
        type="article"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("projects.detail.back")}
              </Link>
            </Button>
          </motion.div>

          {/* Loading state */}
          {isPending && (
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-muted rounded w-2/3" />
              <div className="h-5 bg-muted rounded w-full" />
              <div className="h-5 bg-muted rounded w-4/5" />
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded-xl" />
                ))}
              </div>
              <div className="h-64 bg-muted rounded-xl" />
            </div>
          )}

          {/* Main content */}
          {project && (
            <>
              <motion.div
                ref={mainRef}
                initial={{ opacity: 0, y: 20 }}
                animate={mainInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                {/* Title row */}
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text flex-1">
                    {project.name}
                  </h1>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.language && (
                    <Badge className={`${LANG_COLOR[project.language] ?? "bg-muted"} text-white border-0 gap-1.5`}>
                      <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
                      {project.language}
                    </Badge>
                  )}
                  {project.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      <Tag className="mr-1 h-2.5 w-2.5" />
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: Star, value: project.stars, label: t("projects.detail.stars") },
                    { icon: GitFork, value: project.forks, label: t("projects.detail.forks") },
                    { icon: AlertCircle, value: project.openIssues, label: t("projects.detail.openIssues") },
                  ].map(({ icon: Icon, value, label }) => (
                    <div
                      key={label}
                      className="text-center p-4 rounded-xl bg-muted/30 border hover:border-primary/30 transition-colors"
                    >
                      <Icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <div className="text-xl font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Dates */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
                  <span>
                    {t("projects.detail.createdAt")}: {formatDate(project.createdAt, language)}
                  </span>
                  <span>
                    {t("projects.detail.updatedAt")}: {formatDate(project.updatedAt, language)}
                  </span>
                  {project.license && <span>License: {project.license}</span>}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="gradient-primary text-white border-0 btn-enhanced">
                    <a href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="mr-2 h-4 w-4" />
                      {t("projects.detail.viewOnGitHub")}
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button asChild variant="outline" className="btn-enhanced">
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t("projects.live")}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* README */}
              <motion.div
                ref={readmeRef}
                initial={{ opacity: 0, y: 20 }}
                animate={readmeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t("projects.detail.readme")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {readmeHtml ? (
                      <div className="overflow-x-auto">
                        <div
                          className={README_PROSE_STYLES}
                          dangerouslySetInnerHTML={{
                            __html: readmeHtml,
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        {t("projects.detail.readmeEmpty")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Projects */}
              {related.length > 0 && (
                <motion.div
                  ref={relatedRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold mb-6">
                    {t("projects.detail.relatedProjects")}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {related.map((p) => (
                      <Link key={p.title} to={`/projects/${p.title}`}>
                        <Card className="card-enhanced group hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate flex-1">
                                {p.title}
                              </h3>
                              <div className="flex items-center gap-1 text-muted-foreground ml-2 shrink-0">
                                <Star className="h-3 w-3" />
                                <span className="text-xs">{p.stars}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {p.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {p.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs py-0">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
