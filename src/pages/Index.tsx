import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "@/components/ui/image";
import { IMAGES } from "@/constants/images";
import { useLanguage } from "@/hooks/useLanguage";
import { showSuccess } from "@/utils/toast";
import {
  Calendar,
  Clock,
  Code,
  Coffee,
  ExternalLink,
  Github,
  Instagram,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Palette,
  Phone,
  Star,
  Users,
  Zap,
  Sparkles,
  Target,
  Rocket,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnalytics } from "@/components/Analytics";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  stars?: number;
  featured?: boolean;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
}

interface GitHubLanguageResponse {
  [language: string]: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const Index = () => {
  const { t } = useLanguage();
  const { trackButtonClick, trackExternalLink, trackContactAttempt, trackProjectView } = useAnalytics();

  const [techStack, setTechStack] = useState<string[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Animation refs
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Enhanced fallback data with featured flag
  const fallbackTechStack = useMemo(() => [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Figma",
    "Tailwind CSS",
    "Next.js",
    "Docker",
  ], []);

  const fallbackProjects = useMemo(() => [
    {
      title: t("projects.p1.title"),
      description: t("projects.p1.description"),
      technologies: [
        "JavaScript",
        "Userscript",
        "Tampermonkey",
        "DOM Manipulation",
      ],
      githubUrl: "https://github.com/bernardopg/primevideo-enhancer",
      featured: true,
    },
    {
      title: t("projects.p2.title"),
      description: t("projects.p2.description"),
      technologies: [
        "JavaScript",
        "Steam API",
        "Userscript",
        "Automation",
      ],
      githubUrl: "https://github.com/bernardopg/steam-rep4rep",
    },
    {
      title: t("projects.p3.title"),
      description: t("projects.p3.description"),
      technologies: ["JavaScript", "Automation", "Web Scraping"],
      githubUrl: "https://github.com/bernardopg/steam-infinite-wishlist",
    },
  ], [t]);

  // Enhanced skill categories
  const skillCategories = useMemo((): SkillCategory[] => [
    {
      title: t("skills.frontend"),
      icon: <Monitor className="h-5 w-5" />,
      skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Next.js"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t("skills.backend"),
      icon: <Code className="h-5 w-5" />,
      skills: ["Node.js", "Python", "APIs", "Git", "Database", "GraphQL"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t("skills.designTools"),
      icon: <Palette className="h-5 w-5" />,
      skills: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping", "UI/UX"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: t("skills.designSkills"),
      icon: <Target className="h-5 w-5" />,
      skills: ["Responsive Design", "User Research", "Wireframing", "Visual Design", "Design Systems"],
      color: "from-orange-500 to-red-500"
    }
  ], [t]);

  // Enhanced core expertise
  const coreExpertise = useMemo(() => [
    {
      icon: <Code className="h-6 w-6" />,
      title: t("about.fullstack"),
      description: "Desenvolvimento completo de aplicações web modernas",
      color: "text-blue-600"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: t("about.uiux"),
      description: "Design de interfaces intuitivas e experiências memoráveis",
      color: "text-purple-600"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: t("about.website"),
      description: "Websites rápidos, responsivos e otimizados para SEO",
      color: "text-green-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Otimização de performance e melhores práticas",
      color: "text-yellow-600"
    }
  ], [t]);

  // Enhanced stats
  const stats = useMemo(() => [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: t("about.experience"),
      value: t("about.years"),
      color: "text-blue-600"
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: t("about.projects"),
      value: t("about.projectsCount"),
      color: "text-yellow-600"
    },
    {
      icon: <Palette className="h-5 w-5" />,
      label: t("about.designs"),
      value: t("about.designsCount"),
      color: "text-purple-600"
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      label: t("about.coffee"),
      value: t("about.coffeeCount"),
      color: "text-brown-600"
    }
  ], [t]);

  // Social links
  const socialLinks = useMemo(() => [
    {
      icon: <Github className="h-5 w-5" />,
      label: t("hero.github"),
      url: "https://github.com/bernardopg",
      variant: "default" as const,
      aria: "Visitar perfil no GitHub de Bernardo Gomes"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/bernardopg",
      variant: "outline" as const,
      aria: "Visitar perfil no LinkedIn de Bernardo Gomes"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: t("hero.instagram"),
      url: "https://instagram.com/be.pgomes",
      variant: "outline" as const,
      aria: "Visitar perfil no Instagram de Bernardo Gomes"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("hero.contact"),
      url: "mailto:bernardo.gomes@bebitterbebetter.com.br",
      variant: "outline" as const,
      aria: "Enviar e-mail para Bernardo Gomes"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      url: "https://wa.me/5531984916431",
      variant: "outline" as const,
      aria: "Iniciar conversa no WhatsApp com Bernardo Gomes"
    }
  ], [t]);

  // Handle email copy with enhanced feedback
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("bernardo.gomes@bebitterbebetter.com.br");
      setCopiedEmail(true);
      showSuccess(t("contact.copyEmail"));
      trackButtonClick("Copy Email", "Contact Section");
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }, [t, trackButtonClick]);

