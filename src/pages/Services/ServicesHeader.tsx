import { useLanguage } from "@/hooks/useLanguage";
import { m as motion } from "framer-motion";
import { Briefcase, Rocket, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesHeader() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const audiences =
    language === "en"
      ? [
          { icon: <Briefcase className="h-3.5 w-3.5" />, label: "For founders & teams" },
          { icon: <Users className="h-3.5 w-3.5" />, label: "For recruiters & hiring" },
        ]
      : [
          { icon: <Briefcase className="h-3.5 w-3.5" />, label: "Para founders e times" },
          { icon: <Users className="h-3.5 w-3.5" />, label: "Para recrutadores e vagas" },
        ];

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

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {audiences.map((a) => (
          <span
            key={a.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
          >
            {a.icon}
            {a.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
