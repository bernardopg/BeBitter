import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { m as motion, useReducedMotion } from "framer-motion";
import { Code, Lightbulb, Target, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function NowCurrentFocus() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentFocus = [
    {
      icon: <Code className="h-6 w-6" />,
      title: t("now.focus1.title"),
      description: t("now.focus1.description"),
      status: t("now.focus1.status"),
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t("now.focus2.title"),
      description: t("now.focus2.description"),
      status: t("now.focus2.status"),
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t("now.focus3.title"),
      description: t("now.focus3.description"),
      status: t("now.focus3.status"),
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="mb-20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
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
          <Zap className="h-8 w-8 text-primary" />
          {t("now.currentFocus")}
        </h2>
        <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentFocus.map((item, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, delay: prefersReducedMotion ? 0 : 0.1 + index * 0.05 }}
          >
            <Card className="h-full card-enhanced card-glow group flex flex-col text-center">
              <CardHeader className="pb-4">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/25"
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <CardTitle className="text-lg mb-3 leading-snug">{item.title}</CardTitle>
                <Badge
                  variant="outline"
                  className="mx-auto w-fit gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-medium px-3 py-1"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {item.status}
                </Badge>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
