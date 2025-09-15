import { useAnalytics } from "@/components/Analytics";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { showSuccess } from "@/utils/toast";
import { motion } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ContactSection = () => {
  const { t } = useLanguage();
  const { trackButtonClick, trackContactAttempt } = useAnalytics();
  const { registerElement, isVisible, getAnimationProps } = useScrollAnimation();

  const contactRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactInView = isVisible('contact');

  useEffect(() => {
    if (contactRef.current) {
      registerElement(contactRef.current, 'contact');
    }
  }, [registerElement]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.EMAIL);
      setCopiedEmail(true);
      showSuccess(t("contact.emailCopied", "Email copied to clipboard!"));
      trackButtonClick("copy_email", "contact");

      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = CONFIG.EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopiedEmail(true);
      showSuccess(t("contact.emailCopied", "Email copied to clipboard!"));
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleContactMethod = (method: string, url: string) => {
    trackContactAttempt(method);
    window.open(url, "_blank");
  };

  return (
    <section ref={contactRef} className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4 mb-16"
            {...getAnimationProps}
            animate={contactInView ? getAnimationProps.animate : getAnimationProps.initial}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("contact.subtitle")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("contact.title")}
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("contact.description")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={
                contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    {t("contact.methods.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.methods.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Email */}
                  <motion.button
                    onClick={copyEmail}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">
                        {copiedEmail ? t("contact.emailCopied") : "Email"}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        {CONFIG.EMAIL}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("contact.clickToCopy", "Click to copy")}
                    </div>
                  </motion.button>

                  {/* WhatsApp */}
                  <motion.button
                    onClick={() => handleContactMethod("whatsapp", CONFIG.WHATSAPP_URL)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">
                        {t("contact.whatsapp")}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        +55 (31) 98491-6431
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.button>

                  {/* Calendly */}
                  <motion.button
                    onClick={() => handleContactMethod("calendly", CONFIG.CALENDLY_URL)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group w-full text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">Calendly</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        {t("contact.scheduleCall", "Schedule a call")}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </motion.button>
                </CardContent>
              </Card>

              {/* Quick Response Info */}
              <motion.div
                className="text-center p-6 bg-primary/5 rounded-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  &lt; 2h
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("contact.responseTime", "Average response time")}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={
              contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              {t("contact.cta.title", "Ready to start your project?")}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("contact.cta.description", "Let's discuss how we can bring your ideas to life with modern web technologies.")}
            </p>
            <Button
              size="lg"
              onClick={() => {
                trackButtonClick("cta_whatsapp", "contact");
                handleContactMethod("whatsapp", CONFIG.WHATSAPP_URL);
              }}
              className="group"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("contact.cta.button", "Start Conversation")}
              <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};