  // Handle social link clicks with analytics
  const handleSocialClick = useCallback((platform: string, url: string) => {
    trackExternalLink(url, platform);
    if (platform.includes('mail')) {
      trackContactAttempt('Email');
    } else if (platform.includes('WhatsApp')) {
      trackContactAttempt('WhatsApp');
    }
  }, [trackExternalLink, trackContactAttempt]);

  // Handle project view with analytics
  const handleProjectClick = useCallback((projectTitle: string, url: string) => {
    trackProjectView(projectTitle, 'Featured Projects');
    trackExternalLink(url, projectTitle);
  }, [trackProjectView, trackExternalLink]);

  const fetchGitHubData = useCallback(async () => {
    // Check if we have cached data that's still fresh (< 1 hour)
    const cachedData = localStorage.getItem('github-data');
    const cacheTimestamp = localStorage.getItem('github-data-timestamp');

    if (cachedData && cacheTimestamp) {
      const isDataFresh = Date.now() - parseInt(cacheTimestamp) < 60 * 60 * 1000; // 1 hour
      if (isDataFresh) {
        try {
          const parsed = JSON.parse(cachedData);
          setTechStack(parsed.techStack || fallbackTechStack);
          setFeaturedProjects(parsed.projects || fallbackProjects);
          setLoading(false);
          return;
        } catch (e) {
          console.warn("Failed to parse cached GitHub data:", e);
        }
      }
    }

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const reposResponse = await fetch(
        "https://api.github.com/users/bernardopg/repos?sort=updated&per_page=10",
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!reposResponse.ok) {
        throw new Error(`HTTP error! status: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      // Get languages with timeout and error handling
      const languages = new Set<string>();
      const languagePromises = repos.slice(0, 5).map(async (repo: GitHubRepo) => {
        try {
          const langController = new AbortController();
          const langTimeoutId = setTimeout(() => langController.abort(), 5000); // 5 second timeout

          const langResponse = await fetch(
            `https://api.github.com/repos/bernardopg/${repo.name}/languages`,
            { signal: langController.signal }
          );

          clearTimeout(langTimeoutId);

          if (langResponse.ok) {
            const langs: GitHubLanguageResponse = await langResponse.json();
            Object.keys(langs).forEach((lang) => languages.add(lang));
          }
        } catch (e) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, e);
        }
      });

      // Add fallback technologies if API fails to get languages
      await Promise.allSettled(languagePromises);
      const techStackArray = languages.size > 0 ? Array.from(languages) : fallbackTechStack;
      setTechStack(techStackArray);

      // Set projects with better error handling
      const projects = repos.slice(0, 3).map((repo: GitHubRepo) => ({
        title: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: repo.description || "Projeto de código aberto desenvolvido com foco em qualidade e performance.",
        technologies: [],
        githubUrl: repo.html_url,
        stars: repo.stargazers_count || 0,
      }));
      setFeaturedProjects(projects.length > 0 ? projects : fallbackProjects);

      // Cache successful results
      const dataToCache = {
        techStack: techStackArray,
        projects: projects.length > 0 ? projects : fallbackProjects
      };
      localStorage.setItem('github-data', JSON.stringify(dataToCache));
      localStorage.setItem('github-data-timestamp', Date.now().toString());

    } catch (error) {
      console.error("Error fetching GitHub data:", error);

      // Enhanced error handling with specific error messages
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('GitHub API request timed out, using fallback data');
        } else if (error.message.includes('rate limit')) {
          console.warn('GitHub API rate limit reached, using fallback data');
        } else {
          console.warn('GitHub API error:', error.message);
        }
      }

      setTechStack(fallbackTechStack);
      setFeaturedProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  }, [fallbackTechStack, fallbackProjects]);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {t("hero.skipToContent")}
      </a>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando conteúdo...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="mb-20 text-center"
          id="main-content"
          role="main"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10">
            {/* Profile Image with enhanced animation */}
            <motion.div
              className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl relative group"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={IMAGES.GITHUB_AVATAR}
                alt="Foto de perfil de Bernardo Gomes, desenvolvedor de software"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                lazy={false}
                width={160}
                height={160}
                priority={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Enhanced title with animation */}
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("hero.title")}
            </motion.h1>

            {/* Enhanced subtitle with typing effect simulation */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Enhanced status indicators */}
            <motion.div
              className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t("hero.location")}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{t("hero.availability")}</span>
              </motion.div>
            </motion.div>

            {/* Enhanced social links with staggered animation */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    variant={link.variant}
                    size="lg"
                    className="group relative overflow-hidden"
                    aria-label={link.aria}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                      <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          ref={aboutRef}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          {/* Main About Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Text Content */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Enhanced description with cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Desenvolvedor</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t("about.description1")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Designer</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t("about.description2")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Core Expertise */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  {t("about.expertise")}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {coreExpertise.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={`p-4 rounded-xl bg-gradient-to-br ${item.color.replace('text-', 'from-')}/10 to-transparent border border-${item.color.replace('text-', '')}/20 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/10`}>
                          <div className={item.color}>
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats & Quick Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Enhanced Stats Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t("about.stats")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-primary/10`}>
                          <div className={stat.color}>
                            {stat.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <span className={`font-bold ${stat.color}`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Enhanced Current Status */}
              <Card className="hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    {t("about.status")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {t("about.available")}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t("about.location")}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t("about.collaboration")}
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enhanced Tech Stack */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              {t("about.techstack")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.length > 0 ? (
                techStack.map((tech, index) => (
                  <motion.div
                    key={`${tech}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={aboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm py-2 px-4 cursor-pointer hover:shadow-md transition-all duration-200"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Carregando tecnologias...
                </div>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          ref={projectsRef}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              {t("projects.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={projectsInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center text-muted-foreground flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Carregando projetos...
              </motion.div>
            )}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group relative overflow-hidden"
            >
              <a
                href="https://github.com/bernardopg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver todos os projetos no GitHub"
                className="flex items-center gap-2"
              >
                <Github className="mr-2 h-4 w-4" />
                {t("projects.viewAll")}
                <ExternalLink className="ml-2 h-4 w-4" />
                <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          ref={skillsRef}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Clock className="h-8 w-8 text-primary" />
              {t("timeline.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Timeline />
          </motion.div>
        </motion.section>

        {/* Enhanced Skills & Technologies */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              {t("skills.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={skillsInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/10 group">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.icon}
                    </motion.div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={skillsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, delay: 0.5 + skillIndex * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs py-1 px-2 cursor-pointer hover:shadow-md transition-all duration-200 group-hover:border-primary/50"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Contact Section */}
        <motion.section
          ref={contactRef}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              {t("contact.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Enhanced Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    {t("contact.getInTouch")}
                  </CardTitle>
                  <CardDescription>{t("contact.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Enhanced Email */}
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{t("contact.email")}</div>
                      <div className="text-sm text-muted-foreground truncate" title="bernardo.gomes@bebitterbebetter.com.br">
                        bernardo.gomes@bebitterbebetter.com.br
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-shrink-0 transition-all duration-200 ${copiedEmail ? 'bg-green-500 text-white border-green-500' : ''}`}
                      onClick={handleCopyEmail}
                    >
                      {copiedEmail ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </motion.div>

                  {/* Enhanced GitHub */}
                  <motion.a
                    href="https://github.com/bernardopg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{t("contact.github")}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        @bernardopg
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.a>

                  {/* Enhanced LinkedIn */}
                  <motion.a
                    href="https://linkedin.com/in/bernardopg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        @bernardopg
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.a>

                  {/* Enhanced Instagram */}
                  <motion.a
                    href="https://instagram.com/be.pgomes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{t("contact.instagram")}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        @be.pgomes
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.a>

                  {/* Enhanced WhatsApp */}
                  <motion.a
                    href="https://wa.me/5531984916431"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{t("contact.whatsapp")}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        +55 (31) 98491-6431
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.a>

                  {/* Enhanced Calendly */}
                  <motion.a
                    href="https://calendly.com/bernardopg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">Calendly</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        Agendar reunião
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
