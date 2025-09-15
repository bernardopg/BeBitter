import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Code,
  Coffee,
  Heart,
  Lightbulb,
  Mail,
  MessageCircle,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Now = () => {
  const { t, language } = useLanguage();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [focusRef, focusInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [achievementsRef, achievementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [noteRef, noteInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentFocus = [
    {
      icon: <Code className="h-6 w-6" />,
      title: t("now.focus1.title"),
      description: t("now.focus1.description"),
      status: t("now.focus1.status"),
      color: "from-blue-500 to-cyan-500",
      bgColor:
        "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t("now.focus2.title"),
      description: t("now.focus2.description"),
      status: t("now.focus2.status"),
      color: "from-purple-500 to-pink-500",
      bgColor:
        "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t("now.focus3.title"),
      description: t("now.focus3.description"),
      status: t("now.focus3.status"),
      color: "from-green-500 to-emerald-500",
      bgColor:
        "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    },
  ];

  const recentAchievements = [
    {
      text: t("now.achievement1"),
      icon: "🚀",
      color: "text-blue-600",
    },
    {
      text: t("now.achievement2"),
      icon: "📚",
      color: "text-purple-600",
    },
    {
      text: t("now.achievement3"),
      icon: "🎯",
      color: "text-green-600",
    },
    {
      text: t("now.achievement4"),
      icon: "☕",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      <SEOHead
        title="Now - O que estou fazendo agora | Bernardo Gomes"
        description="Descubra o que estou fazendo agora, meus projetos atuais, conquistas recentes e foco no momento. Página atualizada regularmente com meu status atual."
        keywords={[
          "now",
          "projetos atuais",
          "desenvolvimento web",
          "bernardo gomes",
          "programador",
          "foco atual",
          "conquistas",
        ]}
        canonical="https://bebitterbebetter.com.br/now"
        type="article"
        robots="index, follow"
        publisher="Bernardo Gomes"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {t("hero.skipToContent")}
        </a>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Enhanced Header */}
          <motion.div
            ref={headerRef}
            id="main-content"
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("now.title")}
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("now.description")}{" "}
              {currentTime.toLocaleDateString(
                language === "pt" ? "pt-BR" : "en-US"
              )}
            </motion.p>

            {/* Real-time clock */}
            <motion.div
              className="relative p-8 rounded-2xl glass pulse-glow mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                headerInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Agora no Brasil</span>
              </div>
              <div className="text-4xl md:text-6xl font-mono font-bold gradient-text">
                {currentTime.toLocaleTimeString(
                  language === "pt" ? "pt-BR" : "en-US",
                  { hour: "2-digit", minute: "2-digit", second: "2-digit" }
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Current Focus */}
          <motion.section
            ref={focusRef}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={focusInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={
                focusInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
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
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={
                    focusInView
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.8, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <Card className="h-full card-enhanced group">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center text-white float`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <CardTitle className="text-lg mb-2">
                        {item.title}
                      </CardTitle>
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

          {/* Recent Achievements */}
          <motion.section
            ref={achievementsRef}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={
              achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={
                achievementsInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
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
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={
                    achievementsInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <Card className="card-enhanced group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center flex-shrink-0 text-2xl group-hover:gradient-primary transition-all duration-200"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="flex-1">
                          <p
                            className={`text-sm leading-relaxed ${achievement.color} font-medium group-hover:text-primary transition-colors duration-200`}
                          >
                            {achievement.text.substring(
                              achievement.text.indexOf(" ") + 1
                            )}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Personal Note */}
          <motion.section
            ref={noteRef}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={noteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={
                noteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
                <Coffee className="h-8 w-8 text-primary" />
                {t("now.personalNote")}
              </h2>
              <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
            </motion.div>

            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={
                noteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
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

          {/* Enhanced Contact CTA */}
          <motion.section
            ref={contactRef}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={
              contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
                <Heart className="h-8 w-8 text-primary" />
                {t("now.contact.title")}
              </h2>
              <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                contactInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="glass card-enhanced max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <motion.h3
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      contactInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {t("now.contact.title")}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground mb-8 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      contactInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {t("now.contact.description")}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      contactInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="group btn-enhanced gradient-primary text-white border-0"
                      >
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

                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
        </div>
      </div>
    </>
  );
};

export default Now;
