import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesCTA() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="glass card-enhanced max-w-3xl mx-auto">
        <CardContent className="p-12">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white mx-auto mb-6">
            <Rocket className="h-10 w-10" />
          </div>

          <h2 className="text-3xl font-bold mb-4">{t("services.cta.title")}</h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group btn-enhanced gradient-primary text-white border-0"
            >
              <a href={CONFIG.WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("services.cta.button")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="btn-enhanced">
              <a href="/#projects">{t("services.cta.projects")}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
