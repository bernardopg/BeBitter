import { useAnalytics } from "@/components/Analytics";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectsContext";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Code, ExternalLink, Rocket, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ProjectsSection = () => {
  const { t } = useLanguage();
  const { trackButtonClick, trackProjectView } = useAnalytics();
  const { registerElement, isVisible, getAnimationProps, getStaggeredAnimationProps } = useScrollAnimation();

  const { projects, featuredProjects, totalStars, projectsLoading, projectsError } = useProjects();

  const projectsRef = useRef<HTMLElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projectsInView = isVisible('projects');

  useEffect(() => {
    if (projectsRef.current) {
      registerElement(projectsRef.current, 'projects');
    }
  }, [registerElement]);

  const displayProjects = showAllProjects ? projects : featuredProjects;

  const handleViewAllClick = () => {
    setShowAllProjects(!showAllProjects);
    trackButtonClick(showAllProjects ? "show_featured_projects" : "show_all_projects", "projects");
  };

  const handleProjectView = (projectName: string) => {
    trackProjectView(projectName, "projects_section");
  };

  if (projectsError) {
    return (
      <section ref={projectsRef} className="py-20" id="projects">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-muted-foreground">
              {t("projects.error")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={projectsRef} className="py-20 relative overflow-hidden" id="projects">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-secondary opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4 mb-16"
            {...getAnimationProps}
            animate={projectsInView ? getAnimationProps.animate : getAnimationProps.initial}
            transition={{
              ...getAnimationProps.transition,
              // Corrige o tipo de 'ease' para ser compatível com o tipo esperado pelo framer-motion
              ease: Array.isArray(getAnimationProps.transition?.ease)
                ? getAnimationProps.transition.ease
                : getAnimationProps.transition?.ease === undefined
                  ? undefined
                  : [getAnimationProps.transition.ease as Exclude<typeof getAnimationProps.transition.ease, unknown[]>],
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("projects.subtitle")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("projects.title")}
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("projects.description")}
            </p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-md mx-auto pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center group">
                <div className="text-2xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  {projectsLoading ? "..." : projects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("projects.stats.total")}
                </div>
              </div>

              <div className="text-center group">
                <div className="text-2xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  {projectsLoading ? "..." : totalStars}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("projects.stats.stars")}
                </div>
              </div>

              <div className="text-center group">
                <div className="text-2xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  {featuredProjects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("projects.stats.featured")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Loading State */}
          {projectsLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse glass rounded-lg p-6 space-y-4"
                >
                  <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                  <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted/50 rounded"></div>
                    <div className="h-2 bg-muted/50 rounded w-5/6"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted/50 rounded w-16"></div>
                    <div className="h-6 bg-muted/50 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {!projectsLoading && displayProjects.length > 0 && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  {...getStaggeredAnimationProps(index)}
                  animate={projectsInView ?
                    getStaggeredAnimationProps(index).animate :
                    getStaggeredAnimationProps(index).initial
                  }
                  onViewportEnter={() => handleProjectView(project.title)}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    featured={project.featured}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!projectsLoading && displayProjects.length === 0 && (
            <div className="text-center py-12">
              <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("projects.empty.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("projects.empty.description")}
              </p>
            </div>
          )}

          {/* View More/Less Button */}
          {!projectsLoading && projects.length > featuredProjects.length && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={
                projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="outline"
                onClick={handleViewAllClick}
                className="group btn-enhanced border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                {showAllProjects ? (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t("projects.showLess")}
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("projects.showAll")}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({projects.length - featuredProjects.length} more)
                    </span>
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
