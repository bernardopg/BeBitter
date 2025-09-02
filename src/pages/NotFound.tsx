import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <a href="/" className="flex items-center justify-center gap-2">
              <Home className="h-5 w-5" />
              Voltar ao Início
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar à Página Anterior
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Se você acredita que isso é um erro, entre em contato:</p>
          <a
            href="mailto:bernardo.gomes@bebitterbebetter.com.br"
            className="text-primary hover:underline mt-2 inline-block"
          >
            bernardo.gomes@bebitterbebetter.com.br
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
