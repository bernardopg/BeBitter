import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Layers,
  Palette,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesList() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: t("services.webdev.title"),
      description: t("services.webdev.description"),
      features: [t("services.webdev.feature1"), t("services.webdev.feature2"), t("services.webdev.feature3"), t("services.webdev.feature4")],
      technologies: ["React", "TypeScript", "Vite", "Design Systems"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("services.responsive.title"),
      description: t("services.responsive.description"),
      features: [t("services.responsive.feature1"), t("services.responsive.feature2"), t("services.responsive.feature3"), t("services.responsive.feature4")],
      technologies: ["Python", "FastAPI", "Selenium", "Telegram"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: t("services.backend.title"),
      description: t("services.backend.description"),
      features: [t("services.backend.feature1"), t("services.backend.feature2"), t("services.backend.feature3"), t("services.backend.feature4")],
      technologies: ["Dashboards", "Auth", "Reports", "Internal Tools"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: t("services.uiux.title"),
      description: t("services.uiux.description"),
      features: [t("services.uiux.feature1"), t("services.uiux.feature2"), t("services.uiux.feature3"), t("services.uiux.feature4")],
      technologies: ["Linux", "GTK", "QML", "Arduino"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("services.performance.title"),
      description: t("services.performance.description"),
      features: [t("services.performance.feature1"), t("services.performance.feature2"), t("services.performance.feature3"), t("services.performance.feature4")],
      technologies: ["Healthcare", "Education", "Scheduling", "Workflows"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
      features: [t("services.maintenance.feature1"), t("services.maintenance.feature2"), t("services.maintenance.feature3"), t("services.maintenance.feature4")],
      technologies: ["Iteration", "SEO", "Content", "Maintenance"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full card-enhanced card-glow group flex flex-col rounded-xl">
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2 leading-snug group-hover:text-primary transition-colors">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/60">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-muted/60 text-muted-foreground">
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
  );
}
