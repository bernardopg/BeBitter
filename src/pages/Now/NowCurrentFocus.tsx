import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
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
      bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t("now.focus2.title"),
      description: t("now.focus2.description"),
      status: t("now.focus2.status"),
      bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t("now.focus3.title"),
      description: t("now.focus3.description"),
      status: t("now.focus3.status"),
      bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
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
            <Card className="h-full card-enhanced group">
              <CardHeader className="text-center pb-4">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center text-white float"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                <Badge
                  variant="secondary"
                  className={`${item.bgColor} border text-sm px-3 py-1`}
                >
                  {item.status}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed text-center">
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
