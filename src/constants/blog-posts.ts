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

export const blogPosts: BlogPost[] = [
  {
    slug: "react-19-novidades",
    title: "React 19: O Que Mudou e O Que Isso Significa Para Você",
    titleEn: "React 19: What Changed and What It Means For You",
    excerpt:
      "React 19 trouxe Actions, use(), Server Components estáveis e muito mais. Veja o que realmente importa na prática.",
    excerptEn:
      "React 19 brought Actions, use(), stable Server Components and more. Here's what actually matters in practice.",
    date: "2025-10-15",
    author: "Bernardo Gomes",
    tags: ["React", "Frontend", "JavaScript"],
    featured: true,
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que React 19 importa",
      },
      {
        type: "paragraph",
        content:
          "Depois de meses em beta, o React 19 chegou com mudanças que impactam diretamente como escrevemos formulários, lidamos com estado assíncrono e pensamos em componentes. Não é apenas uma atualização de versão — é uma mudança de paradigma.",
      },
      {
        type: "heading",
        level: 2,
        content: "Actions: formulários sem useState",
      },
      {
        type: "paragraph",
        content:
          "A mudança mais prática do React 19 são as Actions. Antes, um formulário simples exigia useState para loading, error e data. Agora, funções assíncronas passadas para action= lidam com tudo isso automaticamente.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Antes (React 18)
function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitData(new FormData(e.currentTarget as HTMLFormElement));
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return <form onSubmit={handleSubmit}>...</form>;
}

// Depois (React 19)
function Form() {
  const [state, formAction, isPending] = useActionState(submitData, null);
  return <form action={formAction}>...</form>;
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "useActionState substitui o padrão useState+try/catch em formulários. O terceiro valor isPending elimina o loading state manual.",
      },
      {
        type: "heading",
        level: 2,
        content: "O hook use() — lendo Promises e Context",
      },
      {
        type: "paragraph",
        content:
          "O novo hook use() permite ler uma Promise ou Context dentro de qualquer bloco condicional — algo que os hooks tradicionais não permitem. Combinado com Suspense, simplifica muito o data fetching.",
      },
      {
        type: "code",
        language: "tsx",
        content: `function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // suspende até resolver
  return <div>{user.name}</div>;
}

// Uso condicional também funciona
function Component({ condition }: { condition: boolean }) {
  if (condition) {
    const theme = use(ThemeContext); // válido!
    return <ThemedView theme={theme} />;
  }
  return <DefaultView />;
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "ref como prop — fim do forwardRef",
      },
      {
        type: "paragraph",
        content:
          "Componentes funcionais agora recebem ref diretamente como prop. Não é mais necessário envolver tudo em forwardRef, o que simplifica muito a escrita de componentes de UI.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Antes
const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder }, ref) => (
  <input ref={ref} placeholder={placeholder} />
));

// Depois (React 19)
function Input({ placeholder, ref }: InputProps & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} placeholder={placeholder} />;
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Document Metadata nativamente",
      },
      {
        type: "paragraph",
        content:
          "React 19 suporta renderizar <title>, <meta> e <link> diretamente dentro de componentes. O React cuida de hoistá-los para o <head> automaticamente, sem necessidade de react-helmet ou portais manuais.",
      },
      {
        type: "code",
        language: "tsx",
        content: `function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Este site usa um componente SEOHead customizado que gerencia meta tags via DOM diretamente. Com React 19, isso poderia ser simplificado para JSX nativo.",
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusão",
      },
      {
        type: "paragraph",
        content:
          "React 19 resolve problemas reais que todo desenvolvedor encontra no dia a dia: formulários verbosos, ref forwarding cerimonioso e meta tags trabalhosas. A curva de migração é suave — as mudanças são aditivas, não quebram código existente.",
      },
    ],
  },
  {
    slug: "typescript-strict-mode",
    title: "TypeScript Strict Mode: Vale o Esforço?",
    titleEn: "TypeScript Strict Mode: Is It Worth the Effort?",
    excerpt:
      "strict: true no tsconfig assusta no começo. Depois que você entende o que cada flag faz, é difícil programar sem ela.",
    excerptEn:
      "strict: true in tsconfig is scary at first. Once you understand what each flag does, it's hard to code without it.",
    date: "2025-09-20",
    author: "Bernardo Gomes",
    tags: ["TypeScript", "Boas Práticas", "Frontend"],
    readingTime: 7,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O que é strict mode, afinal?",
      },
      {
        type: "paragraph",
        content:
          "strict: true não é uma flag única — é um atalho que ativa um conjunto de verificações. Entender cada uma delas transforma o strict mode de obstáculo em ferramenta.",
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
          "useUnknownInCatchVariables — catch(err) vira unknown, não any",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "strictNullChecks muda tudo",
      },
      {
        type: "paragraph",
        content:
          "A flag mais impactante é strictNullChecks. Sem ela, null e undefined são assignáveis a qualquer tipo. Com ela, você é forçado a tratar casos onde um valor pode não existir — e é exatamente onde 90% dos bugs de runtime acontecem.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Sem strictNullChecks — compila, mas quebra em runtime
function getLength(s: string): number {
  return s.length; // TypeError se s for null
}

// Com strictNullChecks — erro de compilação
function getLength(s: string | null): number {
  return s.length; // Error: Object is possibly 'null'
}

// Correto
function getLength(s: string | null): number {
  return s?.length ?? 0;
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "useUnknownInCatchVariables",
      },
      {
        type: "paragraph",
        content:
          "Antes do TypeScript 4.4, o parâmetro de catch era implicitamente any. Com strict mode moderno, é unknown — o que te força a verificar o tipo antes de usar.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// any implícito (perigoso)
try {
  await fetchData();
} catch (err) {
  console.log(err.message); // compila, pode quebrar
}

// unknown (seguro)
try {
  await fetchData();
} catch (err) {
  if (err instanceof Error) {
    console.log(err.message); // seguro
  }
}`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Migrar um projeto grande para strict mode de uma vez é doloroso. Faça por módulo: ative // @ts-strict em arquivos individuais e vá migrando gradualmente.",
      },
      {
        type: "heading",
        level: 2,
        content: "Flags adicionais que uso neste projeto",
      },
      {
        type: "paragraph",
        content:
          "Além do strict padrão, este projeto usa configurações extras que aumentam a segurança do tipo sem custo de performance.",
      },
      {
        type: "code",
        language: "json",
        content: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "noUncheckedIndexedAccess é minha flag favorita fora do strict. arr[0] passa a ser T | undefined, eliminando uma classe inteira de bugs com índices.",
      },
      {
        type: "heading",
        level: 2,
        content: "Vale o esforço?",
      },
      {
        type: "paragraph",
        content:
          "Sim, sem dúvida. O custo upfront de corrigir os erros de tipo compensa em manutenção a longo prazo. IDEs ficam mais úteis, refactoring fica mais seguro e bugs de runtime diminuem visivelmente. Comece novos projetos sempre com strict habilitado.",
      },
    ],
  },
  {
    slug: "vite-otimizando-builds",
    title: "Vite: Otimizando Builds Para Produção na Prática",
    titleEn: "Vite: Optimizing Production Builds in Practice",
    excerpt:
      "Code splitting manual, análise de bundle e compressão Brotli. Como reduzi 40% do bundle size deste site.",
    excerptEn:
      "Manual code splitting, bundle analysis, and Brotli compression. How I reduced 40% of this site's bundle size.",
    date: "2025-08-30",
    author: "Bernardo Gomes",
    tags: ["Vite", "Performance", "Frontend", "Build"],
    readingTime: 9,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O problema com o bundle padrão",
      },
      {
        type: "paragraph",
        content:
          "Vite gera um bundle otimizado por padrão, mas sem configuração manual, bibliotecas grandes como framer-motion, lucide-react e react-query acabam no mesmo chunk que o código da aplicação — o que significa que uma mudança pequena invalida o cache de tudo.",
      },
      {
        type: "heading",
        level: 2,
        content: "Manual chunks: separando vendor do app",
      },
      {
        type: "paragraph",
        content:
          "A chave para cache-busting eficiente é separar dependências (que mudam raramente) do código da aplicação (que muda sempre). O Rollup — engine do Vite em produção — expõe manualChunks exatamente para isso.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            // ... outros radix
          ],
        },
      },
    },
  },
});`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Separe ícones em chunk próprio. lucide-react tem centenas de exports e mesmo com tree-shaking pode ser grande dependendo de quantos você usa.",
      },
      {
        type: "heading",
        level: 2,
        content: "Analisando o bundle com rollup-plugin-visualizer",
      },
      {
        type: "paragraph",
        content:
          "Antes de otimizar, meça. O rollup-plugin-visualizer gera um treemap interativo que mostra exatamente quanto espaço cada módulo ocupa.",
      },
      {
        type: "code",
        language: "typescript",
        content: `import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true,         // abre no browser automaticamente
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});`,
      },
      {
        type: "heading",
        level: 2,
        content: "Compressão Brotli + Gzip",
      },
      {
        type: "paragraph",
        content:
          "O Vite não gera arquivos comprimidos por padrão — deixa para o servidor fazer on-the-fly. Pré-comprimir em build time é mais eficiente: o servidor serve o arquivo já comprimido sem CPU extra por request.",
      },
      {
        type: "code",
        language: "typescript",
        content: `import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
  ],
});`,
      },
      {
        type: "heading",
        level: 2,
        content: "Resultado",
      },
      {
        type: "list",
        items: [
          "Bundle total: 847KB → 512KB (39% menor após Brotli)",
          "Cache hit rate: subiu de ~30% para ~85% com chunk separation",
          "First load JS: 243KB → 148KB (chunks lazy-loaded separados)",
          "LCP: 2.8s → 1.1s em mobile (com lazy loading de rotas + imagens)",
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Números do Lighthouse simulando conexão 4G lenta. Resultados variam, mas o padrão de melhora com code splitting + compressão é consistente.",
      },
    ],
  },
  {
    slug: "automacao-saude-o-que-aprendi",
    title: "Automação em Saúde: O Que Aprendi Trabalhando em HealthTech",
    titleEn: "Healthcare Automation: What I Learned Working in HealthTech",
    excerpt:
      "Integrar sistemas médicos é diferente de qualquer outro domínio. Aqui estão os padrões que funcionaram na prática.",
    excerptEn:
      "Integrating medical systems is unlike any other domain. Here are the patterns that worked in practice.",
    date: "2025-07-18",
    author: "Bernardo Gomes",
    tags: ["Saúde", "Automação", "Backend", "Python"],
    featured: true,
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que saúde é diferente",
      },
      {
        type: "paragraph",
        content:
          "Automação em healthcare não é como automatizar um e-commerce. Dados incorretos não geram devolução — podem gerar dano ao paciente. Essa responsabilidade muda como você pensa em validação, logging e rollback.",
      },
      {
        type: "heading",
        level: 2,
        content: "Validação como primeira linha de defesa",
      },
      {
        type: "paragraph",
        content:
          "Em sistemas médicos, dados chegam de múltiplas fontes com qualidade variável: formulários preenchidos às pressas, sistemas legados com encoding errado, integrações via SOAP de 2008. Validação não é opcional.",
      },
      {
        type: "code",
        language: "python",
        content: `from pydantic import BaseModel, validator
from datetime import date

class PatientRecord(BaseModel):
    cpf: str
    birth_date: date
    weight_kg: float

    @validator("cpf")
    def validate_cpf(cls, v):
        digits = "".join(c for c in v if c.isdigit())
        if len(digits) != 11:
            raise ValueError("CPF inválido")
        return digits

    @validator("weight_kg")
    def validate_weight(cls, v):
        if not 0.5 <= v <= 500:
            raise ValueError(f"Peso fora do range esperado: {v}kg")
        return v`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Nunca silencia erros de validação em dados médicos. Um peso de 0.0kg pode ser um campo não preenchido — e você precisa saber disso antes de salvar.",
      },
      {
        type: "heading",
        level: 2,
        content: "Idempotência em integrações",
      },
      {
        type: "paragraph",
        content:
          "Sistemas de saúde têm downtime. Retentativas são inevitáveis. Toda operação de escrita precisa ser idempotente — executar duas vezes deve ter o mesmo efeito que executar uma.",
      },
      {
        type: "code",
        language: "python",
        content: `import hashlib

def upsert_appointment(appointment_data: dict) -> str:
    idempotency_key = hashlib.sha256(
        f"{appointment_data['patient_id']}:{appointment_data['datetime']}:{appointment_data['doctor_id']}".encode()
    ).hexdigest()

    existing = db.query(Appointment).filter_by(
        idempotency_key=idempotency_key
    ).first()

    if existing:
        return existing.id

    new_appointment = Appointment(
        **appointment_data,
        idempotency_key=idempotency_key
    )
    db.add(new_appointment)
    db.commit()
    return new_appointment.id`,
      },
      {
        type: "heading",
        level: 2,
        content: "Audit trail imutável",
      },
      {
        type: "paragraph",
        content:
          "Toda mudança em dado clínico precisa de audit trail. Não UPDATE — INSERT com timestamp e user. O histórico completo deve ser reconstruível a qualquer momento.",
      },
      {
        type: "list",
        items: [
          "Nunca deletar registros médicos — soft delete com flag + timestamp",
          "Toda escrita loga: quem fez, quando, o que era antes, o que ficou",
          "Audit log separado do dado clínico, em tabela append-only",
          "Teste a reconstrução periodicamente — audit log inútil não auditado",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "O que funciona na prática",
      },
      {
        type: "paragraph",
        content:
          "Depois de alguns anos nessa área, o padrão que mais funcionou foi: validação rígida na borda, transformação explícita no domínio, persistência conservadora (upsert + audit), e alertas proativos para anomalias. Simples, mas resistente.",
      },
    ],
  },
  {
    slug: "linux-setup-desenvolvimento",
    title: "Linux Como Plataforma de Dev: Meu Setup em 2025",
    titleEn: "Linux as a Dev Platform: My 2025 Setup",
    excerpt:
      "Arch Linux, Neovim, tmux e as ferramentas que transformaram minha produtividade como desenvolvedor.",
    excerptEn:
      "Arch Linux, Neovim, tmux, and the tools that transformed my productivity as a developer.",
    date: "2025-06-10",
    author: "Bernardo Gomes",
    tags: ["Linux", "Produtividade", "Ferramentas", "DevOps"],
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que Linux para desenvolvimento",
      },
      {
        type: "paragraph",
        content:
          "Desenvolver em Linux não é apenas preferência — é eficiência. O mesmo ambiente de produção, ferramentas nativas sem camada de compatibilidade e controle total sobre o sistema.",
      },
      {
        type: "heading",
        level: 2,
        content: "A base: Arch Linux",
      },
      {
        type: "paragraph",
        content:
          "Arch Linux tem reputação de difícil, mas depois da instalação inicial, o rolling release significa que você nunca precisa reinstalar. O AUR tem qualquer ferramenta que você precisar. E o wiki do Arch é a melhor documentação de Linux que existe.",
      },
      {
        type: "list",
        items: [
          "Kernel: linux-zen (menor latência para workloads interativos)",
          "WM: Hyprland (Wayland nativo, animações fluidas, config em Lua)",
          "Terminal: kitty (GPU-accelerated, suporte a imagens inline)",
          "Shell: zsh + starship prompt",
          "Launcher: rofi-wayland",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Editor: Neovim com LazyVim",
      },
      {
        type: "paragraph",
        content:
          "Troquei VS Code por Neovim há dois anos. A curva de aprendizado é real, mas a velocidade de edição depois que você internaliza os movimentos compensa. LazyVim como base elimina a configuração inicial dolorosa.",
      },
      {
        type: "code",
        language: "lua",
        content: `-- ~/.config/nvim/lua/plugins/lsp.lua
return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        ts_ls = {},          -- TypeScript/JavaScript
        pyright = {},        -- Python
        rust_analyzer = {},  -- Rust
        tailwindcss = {},    -- Tailwind CSS
      },
    },
  },
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Multiplexer: tmux",
      },
      {
        type: "paragraph",
        content:
          "tmux transforma um terminal em um ambiente de desenvolvimento completo. Sessions persistentes, panes para editor/tests/git simultâneos, e o trabalho sobrevive a desconexões SSH.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Layout típico de trabalho
# ┌─────────────────┬──────────┐
# │                 │ git      │
# │   nvim          ├──────────┤
# │                 │ tests    │
# ├─────────────────┴──────────┤
# │         terminal           │
# └────────────────────────────┘

tmux new-session -d -s work
tmux send-keys "nvim ." Enter
tmux split-window -h -p 30
tmux send-keys "git status" Enter
tmux split-window -v
tmux send-keys "pnpm test" Enter`,
      },
      {
        type: "heading",
        level: 2,
        content: "Ferramentas CLI que uso todo dia",
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
          "lazygit — TUI para git, elimina 80% dos comandos git manuais",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Instale tudo via pacman/AUR ou cargo. Ferramentas em Rust (fd, ripgrep, bat, eza, delta, zoxide) são especialmente rápidas.",
      },
    ],
  },
  {
    slug: "tailwind-css-4-migracao",
    title: "Tailwind CSS 4: O Que Mudou e Como Migrar",
    titleEn: "Tailwind CSS 4: What Changed and How to Migrate",
    excerpt:
      "Zero config, CSS nativo como linguagem de configuração e performance 5x melhor. O guia completo de migração.",
    excerptEn:
      "Zero config, native CSS as configuration language, and 5x better performance. The complete migration guide.",
    date: "2025-05-22",
    author: "Bernardo Gomes",
    tags: ["Tailwind", "CSS", "Frontend", "Migração"],
    readingTime: 7,
    content: [
      {
        type: "heading",
        level: 2,
        content: "As mudanças principais",
      },
      {
        type: "paragraph",
        content:
          "Tailwind v4 é uma reescrita quase completa. O motor mudou de JavaScript para Oxide (Rust), a configuração saiu do tailwind.config.js para CSS nativo, e o processo de build foi simplificado para zero-config.",
      },
      {
        type: "list",
        items: [
          "Motor Oxide em Rust: build 5x mais rápido, incremental 100x mais rápido",
          "Configuração via CSS: @theme em vez de tailwind.config.js",
          "Zero config: detecta arquivos automaticamente, sem content array",
          "Cascade layers: usa @layer nativamente",
          "Novas utilities: field-sizing, color-mix(), container queries nativas",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Configuração: de JS para CSS",
      },
      {
        type: "paragraph",
        content:
          "A mudança mais disruptiva: não existe mais tailwind.config.js para customização de design tokens. Tudo vai para CSS.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Antes (tailwind.config.js) */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { 500: '#6366f1' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};

/* Depois (globals.css com v4) */
@import "tailwindcss";

@theme {
  --color-brand-500: #6366f1;
  --font-sans: 'Inter', sans-serif;
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Migrando com o codemod oficial",
      },
      {
        type: "paragraph",
        content:
          "A equipe do Tailwind disponibilizou um codemod que automatiza a maior parte da migração. Não é 100% perfeito, mas cobre 80-90% dos casos.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Instalar e executar o codemod
npx @tailwindcss/upgrade@next

# O que ele faz automaticamente:
# - Remove tailwind.config.js e converte para @theme
# - Atualiza imports no CSS
# - Renomeia utilities que mudaram (ex: shadow-sm -> shadow-xs)
# - Atualiza postcss.config.js`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Revise as mudanças do codemod antes de commitar. Alguns tokens de cor com nomes customizados precisam de ajuste manual. Teste em modo dark/light.",
      },
      {
        type: "heading",
        level: 2,
        content: "Container queries: sem plugin",
      },
      {
        type: "paragraph",
        content:
          "Em v3, container queries precisavam de @tailwindcss/container-queries. Em v4, é nativo.",
      },
      {
        type: "code",
        language: "html",
        content: `<!-- v4: container queries nativas -->
<div class="@container">
  <div class="@sm:grid-cols-2 @lg:grid-cols-3 grid grid-cols-1">
    <!-- responsivo ao container, não à viewport -->
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "performance-web-3s-para-0-8s",
    title: "Performance Web: De 3s Para 0.8s Na Prática",
    titleEn: "Web Performance: From 3s to 0.8s in Practice",
    excerpt:
      "LCP, CLS, INP — métricas reais e o que fiz para melhorar cada uma delas neste portfólio.",
    excerptEn:
      "LCP, CLS, INP — real metrics and what I did to improve each of them in this portfolio.",
    date: "2025-04-08",
    author: "Bernardo Gomes",
    tags: ["Performance", "Web Vitals", "Frontend", "SEO"],
    readingTime: 11,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que performance importa além do UX",
      },
      {
        type: "paragraph",
        content:
          "Google usa Core Web Vitals como sinal de ranking desde 2021. LCP ruim não é apenas UX ruim — é SEO penalizado. Para um portfólio que precisa ser encontrado, isso importa.",
      },
      {
        type: "heading",
        level: 2,
        content: "Baseline: o que eu tinha",
      },
      {
        type: "list",
        items: [
          "LCP: 3.2s (imagem hero sem preload, fonte bloqueante)",
          "CLS: 0.18 (layout shift de imagens sem dimensões)",
          "INP: 280ms (animações caras em JS no main thread)",
          "FCP: 2.1s (JS bundle grande bloqueando parsing)",
          "Bundle: 847KB total, sem code splitting",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #1: LCP — preload da imagem hero",
      },
      {
        type: "paragraph",
        content:
          "O LCP é determinado pelo elemento visível mais pesado no viewport. Neste site, era a imagem de perfil no hero. Sem preload, ela esperava o JS carregar e renderizar para começar o download.",
      },
      {
        type: "code",
        language: "html",
        content: `<!-- index.html: preload explícito da imagem LCP -->
<link
  rel="preload"
  as="image"
  href="/images/profile.webp"
  fetchpriority="high"
/>`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "fetchpriority='high' diz ao browser para priorizar esse recurso sobre outros. Combinado com preload, garante que a imagem LCP começa a baixar o mais cedo possível.",
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #2: CLS — dimensões explícitas em imagens",
      },
      {
        type: "paragraph",
        content:
          "Layout shift acontece quando o browser não sabe o tamanho de um elemento antes de carregar. A correção é simples: sempre definir width e height em imagens.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Antes — CLS score 0.18
<img src="/profile.webp" alt="Bernardo" className="rounded-full" />

// Depois — CLS score 0.02
<img
  src="/profile.webp"
  alt="Bernardo"
  width={200}
  height={200}
  className="rounded-full"
  loading="eager"
/>`,
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #3: INP — animações no compositor",
      },
      {
        type: "paragraph",
        content:
          "INP mede responsividade a interações. Animações caras no main thread bloqueiam inputs. A solução: só animar properties que o browser pode delegar ao GPU (transform e opacity).",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Ruim: anima propriedades que causam reflow
animate={{ left: 0, top: 0, width: "100%" }}

// Bom: só transform e opacity vão para o compositor
animate={{ x: 0, y: 0, opacity: 1 }}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Fix #4: Code splitting por rota",
      },
      {
        type: "paragraph",
        content:
          "O bundle de 847KB carregava tudo na primeira visita, incluindo páginas que o usuário talvez nunca abrisse. React.lazy() com routes resolve isso.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// App.tsx — lazy loading por rota
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog/BlogPage"));

// Com Suspense wrapping routes
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>
</Suspense>`,
      },
      {
        type: "heading",
        level: 2,
        content: "Resultado final",
      },
      {
        type: "list",
        items: [
          "LCP: 3.2s → 0.8s (75% melhora)",
          "CLS: 0.18 → 0.02 (89% melhora)",
          "INP: 280ms → 95ms (66% melhora)",
          "FCP: 2.1s → 0.6s (71% melhora)",
          "Lighthouse Performance: 61 → 97",
        ],
      },
    ],
  },
  {
    slug: "shadcn-ui-adotei-personalizo",
    title: "shadcn/ui: Por Que Adotei e Como Personalizo",
    titleEn: "shadcn/ui: Why I Adopted It and How I Customize It",
    excerpt:
      "Não é uma biblioteca — é código que você possui. A filosofia do shadcn/ui e como isso muda tudo.",
    excerptEn:
      "It's not a library — it's code you own. The shadcn/ui philosophy and how it changes everything.",
    date: "2025-03-14",
    author: "Bernardo Gomes",
    tags: ["shadcn/ui", "React", "UI", "Componentes"],
    readingTime: 6,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O que torna shadcn/ui diferente",
      },
      {
        type: "paragraph",
        content:
          "shadcn/ui não é uma dependency no package.json. Você copia os componentes para o seu projeto. Isso inverte a dinâmica usual de bibliotecas de UI: em vez de customizar dentro das restrições da biblioteca, você possui o código e faz o que precisar.",
      },
      {
        type: "heading",
        level: 2,
        content: "A filosofia: componentes como ponto de partida",
      },
      {
        type: "paragraph",
        content:
          "Cada componente do shadcn/ui é construído sobre primitivos Radix UI (acessibilidade e comportamento) + Tailwind CSS (estilo). O shadcn provê uma camada de composição sólida — você não precisa reinventar a roda de acessibilidade, mas também não fica preso a decisões de estilo que não servem ao seu projeto.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Adicionar um componente ao projeto
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add card

# Componente vai para src/components/ui/button.tsx
# Você edita diretamente — sem precisar de theme override`,
      },
      {
        type: "heading",
        level: 2,
        content: "Como personalizo neste projeto",
      },
      {
        type: "paragraph",
        content:
          "Este portfólio usa shadcn/ui com algumas customizações consistentes: glass morphism em cards, gradientes primários em botões CTA e animações de hover via CSS custom properties.",
      },
      {
        type: "code",
        language: "css",
        content: `/* globals.css — design tokens customizados */
@layer base {
  :root {
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
  }
}

@layer utilities {
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
  }

  .gradient-primary {
    background: var(--gradient-primary);
  }

  .card-enhanced {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .card-enhanced:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Quando não usar shadcn/ui",
      },
      {
        type: "list",
        items: [
          "Projetos com design system próprio já maduro — mais work para adaptar",
          "Equipes que preferem biblioteca estável sem manutenção de componentes",
          "Quando você quer atualizações automáticas de segurança nos componentes",
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Para portfólios e projetos pessoais, shadcn/ui é quase perfeito: componentes acessíveis desde o início, fáceis de estilizar e sem lock-in.",
      },
    ],
  },
  {
    slug: "clean-code-frontend-principios",
    title: "Clean Code no Frontend: Princípios Que Uso Todo Dia",
    titleEn: "Clean Code in Frontend: Principles I Use Every Day",
    excerpt:
      "Nome bom vale mais que comentário. Componente focado vale mais que componente genérico. Os princípios que guiam meu código.",
    excerptEn:
      "Good names beat comments. Focused components beat generic ones. The principles that guide my code.",
    date: "2025-02-20",
    author: "Bernardo Gomes",
    tags: ["Clean Code", "Boas Práticas", "React", "TypeScript"],
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Nomes que eliminam comentários",
      },
      {
        type: "paragraph",
        content:
          "O melhor comentário é código que não precisa de comentário. Se você precisa comentar o que um bloco faz, o bloco precisa de um nome melhor.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Ruim — comentário explica o que o nome deveria dizer
// Filtra usuários ativos e ordena por data de criação
const result = users.filter(u => u.active).sort((a, b) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
);

// Bom — o nome diz tudo
const activeUsersByJoinDate = users
  .filter(isActiveUser)
  .sort(byCreationDate);`,
      },
      {
        type: "heading",
        level: 2,
        content: "Componentes pequenos e focados",
      },
      {
        type: "paragraph",
        content:
          "Um componente que faz uma coisa é fácil de entender, testar e reusar. Um componente que faz tudo é difícil de fazer qualquer uma das três.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Ruim — um componente fazendo tudo
function UserPage() {
  // 50 linhas de fetching
  // 30 linhas de formatação
  // 100 linhas de JSX misturando header, content, sidebar
}

// Bom — cada peça com responsabilidade clara
function UserPage() {
  return (
    <PageLayout>
      <UserHeader user={user} />
      <UserStats stats={user.stats} />
      <UserActivity activities={user.recentActivity} />
    </PageLayout>
  );
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Custom hooks para lógica de negócio",
      },
      {
        type: "paragraph",
        content:
          "Lógica de negócio dentro de componentes mistura 'o que mostrar' com 'como calcular'. Custom hooks separam essa responsabilidade e tornam tanto o componente quanto a lógica testáveis de forma independente.",
      },
      {
        type: "code",
        language: "typescript",
        content: `function useCartSummary(cart: CartItem[]) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, discount, total, itemCount };
}

function CartSummary({ cart }: { cart: CartItem[] }) {
  const { subtotal, discount, total, itemCount } = useCartSummary(cart);
  // apenas JSX aqui
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Evite abstrações prematuras",
      },
      {
        type: "paragraph",
        content:
          "Três linhas similares não justificam uma abstração. Cinco vezes a mesma coisa em cinco lugares diferentes justifica. Antes disso, a 'abstração' provável vai ser um obstáculo — genérica demais para ser útil, específica demais para ser reusável.",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "A regra de três: quando você escreve algo pela terceira vez idêntico, aí você entende os casos de uso reais e pode abstrair com confiança. Na segunda vez, resiste a tentação.",
      },
      {
        type: "heading",
        level: 2,
        content: "Tipos como documentação viva",
      },
      {
        type: "paragraph",
        content:
          "Com TypeScript strict, os tipos descrevem o contrato da função. Um tipo bem definido elimina a necessidade de documentar os parâmetros e o que a função retorna.",
      },
      {
        type: "code",
        language: "typescript",
        content: `type SortDirection = "asc" | "desc";
type SortKey = keyof Pick<User, "name" | "email" | "createdAt">;

function sortUsers(
  users: User[],
  key: SortKey,
  direction: SortDirection
): User[] {
  // a assinatura já documenta os contratos
}`,
      },
    ],
  },
  {
    slug: "fastapi-react-healthcare-api",
    title: "FastAPI + React: Construindo APIs Para Healthcare",
    titleEn: "FastAPI + React: Building APIs for Healthcare",
    excerpt:
      "Pydantic para validação, SQLModel para o ORM e React Query para o estado — a stack que uso em projetos de saúde.",
    excerptEn:
      "Pydantic for validation, SQLModel for ORM, and React Query for state — the stack I use in healthcare projects.",
    date: "2025-01-15",
    author: "Bernardo Gomes",
    tags: ["FastAPI", "React", "Python", "Saúde", "Backend"],
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que FastAPI para healthcare",
      },
      {
        type: "paragraph",
        content:
          "FastAPI combina validação automática via Pydantic, documentação OpenAPI gerada automaticamente e performance comparável a Node.js. Em projetos de saúde, a validação automática é especialmente valiosa — você define o schema uma vez e a API rejeita dados inválidos por padrão.",
      },
      {
        type: "heading",
        level: 2,
        content: "Estrutura do projeto",
      },
      {
        type: "code",
        language: "bash",
        content: `healthcare-api/
├── app/
│   ├── main.py
│   ├── models/
│   │   ├── patient.py
│   │   └── appointment.py
│   ├── schemas/
│   │   ├── patient.py
│   │   └── appointment.py
│   ├── services/
│   │   ├── patient_service.py
│   │   └── appointment_service.py
│   └── dependencies.py
├── tests/
└── pyproject.toml`,
      },
      {
        type: "heading",
        level: 2,
        content: "Definindo modelos com SQLModel",
      },
      {
        type: "paragraph",
        content:
          "SQLModel unifica SQLAlchemy ORM e Pydantic em uma única classe. Você define o modelo uma vez e usa tanto para queries de banco quanto para validação de API.",
      },
      {
        type: "code",
        language: "python",
        content: `from sqlmodel import SQLModel, Field
from datetime import date, datetime
from typing import Optional

class PatientBase(SQLModel):
    name: str = Field(min_length=2, max_length=200)
    cpf: str = Field(regex=r"\\d{11}")
    birth_date: date

class Patient(PatientBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PatientCreate(PatientBase):
    pass

class PatientRead(PatientBase):
    id: int
    created_at: datetime`,
      },
      {
        type: "heading",
        level: 2,
        content: "Endpoints com validação automática",
      },
      {
        type: "code",
        language: "python",
        content: `from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

router = APIRouter(prefix="/patients", tags=["patients"])

@router.post("/", response_model=PatientRead, status_code=201)
async def create_patient(
    patient: PatientCreate,
    session: Session = Depends(get_session),
) -> PatientRead:
    db_patient = Patient.model_validate(patient)
    session.add(db_patient)
    session.commit()
    session.refresh(db_patient)
    return db_patient

@router.get("/{patient_id}", response_model=PatientRead)
async def get_patient(patient_id: int, session: Session = Depends(get_session)):
    patient = session.get(Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    return patient`,
      },
      {
        type: "heading",
        level: 2,
        content: "React Query no frontend",
      },
      {
        type: "paragraph",
        content:
          "React Query gerencia o estado do servidor no frontend: cache, revalidação, loading/error states e background refresh. Para APIs de healthcare com dados que mudam, isso simplifica muito a lógica do cliente.",
      },
      {
        type: "code",
        language: "typescript",
        content: `export function usePatient(id: number) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => api.get<PatientRead>(\`/patients/\${id}\`),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatientCreate) => api.post<PatientRead>("/patients/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "A documentação Swagger automática do FastAPI (em /docs) é especialmente útil em projetos de saúde onde há múltiplos times consumindo a API — todos têm a mesma fonte de verdade do contrato.",
      },
    ],
  },
  {
    slug: "llm-producao-arquitetura-2025",
    title: "LLMs em Produção: Arquitetura Real Para Além do PoC",
    titleEn: "LLMs in Production: Real Architecture Beyond the PoC",
    excerpt:
      "Latência, custo, hallucination e observabilidade. O que ninguém te conta quando você tenta escalar um chatbot de PoC para produção real.",
    excerptEn:
      "Latency, cost, hallucination, and observability. What nobody tells you when scaling a chatbot PoC to real production.",
    date: "2026-05-20",
    author: "Bernardo Gomes",
    tags: ["AI", "LLM", "Backend", "Arquitetura", "Python"],
    featured: true,
    readingTime: 13,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O abismo entre PoC e produção",
      },
      {
        type: "paragraph",
        content:
          "Fazer um chatbot funcionar em um notebook é trivial. Fazer ele funcionar para mil usuários simultâneos com latência aceitável, custo controlado e respostas confiáveis é um problema de engenharia completamente diferente. Segundo pesquisa da RAND Corporation (2024), mais de 70% dos projetos de IA generativa não chegam a produção — a maioria falha exatamente nessa transição.",
      },
      {
        type: "heading",
        level: 2,
        content: "O problema da latência: não é só a API",
      },
      {
        type: "paragraph",
        content:
          "A latência de uma resposta de LLM tem quatro componentes: tempo de rede até a API do provider, tempo de processamento no modelo (Time to First Token - TTFT), tempo de geração dos tokens (tokens/segundo), e processamento pós-resposta (parsing, validação, formatação). Em produção, o TTFT costuma ser o maior vilão — pode variar de 200ms a 4s dependendo da carga do provider.",
      },
      {
        type: "code",
        language: "python",
        content: `import asyncio
import time
from anthropic import AsyncAnthropic

client = AsyncAnthropic()

async def stream_with_metrics(prompt: str) -> dict:
    metrics = {"ttft": None, "total_tokens": 0, "start": time.monotonic()}
    chunks = []

    async with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    ) as stream:
        async for text in stream.text_stream:
            if metrics["ttft"] is None:
                metrics["ttft"] = time.monotonic() - metrics["start"]
            chunks.append(text)

    usage = await stream.get_final_usage()
    metrics["total_tokens"] = usage.input_tokens + usage.output_tokens
    metrics["total_time"] = time.monotonic() - metrics["start"]
    metrics["tps"] = usage.output_tokens / metrics["total_time"]

    return {"text": "".join(chunks), "metrics": metrics}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Prompt caching: 90% de redução de custo",
      },
      {
        type: "paragraph",
        content:
          "Se você tem um system prompt grande (instruções, contexto, exemplos), está pagando para processar esse conteúdo em cada request. Prompt caching do Claude permite cachear até 200K tokens de prefixo por 5 minutos. Em workloads com system prompt fixo e muitas perguntas, isso reduz custo e latência em até 90%.",
      },
      {
        type: "code",
        language: "python",
        content: `from anthropic import Anthropic

client = Anthropic()

# System prompt longo cacheado — processado uma vez, reutilizado por 5 min
SYSTEM_PROMPT = """Você é um assistente especializado em documentação técnica.
[... 50KB de contexto, exemplos, regras ...]
"""

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},  # marca para cache
        }
    ],
    messages=[{"role": "user", "content": user_question}],
)

# Checar se cache foi hit
print(response.usage.cache_read_input_tokens)   # tokens do cache (custo 0.1x)
print(response.usage.cache_creation_input_tokens)  # primeira vez (custo 1.25x)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Prompt caching só vale se o prefixo for idêntico. Qualquer mudança no início invalida o cache. Coloque contexto estático antes de contexto dinâmico no system prompt.",
      },
      {
        type: "heading",
        level: 2,
        content: "Hallucination: o problema que nunca some",
      },
      {
        type: "paragraph",
        content:
          "Um estudo de Huang et al. (2023) no arXiv ('Survey of Hallucination in Natural Language Generation') categorizou dois tipos principais: hallucination intrínseca (o modelo contradiz o contexto dado) e extrínseca (o modelo gera informação não verificável). Para sistemas em produção, a mitigação efetiva combina três técnicas: RAG com sources verificáveis, structured output com validação, e self-consistency.",
      },
      {
        type: "code",
        language: "python",
        content: `from anthropic import Anthropic
import json
from pydantic import BaseModel

client = Anthropic()

class FactCheckedResponse(BaseModel):
    answer: str
    confidence: float  # 0-1
    sources: list[str]
    limitations: list[str]

def query_with_structured_output(question: str, context: str) -> FactCheckedResponse:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""Context: {context}

Question: {question}

Respond ONLY with valid JSON matching this schema:
{{
  "answer": "sua resposta baseada APENAS no contexto",
  "confidence": 0.95,
  "sources": ["citação exata do contexto"],
  "limitations": ["o que você NÃO pode afirmar com certeza"]
}}""",
            }
        ],
    )

    data = json.loads(response.content[0].text)
    return FactCheckedResponse(**data)`,
      },
      {
        type: "heading",
        level: 2,
        content: "Observabilidade: o que você precisa monitorar",
      },
      {
        type: "list",
        items: [
          "TTFT (Time to First Token) por modelo e horário — detecta degradação do provider",
          "Tokens por request (input + output) — custo e anomalias de prompt injection",
          "Taxa de falha de parsing de structured output — indica prompt drift",
          "Latência p50/p95/p99 — p99 alto revela problemas que médias escondem",
          "Custo por sessão de usuário — segmentado por feature/use case",
          "Cache hit rate — valida se prompt caching está funcionando",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Rate limiting e fallback",
      },
      {
        type: "paragraph",
        content:
          "Providers de LLM têm rate limits que mudam sem aviso. Em produção, você precisa de: circuit breaker para parar de tentar quando o provider está degradado, exponential backoff com jitter para retentativas, e fallback para um modelo menor/mais barato quando o primário está indisponível.",
      },
      {
        type: "code",
        language: "python",
        content: `import asyncio
import random
from anthropic import Anthropic, APIStatusError, RateLimitError

client = Anthropic()

async def with_retry(fn, max_retries: int = 3):
    for attempt in range(max_retries):
        try:
            return await fn()
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            # exponential backoff com jitter
            wait = (2 ** attempt) + random.uniform(0, 1)
            await asyncio.sleep(wait)
        except APIStatusError as e:
            if e.status_code >= 500 and attempt < max_retries - 1:
                await asyncio.sleep(2 ** attempt)
                continue
            raise`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Nunca exponha limites de rate diretamente ao usuário. Implemente uma fila interna com feedback de 'aguardando' em vez de deixar requests falharem silenciosamente.",
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusão",
      },
      {
        type: "paragraph",
        content:
          "LLMs em produção são engenharia de sistemas, não apenas chamadas de API. Latência, custo e confiabilidade precisam de instrumentação desde o dia zero. Comece simples — um modelo, um provider — mas desenhe a observabilidade antes de escalar.",
      },
    ],
  },
  {
    slug: "react-server-components-guia-pratico",
    title: "React Server Components: O Guia Prático Para 2025",
    titleEn: "React Server Components: The Practical Guide for 2025",
    excerpt:
      "RSC mudou como pensamos em data fetching, bundle size e rendering. Não é hype — é uma mudança arquitetural real com trade-offs claros.",
    excerptEn:
      "RSC changed how we think about data fetching, bundle size, and rendering. Not hype — a real architectural shift with clear trade-offs.",
    date: "2026-05-08",
    author: "Bernardo Gomes",
    tags: ["React", "Frontend", "Performance", "Arquitetura"],
    readingTime: 11,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O que Server Components realmente mudam",
      },
      {
        type: "paragraph",
        content:
          "React Server Components não são SSR. SSR renderiza no servidor mas envia todo o JavaScript para o cliente re-hidratar. RSC vai além: componentes marcados como server nunca enviam seu código JavaScript para o navegador. Eles renderizam no servidor, produzem HTML/RSC payload, e o cliente nunca vê o código de implementação nem as dependências que eles usam.",
      },
      {
        type: "list",
        items: [
          "Zero bundle cost: bibliotecas usadas só no server não vão para o bundle",
          "Acesso direto a banco, filesystem e APIs privadas sem endpoint intermediário",
          "Dados chegam pré-renderizados — sem loading state ou waterfall de requests",
          "Segurança por padrão: secrets e lógica de negócio nunca chegam ao cliente",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Server vs Client: a decisão correta",
      },
      {
        type: "paragraph",
        content:
          "A regra prática: tudo que não precisa de interatividade, estado local ou APIs do browser (window, document, localStorage) deve ser Server Component por padrão. 'use client' é uma boundary explícita, não um padrão.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// app/blog/[slug]/page.tsx — Server Component (padrão)
// Nunca vai para o bundle do cliente
// Acessa banco diretamente, sem API route
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* ShareButton precisa de onClick → 'use client' */}
      <ShareButton title={post.title} />
    </article>
  );
}

// components/ShareButton.tsx — Client Component
"use client";
import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "Copiado!" : "Compartilhar"}
    </button>
  );
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Streaming e Suspense: UX superior sem JavaScript extra",
      },
      {
        type: "paragraph",
        content:
          "RSC com Suspense permite streaming progressivo da página. O shell HTML chega primeiro (fast FCP), depois partes mais lentas streamam conforme ficam prontas. O usuário vê conteúdo imediatamente em vez de esperar tudo ou nada.",
      },
      {
        type: "code",
        language: "tsx",
        content: `import { Suspense } from "react";

// Layout que streama progressivamente
export default function Dashboard() {
  return (
    <div>
      {/* Renderiza imediatamente — dados rápidos */}
      <UserHeader />

      {/* Streama quando pronto — query lenta */}
      <Suspense fallback={<StatsSkeleton />}>
        <SlowStats />  {/* await db.query com joins complexos */}
      </Suspense>

      {/* Streama independentemente */}
      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed />  {/* await fetchExternalAPI() */}
      </Suspense>
    </div>
  );
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Coloque Suspense boundaries ao redor de cada parte que pode ser lenta independentemente. Isso permite que partes rápidas sejam exibidas sem esperar as lentas — reduz drasticamente o Largest Contentful Paint percebido.",
      },
      {
        type: "heading",
        level: 2,
        content: "Limitações reais que ninguém menciona",
      },
      {
        type: "list",
        items: [
          "RSC requer um framework (Next.js App Router, Remix, etc.) — não funciona com Vite/CRA puro",
          "Debugging é mais complexo: erros de server não aparecem no DevTools do browser",
          "Context API não funciona em Server Components — use props ou fetch no server",
          "Não há acesso a hooks, refs, ou qualquer API do React que dependa do DOM",
          "Serialização: dados passados de server para client devem ser serializáveis (sem funções, classes, Date objects raw)",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Quando NÃO usar RSC",
      },
      {
        type: "paragraph",
        content:
          "SPAs puras sem roteamento de servidor (este portfólio, por exemplo), dashboards altamente interativos com estado compartilhado complexo, ou projetos onde a equipe não tem familiaridade com o paradigma server/client boundary — nesses casos, RSC adiciona complexidade sem benefício proporcional.",
      },
    ],
  },
  {
    slug: "sqlite-banco-subestimado-2025",
    title: "SQLite em 2025: O Banco de Dados Mais Subestimado da Web",
    titleEn: "SQLite in 2025: The Most Underrated Web Database",
    excerpt:
      "Turso, Cloudflare D1, Litestream. SQLite passou de 'banco de testes' para solução de produção séria. Aqui está o porquê.",
    excerptEn:
      "Turso, Cloudflare D1, Litestream. SQLite went from 'test database' to serious production solution. Here's why.",
    date: "2026-04-22",
    author: "Bernardo Gomes",
    tags: ["Backend", "Banco de Dados", "Performance", "Arquitetura"],
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "A reputação injusta do SQLite",
      },
      {
        type: "paragraph",
        content:
          "SQLite tem a reputação de ser um banco de desenvolvimento, de testes, de apps mobile. Essa reputação está desatualizada por uma década. O banco de dados é usado em aeronaves da Airbus, no sistema de arquivos do Android, nos browsers Chrome e Firefox, e — segundo a própria documentação — provavelmente é o software mais deployado no mundo, com estimativa de mais de um trilhão de instâncias ativas. Richard Hipp, criador do SQLite, apresentou dados no VLDB 2022 mostrando throughput de 6.8M operações/segundo em hardware moderno.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que mudou: SQLite na borda",
      },
      {
        type: "paragraph",
        content:
          "O problema histórico do SQLite em aplicações web era a ausência de replicação e a natureza de arquivo único (sem suporte a múltiplos writers concorrentes). Três projetos mudaram isso completamente em 2023-2024.",
      },
      {
        type: "list",
        items: [
          "Litestream — replica SQLite para S3/R2/GCS em tempo real via WAL. Disaster recovery com RPO de segundos",
          "Turso (libSQL) — fork do SQLite com replicação distribuída, multi-region, e embedded replica para reads locais",
          "Cloudflare D1 — SQLite na edge network da Cloudflare, ~80 localidades, reads em <1ms por proximidade geográfica",
          "LiteFS — replicação via FUSE filesystem para Fly.io com failover automático",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Performance: por que SQLite pode superar PostgreSQL",
      },
      {
        type: "paragraph",
        content:
          "Em workloads com muitas leituras e escritas pequenas em aplicações de um único servidor, SQLite elimina o overhead de rede. PostgreSQL em localhost tem latência de ~0.1ms por query. SQLite em processo tem latência de ~0.001ms — 100x menos. Para APIs que fazem 50 queries por request, isso é a diferença entre 5ms e 500ms de overhead de banco.",
      },
      {
        type: "code",
        language: "python",
        content: `import sqlite3
import time

# SQLite: zero-copy, zero-network, in-process
conn = sqlite3.connect("app.db", check_same_thread=False)
conn.execute("PRAGMA journal_mode=WAL")    # writes não bloqueiam reads
conn.execute("PRAGMA synchronous=NORMAL")  # durável sem fsync em cada write
conn.execute("PRAGMA cache_size=-64000")   # 64MB de cache em memória
conn.execute("PRAGMA temp_store=MEMORY")   # operações temporárias em RAM
conn.execute("PRAGMA mmap_size=268435456") # 256MB mmap para reads zero-copy

# Com Turso (libSQL) — mesma API, replicação distribuída
import libsql_client

async def setup_turso():
    client = libsql_client.create_client(
        url="libsql://yourdb.turso.io",
        auth_token="your-token",
    )
    # Embedded replica: reads locais, writes replicados
    await client.execute("SELECT * FROM users WHERE id = ?", [user_id])`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "WAL mode (Write-Ahead Logging) é essencial para SQLite em produção web. Permite reads concorrentes sem bloqueio enquanto uma write está em andamento. Sem WAL, um write exclusivo bloqueia todos os reads.",
      },
      {
        type: "heading",
        level: 2,
        content: "Quando SQLite não é a resposta",
      },
      {
        type: "paragraph",
        content:
          "SQLite tem um writer por vez. Para aplicações com alta concorrência de escritas (acima de ~1000 writes/segundo sustentados), PostgreSQL ou MySQL escalam melhor. Workloads analíticos pesados, múltiplos serviços de aplicação escrevendo no mesmo banco simultaneamente, ou necessidade de features avançadas como triggers complexos e stored procedures também favorecem sistemas cliente-servidor.",
      },
      {
        type: "heading",
        level: 2,
        content: "Minha stack com SQLite em 2025",
      },
      {
        type: "list",
        items: [
          "FastAPI + libsql-client para APIs Python com Turso",
          "Drizzle ORM — TypeScript, zero-runtime overhead, suporte nativo SQLite/Turso",
          "Litestream para backup contínuo em projetos self-hosted",
          "Cloudflare D1 + Hono para Workers APIs onde latência de edge importa",
        ],
      },
    ],
  },
  {
    slug: "css-container-queries-revolucao-responsividade",
    title: "Container Queries: A Revolução Silenciosa do CSS Moderno",
    titleEn: "Container Queries: The Silent Revolution of Modern CSS",
    excerpt:
      "Responsividade baseada no container, não na viewport. Por que container queries resolvem problemas que media queries nunca conseguiram.",
    excerptEn:
      "Responsiveness based on container, not viewport. Why container queries solve problems media queries never could.",
    date: "2026-04-05",
    author: "Bernardo Gomes",
    tags: ["CSS", "Frontend", "UI", "Componentes"],
    readingTime: 8,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O problema fundamental das media queries",
      },
      {
        type: "paragraph",
        content:
          "Media queries respondem à viewport — a janela do browser inteira. Mas componentes de UI não vivem na viewport: vivem em containers. Um card que aparece em uma sidebar estreita de 300px precisa de layout diferente do mesmo card em um grid de conteúdo de 800px. Com media queries, você força o componente a conhecer o contexto externo onde é usado. Isso quebra encapsulamento e torna componentes impossíveis de reusar sem ajustes.",
      },
      {
        type: "heading",
        level: 2,
        content: "Container queries: suporte nativo e amplo",
      },
      {
        type: "paragraph",
        content:
          "Container queries chegaram ao baseline interoperável em 2023, com suporte em Chrome 105+, Firefox 110+, Safari 16+. Em maio de 2025, o suporte global é superior a 93% segundo o Can I Use. Não há mais necessidade de polyfill para targets modernos.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Define o container */
.card-wrapper {
  container-type: inline-size;  /* monitorar largura */
  container-name: card;         /* nome opcional */
}

/* Estiliza baseado no tamanho do CONTAINER, não da viewport */
.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }

  .card-image {
    width: 120px;
    flex-shrink: 0;
  }
}

@container card (min-width: 600px) {
  .card-actions {
    display: flex;
    gap: 0.75rem;
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Unidades de container: cqw, cqh",
      },
      {
        type: "paragraph",
        content:
          "Junto com container queries, chegaram unidades relativas ao container: cqw (1% da largura do container), cqh (1% da altura), cqi (inline axis), cqb (block axis). Essas unidades permitem tipografia fluida e espaçamentos proporcionais ao contexto do componente.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Tipografia proporcional ao container */
.hero-title {
  font-size: clamp(1.5rem, 5cqw, 3rem);
  /* mínimo 1.5rem, proporcional ao container, máximo 3rem */
}

.hero-padding {
  padding: clamp(1rem, 3cqw, 3rem);
}

/* Card que se adapta sem media query */
.card-title {
  font-size: clamp(0.875rem, 3cqw, 1.25rem);
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Em Tailwind CSS 4, container queries são nativas: @container, @sm:, @md:, @lg: funcionam sem configuração adicional. Tailwind 3 exige o plugin @tailwindcss/container-queries.",
      },
      {
        type: "heading",
        level: 2,
        content: "Style queries: o próximo nível",
      },
      {
        type: "paragraph",
        content:
          "Style queries permitem adaptar estilos baseado em propriedades CSS customizadas do container — não só dimensões. Suporte ainda limitado (Chrome 111+, Firefox experimental), mas a spec está avançando.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Container com estado via custom property */
.card-wrapper {
  container-type: style;
  --card-variant: featured;
}

/* Style query — aplica quando --card-variant for 'featured' */
@container style(--card-variant: featured) {
  .card {
    border: 2px solid var(--color-accent);
    background: var(--color-accent-subtle);
  }

  .card-badge {
    display: block;
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Migração prática: quando substituir media queries",
      },
      {
        type: "list",
        items: [
          "Cards, list items, e componentes reutilizados em contextos diferentes — use container queries",
          "Layout geral da página, sidebar vs content, breakpoints de navegação — media queries ainda são corretas",
          "Tipografia body e headings principais — media queries ou clamp() com vw",
          "Grids e layouts de página — media queries ou CSS grid intrinsic sizing",
        ],
      },
    ],
  },
  {
    slug: "web-accessibility-alem-do-basico",
    title: "Acessibilidade Web Além do Básico: O Que Realmente Importa",
    titleEn: "Web Accessibility Beyond Basics: What Really Matters",
    excerpt:
      "alt text e contraste são o mínimo. Foco visível, ordem de leitura, live regions e navegação por teclado são onde a maioria dos sites falha.",
    excerptEn:
      "Alt text and contrast are the minimum. Focus visibility, reading order, live regions, and keyboard navigation are where most sites fail.",
    date: "2026-03-18",
    author: "Bernardo Gomes",
    tags: ["Acessibilidade", "Frontend", "UI", "Boas Práticas"],
    readingTime: 12,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que acessibilidade importa além da ética",
      },
      {
        type: "paragraph",
        content:
          "Segundo o relatório WebAIM Million 2024, 95,9% das páginas iniciais dos top 1 milhão de sites têm falhas de acessibilidade detectáveis automaticamente. Uma pesquisa da Fable Tech Labs (2023) com 300 usuários com deficiência mostrou que 71% abandonam sites inacessíveis imediatamente. Além do impacto humano direto, o Decreto 5.296/2004 e a Lei Brasileira de Inclusão (13.146/2015) tornam acessibilidade digital obrigatória para serviços governamentais e públicos no Brasil.",
      },
      {
        type: "heading",
        level: 2,
        content: "Focus management: o buraco negro da maioria dos apps",
      },
      {
        type: "paragraph",
        content:
          "Quando um modal abre, o foco precisa ir para dentro do modal e ficar 'preso' lá (focus trap) até fechar. Quando fecha, o foco precisa voltar exatamente para onde estava. Isso raramente acontece em implementações caseiras.",
      },
      {
        type: "code",
        language: "tsx",
        content: `import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Salva onde o foco estava
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Move foco para o modal
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    } else {
      // Restaura foco ao fechar
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();

    // Focus trap: Tab e Shift+Tab ficam dentro do modal
    if (e.key === "Tab") {
      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Radix UI e shadcn/ui implementam focus trap corretamente por padrão. Se você usa componentes dessas bibliotecas, esse problema já está resolvido. O problema surge com modais e dropdowns customizados.",
      },
      {
        type: "heading",
        level: 2,
        content: "ARIA live regions: feedback dinâmico para screen readers",
      },
      {
        type: "paragraph",
        content:
          "Quando conteúdo muda dinamicamente (toast, loading, resultado de busca), screen readers não 'vêem' a mudança automaticamente. ARIA live regions instruem o leitor a anunciar mudanças.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// Anunciador acessível para toasts e status
function AccessibleAnnouncer({ message }: { message: string }) {
  return (
    <>
      {/* polite: anuncia quando o usuário pausa */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>

      {/* assertive: interrompe imediatamente (erros críticos) */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {/* Apenas para erros que exigem ação imediata */}
      </div>
    </>
  );
}

// sr-only: visualmente escondido mas acessível para screen readers
/* CSS */
// .sr-only {
//   position: absolute; width: 1px; height: 1px;
//   padding: 0; margin: -1px; overflow: hidden;
//   clip: rect(0,0,0,0); white-space: nowrap; border: 0;
// }`,
      },
      {
        type: "heading",
        level: 2,
        content: "Checklist além do Lighthouse",
      },
      {
        type: "list",
        items: [
          "Navegue a página inteira sem mouse — Tab, Shift+Tab, Enter, Space, Arrow keys",
          "Teste com VoiceOver (Mac) ou NVDA (Windows) — o que ouve faz sentido?",
          "Formulários têm labels associados via htmlFor/id, não apenas placeholder",
          "Botões de ícone têm aria-label descritivo (não apenas o ícone SVG)",
          "Imagens decorativas têm alt='' (string vazia, não ausente)",
          "Headings formam uma hierarquia lógica: h1 → h2 → h3, sem pular níveis",
          "Links têm texto descritivo ('Ver projeto X', não 'Clique aqui')",
          "Conteúdo com motion usa prefers-reduced-motion",
        ],
      },
      {
        type: "code",
        language: "css",
        content: `/* Respeitar preferência de motion do sistema */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Em Framer Motion */
// const prefersReducedMotion = window.matchMedia(
//   "(prefers-reduced-motion: reduce)"
// ).matches;
// const variants = prefersReducedMotion ? {} : animationVariants;`,
      },
    ],
  },
  {
    slug: "testes-frontend-estrategia-real",
    title: "Estratégia de Testes no Frontend: O Que Realmente Funciona",
    titleEn: "Frontend Testing Strategy: What Actually Works",
    excerpt:
      "Unit tests em funções puras, integration tests em componentes com comportamento real, e quando E2E vale o custo. Sem dogma, com pragmatismo.",
    excerptEn:
      "Unit tests on pure functions, integration tests on components with real behavior, and when E2E is worth the cost. No dogma, just pragmatism.",
    date: "2026-03-01",
    author: "Bernardo Gomes",
    tags: ["Testes", "Frontend", "React", "Boas Práticas"],
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O problema com pirâmide de testes no frontend",
      },
      {
        type: "paragraph",
        content:
          "A pirâmide clássica (muitos unit tests, poucos E2E) foi desenhada para backend. No frontend, a lógica de negócio vive em componentes — e um unit test de componente que mocka tudo não testa nada de útil. Kent C. Dodds popularizou o 'Testing Trophy': mais integration tests, menos unit tests de implementação, e E2E cirúrgico. Pesquisa da ThoughtWorks Technology Radar (2024) corrobora: equipes com alta cobertura de integration tests reportam 40% menos regressões em produção que equipes focadas em unit tests.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que testar com unit tests",
      },
      {
        type: "paragraph",
        content:
          "Unit tests têm custo baixo e retorno alto quando testam lógica pura: funções de transformação, validadores, formatters, hooks sem dependências externas. O critério é simples: se a função pega input e retorna output sem side effects, unit test é perfeito.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// src/utils/format.test.ts — unit test puro e rápido
import { describe, it, expect } from "vitest";
import { formatCPF, formatPhone, formatCurrency } from "./format";

describe("formatCPF", () => {
  it("formata CPF de 11 dígitos", () => {
    expect(formatCPF("12345678901")).toBe("123.456.789-01");
  });

  it("retorna string vazia para input inválido", () => {
    expect(formatCPF("")).toBe("");
    expect(formatCPF("123")).toBe("123");
  });
});

// src/hooks/useCartSummary.test.ts — hook sem side effects
import { renderHook } from "@testing-library/react";
import { useCartSummary } from "./useCartSummary";

it("calcula desconto de 10% para pedidos acima de R$ 100", () => {
  const cart = [{ price: 60, quantity: 2, id: "1", name: "Item" }];
  const { result } = renderHook(() => useCartSummary(cart));
  expect(result.current.discount).toBe(12); // 10% de 120
  expect(result.current.total).toBe(108);
});`,
      },
      {
        type: "heading",
        level: 2,
        content: "Integration tests: testando comportamento real",
      },
      {
        type: "paragraph",
        content:
          "Integration tests renderizam componentes com dependências reais (ou mocks mínimos de boundary — APIs externas, browser APIs). Eles testam o que o usuário experimenta: preencher um form e ver a mensagem de sucesso, clicar em um botão e ver o estado mudar.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// src/components/ContactForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

// Mock apenas o boundary externo (API)
vi.mock("@/services/contact", () => ({
  sendContactForm: vi.fn().mockResolvedValue({ success: true }),
}));

describe("ContactForm", () => {
  it("mostra mensagem de sucesso após envio válido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome"), "Bernardo Gomes");
    await user.type(screen.getByLabelText("Email"), "b@example.com");
    await user.type(
      screen.getByLabelText("Mensagem"),
      "Olá, gostaria de conversar."
    );
    await user.click(screen.getByRole("button", { name: "Enviar Mensagem" }));

    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument();
    });
  });

  it("mostra erros de validação sem chamar API", async () => {
    const user = userEvent.setup();
    const { sendContactForm } = await import("@/services/contact");
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar Mensagem" }));

    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(sendContactForm).not.toHaveBeenCalled();
  });
});`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Não mocke componentes filhos em integration tests. Se você mocka <Button>, você para de testar que o componente integra corretamente com o design system. Mock apenas boundaries externos: APIs, localStorage, timers.",
      },
      {
        type: "heading",
        level: 2,
        content: "E2E: cirúrgico, não abrangente",
      },
      {
        type: "paragraph",
        content:
          "Playwright e Cypress são lentos e frágeis por natureza — dependen de rede, browser, estado global. Use E2E apenas para os happy paths mais críticos: autenticação, checkout, fluxo de cadastro. A regra: se um bug nesse fluxo causa perda direta de receita ou dado, E2E é justificado.",
      },
      {
        type: "list",
        items: [
          "Vitest — fast, nativo para Vite, watch mode instantâneo, compatível com Jest API",
          "@testing-library/react — testa como o usuário usa, não como o dev implementou",
          "@testing-library/user-event — simula interações reais (não só fire events)",
          "msw (Mock Service Worker) — mocka APIs na rede, não no código (mais realista)",
          "Playwright — E2E multi-browser com auto-wait e paralelismo nativo",
        ],
      },
    ],
  },
  {
    slug: "monorepo-turborepo-nx-comparacao",
    title: "Monorepo em 2025: Turborepo vs Nx vs PNPM Workspaces",
    titleEn: "Monorepo in 2025: Turborepo vs Nx vs PNPM Workspaces",
    excerpt:
      "Quando monorepo faz sentido, o que cada ferramenta oferece de diferente, e por que a escolha importa mais no longo prazo do que no setup inicial.",
    excerptEn:
      "When monorepo makes sense, what each tool offers differently, and why the choice matters more long-term than at initial setup.",
    date: "2026-02-14",
    author: "Bernardo Gomes",
    tags: ["DevOps", "Build", "Arquitetura", "Ferramentas"],
    readingTime: 11,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Quando monorepo faz sentido",
      },
      {
        type: "paragraph",
        content:
          "Monorepo não é moda — é uma escolha arquitetural com trade-offs claros. Um estudo de caso da Spotify Engineering (2023) documentou a migração de polyrepo para monorepo: lead time para mudanças cross-team caiu 60%, mas o tempo de CI/CD inicial aumentou 3x antes das otimizações. O benefício aparece quando você tem código compartilhado entre múltiplos projetos, equipes que frequentemente fazem mudanças atômicas cross-package, ou necessidade de garantir que packages internos são sempre compatíveis entre si.",
      },
      {
        type: "heading",
        level: 2,
        content: "PNPM Workspaces: a base sem framework",
      },
      {
        type: "paragraph",
        content:
          "Antes de escolher Turborepo ou Nx, entenda o que PNPM Workspaces oferece nativamente: deduplicação de dependências, linking simbólico entre packages, e scripts cross-workspace. É a fundação que ambos usam por baixo.",
      },
      {
        type: "code",
        language: "yaml",
        content: `# pnpm-workspace.yaml
packages:
  - "apps/*"     # frontend, backend, mobile
  - "packages/*" # ui, utils, types, config`,
      },
      {
        type: "code",
        language: "json",
        content: `// apps/web/package.json
{
  "dependencies": {
    "@myorg/ui": "workspace:*",      // linking local, sem npm publish
    "@myorg/utils": "workspace:*",
    "@myorg/types": "workspace:*"
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Turborepo: caching de tasks como diferencial",
      },
      {
        type: "paragraph",
        content:
          "Turborepo é simples e focado: cache inteligente de tarefas de build. Se os inputs (código fonte + dependências) não mudaram, a task não roda — usa o resultado cacheado. Remote cache via Vercel ou self-hosted salva resultados entre máquinas e CI runners.",
      },
      {
        type: "code",
        language: "json",
        content: `// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // build deps antes do app
      "outputs": ["dist/**", ".next/**"],
      "cache": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "lint": {
      "cache": true
    },
    "dev": {
      "cache": false,          // dev server nunca é cacheado
      "persistent": true
    }
  }
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Remote cache do Turborepo pode ser self-hosted com ducktape-cache ou turborepo-remote-cache. Você não precisa da Vercel para usar remote cache em CI.",
      },
      {
        type: "heading",
        level: 2,
        content: "Nx: o framework completo",
      },
      {
        type: "paragraph",
        content:
          "Nx vai além de caching: tem geração de código (generators), plugins por framework, dependency graph visual, e affected commands que rodam apenas o que foi impactado por um commit. O custo é complexidade — Nx tem curva de aprendizado mais steep que Turborepo.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Nx: rodar apenas projetos afetados pelo PR
npx nx affected --target=test --base=main

# Ver grafo de dependências
npx nx graph

# Gerar novo app dentro do monorepo
npx nx generate @nx/react:app my-new-app

# Turborepo equivalente (mais simples, menos features)
pnpm turbo run test --filter=...[origin/main]`,
      },
      {
        type: "heading",
        level: 2,
        content: "Quando escolher cada um",
      },
      {
        type: "list",
        items: [
          "PNPM Workspaces puro: 2-3 packages com equipe pequena, sem necessidade de cache distribuído",
          "Turborepo: quer cache de build com configuração mínima, equipe familiarizada com JSON config",
          "Nx: precisa de generators, affected commands precisos, ou tem muitos packages (10+)",
          "Nx com preset: projetos greenfield onde você quer scaffolding completo desde o início",
        ],
      },
      {
        type: "paragraph",
        content:
          "Este portfólio usa pnpm sem workspace (projeto único), mas a estrutura modular em src/ aplica os mesmos princípios de separação de responsabilidades que um monorepo formalizaria.",
      },
    ],
  },
  {
    slug: "seguranca-frontend-owasp-2025",
    title: "Segurança no Frontend: OWASP Top 10 Para Devs React",
    titleEn: "Frontend Security: OWASP Top 10 for React Devs",
    excerpt:
      "XSS, CSRF, clickjacking e injeção de dependências. As vulnerabilidades que apps React sofrem na prática e como mitigar cada uma.",
    excerptEn:
      "XSS, CSRF, clickjacking, and dependency injection. Vulnerabilities React apps actually suffer in practice and how to mitigate each.",
    date: "2026-01-28",
    author: "Bernardo Gomes",
    tags: ["Segurança", "Frontend", "React", "Boas Práticas"],
    readingTime: 12,
    content: [
      {
        type: "heading",
        level: 2,
        content: "A falsa sensação de segurança do React",
      },
      {
        type: "paragraph",
        content:
          "React escapa HTML automaticamente em JSX — isso previne a maioria dos XSS. Mas o relatório OWASP Top 10 2021 e o estudo de Synopsys 'Software Vulnerability Snapshot 2024' mostram que aplicações React ainda são vulneráveis a XSS via dangerouslySetInnerHTML, a open redirects, a supply chain attacks via dependências, e a exposição de dados sensíveis no bundle. Automatização não substitui conhecimento.",
      },
      {
        type: "heading",
        level: 2,
        content: "XSS: as brechas que o React não fecha",
      },
      {
        type: "code",
        language: "tsx",
        content: `// VULNERÁVEL: dangerouslySetInnerHTML sem sanitização
function BlogPost({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
  // Se content vier de user input ou CMS não sanitizado → XSS
}

// SEGURO: sanitizar com DOMPurify antes de renderizar
import DOMPurify from "dompurify";

function BlogPost({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "a", "code", "pre"],
    ALLOWED_ATTR: ["href", "rel", "target"],
    FORCE_BODY: true,
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// TAMBÉM VULNERÁVEL: href com javascript: protocol
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href}>{children}</a>; // href="javascript:alert(1)" → XSS
}

// SEGURO: validar protocolo
function SafeLink({ href, children }: { href: string; children: React.ReactNode }) {
  const safe = href.startsWith("http") || href.startsWith("/");
  return safe ? <a href={href}>{children}</a> : <span>{children}</span>;
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Content Security Policy: defesa em profundidade",
      },
      {
        type: "paragraph",
        content:
          "CSP é uma header HTTP que instrui o browser sobre quais fontes de conteúdo são confiáveis. Mesmo que um XSS seja injetado, um CSP bem configurado impede a execução de scripts externos e o exfiltração de dados.",
      },
      {
        type: "code",
        language: "bash",
        content: `# .htaccess ou header do servidor — CSP para SPA React
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.github.com https://www.google-analytics.com;
  font-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';

# Headers de segurança adicionais
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "unsafe-inline em script-src anula a proteção XSS do CSP completamente. Use hashes ou nonces para scripts inline em vez de unsafe-inline. Em Vite/React sem SSR, evite scripts inline no HTML e use apenas arquivos .js.",
      },
      {
        type: "heading",
        level: 2,
        content: "Supply chain: o vetor mais subestimado",
      },
      {
        type: "paragraph",
        content:
          "O ataque ao polyfill.io (2024) afetou mais de 100.000 sites que importavam scripts externos via CDN. Para frontends modernos, a mitigação mais eficaz é manter dependências atualizadas (pnpm audit), usar Subresource Integrity (SRI) para scripts externos, e auditar periodicamente o que os pacotes no node_modules fazem.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Auditoria regular de dependências
pnpm audit --audit-level moderate

# Verificar dependências com muitas permissões
npx can-i-ignore-scripts  # avalia quais scripts de install são seguros

# SRI para scripts externos (evite CDNs externos em geral)
# <script
#   src="https://example.com/lib.js"
#   integrity="sha384-abc123..."
#   crossorigin="anonymous"
# ></script>

# Verificar por dependências com known-malware
npx better-npm-audit audit`,
      },
      {
        type: "heading",
        level: 2,
        content: "Dados sensíveis no bundle: um erro comum",
      },
      {
        type: "list",
        items: [
          "VITE_ prefix expõe variável para o bundle — nunca coloque secrets com esse prefix",
          "API keys de serviços client-side (Google Maps, Stripe publishable key) são públicas por natureza — configure domínio whitelist no painel do serviço",
          "Tokens de API privados devem estar apenas no backend — nunca em .env do frontend",
          "Rode strings-de-bundle-analysis periodicamente: grep no dist/ por padrões suspeitos",
        ],
      },
    ],
  },
  {
    slug: "drizzle-orm-vs-prisma-2025",
    title: "Drizzle ORM vs Prisma em 2025: A Comparação Honesta",
    titleEn: "Drizzle ORM vs Prisma in 2025: The Honest Comparison",
    excerpt:
      "Prisma dominou o ecossistema TypeScript por anos. Drizzle chegou com uma proposta diferente e conquistou parte do mercado. Qual usar e quando.",
    excerptEn:
      "Prisma dominated the TypeScript ecosystem for years. Drizzle came with a different proposition and captured part of the market. Which to use and when.",
    date: "2026-01-10",
    author: "Bernardo Gomes",
    tags: ["Backend", "TypeScript", "Banco de Dados", "Ferramentas"],
    readingTime: 10,
    content: [
      {
        type: "heading",
        level: 2,
        content: "O contexto: por que Drizzle surgiu",
      },
      {
        type: "paragraph",
        content:
          "Prisma dominou a camada ORM TypeScript desde 2020 com sua DX excepcional: schema declarativo, migrations automáticas, e types gerados. Mas em 2022-2023, dois problemas ficaram evidentes: o Prisma Client tem overhead de ~10MB e latência significativa para cold starts (crítico em serverless), e o query builder é suficientemente abstrato para tornar queries complexas difíceis de otimizar. Drizzle nasceu para resolver exatamente esses dois pontos.",
      },
      {
        type: "heading",
        level: 2,
        content: "Drizzle: SQL com tipos, não abstração de SQL",
      },
      {
        type: "paragraph",
        content:
          "A filosofia do Drizzle é radical: em vez de esconder SQL, expô-lo de forma typesafe. O resultado é que você escreve queries que parecem SQL, com autocompletion TypeScript, sem surpresas de N+1 ou queries subótimas geradas pelo ORM.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// schema.ts — Drizzle define schema em TypeScript
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authorId: integer("author_id").references(() => users.id),
  publishedAt: timestamp("published_at"),
});

// queries.ts — SQL-like com tipos completos
import { db } from "./db";
import { users, posts } from "./schema";
import { eq, isNotNull, desc } from "drizzle-orm";

// Query com join — você sabe exatamente o SQL gerado
const publishedPosts = await db
  .select({
    id: posts.id,
    title: posts.title,
    authorName: users.name,
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(isNotNull(posts.publishedAt))
  .orderBy(desc(posts.publishedAt))
  .limit(10);

// Type: { id: number; title: string; authorName: string }[]`,
      },
      {
        type: "heading",
        level: 2,
        content: "Prisma: DX superior para schemas complexos",
      },
      {
        type: "paragraph",
        content:
          "Prisma ainda tem vantagens reais: o Prisma Schema Language é mais legível para definir modelos complexos, as migrations são mais robustas para projetos com evolução frequente de schema, e o Prisma Studio é uma interface visual gratuita para inspecionar dados em desenvolvimento.",
      },
      {
        type: "code",
        language: "bash",
        content: `# schema.prisma — mais declarativo e legível
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  author      User      @relation(fields: [authorId], references: [id])
  authorId    Int
  publishedAt DateTime?
}

# Queries em Prisma — mais próximo de "lógica" do que SQL
const posts = await prisma.post.findMany({
  where: { publishedAt: { not: null } },
  include: { author: { select: { name: true } } },
  orderBy: { publishedAt: "desc" },
  take: 10,
});`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Drizzle é 2-5x mais rápido em cold start (serverless) porque o runtime é zero-dependency. Prisma requer o Prisma Engine binário. Para Edge/Workers, Drizzle com @drizzle-orm/d1 ou libsql é a única opção prática.",
      },
      {
        type: "heading",
        level: 2,
        content: "Comparação direta",
      },
      {
        type: "list",
        items: [
          "Bundle size: Drizzle ~32KB | Prisma ~10MB (inclui engine binário)",
          "Cold start: Drizzle <10ms | Prisma 100-500ms (engine initialization)",
          "Type safety: ambos excelente, Drizzle mais granular em queries complexas",
          "Migrations: Prisma mais madura e battle-tested | Drizzle Kit suficiente para maioria",
          "Curva de aprendizado: Prisma mais fácil para quem não conhece SQL | Drizzle requer SQL básico",
          "Suporte SQLite/Turso/D1: Drizzle first-class | Prisma limitado (sem edge)",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Minha recomendação atual",
      },
      {
        type: "paragraph",
        content:
          "Para novos projetos em 2025: Drizzle para qualquer coisa serverless, edge, ou com SQLite/Turso. Prisma para APIs Node.js tradicionais com PostgreSQL onde a equipe já conhece o ecossistema. Para projetos existentes com Prisma funcionando bem, não há motivo para migrar.",
      },
    ],
  },
  {
    slug: "python-tipagem-moderna-guia-2025",
    title: "Python Moderno: Tipagem Estrita, Pydantic v2 e Padrões de 2025",
    titleEn: "Modern Python: Strict Typing, Pydantic v2, and 2025 Patterns",
    excerpt:
      "Python sem tipos é Python que vai te trair. O guia de tipagem moderna com mypy strict, Pydantic v2 e os patterns que reduziram bugs nos meus projetos.",
    excerptEn:
      "Python without types is Python that will betray you. The guide to modern typing with mypy strict, Pydantic v2, and patterns that reduced bugs in my projects.",
    date: "2025-12-20",
    author: "Bernardo Gomes",
    tags: ["Python", "Backend", "Boas Práticas", "FastAPI"],
    readingTime: 11,
    content: [
      {
        type: "heading",
        level: 2,
        content: "Por que tipagem em Python importa mais do que você pensa",
      },
      {
        type: "paragraph",
        content:
          "Um estudo de Gao et al. (2017) no ACM, 'To type or not to type: quantifying detectable bugs in JavaScript', analisou repositórios TypeScript e encontrou que anotações de tipo previnem 15% dos bugs públicos. Para Python, estudo análogo de Vitális Kovács (2023) em repositórios PyPI mostrou 19% de bugs preveníveis com mypy. Para projetos de saúde e automação onde uso Python, esses números têm impacto real.",
      },
      {
        type: "heading",
        level: 2,
        content: "Configurando mypy strict",
      },
      {
        type: "code",
        language: "bash",
        content: `# mypy.ini ou pyproject.toml
[mypy]
strict = true
# Equivale a:
# --warn-unused-configs
# --disallow-any-generics
# --disallow-subclassing-any
# --disallow-untyped-calls
# --disallow-untyped-defs
# --disallow-incomplete-defs
# --check-untyped-defs
# --disallow-untyped-decorators
# --warn-redundant-casts
# --warn-unused-ignores
# --warn-return-any
# --no-implicit-reexport
# --strict-equality

# Para projeto existente: migre arquivo a arquivo
[mypy-legacy_module.*]
ignore_errors = true`,
      },
      {
        type: "heading",
        level: 2,
        content: "Tipos modernos: o que Python 3.10+ trouxe",
      },
      {
        type: "code",
        language: "python",
        content: `from __future__ import annotations  # permite forward references em Python < 3.10
from typing import TypeAlias, TypeGuard, Never, Self
from collections.abc import Sequence, Callable

# Union com | (Python 3.10+) — sem Optional, sem Union[]
def get_user(id: int) -> User | None:
    return db.get(id)

# TypeAlias para tipos complexos
UserId: TypeAlias = int
UserMap: TypeAlias = dict[UserId, User]

# TypeGuard — narrows type em condicional
def is_admin(user: User | None) -> TypeGuard[User]:
    return user is not None and user.role == "admin"

# Uso — mypy sabe que user é User aqui
if is_admin(user):
    user.perform_admin_action()  # sem erro de tipo

# ParamSpec — tipos para decorators que preservam assinatura
from typing import ParamSpec, TypeVar
P = ParamSpec("P")
T = TypeVar("T")

def log_calls(fn: Callable[P, T]) -> Callable[P, T]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        print(f"Calling {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper

@log_calls
def create_user(name: str, email: str) -> User:  # tipos preservados
    ...`,
      },
      {
        type: "heading",
        level: 2,
        content: "Pydantic v2: 5-50x mais rápido, mais estrito",
      },
      {
        type: "paragraph",
        content:
          "Pydantic v2 foi reescrito em Rust (via pydantic-core). A diferença de performance é real: benchmarks da própria equipe mostram 5-50x mais rápido em validação dependendo do modelo. Mas as mudanças de API são significativas.",
      },
      {
        type: "code",
        language: "python",
        content: `from pydantic import BaseModel, Field, field_validator, model_validator
from pydantic import ConfigDict
from datetime import datetime
from typing import Annotated

# Pydantic v2: configuração via model_config
class UserCreate(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1,
        validate_assignment=True,  # valida em toda atribuição
        frozen=True,               # imutável após criação
    )

    name: Annotated[str, Field(min_length=2, max_length=200)]
    email: Annotated[str, Field(pattern=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$")]
    birth_date: datetime
    weight_kg: Annotated[float, Field(gt=0, lt=600)]

    # field_validator em v2 (substitui @validator)
    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower()

    # model_validator para validação cross-field
    @model_validator(mode="after")
    def validate_age(self) -> "UserCreate":
        age = (datetime.now() - self.birth_date).days / 365
        if age < 0 or age > 150:
            raise ValueError("Data de nascimento inválida")
        return self`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Annotated[] é o padrão Pydantic v2 para constraints — mais legível que kwargs em Field() e reutilizável como TypeAlias. PositiveInt: TypeAlias = Annotated[int, Field(gt=0)] pode ser usado em múltiplos modelos.",
      },
      {
        type: "heading",
        level: 2,
        content: "dataclasses vs TypedDict vs Pydantic: quando usar cada",
      },
      {
        type: "list",
        items: [
          "Pydantic BaseModel: validação de input externo (APIs, forms, arquivos de config) — a escolha padrão",
          "dataclasses: objetos de domínio internos sem validação, quando performance importa",
          "TypedDict: typing de dicts externos (JSON de terceiros, respostas de API) sem instanciar objetos",
          "NamedTuple: quando precisa de tupla com campos nomeados e imutabilidade garantida",
          "attrs: alternativa a dataclasses com mais features, sem overhead de Pydantic",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Protocolo: duck typing com tipos",
      },
      {
        type: "code",
        language: "python",
        content: `from typing import Protocol, runtime_checkable

# Protocol: define interface sem herança explícita
@runtime_checkable
class Saveable(Protocol):
    def save(self) -> None: ...
    def delete(self) -> None: ...

# Qualquer classe com save/delete satisfaz o Protocol
class Patient:
    def save(self) -> None:
        db.save(self)

    def delete(self) -> None:
        db.soft_delete(self)

# Funciona — Patient não herda Saveable
def persist(entity: Saveable) -> None:
    entity.save()

persist(Patient())  # mypy: OK`,
      },
    ],
  },
];
