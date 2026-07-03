import { useAnalytics } from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { TypingText } from "@/components/ui/TypingText";
import { useProfileImagePreload } from "@/hooks/useProfileImagePreload";
import { CONFIG } from "@/constants/config";
import {
  GitHubIcon,
  GitLabIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { m as motion } from "framer-motion";
import {
  BadgeDollarSign,
  Coffee,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

export const HeroSection = () => {
  const { t } = useLanguage();
  const { trackButtonClick, trackExternalLink } = useAnalytics();
  const { registerElement, getAnimationProps } = useScrollAnimation();
  const { preloadProfileImage } = useProfileImagePreload();

  const heroRef = useRef<HTMLElement>(null);

  const typingTexts = useMemo(
    () => [t("hero.subtitle1"), t("hero.subtitle2"), t("hero.subtitle3")],
    [t],
  );

  // Preload da imagem crítica
  useEffect(() => {
    preloadProfileImage();
  }, [preloadProfileImage]);

  useEffect(() => {
    if (heroRef.current) {
      registerElement(heroRef.current, 'hero');
    }
  }, [registerElement]);

  const handleSocialClick = (platform: string, url: string) => {
    trackExternalLink(url, platform);
    trackButtonClick(`${platform}_social`, "hero");
  };

  const handleContactClick = (method: string) => {
    trackButtonClick(`contact_${method}`, "hero");
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center py-12 md:py-20 relative overflow-hidden"
      id="hero"
    >
      {/* Layered background: grid + mesh + glow */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="absolute top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float" aria-hidden />
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} aria-hidden />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6 md:space-y-8 text-center lg:text-left"
            {...getAnimationProps}
            animate={getAnimationProps.animate}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t("hero.availability")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-base font-semibold text-primary">
                  <Sparkles className="h-5 w-5" />
                  {t("hero.greeting")}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="gradient-text">{t("hero.title")}</span>
              </motion.h1>

              <motion.div
                className="text-xl md:text-2xl text-muted-foreground h-8 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <TypingText texts={typingTexts} />
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <MapPin className="h-4 w-4" />
                <span>{t("hero.location")}</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Button
                size="xl"
                variant="gradient"
                onClick={() => {
                  handleContactClick("whatsapp");
                  window.open(CONFIG.WHATSAPP_URL, "_blank");
                }}
                className="group btn-enhanced"
              >
                <Coffee className="mr-2 h-4 w-4" />
                {t("hero.cta.primary")}
                <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button
                variant="outline"
                size="xl"
                onClick={() => {
                  handleContactClick("projects");
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-enhanced border-primary/30 hover:border-primary/50 hover:bg-primary/5"
              >
                {t("hero.cta.secondary")}
              </Button>
            </motion.div>

            {/* Tech trust strip */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {["React", "TypeScript", "Python", "Linux", "Node.js"].map((tech) => (
                <span key={tech} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("GitHub", CONFIG.GITHUB_URL)}
                asChild
              >
                <a
                  href={CONFIG.GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("GitLab", CONFIG.GITLAB_URL)}
                asChild
              >
                <a
                  href={CONFIG.GITLAB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitLab"
                >
                  <GitLabIcon className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("LinkedIn", CONFIG.LINKEDIN_URL)}
                asChild
              >
                <a
                  href={CONFIG.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("Instagram", CONFIG.INSTAGRAM_URL)}
                asChild
              >
                <a
                  href={CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("X", CONFIG.X_URL)}
                asChild
              >
                <a
                  href={CONFIG.X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <XIcon className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("Sponsor", CONFIG.SPONSOR_URL)}
                asChild
              >
                <a
                  href={CONFIG.SPONSOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sponsor"
                >
                  <BadgeDollarSign className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-full gradient-primary opacity-20 pulse-glow" />
                <div className="absolute inset-1 rounded-full bg-background/80 backdrop-blur-sm" />
                
                {/* Profile image */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <ProfileImage
                    alt={t("hero.profileAlt")}
                    className="w-full h-full object-cover"
                    priority={true}
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 glass rounded-full flex items-center justify-center float">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/4 -right-8 w-6 h-6 bg-blue-500/20 rounded-full blur-sm float" style={{ animationDelay: '3s' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
