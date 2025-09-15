import { useAnalytics } from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { CONFIG } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import {
  Coffee,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const HeroSection = () => {
  const { t } = useLanguage();
  const { trackButtonClick, trackExternalLink } = useAnalytics();
  const { registerElement, isVisible, getAnimationProps } = useScrollAnimation();

  const heroRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const heroInView = isVisible('hero');

  useEffect(() => {
    if (heroRef.current) {
      registerElement(heroRef.current, 'hero');
    }
  }, [registerElement]);

  // Typing animation
  useEffect(() => {
    const texts = [
      t("hero.subtitle1"),
      t("hero.subtitle2"),
      t("hero.subtitle3"),
    ];

    const currentText = texts[textIndex] || texts[0];

    if (displayText.length < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, CONFIG.TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (displayText.length === 0) {
          setTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setDisplayText("");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [displayText, textIndex, t]);

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
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
      id="hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            {...getAnimationProps}
            animate={heroInView ? getAnimationProps.animate : getAnimationProps.initial}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start gap-2"
              >
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-primary">
                  {t("hero.greeting")}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="gradient-text">{t("hero.title")}</span>
              </motion.h1>

              <motion.div
                className="text-xl md:text-2xl text-muted-foreground h-8 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {displayText}
                <span className="ml-1 animate-pulse">|</span>
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Belo Horizonte, MG</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Button
                size="lg"
                onClick={() => {
                  handleContactClick("whatsapp");
                  window.open(CONFIG.WHATSAPP_URL, "_blank");
                }}
                className="group btn-enhanced gradient-primary text-white border-0 hover:shadow-lg hover:shadow-primary/25"
              >
                <Coffee className="mr-2 h-4 w-4" />
                {t("hero.cta.primary")}
                <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  handleContactClick("projects");
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-enhanced border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                {t("hero.cta.secondary")}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
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
                  <Github className="h-5 w-5" />
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
                  <Linkedin className="h-5 w-5" />
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
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-full gradient-primary opacity-20 pulse-glow" />
                <div className="absolute inset-1 rounded-full bg-background/80 backdrop-blur-sm" />
                
                {/* Profile image */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <Image
                    src="https://avatars.githubusercontent.com/u/69475128?v=4"
                    alt={t("hero.profileAlt")}
                    className="w-full h-full object-cover"
                    priority
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
