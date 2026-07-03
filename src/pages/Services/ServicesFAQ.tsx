import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES_FAQ } from "@/constants/services-faq";
import { useLanguage } from "@/hooks/useLanguage";
import { m as motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function ServicesFAQ() {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEn = language === "en";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-20 max-w-3xl mx-auto"
      aria-labelledby="services-faq-title"
    >
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <CircleHelp className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest gradient-text">
            FAQ
          </span>
        </div>
        <h2 id="services-faq-title" className="text-2xl md:text-3xl font-bold">
          {isEn ? "Frequently asked questions" : "Perguntas frequentes"}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {SERVICES_FAQ.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {isEn ? item.questionEn : item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {isEn ? item.answerEn : item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
