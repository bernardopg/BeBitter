import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Palette,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const { t, language } = useLanguage();
  const { registerElement, isVisible, getAnimationProps, getStaggeredAnimationProps } = useScrollAnimation();

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: t("services.webdev.title"),
      description: t("services.webdev.description"),
      features: [
        t("services.webdev.feature1"),
        t("services.webdev.feature2"),
        t("services.webdev.feature3"),
        t("services.webdev.feature4"),
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("services.responsive.title"),
      description: t("services.responsive.description"),
      features: [
        t("services.responsive.feature1"),
        t("services.responsive.feature2"),
        t("services.responsive.feature3"),
        t("services.responsive.feature4"),
      ],
      technologies: ["Tailwind CSS", "Framer Motion", "PWA", "Mobile-First"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: t("services.backend.title"),
      description: t("services.backend.description"),
      features: [
        t("services.backend.feature1"),
        t("services.backend.feature2"),
        t("services.backend.feature3"),
        t("services.backend.feature4"),
      ],
      technologies: ["Node.js", "PostgreSQL", "MongoDB", "AWS"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: t("services.uiux.title"),
      description: t("services.uiux.description"),
      features: [
        t("services.uiux.feature1"),
        t("services.uiux.feature2"),
        t("services.uiux.feature3"),
        t("services.uiux.feature4"),
      ],
      technologies: ["Figma", "Design Systems", "Prototyping", "User Testing"],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("services.performance.title"),
      description: t("services.performance.description"),
      features: [
        t("services.performance.feature1"),
        t("services.performance.feature2"),
        t("services.performance.feature3"),
        t("services.performance.feature4"),
      ],
      technologies: ["Lighthouse", "Web Vitals", "CDN", "Caching"],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
      features: [
        t("services.maintenance.feature1"),
        t("services.maintenance.feature2"),
        t("services.maintenance.feature3"),
        t("services.maintenance.feature4"),
      ],
      technologies: ["CI/CD", "Monitoring", "Security", "Updates"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    },
  ];

  const process = [
    {
      step: "01",
      title: t("services.process.discovery.title"),
      description: t("services.process.discovery.description"),
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      step: "02",
      title: t("services.process.planning.title"),
      description: t("services.process.planning.description"),
      icon: <Layers className="h-6 w-6" />,
    },
    {
      step: "03",
      title: t("services.process.development.title"),
      description: t("services.process.development.description"),
      icon: <Code2 className="h-6 w-6" />,
    },
    {
      step: "04",
      title: t("services.process.launch.title"),
      description: t("services.process.launch.description"),
      icon: <Rocket className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <SEOHead
        title={`${t("services.meta.title")} | Bernardo Gomes`}
        description={t("services.meta.description")}
        keywords={[
          "desenvolvimento web",
          "web development",
          "react",
          "nextjs",
          "nodejs",
          "typescript",
          "ui/ux design",
          "responsive design",
          "performance optimization",
          "serviços de desenvolvimento",
          "development services",
        ]}
        canonical="https://bebitterbebetter.com.br/services"
        type="website"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />

      <StructuredData
        pageType="website"
        title={`${t("services.meta.title")} | Bernardo Gomes`}
        description={t("services.meta.description")}
        url="https://bebitterbebetter.com.br/services"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("services.subtitle")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t("services.title")}
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("services.description")}
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.section
            ref={servicesRef}
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    servicesInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full card-enhanced group">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 rounded-2xl gradient-${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Process Section */}
          <motion.section
            ref={processRef}
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={processInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {t("services.process.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("services.process.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full card-enhanced group">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-bold gradient-text">
                          {step.step}
                        </div>
                        <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-primary group-hover:gradient-primary group-hover:text-white transition-all duration-300">
                          {step.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connector Line */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            ref={ctaRef}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass card-enhanced max-w-3xl mx-auto">
              <CardContent className="p-12">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white mx-auto mb-6">
                  <Rocket className="h-10 w-10" />
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  {t("services.cta.title")}
                </h2>

                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t("services.cta.description")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="group btn-enhanced gradient-primary text-white border-0"
                  >
                    <a
                      href={CONFIG.WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("services.cta.button")}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="btn-enhanced"
                  >
                    <a href="/#projects">{t("services.cta.projects")}</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default Services;