import { renderToReadableStream } from "react-dom/server.edge";
import { StaticRouter } from "react-router-dom";
import App, { AppRoutes } from "./App";

/**
 * Entrada de pré-render. Roda no build (scripts/prerender.ts), nunca em runtime:
 * não há servidor Node em produção, o resultado vira HTML estático no dist.
 *
 * Usa stream em vez de renderToString porque as páginas são carregadas com
 * React.lazy — renderToString é síncrono e devolveria só o fallback do
 * Suspense. `allReady` espera cada chunk resolver antes de ler o HTML.
 *
 * A variante edge (Web Streams) evita depender de tipos de Node neste arquivo,
 * que é compilado junto do código do browser em tsconfig.app.json.
 */
export async function render(url: string): Promise<string> {
  let renderError: unknown = null;

  const stream = await renderToReadableStream(
    <App>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </App>,
    {
      onError(error) {
        renderError = error;
      },
    },
  );

  await stream.allReady;
  const html = await new Response(stream).text();

  // Um erro em qualquer boundary deixaria buracos no HTML — falhar o build é
  // melhor que publicar uma página pela metade.
  if (renderError) throw renderError;

  return html;
}
