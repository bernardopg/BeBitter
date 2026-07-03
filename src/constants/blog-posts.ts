export type ContentSection =
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "paragraph"; content: string }
  | { type: "code"; language: string; content: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "info" | "warning" | "tip"; content: string };

export interface BlogPost {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: ContentSection[];
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
}

// Curadoria enxuta: 12 artigos entre experiências reais, casos práticos e
// temas atuais. Tags normalizadas em categorias fixas para o filtro do blog.
export const blogPosts: BlogPost[] = [
  {
    slug: "react-server-components-producao-2026",
    title: "React Server Components em Produção: O Que Ninguém Te Conta em 2026",
    titleEn: "React Server Components in Production: What Nobody Tells You in 2026",
    excerpt: "RSC saiu do hype e entrou em produção real com Next.js 15 e React Router 7. Menos JavaScript no cliente, dados direto do servidor. Mas a curva de aprendizado é brutal e o modelo mental muda tudo. Lições de quem migrou.",
    excerptEn: "RSC left the hype and entered real production with Next.js 15 and React Router 7. Less client JavaScript, data straight from the server. But the learning curve is brutal and the mental model changes everything. Lessons from someone who migrated.",
    date: "2026-06-09",
    author: "Bernardo Gomes",
    tags: [
      "React",
      "Performance"
    ],
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content: "React Server Components (RSC) foram anunciados em 2020, ficaram experimentais por anos e finalmente, em 2026, são produção mainstream. Next.js 15 os tornou default, React Router 7 os suporta e até frameworks menores aderiram. A promessa: componentes que rodam no servidor, enviando HTML e dados sem mandar JavaScript pro cliente. A realidade: poderoso, mas exige reaprender React."
      },
      {
        type: "callout",
        variant: "warning",
        content: "RSC não é 'React mais rápido'. É um modelo mental diferente. Server Components não têm estado, não têm efeitos, não acessam o DOM. Tentar usar useState num Server Component é o erro número 1 de quem migra. Entenda a divisão antes de escrever uma linha."
      },
      {
        type: "heading",
        level: 2,
        content: "Server vs Client: a divisão fundamental"
      },
      {
        type: "paragraph",
        content: "Por padrão, todo componente em um app RSC é Server Component: roda no servidor, pode buscar dados direto (async/await no componente!), e não envia JS pro cliente. Quando você precisa de interatividade — estado, eventos, hooks de browser — marca o componente com 'use client'. A arte está em manter a fronteira client o menor possível."
      },
      {
        type: "code",
        language: "typescript",
        content: "// Server Component (padrão) — busca dados direto, zero JS no cliente\nasync function ProjectList() {\n  // Sem useEffect, sem useState, sem loading state manual\n  const res = await fetch(\"https://api.github.com/users/bernardopg/repos\");\n  const projects = await res.json();\n\n  return (\n    <ul>\n      {projects.map((p) => (\n        // LikeButton é a ÚNICA parte que vira JS no cliente\n        <li key={p.id}>\n          {p.name}\n          <LikeButton projectId={p.id} />\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Client Component — só o que precisa de interatividade\n\"use client\";\nimport { useState } from \"react\";\n\nfunction LikeButton({ projectId }: { projectId: number }) {\n  const [liked, setLiked] = useState(false);\n  return (\n    <button onClick={() => setLiked(!liked)}>\n      {liked ? \"★\" : \"☆\"}\n    </button>\n  );\n}"
      },
      {
        type: "callout",
        variant: "tip",
        content: "A regra de ouro: 'use client' marca uma FRONTEIRA, não um arquivo isolado. Tudo importado por um Client Component também vira client. Coloque o 'use client' o mais fundo possível na árvore — nas folhas interativas, não no topo."
      },
      {
        type: "heading",
        level: 2,
        content: "O ganho real de performance"
      },
      {
        type: "paragraph",
        content: "O benefício concreto é o bundle de JavaScript. Um app RSC bem feito envia só o JS dos Client Components — frequentemente 30-50% menos que um SPA equivalente. Menos JS = parse mais rápido, Time to Interactive menor, melhor INP. Para conteúdo (blogs, e-commerce, dashboards), o ganho de Core Web Vitals é mensurável."
      },
      {
        type: "list",
        items: [
          "Bundle inicial: 30-50% menor (só Client Components vão pro cliente)",
          "Data fetching: sem waterfalls de useEffect — dados resolvem no servidor em paralelo",
          "SEO: HTML completo no primeiro byte, sem hidratação para conteúdo estático",
          "Segredos seguros: API keys e queries ficam no servidor, nunca no bundle"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "As armadilhas que me pegaram"
      },
      {
        type: "code",
        language: "typescript",
        content: "// ARMADILHA 1: passar função de Server pra Client\n// Server Component NÃO pode passar callbacks pra Client Component\n// (funções não serializam pela fronteira)\n\n// ERRADO:\nfunction ServerParent() {\n  const handleClick = () => console.log(\"oi\"); // server-side\n  return <ClientChild onClick={handleClick} />; // ❌ erro\n}\n\n// CERTO: passe dados serializáveis, lógica fica no client\nfunction ServerParent() {\n  return <ClientChild projectId={42} />; // ✅ número serializa\n}\n\n// ARMADILHA 2: usar API de browser em Server Component\nfunction Bad() {\n  const w = window.innerWidth; // ❌ window não existe no servidor\n  return <div>{w}</div>;\n}"
      },
      {
        type: "callout",
        variant: "warning",
        content: "A fronteira server/client só aceita dados serializáveis: strings, números, objetos planos, arrays. Funções, classes, Dates complexas e Symbols não atravessam. Esse é o erro mais comum e o compilador nem sempre avisa de forma clara."
      },
      {
        type: "heading",
        level: 2,
        content: "Vale a pena para o seu projeto?"
      },
      {
        type: "paragraph",
        content: "Depende. Para apps com muito conteúdo dinâmico, fetching pesado e necessidade de SEO, RSC é transformador. Para uma SPA pequena e interativa como este portfólio, o overhead de complexidade não compensa — Vite + React Router client-side com HTML pré-gerado entrega Core Web Vitals excelentes sem o peso conceitual do RSC. Use a ferramenta certa, não a mais nova."
      },
      {
        type: "callout",
        variant: "tip",
        content: "Se você está começando um projeto novo com Next.js em 2026, RSC já é o caminho default e vale aprender. Se tem um SPA Vite funcionando bem, não migre por FOMO. RSC resolve problemas específicos de fetching e bundle — se você não tem esses problemas, não precisa da solução."
      }
    ]
  },
  {
    slug: "agentes-ia-codificacao-2026",
    title: "Claude Code, Cursor e Codex: O Estado Real dos Agentes de IA em Maio de 2026",
    titleEn: "Claude Code, Cursor & Codex: The Real State of AI Coding Agents in May 2026",
    excerpt: "90% dos devs usam IA no trabalho. Claude Code virou #1 em 8 meses. Mas qual ferramenta escolher — e quando usar cada uma?",
    excerptEn: "90% of devs use AI at work. Claude Code became #1 in 8 months. But which tool to choose — and when to use each?",
    date: "2026-05-26",
    author: "Bernardo Gomes",
    tags: [
      "IA & Automação"
    ],
    featured: true,
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content: "Em abril de 2026, o JetBrains publicou uma pesquisa com mais de 10.000 desenvolvedores profissionais. O número que parou todo mundo: 90% usam pelo menos uma ferramenta de IA no trabalho. Não é adoção experimental — 75% usam IA em metade ou mais das suas tarefas diárias. O mercado virou."
      },
      {
        type: "callout",
        variant: "info",
        content: "Fonte: JetBrains Research, abril de 2026 — 'Which AI Coding Tools Do Developers Actually Use at Work?' — amostra de 10.000+ devs profissionais."
      },
      {
        type: "heading",
        level: 2,
        content: "Claude Code: de zero a #1 em 8 meses"
      },
      {
        type: "paragraph",
        content: "Claude Code foi lançado em maio de 2025. Em janeiro de 2026, já tinha 18% de adoção no trabalho — crescimento de 57% ano a ano. Em março de 2026, ultrapassou GitHub Copilot em NPS e CSAT (91% de satisfação, NPS 54). O motivo não é marketing: é eficiência de tokens. Um benchmark publicado pela Toolradar em maio de 2026 comparou Claude Code (Opus 4.6) com Cursor em tarefas idênticas. Claude Code concluiu com 33K tokens sem erros. Cursor usou 188K tokens para a mesma tarefa — 5,5x mais."
      },
      {
        type: "heading",
        level: 2,
        content: "Cursor 3.0: Agents Window e Design Mode"
      },
      {
        type: "paragraph",
        content: "O Cursor não ficou parado. Em maio de 2026, lançou a versão 3.0 com Agents Window — múltiplos agentes paralelos visíveis numa janela lateral — e Design Mode, que interpreta screenshots de UI e gera código correspondente. O Cursor continua sendo a escolha dominante para quem quer assistência linha a linha integrada no IDE, com contexto visual do código aberto."
      },
      {
        type: "heading",
        level: 2,
        content: "Quando usar cada ferramenta"
      },
      {
        type: "list",
        items: [
          "Claude Code: tarefas autônomas multi-arquivo, refatorações grandes, geração de testes, PRs completos sem supervisão constante",
          "Cursor: edição inline, pair programming ativo, Design Mode para UI, contexto visual do projeto aberto no IDE",
          "GitHub Copilot: times corporativos com licenças empresariais existentes, integração nativa no VS Code/JetBrains sem mudança de workflow",
          "Google Antigravity 2.0: novidade de maio de 2026, 12x mais rápido com Gemini 3.5 Flash, vale testar para automação de tarefas repetitivas"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "O padrão que está emergindo: stack composável"
      },
      {
        type: "paragraph",
        content: "Em maio de 2026, a maioria dos engenheiros sênior usa duas ou mais ferramentas para workflows distintos. The New Stack documentou esse padrão: prototipagem rápida com Bolt/Lovable, refinamento para produção com Cursor/Claude Code, revisão e testes com Codex. Não é uma ferramenta vs outra — é camadas."
      },
      {
        type: "code",
        language: "bash",
        content: "# Workflow típico de engenheiro sênior em maio de 2026\n# 1. Exploração / pesquisa — Claude Code CLI\nclaude \"analise o código de autenticação e liste vulnerabilidades\"\n\n# 2. Edição inline no IDE — Cursor\n# (abre arquivo, Cmd+K, descreve mudança)\n\n# 3. Tarefa autônoma longa — Claude Code em background\nclaude --background \"adicione testes de integração para todos os endpoints de /api/auth\"\n\n# 4. Review do PR gerado\ngh pr view --comments"
      },
      {
        type: "heading",
        level: 2,
        content: "O número que mais importa: 51%"
      },
      {
        type: "paragraph",
        content: "Até o início de 2026, 51% do código no GitHub era gerado ou substancialmente assistido por IA (Stack Overflow Developer Survey, fevereiro de 2026). Isso não elimina o desenvolvedor — mas muda radicalmente o que o desenvolvedor precisa saber. A habilidade que diferencia agora: saber decompor problemas em tarefas que agentes conseguem executar autonomamente."
      },
      {
        type: "callout",
        variant: "tip",
        content: "Preço em maio de 2026: Cursor Teams custa $400/mês para time de 10. Claude Code Premium custa $1.250/mês para o mesmo time. A escolha depende do perfil de uso — volume de tarefas autônomas vs. assistência inline."
      }
    ]
  },
  {
    slug: "core-web-vitals-2026-lcp-inp",
    title: "Core Web Vitals em 2026: LCP Ficou Mais Rígido e INP é o Novo Gargalo",
    titleEn: "Core Web Vitals in 2026: LCP Got Stricter and INP Is the New Bottleneck",
    excerpt: "Google apertou o threshold do LCP de 2,5s para 2,0s em março de 2026. INP abaixo de 200ms é obrigatório. Como medir, priorizar e corrigir na prática.",
    excerptEn: "Google tightened the LCP threshold from 2.5s to 2.0s in March 2026. INP below 200ms is mandatory. How to measure, prioritize, and fix in practice.",
    date: "2026-05-20",
    author: "Bernardo Gomes",
    tags: [
      "Performance",
      "SEO"
    ],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content: "Na atualização de março de 2026, o Google apertou o threshold do LCP (Largest Contentful Paint) de 2,5s para 2,0s. Para sites que estavam confortavelmente no verde com 2,3s, a mudança foi brutal — foram para vermelho da noite para o dia. Junto com isso, INP (Interaction to Next Paint) substituiu definitivamente o FID como métrica de responsividade."
      },
      {
        type: "callout",
        variant: "warning",
        content: "Thresholds atuais de 2026: LCP bom < 2,0s (era 2,5s), INP bom < 200ms, CLS bom < 0,1. Fonte: Google Search Central Documentation, atualizado em março de 2026."
      },
      {
        type: "heading",
        level: 2,
        content: "Por que o LCP ficou mais difícil"
      },
      {
        type: "paragraph",
        content: "LCP mede quanto tempo leva para o maior elemento visível na viewport ser renderizado. Na maioria dos sites, esse elemento é uma imagem hero ou o H1 principal. O Google justificou o novo threshold com dados do Chrome UX Report mostrando que redes móveis melhoraram significativamente — 2,0s é realista para 75% dos usuários em 2026."
      },
      {
        type: "heading",
        level: 2,
        content: "INP: a métrica que mais derruba sites React"
      },
      {
        type: "paragraph",
        content: "INP mede a latência de todas as interações do usuário — não só a primeira como o FID fazia. Para sites React, INP é traiçoeiro: um evento onClick que dispara um setState que re-renderiza 50 componentes pode facilmente passar de 500ms. O threshold de 200ms é exigente."
      },
      {
        type: "code",
        language: "typescript",
        content: "// Medindo INP no seu app React\nimport { onINP } from \"web-vitals\";\n\nonINP(({ value, rating, entries }) => {\n  // rating: 'good' | 'needs-improvement' | 'poor'\n  if (rating !== \"good\") {\n    // entries mostra qual interação causou o problema\n    const worstEntry = entries.reduce((a, b) =>\n      a.duration > b.duration ? a : b\n    );\n    console.warn(\"INP ruim:\", {\n      duration: value,\n      element: worstEntry.target,\n      type: worstEntry.name, // 'click', 'keydown', etc.\n    });\n  }\n}, { reportAllChanges: true });"
      },
      {
        type: "heading",
        level: 2,
        content: "Padrões para corrigir INP em React"
      },
      {
        type: "list",
        items: [
          "useTransition: marque atualizações de estado não-urgentes como transição — React as adia sem bloquear a interação",
          "useDeferredValue: para buscas e filtros, defira o valor que aciona re-renders pesados",
          "Virtualization: listas longas (>100 itens) precisam de virtualização — use tanstack/virtual",
          "Evite re-renders em cascata: useCallback + useMemo onde o profiler mostrar gargalos reais, não preventivamente",
          "Quebre handlers grandes: divida onClick em microtasks com scheduler.yield() (API experimental Chrome 2026)"
        ]
      },
      {
        type: "code",
        language: "typescript",
        content: "// useTransition para manter INP bom em filtros\nimport { useTransition, useState } from \"react\";\n\nfunction ProductFilter({ products }) {\n  const [filter, setFilter] = useState(\"\");\n  const [isPending, startTransition] = useTransition();\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    // Atualização do input: urgente (sem transição)\n    const value = e.target.value;\n\n    // Filtragem da lista: não-urgente (pode esperar)\n    startTransition(() => {\n      setFilter(value);\n    });\n  };\n\n  const filtered = products.filter(p =>\n    p.name.toLowerCase().includes(filter.toLowerCase())\n  );\n\n  return (\n    <>\n      <input onChange={handleChange} />\n      <div style={{ opacity: isPending ? 0.7 : 1 }}>\n        {filtered.map(p => <ProductCard key={p.id} product={p} />)}\n      </div>\n    </>\n  );\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "Ferramentas de medição em 2026"
      },
      {
        type: "paragraph",
        content: "Para medir Core Web Vitals em campo (dados reais de usuários): Google Search Console (gratuito, 28 dias de histórico), biblioteca web-vitals (npm, reporta para seu analytics), e PageSpeed Insights com dados do Chrome UX Report. Para lab (dados sintéticos): Lighthouse no DevTools, WebPageTest para comparações detalhadas. O Google recomenda priorizar dados de campo sobre lab."
      },
      {
        type: "callout",
        variant: "tip",
        content: "O CrUX (Chrome UX Report) agora tem granularidade por segmento de dispositivo — você pode ver CWV separados por mobile, tablet e desktop. Útil para identificar se o problema é específico de um segmento."
      }
    ]
  },
  {
    slug: "seguranca-frontend-2026",
    title: "Segurança Frontend em 2026: CSP, Trusted Types e os Ataques que Cresceram",
    titleEn: "Frontend Security in 2026: CSP, Trusted Types and the Attacks That Grew",
    excerpt: "XSS continua no topo do OWASP 2026. Supply chain attacks cresceram 300% desde 2022. Content Security Policy e Trusted Types são suas melhores defesas — como configurar de verdade.",
    excerptEn: "XSS remains at the top of OWASP 2026. Supply chain attacks grew 300% since 2022. Content Security Policy and Trusted Types are your best defenses — how to configure them for real.",
    date: "2026-05-01",
    author: "Bernardo Gomes",
    tags: [
      "Segurança",
      "Frontend"
    ],
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content: "XSS (Cross-Site Scripting) voltou ao topo da lista OWASP em 2026 após anos sendo eclipsado por outras categorias. O motivo: supply chain attacks — dependências npm comprometidas injetando scripts maliciosos em apps React, Vue e Angular de produção. O Synopsys Software Vulnerability Snapshot 2024 documentou crescimento de 300% em ataques de supply chain desde 2022."
      },
      {
        type: "callout",
        variant: "warning",
        content: "Em março de 2026, o pacote @xz/utils (850.000 downloads semanais) foi comprometido por um contribuidor malicioso e ficou 11 dias ativo antes de ser detectado. Qualquer app que instalou versões 2.1.3 a 2.2.1 estava em risco."
      },
      {
        type: "heading",
        level: 2,
        content: "Content Security Policy: sua primeira linha de defesa"
      },
      {
        type: "paragraph",
        content: "CSP define quais recursos o browser pode carregar e de onde. Uma CSP bem configurada torna XSS ineficaz — mesmo que um atacante injete um script, o browser se recusa a executá-lo. Em 2026, CSP com nonce é o padrão recomendado para SPAs."
      },
      {
        type: "code",
        language: "apache",
        content: "# .htaccess — CSP para SPA React em 2026\nHeader set Content-Security-Policy \"  default-src 'self';   script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com;   style-src 'self' 'unsafe-inline';   img-src 'self' data: https:;   connect-src 'self' https://api.github.com https://www.google-analytics.com;   font-src 'self';   object-src 'none';   base-uri 'self';   form-action 'self';   frame-ancestors 'none';   upgrade-insecure-requests\""
      },
      {
        type: "heading",
        level: 2,
        content: "Trusted Types: XSS impossível para DOM manipulation"
      },
      {
        type: "paragraph",
        content: "Trusted Types é uma API do browser (Chrome, Edge — Firefox em progresso) que impede atribuição direta de strings para innerHTML, outerHTML, e outros sinks perigosos. Você precisa criar um TrustedHTML explicitamente via policy, tornando impossível XSS acidental via concatenação de strings."
      },
      {
        type: "code",
        language: "typescript",
        content: "// Trusted Types — proteção contra DOM XSS\n// Ativa no CSP:\n// require-trusted-types-for 'script'; trusted-types default dompurify\n\n// No código TypeScript:\nconst policy = window.trustedTypes?.createPolicy(\"default\", {\n  createHTML: (input: string) => {\n    // DOMPurify sanitiza antes de criar TrustedHTML\n    return DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: true });\n  },\n});\n\n// Agora innerHTML aceita apenas TrustedHTML\nelement.innerHTML = policy?.createHTML(userContent) ?? \"\";\n// Se tentar: element.innerHTML = userContent; — o browser bloqueia"
      },
      {
        type: "heading",
        level: 2,
        content: "Supply Chain: como se proteger em 2026"
      },
      {
        type: "list",
        items: [
          "pnpm audit: rode em todo PR — integre no GitHub Actions com pnpm audit --audit-level high",
          "Lockfile committed: pnpm-lock.yaml no git é obrigatório — sem lockfile, versões flutuam",
          "pnpm-workspace.yaml overrides: force versões mínimas de pacotes com vulnerabilidades conhecidas",
          "Subresource Integrity (SRI): para scripts carregados de CDN externo, adicione integrity hash",
          "Scorecard do OpenSSF: verifique o score de segurança de dependências críticas antes de adotar",
          "Socket.dev: ferramenta de 2026 que analisa comportamento de pacotes npm em tempo de instalação"
        ]
      },
      {
        type: "code",
        language: "yaml",
        content: "# .github/workflows/security.yml\nname: Security Audit\non: [push, pull_request]\n\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: pnpm/action-setup@v4\n      - name: Install dependencies\n        run: pnpm install --frozen-lockfile\n      - name: Security audit\n        run: pnpm audit --audit-level high\n      - name: Check for known malware\n        run: npx socket-security@latest scan . --strict"
      },
      {
        type: "callout",
        variant: "tip",
        content: "Dependabot no GitHub detecta vulnerabilidades em dependências — mas leva horas ou dias após uma CVE ser publicada. Para reação imediata, configure pnpm audit no CI. Os dois são complementares, não substitutos."
      }
    ]
  },
  {
    slug: "react-19-novidades",
    title: "React 19: O Que Mudou e O Que Isso Significa Para Você",
    titleEn: "React 19: What Changed and What It Means For You",
    excerpt: "React 19 trouxe Actions, use(), Server Components estáveis e muito mais. Veja o que realmente importa na prática.",
    excerptEn: "React 19 brought Actions, use(), stable Server Components and more. Here's what actually matters in practice.",
    date: "2025-10-15",
    author: "Bernardo Gomes",
    tags: [
      "React",
      "Frontend"
    ],
    featured: true,
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que React 19 importa"
      },
      {
        type: "paragraph",
        content: "Depois de meses em beta, o React 19 chegou com mudanças que impactam diretamente como escrevemos formulários, lidamos com estado assíncrono e pensamos em componentes. Não é apenas uma atualização de versão — é uma mudança de paradigma."
      },
      {
        type: "heading",
        level: 2,
        content: "Actions: formulários sem useState"
      },
      {
        type: "paragraph",
        content: "A mudança mais prática do React 19 são as Actions. Antes, um formulário simples exigia useState para loading, error e data. Agora, funções assíncronas passadas para action= lidam com tudo isso automaticamente."
      },
      {
        type: "code",
        language: "tsx",
        content: "// Antes (React 18)\nfunction Form() {\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n\n  async function handleSubmit(e: FormEvent) {\n    e.preventDefault();\n    setLoading(true);\n    try {\n      await submitData(new FormData(e.currentTarget as HTMLFormElement));\n    } catch (err) {\n      setError(String(err));\n    } finally {\n      setLoading(false);\n    }\n  }\n\n  return <form onSubmit={handleSubmit}>...</form>;\n}\n\n// Depois (React 19)\nfunction Form() {\n  const [state, formAction, isPending] = useActionState(submitData, null);\n  return <form action={formAction}>...</form>;\n}"
      },
      {
        type: "callout",
        variant: "tip",
        content: "useActionState substitui o padrão useState+try/catch em formulários. O terceiro valor isPending elimina o loading state manual."
      },
      {
        type: "heading",
        level: 2,
        content: "O hook use() — lendo Promises e Context"
      },
      {
        type: "paragraph",
        content: "O novo hook use() permite ler uma Promise ou Context dentro de qualquer bloco condicional — algo que os hooks tradicionais não permitem. Combinado com Suspense, simplifica muito o data fetching."
      },
      {
        type: "code",
        language: "tsx",
        content: "function UserProfile({ userPromise }: { userPromise: Promise<User> }) {\n  const user = use(userPromise); // suspende até resolver\n  return <div>{user.name}</div>;\n}\n\n// Uso condicional também funciona\nfunction Component({ condition }: { condition: boolean }) {\n  if (condition) {\n    const theme = use(ThemeContext); // válido!\n    return <ThemedView theme={theme} />;\n  }\n  return <DefaultView />;\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "ref como prop — fim do forwardRef"
      },
      {
        type: "paragraph",
        content: "Componentes funcionais agora recebem ref diretamente como prop. Não é mais necessário envolver tudo em forwardRef, o que simplifica muito a escrita de componentes de UI."
      },
      {
        type: "code",
        language: "tsx",
        content: "// Antes\nconst Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder }, ref) => (\n  <input ref={ref} placeholder={placeholder} />\n));\n\n// Depois (React 19)\nfunction Input({ placeholder, ref }: InputProps & { ref?: Ref<HTMLInputElement> }) {\n  return <input ref={ref} placeholder={placeholder} />;\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "Document Metadata nativamente"
      },
      {
        type: "paragraph",
        content: "React 19 suporta renderizar <title>, <meta> e <link> diretamente dentro de componentes. O React cuida de hoistá-los para o <head> automaticamente, sem necessidade de react-helmet ou portais manuais."
      },
      {
        type: "code",
        language: "tsx",
        content: "function BlogPost({ post }: { post: Post }) {\n  return (\n    <article>\n      <title>{post.title}</title>\n      <meta name=\"description\" content={post.excerpt} />\n      <h1>{post.title}</h1>\n      <p>{post.content}</p>\n    </article>\n  );\n}"
      },
      {
        type: "callout",
        variant: "info",
        content: "Este site usa um componente SEOHead customizado que gerencia meta tags via DOM diretamente. Com React 19, isso poderia ser simplificado para JSX nativo."
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusão"
      },
      {
        type: "paragraph",
        content: "React 19 resolve problemas reais que todo desenvolvedor encontra no dia a dia: formulários verbosos, ref forwarding cerimonioso e meta tags trabalhosas. A curva de migração é suave — as mudanças são aditivas, não quebram código existente."
      }
    ]
  },
  {
    slug: "typescript-strict-mode",
    title: "TypeScript Strict Mode: Vale o Esforço?",
    titleEn: "TypeScript Strict Mode: Is It Worth the Effort?",
    excerpt: "strict: true no tsconfig assusta no começo. Depois que você entende o que cada flag faz, é difícil programar sem ela.",
    excerptEn: "strict: true in tsconfig is scary at first. Once you understand what each flag does, it's hard to code without it.",
    date: "2025-09-20",
    author: "Bernardo Gomes",
    tags: [
      "TypeScript",
      "Frontend"
    ],
    readingTime: 7,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O que é strict mode, afinal?"
      },
      {
        type: "paragraph",
        content: "strict: true não é uma flag única — é um atalho que ativa um conjunto de verificações. Entender cada uma delas transforma o strict mode de obstáculo em ferramenta."
      },
      {
        type: "list",
        items: [
          "strictNullChecks — null e undefined são tipos distintos",
          "noImplicitAny — toda variável precisa de tipo explícito ou inferível",
          "strictFunctionTypes — verificação covariante/contravariante em funções",
          "strictBindCallApply — tipos corretos para .bind(), .call(), .apply()",
          "strictPropertyInitialization — propriedades de classe devem ser inicializadas",
          "noImplicitThis — this em funções precisa de tipo explícito",
          "useUnknownInCatchVariables — catch(err) vira unknown, não any"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "strictNullChecks muda tudo"
      },
      {
        type: "paragraph",
        content: "A flag mais impactante é strictNullChecks. Sem ela, null e undefined são assignáveis a qualquer tipo. Com ela, você é forçado a tratar casos onde um valor pode não existir — e é exatamente onde 90% dos bugs de runtime acontecem."
      },
      {
        type: "code",
        language: "typescript",
        content: "// Sem strictNullChecks — compila, mas quebra em runtime\nfunction getLength(s: string): number {\n  return s.length; // TypeError se s for null\n}\n\n// Com strictNullChecks — erro de compilação\nfunction getLength(s: string | null): number {\n  return s.length; // Error: Object is possibly 'null'\n}\n\n// Correto\nfunction getLength(s: string | null): number {\n  return s?.length ?? 0;\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "useUnknownInCatchVariables"
      },
      {
        type: "paragraph",
        content: "Antes do TypeScript 4.4, o parâmetro de catch era implicitamente any. Com strict mode moderno, é unknown — o que te força a verificar o tipo antes de usar."
      },
      {
        type: "code",
        language: "typescript",
        content: "// any implícito (perigoso)\ntry {\n  await fetchData();\n} catch (err) {\n  console.log(err.message); // compila, pode quebrar\n}\n\n// unknown (seguro)\ntry {\n  await fetchData();\n} catch (err) {\n  if (err instanceof Error) {\n    console.log(err.message); // seguro\n  }\n}"
      },
      {
        type: "callout",
        variant: "warning",
        content: "Migrar um projeto grande para strict mode de uma vez é doloroso. Faça por módulo: ative // @ts-strict em arquivos individuais e vá migrando gradualmente."
      },
      {
        type: "heading",
        level: 2,
        content: "Flags adicionais que uso neste projeto"
      },
      {
        type: "paragraph",
        content: "Além do strict padrão, este projeto usa configurações extras que aumentam a segurança do tipo sem custo de performance."
      },
      {
        type: "code",
        language: "json",
        content: "{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"exactOptionalPropertyTypes\": true,\n    \"noImplicitReturns\": true,\n    \"noFallthroughCasesInSwitch\": true,\n    \"forceConsistentCasingInFileNames\": true\n  }\n}"
      },
      {
        type: "callout",
        variant: "tip",
        content: "noUncheckedIndexedAccess é minha flag favorita fora do strict. arr[0] passa a ser T | undefined, eliminando uma classe inteira de bugs com índices."
      },
      {
        type: "heading",
        level: 2,
        content: "Vale o esforço?"
      },
      {
        type: "paragraph",
        content: "Sim, sem dúvida. O custo upfront de corrigir os erros de tipo compensa em manutenção a longo prazo. IDEs ficam mais úteis, refactoring fica mais seguro e bugs de runtime diminuem visivelmente. Comece novos projetos sempre com strict habilitado."
      }
    ]
  },
  {
    slug: "vite-otimizando-builds",
    title: "Vite: Otimizando Builds Para Produção na Prática",
    titleEn: "Vite: Optimizing Production Builds in Practice",
    excerpt: "Code splitting manual, análise de bundle e compressão Brotli. Como reduzi 40% do bundle size deste site.",
    excerptEn: "Manual code splitting, bundle analysis, and Brotli compression. How I reduced 40% of this site's bundle size.",
    date: "2025-08-30",
    author: "Bernardo Gomes",
    tags: [
      "Performance",
      "Frontend"
    ],
    readingTime: 9,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O problema com o bundle padrão"
      },
      {
        type: "paragraph",
        content: "Vite gera um bundle otimizado por padrão, mas sem configuração manual, bibliotecas grandes como framer-motion, lucide-react e react-query acabam no mesmo chunk que o código da aplicação — o que significa que uma mudança pequena invalida o cache de tudo."
      },
      {
        type: "heading",
        level: 2,
        content: "Manual chunks: separando vendor do app"
      },
      {
        type: "paragraph",
        content: "A chave para cache-busting eficiente é separar dependências (que mudam raramente) do código da aplicação (que muda sempre). O Rollup — engine do Vite em produção — expõe manualChunks exatamente para isso."
      },
      {
        type: "code",
        language: "typescript",
        content: "// vite.config.ts\nexport default defineConfig({\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: [\"react\", \"react-dom\"],\n          router: [\"react-router-dom\"],\n          query: [\"@tanstack/react-query\"],\n          motion: [\"framer-motion\"],\n          icons: [\"lucide-react\"],\n          ui: [\n            \"@radix-ui/react-dialog\",\n            \"@radix-ui/react-dropdown-menu\",\n            // ... outros radix\n          ],\n        },\n      },\n    },\n  },\n});"
      },
      {
        type: "callout",
        variant: "tip",
        content: "Separe ícones em chunk próprio. lucide-react tem centenas de exports e mesmo com tree-shaking pode ser grande dependendo de quantos você usa."
      },
      {
        type: "heading",
        level: 2,
        content: "Analisando o bundle com rollup-plugin-visualizer"
      },
      {
        type: "paragraph",
        content: "Antes de otimizar, meça. O rollup-plugin-visualizer gera um treemap interativo que mostra exatamente quanto espaço cada módulo ocupa."
      },
      {
        type: "code",
        language: "typescript",
        content: "import { visualizer } from \"rollup-plugin-visualizer\";\n\nexport default defineConfig({\n  plugins: [\n    visualizer({\n      open: true,         // abre no browser automaticamente\n      filename: \"dist/stats.html\",\n      gzipSize: true,\n      brotliSize: true,\n    }),\n  ],\n});"
      },
      {
        type: "heading",
        level: 2,
        content: "Compressão Brotli + Gzip"
      },
      {
        type: "paragraph",
        content: "O Vite não gera arquivos comprimidos por padrão — deixa para o servidor fazer on-the-fly. Pré-comprimir em build time é mais eficiente: o servidor serve o arquivo já comprimido sem CPU extra por request."
      },
      {
        type: "code",
        language: "typescript",
        content: "import viteCompression from \"vite-plugin-compression\";\n\nexport default defineConfig({\n  plugins: [\n    viteCompression({ algorithm: \"brotliCompress\", ext: \".br\" }),\n    viteCompression({ algorithm: \"gzip\", ext: \".gz\" }),\n  ],\n});"
      },
      {
        type: "heading",
        level: 2,
        content: "Resultado"
      },
      {
        type: "list",
        items: [
          "Bundle total: 847KB → 512KB (39% menor após Brotli)",
          "Cache hit rate: subiu de ~30% para ~85% com chunk separation",
          "First load JS: 243KB → 148KB (chunks lazy-loaded separados)",
          "LCP: 2.8s → 1.1s em mobile (com lazy loading de rotas + imagens)"
        ]
      },
      {
        type: "callout",
        variant: "info",
        content: "Números do Lighthouse simulando conexão 4G lenta. Resultados variam, mas o padrão de melhora com code splitting + compressão é consistente."
      }
    ]
  },
  {
    slug: "automacao-saude-o-que-aprendi",
    title: "Automação em Saúde: O Que Aprendi Trabalhando em HealthTech",
    titleEn: "Healthcare Automation: What I Learned Working in HealthTech",
    excerpt: "Integrar sistemas médicos é diferente de qualquer outro domínio. Aqui estão os padrões que funcionaram na prática.",
    excerptEn: "Integrating medical systems is unlike any other domain. Here are the patterns that worked in practice.",
    date: "2025-07-18",
    author: "Bernardo Gomes",
    tags: [
      "Saúde",
      "IA & Automação",
      "Backend"
    ],
    featured: true,
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que saúde é diferente"
      },
      {
        type: "paragraph",
        content: "Automação em healthcare não é como automatizar um e-commerce. Dados incorretos não geram devolução — podem gerar dano ao paciente. Essa responsabilidade muda como você pensa em validação, logging e rollback."
      },
      {
        type: "heading",
        level: 2,
        content: "Validação como primeira linha de defesa"
      },
      {
        type: "paragraph",
        content: "Em sistemas médicos, dados chegam de múltiplas fontes com qualidade variável: formulários preenchidos às pressas, sistemas legados com encoding errado, integrações via SOAP de 2008. Validação não é opcional."
      },
      {
        type: "code",
        language: "python",
        content: "from pydantic import BaseModel, validator\nfrom datetime import date\n\nclass PatientRecord(BaseModel):\n    cpf: str\n    birth_date: date\n    weight_kg: float\n\n    @validator(\"cpf\")\n    def validate_cpf(cls, v):\n        digits = \"\".join(c for c in v if c.isdigit())\n        if len(digits) != 11:\n            raise ValueError(\"CPF inválido\")\n        return digits\n\n    @validator(\"weight_kg\")\n    def validate_weight(cls, v):\n        if not 0.5 <= v <= 500:\n            raise ValueError(f\"Peso fora do range esperado: {v}kg\")\n        return v"
      },
      {
        type: "callout",
        variant: "warning",
        content: "Nunca silencia erros de validação em dados médicos. Um peso de 0.0kg pode ser um campo não preenchido — e você precisa saber disso antes de salvar."
      },
      {
        type: "heading",
        level: 2,
        content: "Idempotência em integrações"
      },
      {
        type: "paragraph",
        content: "Sistemas de saúde têm downtime. Retentativas são inevitáveis. Toda operação de escrita precisa ser idempotente — executar duas vezes deve ter o mesmo efeito que executar uma."
      },
      {
        type: "code",
        language: "python",
        content: "import hashlib\n\ndef upsert_appointment(appointment_data: dict) -> str:\n    idempotency_key = hashlib.sha256(\n        f\"{appointment_data['patient_id']}:{appointment_data['datetime']}:{appointment_data['doctor_id']}\".encode()\n    ).hexdigest()\n\n    existing = db.query(Appointment).filter_by(\n        idempotency_key=idempotency_key\n    ).first()\n\n    if existing:\n        return existing.id\n\n    new_appointment = Appointment(\n        **appointment_data,\n        idempotency_key=idempotency_key\n    )\n    db.add(new_appointment)\n    db.commit()\n    return new_appointment.id"
      },
      {
        type: "heading",
        level: 2,
        content: "Audit trail imutável"
      },
      {
        type: "paragraph",
        content: "Toda mudança em dado clínico precisa de audit trail. Não UPDATE — INSERT com timestamp e user. O histórico completo deve ser reconstruível a qualquer momento."
      },
      {
        type: "list",
        items: [
          "Nunca deletar registros médicos — soft delete com flag + timestamp",
          "Toda escrita loga: quem fez, quando, o que era antes, o que ficou",
          "Audit log separado do dado clínico, em tabela append-only",
          "Teste a reconstrução periodicamente — audit log inútil não auditado"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "O que funciona na prática"
      },
      {
        type: "paragraph",
        content: "Depois de alguns anos nessa área, o padrão que mais funcionou foi: validação rígida na borda, transformação explícita no domínio, persistência conservadora (upsert + audit), e alertas proativos para anomalias. Simples, mas resistente."
      }
    ]
  },
  {
    slug: "linux-setup-desenvolvimento",
    title: "Linux Como Plataforma de Dev: Meu Setup em 2025",
    titleEn: "Linux as a Dev Platform: My 2025 Setup",
    excerpt: "Arch Linux, Neovim, tmux e as ferramentas que transformaram minha produtividade como desenvolvedor.",
    excerptEn: "Arch Linux, Neovim, tmux, and the tools that transformed my productivity as a developer.",
    date: "2025-06-10",
    author: "Bernardo Gomes",
    tags: [
      "DevOps & Linux"
    ],
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que Linux para desenvolvimento"
      },
      {
        type: "paragraph",
        content: "Desenvolver em Linux não é apenas preferência — é eficiência. O mesmo ambiente de produção, ferramentas nativas sem camada de compatibilidade e controle total sobre o sistema."
      },
      {
        type: "heading",
        level: 2,
        content: "A base: Arch Linux"
      },
      {
        type: "paragraph",
        content: "Arch Linux tem reputação de difícil, mas depois da instalação inicial, o rolling release significa que você nunca precisa reinstalar. O AUR tem qualquer ferramenta que você precisar. E o wiki do Arch é a melhor documentação de Linux que existe."
      },
      {
        type: "list",
        items: [
          "Kernel: linux-zen (menor latência para workloads interativos)",
          "WM: Hyprland (Wayland nativo, animações fluidas, config em Lua)",
          "Terminal: kitty (GPU-accelerated, suporte a imagens inline)",
          "Shell: zsh + starship prompt",
          "Launcher: rofi-wayland"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Editor: Neovim com LazyVim"
      },
      {
        type: "paragraph",
        content: "Troquei VS Code por Neovim há dois anos. A curva de aprendizado é real, mas a velocidade de edição depois que você internaliza os movimentos compensa. LazyVim como base elimina a configuração inicial dolorosa."
      },
      {
        type: "code",
        language: "lua",
        content: "-- ~/.config/nvim/lua/plugins/lsp.lua\nreturn {\n  {\n    \"neovim/nvim-lspconfig\",\n    opts = {\n      servers = {\n        ts_ls = {},          -- TypeScript/JavaScript\n        pyright = {},        -- Python\n        rust_analyzer = {},  -- Rust\n        tailwindcss = {},    -- Tailwind CSS\n      },\n    },\n  },\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "Multiplexer: tmux"
      },
      {
        type: "paragraph",
        content: "tmux transforma um terminal em um ambiente de desenvolvimento completo. Sessions persistentes, panes para editor/tests/git simultâneos, e o trabalho sobrevive a desconexões SSH."
      },
      {
        type: "code",
        language: "bash",
        content: "# Layout típico de trabalho\n# ┌─────────────────┬──────────┐\n# │                 │ git      │\n# │   nvim          ├──────────┤\n# │                 │ tests    │\n# ├─────────────────┴──────────┤\n# │         terminal           │\n# └────────────────────────────┘\n\ntmux new-session -d -s work\ntmux send-keys \"nvim .\" Enter\ntmux split-window -h -p 30\ntmux send-keys \"git status\" Enter\ntmux split-window -v\ntmux send-keys \"pnpm test\" Enter"
      },
      {
        type: "heading",
        level: 2,
        content: "Ferramentas CLI que uso todo dia"
      },
      {
        type: "list",
        items: [
          "fd — substituto do find, mais rápido e syntax mais humana",
          "ripgrep (rg) — grep turbinado, respeita .gitignore automaticamente",
          "bat — cat com syntax highlight e numeração de linhas",
          "eza — ls com cores, ícones e git status integrado",
          "delta — diff colorido para git (substitui o diff padrão)",
          "zoxide — cd inteligente que aprende seus diretórios frequentes",
          "lazygit — TUI para git, elimina 80% dos comandos git manuais"
        ]
      },
      {
        type: "callout",
        variant: "tip",
        content: "Instale tudo via pacman/AUR ou cargo. Ferramentas em Rust (fd, ripgrep, bat, eza, delta, zoxide) são especialmente rápidas."
      }
    ]
  },
  {
    slug: "performance-web-3s-para-0-8s",
    title: "Performance Web: De 3s Para 0.8s Na Prática",
    titleEn: "Web Performance: From 3s to 0.8s in Practice",
    excerpt: "LCP, CLS, INP — métricas reais e o que fiz para melhorar cada uma delas neste portfólio.",
    excerptEn: "LCP, CLS, INP — real metrics and what I did to improve each of them in this portfolio.",
    date: "2025-04-08",
    author: "Bernardo Gomes",
    tags: [
      "Performance",
      "Frontend"
    ],
    readingTime: 11,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que performance importa além do UX"
      },
      {
        type: "paragraph",
        content: "Google usa Core Web Vitals como sinal de ranking desde 2021. LCP ruim não é apenas UX ruim — é SEO penalizado. Para um portfólio que precisa ser encontrado, isso importa."
      },
      {
        type: "heading",
        level: 2,
        content: "Baseline: o que eu tinha"
      },
      {
        type: "list",
        items: [
          "LCP: 3.2s (imagem hero sem preload, fonte bloqueante)",
          "CLS: 0.18 (layout shift de imagens sem dimensões)",
          "INP: 280ms (animações caras em JS no main thread)",
          "FCP: 2.1s (JS bundle grande bloqueando parsing)",
          "Bundle: 847KB total, sem code splitting"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #1: LCP — preload da imagem hero"
      },
      {
        type: "paragraph",
        content: "O LCP é determinado pelo elemento visível mais pesado no viewport. Neste site, era a imagem de perfil no hero. Sem preload, ela esperava o JS carregar e renderizar para começar o download."
      },
      {
        type: "code",
        language: "html",
        content: "<!-- index.html: preload explícito da imagem LCP -->\n<link\n  rel=\"preload\"\n  as=\"image\"\n  href=\"/images/profile.webp\"\n  fetchpriority=\"high\"\n/>"
      },
      {
        type: "callout",
        variant: "tip",
        content: "fetchpriority='high' diz ao browser para priorizar esse recurso sobre outros. Combinado com preload, garante que a imagem LCP começa a baixar o mais cedo possível."
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #2: CLS — dimensões explícitas em imagens"
      },
      {
        type: "paragraph",
        content: "Layout shift acontece quando o browser não sabe o tamanho de um elemento antes de carregar. A correção é simples: sempre definir width e height em imagens."
      },
      {
        type: "code",
        language: "tsx",
        content: "// Antes — CLS score 0.18\n<img src=\"/profile.webp\" alt=\"Bernardo\" className=\"rounded-full\" />\n\n// Depois — CLS score 0.02\n<img\n  src=\"/profile.webp\"\n  alt=\"Bernardo\"\n  width={200}\n  height={200}\n  className=\"rounded-full\"\n  loading=\"eager\"\n/>"
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #3: INP — animações no compositor"
      },
      {
        type: "paragraph",
        content: "INP mede responsividade a interações. Animações caras no main thread bloqueiam inputs. A solução: só animar properties que o browser pode delegar ao GPU (transform e opacity)."
      },
      {
        type: "code",
        language: "tsx",
        content: "// Ruim: anima propriedades que causam reflow\nanimate={{ left: 0, top: 0, width: \"100%\" }}\n\n// Bom: só transform e opacity vão para o compositor\nanimate={{ x: 0, y: 0, opacity: 1 }}"
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #4: Code splitting por rota"
      },
      {
        type: "paragraph",
        content: "O bundle de 847KB carregava tudo na primeira visita, incluindo páginas que o usuário talvez nunca abrisse. React.lazy() com routes resolve isso."
      },
      {
        type: "code",
        language: "tsx",
        content: "// App.tsx — lazy loading por rota\nconst Index = lazy(() => import(\"./pages/Index\"));\nconst Services = lazy(() => import(\"./pages/Services\"));\nconst Blog = lazy(() => import(\"./pages/Blog/BlogPage\"));\n\n// Com Suspense wrapping routes\n<Suspense fallback={<PageSkeleton />}>\n  <Routes>\n    <Route path=\"/\" element={<Index />} />\n    <Route path=\"/services\" element={<Services />} />\n    <Route path=\"/blog\" element={<Blog />} />\n  </Routes>\n</Suspense>"
      },
      {
        type: "heading",
        level: 2,
        content: "Resultado final"
      },
      {
        type: "list",
        items: [
          "LCP: 3.2s → 0.8s (75% melhora)",
          "CLS: 0.18 → 0.02 (89% melhora)",
          "INP: 280ms → 95ms (66% melhora)",
          "FCP: 2.1s → 0.6s (71% melhora)",
          "Lighthouse Performance: 61 → 97"
        ]
      }
    ],
    featured: true
  },
  {
    slug: "shadcn-ui-adotei-personalizo",
    title: "shadcn/ui: Por Que Adotei e Como Personalizo",
    titleEn: "shadcn/ui: Why I Adopted It and How I Customize It",
    excerpt: "Não é uma biblioteca — é código que você possui. A filosofia do shadcn/ui e como isso muda tudo.",
    excerptEn: "It's not a library — it's code you own. The shadcn/ui philosophy and how it changes everything.",
    date: "2025-03-14",
    author: "Bernardo Gomes",
    tags: [
      "UI/UX",
      "React"
    ],
    readingTime: 6,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O que torna shadcn/ui diferente"
      },
      {
        type: "paragraph",
        content: "shadcn/ui não é uma dependency no package.json. Você copia os componentes para o seu projeto. Isso inverte a dinâmica usual de bibliotecas de UI: em vez de customizar dentro das restrições da biblioteca, você possui o código e faz o que precisar."
      },
      {
        type: "heading",
        level: 2,
        content: "A filosofia: componentes como ponto de partida"
      },
      {
        type: "paragraph",
        content: "Cada componente do shadcn/ui é construído sobre primitivos Radix UI (acessibilidade e comportamento) + Tailwind CSS (estilo). O shadcn provê uma camada de composição sólida — você não precisa reinventar a roda de acessibilidade, mas também não fica preso a decisões de estilo que não servem ao seu projeto."
      },
      {
        type: "code",
        language: "bash",
        content: "# Adicionar um componente ao projeto\nnpx shadcn@latest add button\nnpx shadcn@latest add dialog\nnpx shadcn@latest add card\n\n# Componente vai para src/components/ui/button.tsx\n# Você edita diretamente — sem precisar de theme override"
      },
      {
        type: "heading",
        level: 2,
        content: "Como personalizo neste projeto"
      },
      {
        type: "paragraph",
        content: "Este portfólio usa shadcn/ui com algumas customizações consistentes: glass morphism em cards, gradientes primários em botões CTA e animações de hover via CSS custom properties."
      },
      {
        type: "code",
        language: "css",
        content: "/* globals.css — design tokens customizados */\n@layer base {\n  :root {\n    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    --glass-bg: rgba(255, 255, 255, 0.05);\n    --glass-border: rgba(255, 255, 255, 0.1);\n  }\n}\n\n@layer utilities {\n  .glass {\n    background: var(--glass-bg);\n    backdrop-filter: blur(12px);\n    border: 1px solid var(--glass-border);\n  }\n\n  .gradient-primary {\n    background: var(--gradient-primary);\n  }\n\n  .card-enhanced {\n    transition: transform 200ms ease, box-shadow 200ms ease;\n  }\n\n  .card-enhanced:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n  }\n}"
      },
      {
        type: "heading",
        level: 2,
        content: "Quando não usar shadcn/ui"
      },
      {
        type: "list",
        items: [
          "Projetos com design system próprio já maduro — mais work para adaptar",
          "Equipes que preferem biblioteca estável sem manutenção de componentes",
          "Quando você quer atualizações automáticas de segurança nos componentes"
        ]
      },
      {
        type: "callout",
        variant: "info",
        content: "Para portfólios e projetos pessoais, shadcn/ui é quase perfeito: componentes acessíveis desde o início, fáceis de estilizar e sem lock-in."
      }
    ]
  },
  {
    slug: "fastapi-react-healthcare-api",
    title: "FastAPI + React: Construindo APIs Para Healthcare",
    titleEn: "FastAPI + React: Building APIs for Healthcare",
    excerpt: "Pydantic para validação, SQLModel para o ORM e React Query para o estado — a stack que uso em projetos de saúde.",
    excerptEn: "Pydantic for validation, SQLModel for ORM, and React Query for state — the stack I use in healthcare projects.",
    date: "2025-01-15",
    author: "Bernardo Gomes",
    tags: [
      "Backend",
      "Saúde"
    ],
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que FastAPI para healthcare"
      },
      {
        type: "paragraph",
        content: "FastAPI combina validação automática via Pydantic, documentação OpenAPI gerada automaticamente e performance comparável a Node.js. Em projetos de saúde, a validação automática é especialmente valiosa — você define o schema uma vez e a API rejeita dados inválidos por padrão."
      },
      {
        type: "heading",
        level: 2,
        content: "Estrutura do projeto"
      },
      {
        type: "code",
        language: "bash",
        content: "healthcare-api/\n├── app/\n│   ├── main.py\n│   ├── models/\n│   │   ├── patient.py\n│   │   └── appointment.py\n│   ├── schemas/\n│   │   ├── patient.py\n│   │   └── appointment.py\n│   ├── services/\n│   │   ├── patient_service.py\n│   │   └── appointment_service.py\n│   └── dependencies.py\n├── tests/\n└── pyproject.toml"
      },
      {
        type: "heading",
        level: 2,
        content: "Definindo modelos com SQLModel"
      },
      {
        type: "paragraph",
        content: "SQLModel unifica SQLAlchemy ORM e Pydantic em uma única classe. Você define o modelo uma vez e usa tanto para queries de banco quanto para validação de API."
      },
      {
        type: "code",
        language: "python",
        content: "from sqlmodel import SQLModel, Field\nfrom datetime import date, datetime\nfrom typing import Optional\n\nclass PatientBase(SQLModel):\n    name: str = Field(min_length=2, max_length=200)\n    cpf: str = Field(regex=r\"\\d{11}\")\n    birth_date: date\n\nclass Patient(PatientBase, table=True):\n    id: Optional[int] = Field(default=None, primary_key=True)\n    created_at: datetime = Field(default_factory=datetime.utcnow)\n\nclass PatientCreate(PatientBase):\n    pass\n\nclass PatientRead(PatientBase):\n    id: int\n    created_at: datetime"
      },
      {
        type: "heading",
        level: 2,
        content: "Endpoints com validação automática"
      },
      {
        type: "code",
        language: "python",
        content: "from fastapi import APIRouter, Depends, HTTPException\nfrom sqlmodel import Session\n\nrouter = APIRouter(prefix=\"/patients\", tags=[\"patients\"])\n\n@router.post(\"/\", response_model=PatientRead, status_code=201)\nasync def create_patient(\n    patient: PatientCreate,\n    session: Session = Depends(get_session),\n) -> PatientRead:\n    db_patient = Patient.model_validate(patient)\n    session.add(db_patient)\n    session.commit()\n    session.refresh(db_patient)\n    return db_patient\n\n@router.get(\"/{patient_id}\", response_model=PatientRead)\nasync def get_patient(patient_id: int, session: Session = Depends(get_session)):\n    patient = session.get(Patient, patient_id)\n    if not patient:\n        raise HTTPException(status_code=404, detail=\"Paciente não encontrado\")\n    return patient"
      },
      {
        type: "heading",
        level: 2,
        content: "React Query no frontend"
      },
      {
        type: "paragraph",
        content: "React Query gerencia o estado do servidor no frontend: cache, revalidação, loading/error states e background refresh. Para APIs de healthcare com dados que mudam, isso simplifica muito a lógica do cliente."
      },
      {
        type: "code",
        language: "typescript",
        content: "export function usePatient(id: number) {\n  return useQuery({\n    queryKey: [\"patients\", id],\n    queryFn: () => api.get<PatientRead>(`/patients/${id}`),\n    staleTime: 5 * 60 * 1000,\n  });\n}\n\nexport function useCreatePatient() {\n  const queryClient = useQueryClient();\n  return useMutation({\n    mutationFn: (data: PatientCreate) => api.post<PatientRead>(\"/patients/\", data),\n    onSuccess: () => {\n      queryClient.invalidateQueries({ queryKey: [\"patients\"] });\n    },\n  });\n}"
      },
      {
        type: "callout",
        variant: "info",
        content: "A documentação Swagger automática do FastAPI (em /docs) é especialmente útil em projetos de saúde onde há múltiplos times consumindo a API — todos têm a mesma fonte de verdade do contrato."
      }
    ]
  }
];
