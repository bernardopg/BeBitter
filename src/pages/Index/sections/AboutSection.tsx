import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/contexts/projects-context";
import { useLanguage } from "@/hooks/useLanguage";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import {
  Award,
  Code,
  Heart,
  Monitor,
  Palette,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

export const AboutSection = () => {
  const { t } = useLanguage();
  const { registerElement, isVisible, getAnimationProps, getStaggeredAnimationProps } = useScrollAnimation();

  const { projects, techStack, totalStars, projectsLoading } = useProjects();

  const aboutRef = useRef<HTMLElement>(null);

  const aboutInView = isVisible('about');

  useEffect(() => {
    if (aboutRef.current) {
      registerElement(aboutRef.current, 'about');
    }
  }, [registerElement]);

  const skillCategories: SkillCategory[] = [
    {
      title: t("skills.frontend"),
      icon: <Monitor className="h-5 w-5" />,
      skills: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Design Systems",
      ],
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: t("skills.backend"),
      icon: <Code className="h-5 w-5" />,
      skills: ["Python", "FastAPI", "Selenium", "Parsing", "Telegram Bots", "Scraping"],
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: t("skills.tools"),
      icon: <Zap className="h-5 w-5" />,
      skills: ["Linux", "GTK4", "LibAdwaita", "QML", "Shell", "Arduino"],
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      title: t("skills.design"),
      icon: <Palette className="h-5 w-5" />,
      skills: ["Workflow Design", "Scheduling", "Study Tools", "Documentation", "UX Writing"],
      color: "text-rose-600 dark:text-rose-400",
    },
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("about.values.collaboration.title"),
      description: t("about.values.collaboration.description"),
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: t("about.values.passion.title"),
      description: t("about.values.passion.description"),
    },
  ];

  return (
    <section ref={aboutRef} className="py-12 md:py-20" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-3 mb-8 md:mb-16"
            {...getAnimationProps}
            animate={aboutInView ? getAnimationProps.animate : getAnimationProps.initial}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("about.subtitle")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("about.title")}
            </h2>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("about.description")}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={
              aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="text-center group card-enhanced">
              <CardHeader className="pb-2 px-3 pt-4 md:px-6 md:pt-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full gradient-secondary flex items-center justify-center mx-auto group-hover:gradient-primary group-hover:text-white transition-all duration-300">
                  <Code className="h-4 w-4 md:h-6 md:w-6 text-primary group-hover:text-white" />
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-4 md:px-6 md:pb-6">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  {projectsLoading ? "..." : projects.length}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("about.stats.projects")}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group card-enhanced">
              <CardHeader className="pb-2 px-3 pt-4 md:px-6 md:pt-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full gradient-secondary flex items-center justify-center mx-auto group-hover:gradient-primary group-hover:text-white transition-all duration-300">
                  <Star className="h-4 w-4 md:h-6 md:w-6 text-primary group-hover:text-white" />
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-4 md:px-6 md:pb-6">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  {projectsLoading ? "..." : techStack.length}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("about.stats.experience")}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group card-enhanced">
              <CardHeader className="pb-2 px-3 pt-4 md:px-6 md:pt-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full gradient-secondary flex items-center justify-center mx-auto group-hover:gradient-primary group-hover:text-white transition-all duration-300">
                  <Users className="h-4 w-4 md:h-6 md:w-6 text-primary group-hover:text-white" />
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-4 md:px-6 md:pb-6">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  {projectsLoading ? "..." : totalStars}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("about.stats.clients")}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="mb-8 md:mb-16"
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
              {t("about.skills.title")}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  {...getStaggeredAnimationProps(categoryIndex)}
                  animate={aboutInView ?
                    getStaggeredAnimationProps(categoryIndex).animate :
                    getStaggeredAnimationProps(categoryIndex).initial
                  }
                >
                  <Card className="h-full card-enhanced group">
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-lg flex items-center gap-2 ${category.color} group-hover:text-primary transition-colors`}>
                        {category.icon}
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Tech Stack from GitHub */}
            {techStack.length > 0 && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h4 className="text-lg font-semibold mb-4">
                  {t("about.skills.github")}
                </h4>
                <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                  {techStack.slice(0, 12).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {techStack.length > 12 && (
                    <Badge variant="outline" className="text-xs">
                      +{techStack.length - 12} {t("projects.more")}
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
              {t("about.values.title")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex sm:flex-col items-start sm:items-center gap-4 group text-left sm:text-center"
                  {...getStaggeredAnimationProps(index)}
                  animate={aboutInView ?
                    getStaggeredAnimationProps(index).animate :
                    getStaggeredAnimationProps(index).initial
                  }
                >
                  <div className="w-12 h-12 shrink-0 rounded-full gradient-secondary flex items-center justify-center sm:mx-auto sm:mb-2 group-hover:gradient-primary group-hover:scale-110 transition-all duration-300">
                    <div className="text-primary group-hover:text-white transition-colors">{value.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
