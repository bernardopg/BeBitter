import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesHeader() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
  );
}
