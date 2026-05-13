import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { Coffee, Heart, Mail, MessageCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function NowContact() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [noteRef, noteInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fade = (inView: boolean, delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: prefersReducedMotion ? 0 : 0.25, delay: prefersReducedMotion ? 0 : delay },
  });

  return (
    <>
      {/* Personal Note */}
      <motion.section
        ref={noteRef}
        className="mb-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
        {...fade(noteInView)}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={noteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-primary" />
            {t("now.personalNote")}
          </h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div className="max-w-2xl mx-auto" {...fade(noteInView, 0.1)}>
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={noteInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {t("now.note1")}
                </motion.p>
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={noteInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {t("now.note2")}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        ref={contactRef}
        className="text-center"
        style={{ contentVisibility: "auto", containIntrinsicSize: "520px" }}
        {...fade(contactInView)}
      >
        <motion.div className="text-center mb-8" {...fade(contactInView, 0.1)}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            {t("now.contact.title")}
          </h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div {...fade(contactInView, 0.1)}>
          <Card className="glass card-enhanced max-w-2xl mx-auto">
            <CardContent className="p-8">
              <motion.h3
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t("now.contact.title")}
              </motion.h3>

              <motion.p
                className="text-muted-foreground mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t("now.contact.description")}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="group btn-enhanced gradient-primary text-white border-0">
                    <a
                      href="mailto:bernardo.gomes@bebitterbebetter.com.br"
                      className="flex items-center gap-2"
                      aria-label="Enviar e-mail para Bernardo Gomes"
                    >
                      <Mail className="h-5 w-5" />
                      {t("now.contact.email")}
                      <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group btn-enhanced border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <a
                      href="https://wa.me/5531984916431"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      aria-label="Conversar no WhatsApp com Bernardo Gomes"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {t("now.contact.whatsapp")}
                      <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </>
  );
}
