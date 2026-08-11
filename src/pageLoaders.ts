/**
 * Páginas de rota e o pré-carregamento delas.
 *
 * Vive fora do App.tsx porque dois pontos precisam disto por motivos
 * diferentes: o App monta o <Routes>, e o main.tsx precisa resolver a página da
 * rota atual *antes* de hidratar. Uma lista só de rotas para os dois.
 */
import { createLazyPage, type LazyPage } from "./lazyPage";

export const IndexPage = createLazyPage(() => import("./pages/Index"));
export const NotFoundPage = createLazyPage(() => import("./pages/NotFound"));
export const NowPage = createLazyPage(() => import("./pages/Now"));
export const ServicesPage = createLazyPage(() => import("./pages/Services"));
export const ProjectsPage = createLazyPage(
  () => import("./pages/Projects/ProjectsPage"),
);
export const ProjectDetailPage = createLazyPage(
  () => import("./pages/Projects/ProjectDetailPage"),
);
export const BlogPage = createLazyPage(() => import("./pages/Blog/BlogPage"));
export const BlogPostPage = createLazyPage(
  () => import("./pages/Blog/BlogPostPage"),
);

/** Mesmas rotas do <Routes> em App.tsx, na mesma ordem. */
const ROUTE_PAGES: ReadonlyArray<[RegExp, LazyPage]> = [
  [/^\/$/, IndexPage],
  [/^\/now$/, NowPage],
  [/^\/services$/, ServicesPage],
  [/^\/projects$/, ProjectsPage],
  [/^\/projects\/[^/]+$/, ProjectDetailPage],
  [/^\/blog$/, BlogPage],
  [/^\/blog\/[^/]+$/, BlogPostPage],
];

/**
 * Resolve a página da rota pedida para que ela renderize sem suspender.
 * Chamado antes de hidratar; ver o comentário em ./lazyPage.
 */
export const preloadRoutePage = (pathname: string): Promise<void> => {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  const match = ROUTE_PAGES.find(([pattern]) => pattern.test(normalized));
  return (match?.[1] ?? NotFoundPage).preload();
};
