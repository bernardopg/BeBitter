/* eslint-disable react-refresh/only-export-components */
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Função para enviar erro para Analytics
const logErrorToAnalytics = (error: Error, errorInfo: ErrorInfo) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description: error.message,
      fatal: true,
      custom_parameters: {
        error_stack: error.stack || "No stack trace",
        component_stack: errorInfo.componentStack,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    });

    // Também enviar como evento personalizado
    window.gtag("event", "javascript_error", {
      event_category: "Error",
      event_label: error.name,
      custom_parameters: {
        error_message: error.message,
        error_stack: error.stack?.substring(0, 500) || "No stack", // Limitar tamanho
        page_path: window.location.pathname,
      },
    });
  }

  // Log para desenvolvimento
  if (import.meta.env.DEV) {
    console.error("🚨 Error Boundary caught an error:", error);
    console.error("📍 Error Info:", errorInfo);
  }
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log do erro para Analytics
    logErrorToAnalytics(error, errorInfo);

    // Log para serviços de erro externos (se configurado)
    if (typeof window !== "undefined") {
      // Exemplo para Sentry, LogRocket, etc.
      // window.Sentry?.captureException(error, { extra: errorInfo });
    }
  }

  public render() {
    if (this.state.hasError) {
      // Fallback personalizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão elegante
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Oops! Algo deu errado
              </h1>
              <p className="text-muted-foreground mb-6">
                Encontramos um erro inesperado. Nossa equipe foi notificada e
                está trabalhando para resolver o problema.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                Recarregar Página
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
              >
                Voltar ao Início
              </button>
            </div>

            {/* Detalhes do erro compactos para diagnóstico */}
            {this.state.error && (
              <div className="mt-6 text-left text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Detalhes técnicos:</p>
                <p className="mb-1">
                  {this.state.error.name}: {this.state.error.message}
                </p>
                {import.meta.env.DEV && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">Stack trace</summary>
                    <pre className="whitespace-pre-wrap text-xs">
                      {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                      <pre className="whitespace-pre-wrap text-xs mt-2">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para capturar erros em componentes funcionais
export const useErrorHandler = () => {
  const handleError = (
    error: Error,
    errorInfo?: { componentStack?: string }
  ) => {
    logErrorToAnalytics(error, errorInfo as ErrorInfo);
  };

  return { handleError };
};

// HOC para envolver componentes com Error Boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

export default ErrorBoundary;
