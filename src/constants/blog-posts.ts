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
];
