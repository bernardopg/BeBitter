import type { BlogPost } from "./blog-posts";

type Review = {
  note: string;
  related: string[];
  sources?: NonNullable<BlogPost["sources"]>;
};

const source = (title: string, url: string) => ({ title, url });

export const editorialReviews: Record<string, Review> = {
  "webmcp-sites-agentes-ia-seguranca": {
    note: "Antes de registrar uma ferramenta no site, anote qual operação ela executa, o que entra e o que volta. Teste primeiro uma consulta que não muda estado. Para uma operação de escrita, comprove que o servidor aplica as mesmas permissões do fluxo humano, inclusive quando a ferramenta recebe um identificador inesperado.",
    related: ["ia-saidas-estruturadas-avaliacao-pydantic", "passkeys-webauthn-implementacao-segura"],
  },
  "passkeys-webauthn-implementacao-segura": {
    note: "Em um ensaio de implantação, separe falhas de autenticação de falhas no fluxo de recuperação. Confira desafio expirado, domínio incorreto e perda do único dispositivo. Mantenha um procedimento de recuperação documentado antes de ampliar a adoção.",
    related: ["seguranca-frontend-2026", "webmcp-sites-agentes-ia-seguranca"],
  },
  "github-actions-oidc-deploy-sem-segredos-longos": {
    note: "Depois de configurar a relação de confiança, teste dois contextos: a execução autorizada na branch ou no ambiente de produção e uma execução sem autorização. Se ambos os jobs conseguirem assumir a mesma função, reduza a política antes de retirar a credencial anterior.",
    related: ["playwright-github-actions-testar-build-react", "uv-python-ci-lockfile-reprodutivel"],
  },
  "wcag-22-acessibilidade-checklist-produto": {
    note: "Comece pelo fluxo que o público mais usa. Registre o elemento focado e o que acontece após cada interação. Use automação para detectar regressões repetíveis, como um diálogo que permanece aberto depois da navegação, e mantenha a revisão com teclado e leitor de tela.",
    related: ["playwright-github-actions-testar-build-react", "shadcn-ui-adotei-personalizo"],
  },
  "busca-textual-postgresql-indice-gin": {
    note: "Avalie consulta e índice com dados que representem o vocabulário e o volume do produto. Para validar relevância, mantenha uma lista de buscas com resultados esperados. Para validar desempenho, compare planos e tempos com e sem o índice no mesmo conjunto de dados.",
    related: ["fastapi-react-healthcare-api", "seo-ai-overviews-geo-2026"],
  },
  "shai-hulud-npm-worm-defesa-2026": {
    note: "Use o relato como contexto histórico. Para decidir se um build foi afetado, coteje o lockfile, os artefatos de CI e o comunicado do mantenedor da versão usada. Se houver indício de exposição, revogue credenciais a partir de um ambiente limpo e preserve os logs para a investigação.",
    related: ["github-actions-oidc-deploy-sem-segredos-longos", "node-js-26-lts-migracao-ci-producao"],
    sources: [source("GitHub: detecção da campanha Shai-Hulud", "https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/"), source("npm: provenance", "https://docs.npmjs.com/generating-provenance-statements/")],
  },
  "kubernetes-1-37-garhwal-dra-2026": {
    note: "Confira o estado de cada recurso de DRA na versão do cluster e do driver. A disponibilidade da API principal não garante que extensões de compartilhamento funcionem na sua distribuição. Em homologação, teste tanto a alocação quanto o comportamento de um pod quando os dispositivos estiverem ocupados.",
    related: ["opentelemetry-collector-filas-retry-otlp", "github-actions-oidc-deploy-sem-segredos-longos"],
    sources: [source("Kubernetes: release v1.37.0", "https://github.com/kubernetes/kubernetes/releases/tag/v1.37.0"), source("Kubernetes: Dynamic Resource Allocation", "https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/"), source("Kubernetes: política de version skew", "https://kubernetes.io/releases/version-skew-policy/")],
  },
  "vite-8-rolldown-rust-bundler-2026": {
    note: "Os ganhos de build dependem do grafo, plugins e cache. Ao migrar, compare na mesma máquina um build limpo e outro com cache. Valide também imports dinâmicos, chunks, HTML gerado e navegação. Confira pins históricos no lockfile atual antes de reproduzi-los.",
    related: ["vite-otimizando-builds", "playwright-github-actions-testar-build-react"],
    sources: [source("Vite: anúncio do Vite 8", "https://vite.dev/blog/announcing-vite8"), source("Vite: guia de migração", "https://vite.dev/guide/migration")],
  },
  "css-anchor-positioning-baseline-2026": {
    note: "Teste o posicionamento perto das bordas, em uma área com rolagem e com zoom. Mesmo quando o CSS posiciona o elemento, a interação continua pedindo comportamento de foco, teclado e dismiss apropriado. Mantenha fallback quando os navegadores suportados exigirem.",
    related: ["wcag-22-acessibilidade-checklist-produto", "shadcn-ui-adotei-personalizo", "seguranca-frontend-2026"],
    sources: [source("MDN: CSS anchor positioning", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"), source("WAI-ARIA APG: padrão de tooltip", "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/")],
  },
  "seo-ai-overviews-geo-2026": {
    note: "Ao publicar, teste primeiro a URL pública, os links internos e o conteúdo servido. Depois acompanhe indexação e impressões no Search Console. A elegibilidade técnica e o desempenho observado são evidências diferentes.",
    related: ["core-web-vitals-2026-lcp-inp", "playwright-github-actions-testar-build-react", "busca-textual-postgresql-indice-gin"],
    sources: [
      source("Google Search Central: recursos de IA e seu site", "https://developers.google.com/search/docs/appearance/ai-features"),
      source("Google Search Central: conteúdo útil e confiável", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"),
      source("Google Search Central: dados estruturados de artigos", "https://developers.google.com/search/docs/appearance/structured-data/article"),
      source("OpenAI: rastreadores web", "https://developers.openai.com/api/docs/bots"),
      source("Proposta llms.txt", "https://llmstxt.org/"),
    ],
  },
  "runtimes-js-bun-deno-node-2026": {
    note: "Compare os runtimes com seu lockfile e seus testes. Inclua integração com módulos nativos, TLS e sistema de arquivos. No Node, suporte à remoção de tipos em runtime não significa typechecking ou compatibilidade com toda sintaxe TypeScript.",
    related: ["node-js-26-lts-migracao-ci-producao", "typescript-7-migracao-2026"],
    sources: [source("Node.js: execução de TypeScript", "https://nodejs.org/api/typescript.html"), source("Bun: compatibilidade com Node.js", "https://bun.com/docs/runtime/nodejs-compat"), source("Deno: compatibilidade com Node e npm", "https://docs.deno.com/runtime/fundamentals/node/")],
  },
  "remix-3-rc-2026": {
    note: "O texto registra o período de pré-release. Consulte as tags oficiais para confirmar qual versão está disponível e use a documentação correspondente a ela. Em um protótipo, valide formulários, navegação com JavaScript desabilitado quando aplicável e os adaptadores que a produção exige.",
    related: ["react-server-components-producao-2026", "playwright-github-actions-testar-build-react"],
    sources: [source("Remix: releases do repositório oficial", "https://github.com/remix-run/remix/releases"), source("React Router: documentação", "https://reactrouter.com/")],
  },
  "agentes-ia-operacao-2026": {
    note: "Antes de colocar agentes em tarefas recorrentes, defina permissões, limites e critérios de aceite. Compare custo por tarefa concluída e taxa de falha, com versões e ferramentas registradas. Trate exemplos de opções de CLI como dependentes da versão instalada.",
    related: ["ia-saidas-estruturadas-avaliacao-pydantic", "opentelemetry-collector-filas-retry-otlp"],
    sources: [source("Anthropic: permissões no Claude Code", "https://code.claude.com/docs/en/permissions"), source("OpenAI: sandbox e aprovações no Codex", "https://developers.openai.com/codex/agent-approvals-security")],
  },
  "nextjs-security-release-rce-2026": {
    note: "A ação defensiva depende do advisory e da versão implantada. Compare a versão e a plataforma em execução com a faixa afetada do aviso oficial. Rebuild e redeploy são necessários quando o ambiente roda um artefato antigo, mesmo depois de corrigir o manifesto.",
    related: ["seguranca-frontend-2026", "node-js-26-lts-migracao-ci-producao"],
    sources: [source("Next.js: advisory de otimização de imagem", "https://github.com/advisories/GHSA-2xp9-vwfh-vxw4"), source("Next.js: advisory de servidores Windows", "https://github.com/advisories/GHSA-p293-qw3h-jr36"), source("Next.js: configuração do componente Image", "https://nextjs.org/docs/app/api-reference/components/image")],
  },
  "typescript-7-migracao-2026": {
    note: "Primeiro confira os peer dependencies dos plugins do seu próprio lockfile. Compare diagnósticos no editor, no lint e no CI com a versão candidata. Segure a promoção se o compilador funcionar isoladamente mas o parser ou o framework ainda não suportar a matriz.",
    related: ["typescript-strict-mode", "node-js-26-lts-migracao-ci-producao"],
    sources: [source("Microsoft: release TypeScript 7.0.2", "https://github.com/microsoft/TypeScript/releases/tag/v7.0.2"), source("typescript-eslint: versões suportadas", "https://typescript-eslint.io/users/dependency-versions/")],
  },
  "react-server-components-producao-2026": {
    note: "Em um teste de migração, confira a fronteira de cada componente que usa estado, efeitos ou eventos do navegador. Revise os dados serializados ao cliente e meça separadamente JavaScript entregue, tempo de resposta do servidor e a interação depois de renderizar.",
    related: ["react-19-novidades", "core-web-vitals-2026-lcp-inp"],
    sources: [source("React: Server Components", "https://react.dev/reference/rsc/server-components"), source("React: diretiva use client", "https://react.dev/reference/rsc/use-client")],
  },
  "agentes-ia-codificacao-2026": {
    note: "Este comparativo reflete o período da publicação. Para escolher uma ferramenta hoje, use a mesma tarefa de teste em cada produto e meça revisão necessária, qualidade do código e acessos concedidos. Confira preços e limites na documentação atual antes de projetar custo por equipe.",
    related: ["agentes-ia-operacao-2026", "ia-saidas-estruturadas-avaliacao-pydantic"],
    sources: [source("Anthropic: documentação do Claude Code", "https://code.claude.com/docs/en/overview"), source("Cursor: documentação", "https://cursor.com/docs"), source("OpenAI: documentação do Codex", "https://developers.openai.com/codex/")],
  },
  "core-web-vitals-2026-lcp-inp": {
    note: "Use o orçamento de bundles para detectar aumento na entrega de JS e CSS. Use dados de campo para avaliar o efeito no usuário. Um bundle dentro do limite ainda pode produzir INP ruim quando um handler segura a thread principal.",
    related: ["performance-web-3s-para-0-8s", "vite-otimizando-builds", "playwright-github-actions-testar-build-react"],
    sources: [source("Chrome/web.dev: limites e medição de Web Vitals", "https://web.dev/articles/vitals"), source("Chrome/web.dev: como otimizar INP", "https://web.dev/articles/optimize-inp"), source("React: useDeferredValue", "https://react.dev/reference/react/useDeferredValue")],
  },
  "seguranca-frontend-2026": {
    note: "Teste a política do site primeiro em modo de relatório e revise as violações antes de impor bloqueios. Combine CSP e Trusted Types com tratamento de conteúdo na aplicação e controle de versão das dependências. Verifique compatibilidade e mantenha testes de comportamento para os fluxos que exibem HTML.",
    related: ["passkeys-webauthn-implementacao-segura", "github-actions-oidc-deploy-sem-segredos-longos"],
    sources: [source("MDN: Content Security Policy", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP"), source("MDN: Trusted Types API", "https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API")],
  },
  "react-19-novidades": {
    note: "Escolha um fluxo pequeno para testar a migração, como um formulário com action e tratamento de erro. Revise tipos e comportamento com o guia de upgrade. Para Server Components, siga também a documentação do framework que controla build e execução.",
    related: ["react-server-components-producao-2026", "playwright-github-actions-testar-build-react"],
    sources: [source("React: anúncio do React 19", "https://react.dev/blog/2024/12/05/react-19"), source("React: guia de upgrade", "https://react.dev/blog/2024/04/25/react-19-upgrade-guide")],
  },
  "typescript-strict-mode": {
    note: "Comece em um módulo com limites claros e corrija primeiro os tipos que cruzam fronteiras de API. Flags como noUncheckedIndexedAccess e exactOptionalPropertyTypes têm configuração própria. Verifique exemplos de ausência explícita e índices fora de faixa antes de adotá-las no projeto todo.",
    related: ["typescript-7-migracao-2026", "ia-saidas-estruturadas-avaliacao-pydantic"],
    sources: [source("TypeScript: opções do TSConfig", "https://www.typescriptlang.org/tsconfig/"), source("TypeScript: narrowing", "https://www.typescriptlang.org/docs/handbook/2/narrowing.html")],
  },
  "vite-otimizando-builds": {
    note: "Os comandos e resultados do estudo de caso refletem a versão original. Em projetos recentes, confira a opção de configuração aceita pelo bundler e inspecione quais chunks a home já carrega. Compare gzip e Brotli separadamente e confirme que o servidor entrega a codificação esperada.",
    related: ["vite-8-rolldown-rust-bundler-2026", "core-web-vitals-2026-lcp-inp"],
    sources: [source("Vite: opções de build", "https://vite.dev/config/build-options"), source("MDN: Content-Encoding", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding")],
  },
  "automacao-saude-o-que-aprendi": {
    note: "Use dados sintéticos ao testar validação e reprocessamento. Para uma mesma mensagem, confira que repetir a operação mantém o resultado e que é possível identificar o processamento no registro de eventos. Evite guardar dados clínicos ou identificadores pessoais no log.",
    related: ["fastapi-react-healthcare-api", "uv-python-ci-lockfile-reprodutivel"],
    sources: [source("Pydantic: migração de validadores para v2", "https://docs.pydantic.dev/latest/migration/"), source("HL7 FHIR: operações REST e criação condicional", "https://hl7.org/fhir/http.html")],
  },
  "linux-setup-desenvolvimento": {
    note: "O artigo registra um setup pessoal de 2025. Ao reproduzir hoje, confirme nomes de pacotes e requisitos do hardware. Versione os arquivos de configuração sem credenciais e documente como recuperar o ambiente a partir de uma instalação limpa.",
    related: ["uv-python-ci-lockfile-reprodutivel", "node-js-26-lts-migracao-ci-producao"],
    sources: [source("ArchWiki: instalação", "https://wiki.archlinux.org/title/Installation_guide"), source("LazyVim: instalação", "https://www.lazyvim.org/installation"), source("tmux: documentação do projeto", "https://github.com/tmux/tmux/wiki")],
  },
  "performance-web-3s-para-0-8s": {
    note: "Trate os números como resultado histórico deste projeto. Para reproduzir, compare rota, dispositivo e rede equivalentes e informe se a amostra veio de laboratório ou de visitas reais. Faça preload de uma imagem principal apenas quando o diagnóstico mostrar atraso na sua descoberta.",
    related: ["core-web-vitals-2026-lcp-inp", "vite-otimizando-builds"],
    sources: [source("Chrome/web.dev: como otimizar LCP", "https://web.dev/articles/optimize-lcp"), source("Chrome/web.dev: como otimizar CLS", "https://web.dev/articles/optimize-cls")],
  },
  "shadcn-ui-adotei-personalizo": {
    note: "Ao copiar ou personalizar um componente, revise nome acessível, foco e teclado. Use os tokens do projeto para manter consistência e teste o componente dentro da página real antes de atualizar todos os usos.",
    related: ["wcag-22-acessibilidade-checklist-produto", "playwright-github-actions-testar-build-react"],
    sources: [source("shadcn/ui: introdução", "https://ui.shadcn.com/docs"), source("WAI-ARIA APG: padrões de interface", "https://www.w3.org/WAI/ARIA/apg/patterns/")],
  },
  "fastapi-react-healthcare-api": {
    note: "Revise a compatibilidade dos exemplos históricos com a versão instalada. No Pydantic v2, use pattern para restrições por expressão regular. Para validar a integração, use fixtures sintéticas, confira o OpenAPI e teste no servidor quem pode ler e alterar cada recurso.",
    related: ["automacao-saude-o-que-aprendi", "ia-saidas-estruturadas-avaliacao-pydantic", "busca-textual-postgresql-indice-gin"],
    sources: [source("FastAPI: modelos de resposta", "https://fastapi.tiangolo.com/tutorial/response-model/"), source("SQLModel: documentação", "https://sqlmodel.tiangolo.com/"), source("Pydantic: guia de migração v2", "https://docs.pydantic.dev/latest/migration/")],
  },
};
