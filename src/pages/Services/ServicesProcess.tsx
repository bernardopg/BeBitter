import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Code2, Layers, Rocket, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesProcess() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
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
    <motion.section
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
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
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <Card className="h-full card-enhanced card-glow group rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold gradient-text">{step.step}</div>
                  <div className="w-12 h-12 rounded-2xl gradient-secondary flex items-center justify-center text-primary group-hover:gradient-primary group-hover:text-white transition-all duration-300">
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
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
