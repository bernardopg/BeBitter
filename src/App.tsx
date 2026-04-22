import Analytics from "@/components/Analytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import ServiceWorkerManager from "@/components/ServiceWorkerManager";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WebVitals from "@/components/WebVitals";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState, useSyncExternalStore } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy loading das páginas para reduzir bundle inicial
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Now = lazy(() => import("./pages/Now"));
const Services = lazy(() => import("./pages/Services"));
const ProjectsPage = lazy(() =>
  import("./pages/Projects/ProjectsPage").then((m) => ({ default: m.default }))
);
const ProjectDetailPage = lazy(() =>
  import("./pages/Projects/ProjectDetailPage").then((m) => ({ default: m.default }))
);

// Configuração otimizada do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
    },
  },
});

// Componente de loading simples
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
  </div>
);

const subscribeToDesktopViewport = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(min-width: 640px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getDesktopViewportSnapshot = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 640px)").matches;

const getServerViewportSnapshot = () => false;

const App = () => {
  type WhatsAppProps = {
    phoneNumber: string;
    accountName?: string;
    chatMessage?: string;
    statusMessage?: string;
    placeholder?: string;
    avatar?: string;
    darkMode?: boolean;
    notification?: boolean;
    notificationDelay?: number;
    notificationSound?: boolean;
    notificationLoop?: number;
    allowClickAway?: boolean;
    allowEsc?: boolean;
    chatboxHeight?: number;
  };

  const [WhatsAppComp, setWhatsAppComp] =
    useState<React.ComponentType<WhatsAppProps> | null>(null);

  // Reativo ao resize — mostra o widget apenas em telas ≥ sm (640px)
  const showWhatsApp = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerViewportSnapshot,
  );

  // Lazy-load the WhatsApp widget after the app is interactive to reduce TBT/INP impact
  useEffect(() => {
    const load = () => {
      import("react-floating-whatsapp").then((mod) => {
        const m = mod as unknown as {
          FloatingWhatsApp?: React.ComponentType<WhatsAppProps>;
          default?: React.ComponentType<WhatsAppProps>;
        };
        setWhatsAppComp(() => m.FloatingWhatsApp || m.default || null);
      });
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: IdleRequestCallback,
          opts?: { timeout?: number }
        ) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      ric(load, { timeout: 3000 });
    } else {
      setTimeout(load, 1500);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <TooltipProvider>
              <ServiceWorkerManager />
              <WebVitals />
              <Toaster />
              <Sonner />
              <ProjectsProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                {/* Analytics precisa estar dentro do Router para usar useLocation */}
                <Analytics />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/now" element={<Now />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
              </ProjectsProvider>
              {WhatsAppComp && showWhatsApp && (
                <WhatsAppComp
                  phoneNumber="5531984916431"
                  accountName="Bernardo Gomes"
                  chatMessage="Olá! Me conta no que você está trabalhando."
                  statusMessage="Costumo responder em até 24h"
                  placeholder="Digite uma mensagem..."
                  avatar="/images/icons/android-chrome-512x512.png"
                  darkMode={true}
                  notification={false}
                  allowClickAway={true}
                  allowEsc={true}
                  chatboxHeight={300}
                />
              )}
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
