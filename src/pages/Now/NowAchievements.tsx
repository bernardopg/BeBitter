import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function NowAchievements() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const recentAchievements = [
    { text: t("now.achievement1"), icon: "🚀" },
    { text: t("now.achievement2"), icon: "📚" },
    { text: t("now.achievement3"), icon: "🎯" },
    { text: t("now.achievement4"), icon: "☕" },
  ];

  return (
    <motion.section
      ref={ref}
      className="mb-20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "700px" }}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          {t("now.achievements")}
        </h2>
        <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {recentAchievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, delay: prefersReducedMotion ? 0 : 0.1 + index * 0.05 }}
          >
            <Card className="card-enhanced card-glow group h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-primary/20 transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {achievement.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
