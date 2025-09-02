import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, Ghost, Home, Mail } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-md w-full">
        <motion.div variants={itemVariants}>
          <Ghost className="h-24 w-24 mx-auto mb-6 text-primary animate-pulse" />
        </motion.div>

        <motion.h1
          className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-4"
          variants={itemVariants}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          variants={itemVariants}
        >
          Página não encontrada
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8 max-w-md mx-auto"
          variants={itemVariants}
        >
          Ops! A página que você está procurando parece ter se perdido no ciberespaço. Vamos te ajudar a voltar ao caminho certo.
        </motion.p>

        <motion.div
          className="space-y-4 mb-12"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="w-full group relative overflow-hidden">
            <a
              href="/"
              className="flex items-center justify-center gap-2"
              aria-label="Voltar à página inicial"
            >
              <Home className="h-5 w-5" />
              Voltar ao Início
              <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full group relative overflow-hidden"
            onClick={() => window.history.back()}
            aria-label="Voltar à página anterior"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar à Página Anterior
            <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <p className="mb-2">Se isso for um erro, me avise:</p>
          <Button
            variant="ghost"
            asChild
            className="p-0 h-auto font-normal text-primary hover:text-primary/80 hover:bg-transparent"
          >
            <a
              href="mailto:bernardo.gomes@bebitterbebetter.com.br"
              aria-label="Enviar e-mail para suporte"
            >
              <Mail className="h-4 w-4 mr-2 inline" />
              bernardo.gomes@bebitterbebetter.com.br
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
