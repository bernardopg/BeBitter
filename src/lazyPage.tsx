import type { ComponentType } from "react";
import { lazy } from "react";

type PageModule = { default: ComponentType<Record<string, never>> };

export type LazyPage = ComponentType<Record<string, never>> & {
  /** Resolve o chunk e passa a renderizar de forma síncrona. */
  preload: () => Promise<void>;
};

/**
 * Página com carregamento sob demanda que sabe se antecipar.
 *
 * `React.lazy` sozinho não serve para hidratar HTML pré-renderizado: mesmo com
 * o chunk já no cache do browser, o primeiro render suspende (nem que seja por
 * um microtask), o Suspense mostra o fallback e o React **apaga** o markup que
 * veio do servidor. O usuário vê conteúdo, spinner, conteúdo de novo.
 *
 * Depois de `preload()`, o componente resolvido é renderizado direto, sem
 * suspender — a hidratação acontece em cima do HTML que já está na tela.
 * Sem `preload()` (navegação client-side para outra rota), o comportamento é o
 * do `React.lazy` normal: suspende e mostra o fallback, que é o esperado.
 *
 * `resolved` só é preenchido por `preload()`, nunca pelo caminho do lazy: se
 * mudasse no meio da vida da rota, o tipo do elemento trocaria e o React
 * desmontaria e remontaria a página, perdendo o estado dela.
 */
export const createLazyPage = (load: () => Promise<PageModule>): LazyPage => {
  let resolved: ComponentType<Record<string, never>> | null = null;
  const Lazy = lazy(load);

  const Page = ((props: Record<string, never>) => {
    const Resolved = resolved;
    return Resolved ? <Resolved {...props} /> : <Lazy {...props} />;
  }) as LazyPage;

  Page.preload = async () => {
    resolved = (await load()).default;
  };

  return Page;
};
