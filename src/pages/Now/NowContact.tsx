import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { m as motion, useReducedMotion } from "framer-motion";
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
                <Button asChild variant="gradient" size="lg" className="btn-enhanced">
                  <a
                    href="mailto:bernardo.gomes@bebitterbebetter.com.br"
                    aria-label="Enviar e-mail para Bernardo Gomes"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {t("now.contact.email")}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-enhanced border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                >
                  <a
                    href="https://wa.me/5531984916431"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Conversar no WhatsApp com Bernardo Gomes"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t("now.contact.whatsapp")}
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </>
  );
}
