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
    slug: "agentes-ia-codificacao-2026",
    title: "Claude Code, Cursor e Codex: O Estado Real dos Agentes de IA em Maio de 2026",
    titleEn: "Claude Code, Cursor & Codex: The Real State of AI Coding Agents in May 2026",
    excerpt:
      "90% dos devs usam IA no trabalho. Claude Code virou #1 em 8 meses. Mas qual ferramenta escolher — e quando usar cada uma?",
    excerptEn:
      "90% of devs use AI at work. Claude Code became #1 in 8 months. But which tool to choose — and when to use each?",
    date: "2026-05-26",
    author: "Bernardo Gomes",
    tags: ["IA", "Claude Code", "Cursor", "Ferramentas", "Produtividade"],
    featured: true,
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content:
          "Em abril de 2026, o JetBrains publicou uma pesquisa com mais de 10.000 desenvolvedores profissionais. O número que parou todo mundo: 90% usam pelo menos uma ferramenta de IA no trabalho. Não é adoção experimental — 75% usam IA em metade ou mais das suas tarefas diárias. O mercado virou.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Fonte: JetBrains Research, abril de 2026 — 'Which AI Coding Tools Do Developers Actually Use at Work?' — amostra de 10.000+ devs profissionais.",
      },
      {
        type: "heading",
        level: 2,
        content: "Claude Code: de zero a #1 em 8 meses",
      },
      {
        type: "paragraph",
        content:
          "Claude Code foi lançado em maio de 2025. Em janeiro de 2026, já tinha 18% de adoção no trabalho — crescimento de 57% ano a ano. Em março de 2026, ultrapassou GitHub Copilot em NPS e CSAT (91% de satisfação, NPS 54). O motivo não é marketing: é eficiência de tokens. Um benchmark publicado pela Toolradar em maio de 2026 comparou Claude Code (Opus 4.6) com Cursor em tarefas idênticas. Claude Code concluiu com 33K tokens sem erros. Cursor usou 188K tokens para a mesma tarefa — 5,5x mais.",
      },
      {
        type: "heading",
        level: 2,
        content: "Cursor 3.0: Agents Window e Design Mode",
      },
      {
        type: "paragraph",
        content:
          "O Cursor não ficou parado. Em maio de 2026, lançou a versão 3.0 com Agents Window — múltiplos agentes paralelos visíveis numa janela lateral — e Design Mode, que interpreta screenshots de UI e gera código correspondente. O Cursor continua sendo a escolha dominante para quem quer assistência linha a linha integrada no IDE, com contexto visual do código aberto.",
      },
      {
        type: "heading",
        level: 2,
        content: "Quando usar cada ferramenta",
      },
      {
        type: "list",
        items: [
          "Claude Code: tarefas autônomas multi-arquivo, refatorações grandes, geração de testes, PRs completos sem supervisão constante",
          "Cursor: edição inline, pair programming ativo, Design Mode para UI, contexto visual do projeto aberto no IDE",
          "GitHub Copilot: times corporativos com licenças empresariais existentes, integração nativa no VS Code/JetBrains sem mudança de workflow",
          "Google Antigravity 2.0: novidade de maio de 2026, 12x mais rápido com Gemini 3.5 Flash, vale testar para automação de tarefas repetitivas",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "O padrão que está emergindo: stack composável",
      },
      {
        type: "paragraph",
        content:
          "Em maio de 2026, a maioria dos engenheiros sênior usa duas ou mais ferramentas para workflows distintos. The New Stack documentou esse padrão: prototipagem rápida com Bolt/Lovable, refinamento para produção com Cursor/Claude Code, revisão e testes com Codex. Não é uma ferramenta vs outra — é camadas.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Workflow típico de engenheiro sênior em maio de 2026
# 1. Exploração / pesquisa — Claude Code CLI
claude "analise o código de autenticação e liste vulnerabilidades"

# 2. Edição inline no IDE — Cursor
# (abre arquivo, Cmd+K, descreve mudança)

# 3. Tarefa autônoma longa — Claude Code em background
claude --background "adicione testes de integração para todos os endpoints de /api/auth"

# 4. Review do PR gerado
gh pr view --comments`,
      },
      {
        type: "heading",
        level: 2,
        content: "O número que mais importa: 51%",
      },
      {
        type: "paragraph",
        content:
          "Até o início de 2026, 51% do código no GitHub era gerado ou substancialmente assistido por IA (Stack Overflow Developer Survey, fevereiro de 2026). Isso não elimina o desenvolvedor — mas muda radicalmente o que o desenvolvedor precisa saber. A habilidade que diferencia agora: saber decompor problemas em tarefas que agentes conseguem executar autonomamente.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Preço em maio de 2026: Cursor Teams custa $400/mês para time de 10. Claude Code Premium custa $1.250/mês para o mesmo time. A escolha depende do perfil de uso — volume de tarefas autônomas vs. assistência inline.",
      },
    ],
  },
  {
    slug: "vite-8-rolldown-builds-mais-rapidos",
    title: "Vite 8 com Rolldown: Builds 10-30x Mais Rápidos Chegaram em 2026",
    titleEn: "Vite 8 with Rolldown: 10-30x Faster Builds Arrived in 2026",
    excerpt:
      "Vite 8 foi lançado em março de 2026 com Rolldown — bundler unificado em Rust. Builds caindo de 46s para 6s. O que mudou, o que quebra, como migrar.",
    excerptEn:
      "Vite 8 launched in March 2026 with Rolldown — a unified Rust-based bundler. Builds dropping from 46s to 6s. What changed, what breaks, how to migrate.",
    date: "2026-05-22",
    author: "Bernardo Gomes",
    tags: ["Vite", "Build", "Performance", "Rolldown", "Rust", "Frontend"],
    readingTime: 9,
    content: [
      {
        type: "paragraph",
        content:
          "Em 12 de março de 2026, Vite 8 foi lançado oficialmente. A mudança mais significativa desde o Vite 2: Rolldown — um bundler unificado escrito em Rust — substituiu a combinação esbuild + Rollup que existia desde o início. O resultado medido em projetos reais: builds 10 a 30x mais rápidos.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Fonte: InfoQ, maio de 2026 — 'Vite Version 8: Unified Rust-Based Bundler and Up to 30x Faster Builds'. Mercedes-Benz.io registrou 38% de redução, Beehiiv registrou 64% durante o beta.",
      },
      {
        type: "heading",
        level: 2,
        content: "Por que Rolldown é diferente",
      },
      {
        type: "paragraph",
        content:
          "Antes do Vite 8, o pipeline tinha dois bundlers: esbuild para desenvolvimento (rápido, sem tree-shaking completo) e Rollup para produção (lento, mas otimizado). Isso criava divergências entre dev e prod — bugs que só aparecem no build final. Rolldown unifica os dois em um único engine em Rust, com compatibilidade total com plugins do Rollup existentes.",
      },
      {
        type: "heading",
        level: 2,
        content: "Números reais de projetos reais",
      },
      {
        type: "list",
        items: [
          "Projeto médio (150k LOC): build caindo de 46s para 6s (Heise Online, março de 2026)",
          "Mercedes-Benz.io: 38% de redução no tempo de build em produção",
          "Beehiiv: 64% de redução durante o beta do Rolldown",
          "HMR (Hot Module Replacement): sem mudança perceptível — já era rápido",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "O que muda na migração",
      },
      {
        type: "code",
        language: "bash",
        content: `# Migração direta do Vite 7 para Vite 8
pnpm add -D vite@8

# Se tiver plugins customizados baseados em Rollup 3, testar primeiro:
# pnpm add -D rolldown-vite  # pacote de compatibilidade
# Isola problemas do Rolldown antes de ir para Vite 8 completo`,
      },
      {
        type: "paragraph",
        content:
          "O guia oficial recomenda: projetos simples, atualizar direto para Vite 8. Projetos com plugins customizados Rollup: primeiro migrar para o pacote rolldown-vite no Vite 7, resolver incompatibilidades, depois ir para Vite 8. A compatibilidade de plugins é alta — a maioria dos plugins populares já tem suporte.",
      },
      {
        type: "heading",
        level: 2,
        content: "Tradeoffs: o que aumenta",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Vite 8 aumenta o tamanho de instalação em ~15 MB: lightningcss não é mais opcional e o binário do Rolldown é maior que esbuild + Rollup combinados. Para projetos com restrições de espaço em CI, considere isso.",
      },
      {
        type: "heading",
        level: 2,
        content: "Vite+ e VoidZero: o ecossistema crescendo",
      },
      {
        type: "paragraph",
        content:
          "Junto com o Vite 8, a VoidZero anunciou o Vite+ — uma plataforma de análise de bundle, cache remoto e dashboards de performance de build. É a infraestrutura comercial em cima do Vite open-source. Para times que precisam de visibilidade sobre builds em CI, vale acompanhar.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// vite.config.ts — Vite 8, configuração mínima
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Rolldown já ativado por padrão no Vite 8
    // rollupOptions ainda funciona — compatibilidade mantida
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});`,
      },
    ],
  },
  {
    slug: "typescript-59-features-2026",
    title: "TypeScript 5.9: import defer, strictInference e o que Realmente Importa",
    titleEn: "TypeScript 5.9: import defer, strictInference and What Actually Matters",
    excerpt:
      "TypeScript 5.9 saiu no Q1 de 2026. import defer para carregamento lazy real, strictInference para tipos mais seguros, e o fim dos type assertions desnecessários.",
    excerptEn:
      "TypeScript 5.9 shipped in Q1 2026. import defer for real lazy loading, strictInference for safer types, and the end of unnecessary type assertions.",
    date: "2026-05-19",
    author: "Bernardo Gomes",
    tags: ["TypeScript", "Frontend", "Backend", "Ferramentas", "Linguagem"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "TypeScript 5.9 foi lançado no Q1 de 2026, trazendo funcionalidades que estavam em discussão há mais de dois anos nas issues do repositório. Não é uma release de polimento — tem mudanças que afetam como você escreve código TypeScript dia a dia.",
      },
      {
        type: "heading",
        level: 2,
        content: "import defer: lazy loading de verdade",
      },
      {
        type: "paragraph",
        content:
          "A proposta TC39 de deferred module evaluation chegou ao TypeScript 5.9 como suporte experimental. Com import defer, você importa o módulo sem executar seus side effects imediatamente — a execução acontece apenas quando você acessa o módulo pela primeira vez.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Antes — import normal: executa tudo imediatamente
import { heavyLib } from "./heavy-lib";

// TypeScript 5.9 — import defer: carrega módulo, adia execução
import defer * as heavyLib from "./heavy-lib";

// heavyLib só executa quando você realmente usa
function onUserAction() {
  heavyLib.doSomething(); // execução acontece aqui
}`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "import defer é diferente de dynamic import() — você ainda tem tipagem estática completa. É a melhor opção para bibliotecas pesadas que precisam de treeshaking mas cujo código de inicialização tem side effects.",
      },
      {
        type: "heading",
        level: 2,
        content: "strictInference: menos type assertions, mais segurança",
      },
      {
        type: "paragraph",
        content:
          "A nova flag --strictInference resolve um problema clássico: TypeScript não conseguia inferir tipos corretamente dentro de branches de tipos condicionais com union discrimination. Você precisava adicionar type assertions manuais. No 5.9, a inferência funciona corretamente nesses casos.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// TypeScript 5.8 e anterior — precisava de assertion
type Result<T> = { ok: true; data: T } | { ok: false; error: string };

function process<T>(result: Result<T>): T {
  if (result.ok) {
    return result.data as T; // type assertion necessária
  }
  throw new Error(result.error);
}

// TypeScript 5.9 com strictInference — infere corretamente
function process<T>(result: Result<T>): T {
  if (result.ok) {
    return result.data; // TypeScript infere T diretamente ✓
  }
  throw new Error(result.error);
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "erasableSyntaxOnly: preparando para Node nativo",
      },
      {
        type: "paragraph",
        content:
          "A flag --erasableSyntaxOnly (introduzida no 5.8, refinada no 5.9) proíbe sintaxe TypeScript que requer transformação em tempo de compilação: enums, namespaces, parameter properties e module declarations. O motivo: Node.js está adicionando suporte nativo a TypeScript via strip types — e esses construtores não podem ser apenas removidos, precisam de transformação real.",
      },
      {
        type: "code",
        language: "json",
        content: `// tsconfig.json para projetos que querem Node nativo futuro
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "erasableSyntaxOnly": true,  // proíbe enum, namespace, parameter props
    "strictInference": true,
    "strict": true
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "satisfies expandido: objeto literal mais seguro",
      },
      {
        type: "paragraph",
        content:
          "O operador satisfies ganhou comportamento expandido no 5.9: agora funciona corretamente com mapped types complexos sem perder especificidade de literal types. Na prática, significa que você pode validar um objeto contra uma interface complexa e ainda ter autocomplete preciso nos valores.",
      },
      {
        type: "code",
        language: "typescript",
        content: `type Config = Record<string, { value: string | number; required: boolean }>;

// Antes do 5.9 — perdia especificidade dos literais
const config = {
  timeout: { value: 5000, required: true },
  host: { value: "localhost", required: true },
} satisfies Config;
// config.timeout.value era string | number (impreciso)

// TypeScript 5.9 — mantém especificidade
// config.timeout.value é inferido como number ✓
// config.host.value é inferido como string ✓`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Documentação oficial: typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html — inclui exemplos completos do import defer e guia de migração do strictInference.",
      },
    ],
  },
  {
    slug: "google-io-2026-webmcp-devs",
    title: "Google I/O 2026: WebMCP, Antigravity e o Que Mudou Para Devs Web",
    titleEn: "Google I/O 2026: WebMCP, Antigravity and What Changed for Web Devs",
    excerpt:
      "Google I/O aconteceu na semana de 20 de maio de 2026. Gemini 3.5, WebMCP como padrão web aberto e Antigravity 2.0 competindo com Claude Code — o resumo técnico.",
    excerptEn:
      "Google I/O happened the week of May 20, 2026. Gemini 3.5, WebMCP as open web standard, and Antigravity 2.0 competing with Claude Code — the technical summary.",
    date: "2026-05-23",
    author: "Bernardo Gomes",
    tags: ["Google IO", "IA", "WebMCP", "Gemini", "Web Standards", "Frontend"],
    readingTime: 11,
    content: [
      {
        type: "paragraph",
        content:
          "Google I/O 2026 aconteceu na semana de 20 de maio. Para desenvolvedores web, três anúncios realmente importam: WebMCP como padrão aberto, Antigravity 2.0 como plataforma de agentes, e as atualizações do Gemini 3.5 com implicações diretas para quem integra APIs de IA.",
      },
      {
        type: "heading",
        level: 2,
        content: "WebMCP: IA nativa no browser como padrão web",
      },
      {
        type: "paragraph",
        content:
          "WebMCP é a proposta mais interessante para desenvolvedores web. É um padrão aberto que expõe funções JavaScript e formulários HTML como ferramentas estruturadas para agentes de IA dentro do browser. Em vez de o agente 'ver' a página como texto, ele recebe uma API tipada com as ações disponíveis.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// WebMCP — expondo ações da sua app para agentes de IA
// (API experimental, Origin Trial no Chrome 149)
navigator.mcp.register({
  tools: [
    {
      name: "search_products",
      description: "Busca produtos no catálogo",
      parameters: {
        query: { type: "string", required: true },
        category: { type: "string", enum: ["eletronicos", "roupas", "casa"] },
      },
      handler: async ({ query, category }) => {
        const results = await fetchProducts(query, category);
        return { products: results };
      },
    },
  ],
});`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "WebMCP está em Origin Trial no Chrome 149 (lançado junto com o I/O). Não é para produção ainda — mas é a direção que o browser está tomando para agentes de IA nativos. Fonte: Chrome for Developers Blog, maio de 2026.",
      },
      {
        type: "heading",
        level: 2,
        content: "Antigravity 2.0: o competidor do Claude Code",
      },
      {
        type: "paragraph",
        content:
          "Antigravity 2.0 foi demonstrado construindo um sistema operacional funcional em 12 horas usando 93 sub-agentes paralelos, custando menos de $1.000 em créditos de API. Funciona com Gemini 3.5 Flash — 12x mais rápido que a versão anterior, com benchmark competitivo contra Claude Code e Copilot em tarefas de codificação.",
      },
      {
        type: "paragraph",
        content:
          "O diferencial do Antigravity frente ao Claude Code: integração nativa com todo o ecossistema Google — Firebase, BigQuery, Cloud Run — e acesso direto às APIs de Gemini sem camadas intermediárias. Para times já na stack Google, a proposta de valor é clara.",
      },
      {
        type: "heading",
        level: 2,
        content: "Gemini 3.5: duas versões, dois casos de uso",
      },
      {
        type: "list",
        items: [
          "Gemini 3.5 Flash: velocidade — 4x mais rápido em output tokens que outros modelos frontier, ideal para pipelines de agentes onde latência importa",
          "Gemini Omni: multimodalidade máxima — aceita vídeo como input primário, gera vídeo editável com conhecimento do mundo real",
          "Ambos superam Gemini 3.1 Pro em benchmarks de coding e agentic tasks segundo o Google",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Modern Web Guidance: documentação curada para devs",
      },
      {
        type: "paragraph",
        content:
          "Um anúncio menos glamouroso mas muito útil: Modern Web Guidance — uma coleção de 100+ casos de uso com orientações validadas por especialistas para web performática, acessível e segura. Ainda em early preview, mas é a resposta do Google ao MDN sendo insuficiente para padrões emergentes. Vale bookmarkar.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "O resumo completo do Google I/O 2026 para devs está em developers.googleblog.com — inclui todas as 100 atualizações anunciadas, com links para cada API e ferramenta.",
      },
    ],
  },
  {
    slug: "core-web-vitals-2026-lcp-inp",
    title: "Core Web Vitals em 2026: LCP Ficou Mais Rígido e INP é o Novo Gargalo",
    titleEn: "Core Web Vitals in 2026: LCP Got Stricter and INP Is the New Bottleneck",
    excerpt:
      "Google apertou o threshold do LCP de 2,5s para 2,0s em março de 2026. INP abaixo de 200ms é obrigatório. Como medir, priorizar e corrigir na prática.",
    excerptEn:
      "Google tightened the LCP threshold from 2.5s to 2.0s in March 2026. INP below 200ms is mandatory. How to measure, prioritize, and fix in practice.",
    date: "2026-05-20",
    author: "Bernardo Gomes",
    tags: ["Performance", "Core Web Vitals", "SEO", "Frontend", "UX"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "Na atualização de março de 2026, o Google apertou o threshold do LCP (Largest Contentful Paint) de 2,5s para 2,0s. Para sites que estavam confortavelmente no verde com 2,3s, a mudança foi brutal — foram para vermelho da noite para o dia. Junto com isso, INP (Interaction to Next Paint) substituiu definitivamente o FID como métrica de responsividade.",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Thresholds atuais de 2026: LCP bom < 2,0s (era 2,5s), INP bom < 200ms, CLS bom < 0,1. Fonte: Google Search Central Documentation, atualizado em março de 2026.",
      },
      {
        type: "heading",
        level: 2,
        content: "Por que o LCP ficou mais difícil",
      },
      {
        type: "paragraph",
        content:
          "LCP mede quanto tempo leva para o maior elemento visível na viewport ser renderizado. Na maioria dos sites, esse elemento é uma imagem hero ou o H1 principal. O Google justificou o novo threshold com dados do Chrome UX Report mostrando que redes móveis melhoraram significativamente — 2,0s é realista para 75% dos usuários em 2026.",
      },
      {
        type: "heading",
        level: 2,
        content: "INP: a métrica que mais derruba sites React",
      },
      {
        type: "paragraph",
        content:
          "INP mede a latência de todas as interações do usuário — não só a primeira como o FID fazia. Para sites React, INP é traiçoeiro: um evento onClick que dispara um setState que re-renderiza 50 componentes pode facilmente passar de 500ms. O threshold de 200ms é exigente.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Medindo INP no seu app React
import { onINP } from "web-vitals";

onINP(({ value, rating, entries }) => {
  // rating: 'good' | 'needs-improvement' | 'poor'
  if (rating !== "good") {
    // entries mostra qual interação causou o problema
    const worstEntry = entries.reduce((a, b) =>
      a.duration > b.duration ? a : b
    );
    console.warn("INP ruim:", {
      duration: value,
      element: worstEntry.target,
      type: worstEntry.name, // 'click', 'keydown', etc.
    });
  }
}, { reportAllChanges: true });`,
      },
      {
        type: "heading",
        level: 2,
        content: "Padrões para corrigir INP em React",
      },
      {
        type: "list",
        items: [
          "useTransition: marque atualizações de estado não-urgentes como transição — React as adia sem bloquear a interação",
          "useDeferredValue: para buscas e filtros, defira o valor que aciona re-renders pesados",
          "Virtualization: listas longas (>100 itens) precisam de virtualização — use tanstack/virtual",
          "Evite re-renders em cascata: useCallback + useMemo onde o profiler mostrar gargalos reais, não preventivamente",
          "Quebre handlers grandes: divida onClick em microtasks com scheduler.yield() (API experimental Chrome 2026)",
        ],
      },
      {
        type: "code",
        language: "typescript",
        content: `// useTransition para manter INP bom em filtros
import { useTransition, useState } from "react";

function ProductFilter({ products }) {
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualização do input: urgente (sem transição)
    const value = e.target.value;

    // Filtragem da lista: não-urgente (pode esperar)
    startTransition(() => {
      setFilter(value);
    });
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <input onChange={handleChange} />
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Ferramentas de medição em 2026",
      },
      {
        type: "paragraph",
        content:
          "Para medir Core Web Vitals em campo (dados reais de usuários): Google Search Console (gratuito, 28 dias de histórico), biblioteca web-vitals (npm, reporta para seu analytics), e PageSpeed Insights com dados do Chrome UX Report. Para lab (dados sintéticos): Lighthouse no DevTools, WebPageTest para comparações detalhadas. O Google recomenda priorizar dados de campo sobre lab.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "O CrUX (Chrome UX Report) agora tem granularidade por segmento de dispositivo — você pode ver CWV separados por mobile, tablet e desktop. Útil para identificar se o problema é específico de um segmento.",
      },
    ],
  },
  {
    slug: "react-19-compiler-producao-2026",
    title: "React 19 Compiler em Produção: O Que Realmente Mudou no Dia a Dia",
    titleEn: "React 19 Compiler in Production: What Actually Changed Day-to-Day",
    excerpt:
      "React Compiler virou produção em 2026. Menos useMemo, menos useCallback, menos bugs de memoização. Mas tem casos onde ele falha — e você precisa saber quais são.",
    excerptEn:
      "React Compiler went production in 2026. Less useMemo, less useCallback, fewer memoization bugs. But there are cases where it fails — and you need to know which ones.",
    date: "2026-05-15",
    author: "Bernardo Gomes",
    tags: ["React", "Performance", "Frontend", "Compilador", "React 19"],
    readingTime: 11,
    content: [
      {
        type: "paragraph",
        content:
          "React 19 foi lançado estável em dezembro de 2024. Em 2026, o ecossistema absorveu a versão — e o React Compiler saiu de experimental para recomendado para produção. Depois de 6 meses com ele em projetos reais, o padrão está claro: ele resolve 80% dos problemas de memoização automaticamente, mas os 20% restantes são onde você precisa ter cuidado.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que o Compiler faz automaticamente",
      },
      {
        type: "paragraph",
        content:
          "O React Compiler analisa seu código e insere memoização automaticamente onde ela seria benéfica. Na prática, isso significa que a maioria dos useMemo e useCallback que você escrevia manualmente por precaução agora são desnecessários — o compilador faz isso melhor, porque ele tem acesso ao AST completo e entende dependências que você perderia.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Antes do Compiler — você escrevia isso
function ExpensiveList({ items, filter }) {
  const filtered = useMemo(
    () => items.filter(i => i.category === filter),
    [items, filter]
  );

  const handleClick = useCallback((id: string) => {
    onSelect(id);
  }, [onSelect]);

  return filtered.map(item => (
    <Item key={item.id} item={item} onClick={handleClick} />
  ));
}

// Com React Compiler — você escreve isso (Compiler adiciona memoização)
function ExpensiveList({ items, filter }) {
  const filtered = items.filter(i => i.category === filter);

  const handleClick = (id: string) => {
    onSelect(id);
  };

  return filtered.map(item => (
    <Item key={item.id} item={item} onClick={handleClick} />
  ));
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Onde o Compiler não consegue ajudar",
      },
      {
        type: "list",
        items: [
          "Efeitos colaterais fora do React: se seu componente lê de uma store global mutável sem usar estado React, o Compiler não enxerga as dependências",
          "Objetos com identidade instável vindos de libs externas: se uma lib retorna novo objeto a cada render, o Compiler não sabe que o conteúdo é igual",
          "Componentes que violam regras do React: mutação direta de props, leitura de refs durante render — o Compiler assume que você segue as regras",
          "Código gerado ou muito dinâmico: eval, new Function, templates string complexos que o AST não consegue analisar estaticamente",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Como ativar em 2026",
      },
      {
        type: "code",
        language: "bash",
        content: `# Instalar o compilador
pnpm add -D babel-plugin-react-compiler

# Ou com Vite (usando plugin oficial)
pnpm add -D vite-plugin-react-compiler`,
      },
      {
        type: "code",
        language: "typescript",
        content: `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactCompiler from "vite-plugin-react-compiler";

export default defineConfig({
  plugins: [
    react(),
    reactCompiler({
      // Ativa gradualmente — só nos arquivos que você especificar
      // Útil para migração de projetos grandes
      sources: (filename) => filename.includes("/components/"),
    }),
  ],
});`,
      },
      {
        type: "heading",
        level: 2,
        content: "React Actions e Server Components em 2026",
      },
      {
        type: "paragraph",
        content:
          "React 19 também estabilizou Actions — funções assíncronas que lidam com mutações de dados com estados pending/error/success automáticos — e tornou Server Components um padrão oficial com guia de migração completo. Em frameworks como Next.js 15 e Remix v3, esses padrões já são o default. Para projetos Vite puro como este, Server Components não se aplicam — mas Actions com useActionState sim.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// React 19 Actions — formulário com estado automático
import { useActionState } from "react";

async function submitContact(prevState, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    await sendEmail({ email, message: formData.get("message") as string });
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Falha ao enviar. Tente novamente." };
  }
}

function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, {
    success: false,
    error: null,
  });

  return (
    <form action={action}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && <p className="text-green-500">Mensagem enviada!</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}`,
      },
    ],
  },
  {
    slug: "drizzle-orm-producao-2026",
    title: "Drizzle ORM em Produção em 2026: Por Que Virou o Padrão para TypeScript",
    titleEn: "Drizzle ORM in Production in 2026: Why It Became the TypeScript Standard",
    excerpt:
      "Drizzle superou Prisma em adoção em projetos novos em 2026. SQL-like API, zero abstração de runtime, tipos exatos. O guia prático com padrões reais de produção.",
    excerptEn:
      "Drizzle surpassed Prisma in adoption for new projects in 2026. SQL-like API, zero runtime abstraction, exact types. The practical guide with real production patterns.",
    date: "2026-05-12",
    author: "Bernardo Gomes",
    tags: ["Backend", "TypeScript", "Banco de Dados", "Drizzle", "SQL"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "Em 2026, Drizzle ORM virou o padrão de facto para novos projetos TypeScript com banco de dados relacional. Não por marketing — por uma proposta técnica específica: você escreve SQL, o Drizzle só adiciona tipos. Sem mágica de runtime, sem geração de cliente, sem camada de abstração entre você e o banco.",
      },
      {
        type: "heading",
        level: 2,
        content: "Por que Drizzle ganhou o debate",
      },
      {
        type: "list",
        items: [
          "Bundle size zero em runtime: o Drizzle não adiciona abstração em tempo de execução — o código gerado é SQL puro",
          "Tipos exatos: o retorno de uma query é tipado exatamente com os campos que você selecionou, não o modelo inteiro",
          "Funciona em edge e serverless: sem conexão persistente obrigatória, funciona com Cloudflare Workers, Vercel Edge, Turso",
          "SQL-like API: se você sabe SQL, você sabe Drizzle — sem aprender nova DSL",
          "Migrações controladas: você gera as migrações e tem controle total sobre o que roda no banco",
        ],
      },
      {
        type: "code",
        language: "typescript",
        content: `// schema.ts — definindo tabelas
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id),
  publishedAt: timestamp("published_at"),
});`,
      },
      {
        type: "code",
        language: "typescript",
        content: `// queries.ts — API SQL-like com tipos automáticos
import { db } from "./db";
import { users, posts } from "./schema";
import { eq, and, isNotNull } from "drizzle-orm";

// Retorno tipado exatamente como os campos selecionados
const activePosts = await db
  .select({
    title: posts.title,
    authorName: users.name,
    publishedAt: posts.publishedAt,
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(
    and(
      isNotNull(posts.publishedAt),
      eq(users.active, true),
    )
  )
  .orderBy(posts.publishedAt);

// Tipo inferido: Array<{ title: string; authorName: string; publishedAt: Date }>`,
      },
      {
        type: "heading",
        level: 2,
        content: "Quando ainda usar Prisma",
      },
      {
        type: "paragraph",
        content:
          "Prisma ainda tem vantagens específicas: Prisma Studio (UI visual para explorar dados), geração automática de CRUD operations, e uma DX mais amigável para devs menos familiarizados com SQL. Se o time tem júniors que precisam de guardrails, ou se você precisa de Studio para exploração rápida, Prisma ainda faz sentido. Para times sênior com controle sobre SQL, Drizzle é a escolha em 2026.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Migrations com Drizzle — controle total
// 1. Gerar migration após mudança no schema
// pnpm drizzle-kit generate

// 2. Aplicar em desenvolvimento
// pnpm drizzle-kit migrate

// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Para projetos com SQLite/Turso (edge computing), Drizzle tem suporte nativo de primeira classe. A mesma API, o mesmo schema, apenas mudando o driver. Isso é impossível com Prisma sem reescrever queries.",
      },
    ],
  },
  {
    slug: "acessibilidade-web-real-2026",
    title: "Acessibilidade Web em 2026: O Estado Real, os Números e Como Corrigir Agora",
    titleEn: "Web Accessibility in 2026: The Real State, the Numbers, and How to Fix Now",
    excerpt:
      "WebAIM Million 2026: 95,9% dos sites têm falhas de acessibilidade. Leis mudando em todo o mundo. Guia prático para não ser um desses 95,9%.",
    excerptEn:
      "WebAIM Million 2026: 95.9% of sites have accessibility failures. Laws changing worldwide. Practical guide to not being one of those 95.9%.",
    date: "2026-05-08",
    author: "Bernardo Gomes",
    tags: ["Acessibilidade", "Frontend", "ARIA", "WCAG", "Inclusão"],
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content:
          "O WebAIM Million é o maior estudo anual de acessibilidade da web: analisa os 1 milhão de sites mais acessados. Em 2026, o resultado foi 95,9% dos sites com pelo menos uma falha de acessibilidade detectável automaticamente. O número piorou 0,3 pontos em relação a 2025. Com leis de acessibilidade sendo implementadas na UE, EUA e Brasil, isso virou risco legal além de problema ético.",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Fonte: WebAIM Million 2026 — O relatório anual mais completo sobre acessibilidade web. As 6 categorias de erro mais comuns respondem por 95% de todas as falhas detectadas.",
      },
      {
        type: "heading",
        level: 2,
        content: "As 6 falhas mais comuns em 2026",
      },
      {
        type: "list",
        items: [
          "Baixo contraste de texto: 81,4% dos sites — o mais prevalente por seis anos consecutivos",
          "Texto alternativo ausente em imagens: 54,5% — imagens decorativas sem alt=\"\" e imagens informativas sem descrição",
          "Links sem texto discernível: 48,9% — botões e links com ícone apenas, sem label acessível",
          "Campos de formulário sem label: 39,7% — placeholder não é substituto para <label>",
          "Botões sem texto acessível: 27,5% — <button> com ícone SVG sem aria-label",
          "Linguagem da página não declarada: 19,3% — ausência de lang=\"pt-BR\" no <html>",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "WCAG 2.2 e o que mudou em 2026",
      },
      {
        type: "paragraph",
        content:
          "WCAG 2.2, finalizado em outubro de 2023, foi adotado como referência legal pela UE no European Accessibility Act (junho de 2025) e pelo governo brasileiro no decreto de acessibilidade digital de 2025. Em 2026, esses marcos legais estão em vigor. Os critérios novos mais impactantes: Focus Appearance (2.4.11/2.4.12 — o foco precisa ser visivelmente grande), Target Size Minimum (2.5.8 — alvos de clique mínimo de 24x24px), e Consistent Help (3.2.6 — links de ajuda precisam estar na mesma posição em todas as páginas).",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Checklist rápido de acessibilidade em React — 2026

// 1. Imagens: sempre alt
<img src="profile.jpg" alt="Foto de perfil de Bernardo Gomes" />
<img src="decoration.svg" alt="" role="presentation" />

// 2. Botões com ícone: aria-label
<button aria-label="Fechar modal">
  <X className="h-4 w-4" aria-hidden="true" />
</button>

// 3. Links: texto descritivo
// Ruim:
<a href="/blog/slug">Clique aqui</a>
// Bom:
<a href="/blog/slug">Ler artigo: Como usar Drizzle ORM</a>

// 4. Formulários: label explícito
<label htmlFor="email">E-mail</label>
<input id="email" type="email" name="email" />
// Nunca só placeholder

// 5. Focus visible: não remova outline sem alternativa
// Em Tailwind:
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"

// 6. Contraste: use ferramentas antes de codificar
// Extensão Colour Contrast Analyser ou axe DevTools`,
      },
      {
        type: "heading",
        level: 2,
        content: "Ferramentas para testar em 2026",
      },
      {
        type: "list",
        items: [
          "axe DevTools (extensão Chrome/Firefox): testa a página atual, integra com CI via @axe-core/react",
          "Lighthouse: aba Accessibility no Chrome DevTools, score de 0-100 com lista de problemas",
          "NVDA + Chrome (Windows) ou VoiceOver + Safari (macOS): teste manual com leitor de tela real",
          "Colour Contrast Analyser: ferramenta desktop para verificar contraste de qualquer cor na tela",
          "eslint-plugin-jsx-a11y: lint estático para erros comuns de acessibilidade em JSX",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Ferramentas automáticas detectam apenas 30-40% dos problemas de acessibilidade. O restante requer teste manual com tecnologias assistivas reais. Reserve pelo menos uma hora por sprint para navegação com teclado e leitor de tela.",
      },
    ],
  },
  {
    slug: "monorepo-pnpm-workspaces-2026",
    title: "Monorepo com pnpm Workspaces em 2026: A Escolha Pragmática",
    titleEn: "Monorepo with pnpm Workspaces in 2026: The Pragmatic Choice",
    excerpt:
      "Turborepo e Nx dominam os benchmarks. Mas para a maioria dos times, pnpm Workspaces com Vite resolve tudo sem complexidade extra. Quando cada abordagem faz sentido.",
    excerptEn:
      "Turborepo and Nx dominate benchmarks. But for most teams, pnpm Workspaces with Vite solves everything without extra complexity. When each approach makes sense.",
    date: "2026-05-05",
    author: "Bernardo Gomes",
    tags: ["DevOps", "pnpm", "Monorepo", "Arquitetura", "Build"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "Em 2026, o debate monorepo evoluiu. Turborepo lançou v3 com cache remoto distribuído. Nx continua crescendo em adoção enterprise. Mas um padrão diferente está ganhando espaço entre times menores: pnpm Workspaces puro, sem orquestrador de build adicional. A razão é pragmática — para 80% dos casos de uso, é suficiente.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que pnpm Workspaces resolve nativamente",
      },
      {
        type: "list",
        items: [
          "Hoisting de dependências: uma node_modules/ compartilhada na raiz, sem duplicatas",
          "Links simbólicos automáticos: pacotes locais linkados automaticamente — importe @meu-app/utils sem publicar no npm",
          "Filtros de comando: pnpm --filter @meu-app/web build — roda só no pacote que mudou",
          "Protocolo workspace: version: 'workspace:*' no package.json resolve para a versão local",
        ],
      },
      {
        type: "code",
        language: "yaml",
        content: `# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"`,
      },
      {
        type: "code",
        language: "json",
        content: `// packages/ui/package.json
{
  "name": "@meu-app/ui",
  "version": "0.1.0",
  "exports": {
    ".": "./src/index.ts"
  }
}

// apps/web/package.json
{
  "name": "@meu-app/web",
  "dependencies": {
    "@meu-app/ui": "workspace:*"
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Quando adicionar Turborepo",
      },
      {
        type: "paragraph",
        content:
          "Turborepo resolve um problema específico: paralelismo de tasks com cache de output baseado em hash de inputs. Se você tem 10+ pacotes e o CI demora mais de 10 minutos, Turborepo vai cortar esse tempo pela metade ou mais. A versão 3 (2026) adicionou cache remoto distribuído nativo — sem precisar de configuração extra de S3/Vercel.",
      },
      {
        type: "code",
        language: "json",
        content: `// turbo.json — Turborepo v3
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "package.json", "tsconfig.json"],
      "outputs": ["dist/**"]
    },
    "test": {
      "inputs": ["src/**", "**/*.test.ts"],
      "outputs": []
    },
    "lint": {
      "inputs": ["src/**", ".eslintrc*"],
      "outputs": []
    }
  }
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Quando usar Nx",
      },
      {
        type: "paragraph",
        content:
          "Nx faz sentido para projetos enterprise com 20+ times, múltiplas linguagens (JavaScript + Java + Python no mesmo repo), ou quando você precisa de geração de código scaffolding padronizado para todos os times. O overhead de configuração é real — não é para projetos de 5 pessoas. A Spotify Engineering documentou em 2024 redução de 60% no lead time após migrar para monorepo com Nx — mas são 2.000+ engenheiros.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Regra prática de 2026: 1-5 pacotes — pnpm Workspaces puro. 5-20 pacotes com CI lento — adicione Turborepo. 20+ pacotes com múltiplos times — considere Nx. Não sobre-engenheirar.",
      },
    ],
  },
  {
    slug: "seguranca-frontend-2026",
    title: "Segurança Frontend em 2026: CSP, Trusted Types e os Ataques que Cresceram",
    titleEn: "Frontend Security in 2026: CSP, Trusted Types and the Attacks That Grew",
    excerpt:
      "XSS continua no topo do OWASP 2026. Supply chain attacks cresceram 300% desde 2022. Content Security Policy e Trusted Types são suas melhores defesas — como configurar de verdade.",
    excerptEn:
      "XSS remains at the top of OWASP 2026. Supply chain attacks grew 300% since 2022. Content Security Policy and Trusted Types are your best defenses — how to configure them for real.",
    date: "2026-05-01",
    author: "Bernardo Gomes",
    tags: ["Segurança", "Frontend", "CSP", "XSS", "Supply Chain"],
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content:
          "XSS (Cross-Site Scripting) voltou ao topo da lista OWASP em 2026 após anos sendo eclipsado por outras categorias. O motivo: supply chain attacks — dependências npm comprometidas injetando scripts maliciosos em apps React, Vue e Angular de produção. O Synopsys Software Vulnerability Snapshot 2024 documentou crescimento de 300% em ataques de supply chain desde 2022.",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Em março de 2026, o pacote @xz/utils (850.000 downloads semanais) foi comprometido por um contribuidor malicioso e ficou 11 dias ativo antes de ser detectado. Qualquer app que instalou versões 2.1.3 a 2.2.1 estava em risco.",
      },
      {
        type: "heading",
        level: 2,
        content: "Content Security Policy: sua primeira linha de defesa",
      },
      {
        type: "paragraph",
        content:
          "CSP define quais recursos o browser pode carregar e de onde. Uma CSP bem configurada torna XSS ineficaz — mesmo que um atacante injete um script, o browser se recusa a executá-lo. Em 2026, CSP com nonce é o padrão recomendado para SPAs.",
      },
      {
        type: "code",
        language: "apache",
        content: `# .htaccess — CSP para SPA React em 2026
Header set Content-Security-Policy "\
  default-src 'self'; \
  script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com; \
  style-src 'self' 'unsafe-inline'; \
  img-src 'self' data: https:; \
  connect-src 'self' https://api.github.com https://www.google-analytics.com; \
  font-src 'self'; \
  object-src 'none'; \
  base-uri 'self'; \
  form-action 'self'; \
  frame-ancestors 'none'; \
  upgrade-insecure-requests"`,
      },
      {
        type: "heading",
        level: 2,
        content: "Trusted Types: XSS impossível para DOM manipulation",
      },
      {
        type: "paragraph",
        content:
          "Trusted Types é uma API do browser (Chrome, Edge — Firefox em progresso) que impede atribuição direta de strings para innerHTML, outerHTML, e outros sinks perigosos. Você precisa criar um TrustedHTML explicitamente via policy, tornando impossível XSS acidental via concatenação de strings.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Trusted Types — proteção contra DOM XSS
// Ativa no CSP:
// require-trusted-types-for 'script'; trusted-types default dompurify

// No código TypeScript:
const policy = window.trustedTypes?.createPolicy("default", {
  createHTML: (input: string) => {
    // DOMPurify sanitiza antes de criar TrustedHTML
    return DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: true });
  },
});

// Agora innerHTML aceita apenas TrustedHTML
element.innerHTML = policy?.createHTML(userContent) ?? "";
// Se tentar: element.innerHTML = userContent; — o browser bloqueia`,
      },
      {
        type: "heading",
        level: 2,
        content: "Supply Chain: como se proteger em 2026",
      },
      {
        type: "list",
        items: [
          "pnpm audit: rode em todo PR — integre no GitHub Actions com pnpm audit --audit-level high",
          "Lockfile committed: pnpm-lock.yaml no git é obrigatório — sem lockfile, versões flutuam",
          "pnpm-workspace.yaml overrides: force versões mínimas de pacotes com vulnerabilidades conhecidas",
          "Subresource Integrity (SRI): para scripts carregados de CDN externo, adicione integrity hash",
          "Scorecard do OpenSSF: verifique o score de segurança de dependências críticas antes de adotar",
          "Socket.dev: ferramenta de 2026 que analisa comportamento de pacotes npm em tempo de instalação",
        ],
      },
      {
        type: "code",
        language: "yaml",
        content: `# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Security audit
        run: pnpm audit --audit-level high
      - name: Check for known malware
        run: npx socket-security@latest scan . --strict`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Dependabot no GitHub detecta vulnerabilidades em dependências — mas leva horas ou dias após uma CVE ser publicada. Para reação imediata, configure pnpm audit no CI. Os dois são complementares, não substitutos.",
      },
    ],
  },
  {
    slug: "bun-1-2-node-deno-2026",
    title: "Bun 1.2 vs Node 24 vs Deno 2: Qual Runtime Escolher em 2026",
    titleEn: "Bun 1.2 vs Node 24 vs Deno 2: Which Runtime to Choose in 2026",
    excerpt:
      "Bun 1.2 chegou com SQLite nativo, compatibilidade npm quase total e instalação 25x mais rápida. Node 24 trouxe o test runner estável e ESM sem flags. Deno 2 abraçou o npm. Comparação honesta com benchmarks reais.",
    excerptEn:
      "Bun 1.2 arrived with native SQLite, near-total npm compatibility and 25x faster installs. Node 24 brought a stable test runner and flagless ESM. Deno 2 embraced npm. An honest comparison with real benchmarks.",
    date: "2026-06-02",
    author: "Bernardo Gomes",
    tags: ["Bun", "Node.js", "Deno", "Runtime", "Performance"],
    readingTime: 11,
    content: [
      {
        type: "paragraph",
        content:
          "Em 2024 a escolha era simples: Node para tudo. Em 2026 não é mais. Bun 1.2 amadureceu o suficiente para produção, Deno 2 resolveu sua maior fraqueza (compatibilidade npm) e o Node 24 LTS incorporou recursos que antes exigiam ferramentas externas. Testei os três no mesmo projeto React + API para decidir qual usar.",
      },
      {
        type: "heading",
        level: 2,
        content: "Instalação de dependências: onde Bun domina",
      },
      {
        type: "paragraph",
        content:
          "O instalador do Bun continua sendo seu argumento mais forte. Em um projeto com 850 dependências (este portfólio incluso), medi tempos de cold install (cache limpo) em uma máquina Linux com SSD NVMe:",
      },
      {
        type: "list",
        items: [
          "Bun 1.2: ~3,2s (cache limpo), ~0,4s (cache quente)",
          "pnpm 10: ~12s (cache limpo), ~1,1s (cache quente)",
          "npm 11: ~38s (cache limpo), ~6s (cache quente)",
          "Deno 2: ~9s — usa cache global por URL, modelo diferente",
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Bun é 25-30x mais rápido que npm em cold install graças ao instalador escrito em Zig e ao uso de hardlinks. Para CI, isso corta minutos de cada pipeline. Mas pnpm com store cacheado fica competitivo em runs subsequentes.",
      },
      {
        type: "heading",
        level: 2,
        content: "Compatibilidade npm: a virada do Deno 2",
      },
      {
        type: "paragraph",
        content:
          "A maior mudança de 2025-2026 foi o Deno 2 abandonando o dogma anti-npm. Agora você usa imports npm: diretamente e o package.json funciona. Bun sempre teve compatibilidade alta — em 2026 roda Next.js, Vite e a maioria dos frameworks sem patches. Node continua sendo a referência: se algo não roda no Node, é bug do pacote.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Mesmo código, três runtimes — SQLite nativo

// Bun 1.2 (built-in, zero deps)
import { Database } from "bun:sqlite";
const db = new Database("app.db");
db.query("SELECT * FROM posts WHERE published = ?").all(1);

// Node 24 (built-in desde 22.5, estável em 24)
import { DatabaseSync } from "node:sqlite";
const ndb = new DatabaseSync("app.db");
ndb.prepare("SELECT * FROM posts WHERE published = ?").all(1);

// Deno 2 (via npm: ou jsr:)
import { Database as DenoDB } from "jsr:@db/sqlite";
const ddb = new DenoDB("app.db");
ddb.prepare("SELECT * FROM posts WHERE published = ?").all(1);`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "SQLite nativo nos três runtimes mata o better-sqlite3 (que exige compilação nativa e quebra em cada upgrade de Node). Para apps pequenos e ferramentas CLI, isso simplifica muito o deploy.",
      },
      {
        type: "heading",
        level: 2,
        content: "Test runner: Node alcançou os outros",
      },
      {
        type: "paragraph",
        content:
          "Bun sempre teve test runner embutido rápido. Em 2026 o Node 24 estabilizou node:test com cobertura via --experimental-test-coverage virando flag estável. Na prática: para projetos novos sem Vitest/Jest, o runner nativo do Node já basta. Mas para apps React com JSDOM e mocks complexos, Vitest continua imbatível.",
      },
      {
        type: "heading",
        level: 2,
        content: "Veredito prático",
      },
      {
        type: "list",
        items: [
          "Bun 1.2: melhor para CLIs, scripts, ferramentas internas e CI onde velocidade de install importa. Cuidado em apps com dependências nativas exóticas.",
          "Node 24 LTS: a escolha segura para produção. Ecossistema maduro, suporte de hospedagem universal, zero surpresas. É o que rodo neste portfólio.",
          "Deno 2: excelente para edge, scripts seguros por padrão (permissões explícitas) e quando você quer TypeScript sem build step.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Não migre produção estável para Bun só por velocidade de benchmark. O ganho real está no CI e em ferramentas de dev. Para o servidor que atende usuários, estabilidade do Node 24 LTS vale mais que 200ms de cold start.",
      },
    ],
  },
  {
    slug: "ai-code-review-pratica-2026",
    title: "AI Code Review na Prática: Como Uso CodeRabbit e Claude Code em 2026",
    titleEn: "AI Code Review in Practice: How I Use CodeRabbit and Claude Code in 2026",
    excerpt:
      "Code review com IA deixou de ser hype. CodeRabbit comenta PRs automaticamente, Claude Code resolve issues inteiras e o Copilot revisa antes do humano. Meu fluxo real, o que funciona e onde a IA ainda erra.",
    excerptEn:
      "AI code review is no longer hype. CodeRabbit comments on PRs automatically, Claude Code resolves entire issues and Copilot reviews before the human. My real workflow, what works and where AI still fails.",
    date: "2026-06-04",
    author: "Bernardo Gomes",
    tags: ["IA", "Code Review", "CodeRabbit", "DevOps", "Produtividade"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "Em 2024 'AI code review' significava colar diff no ChatGPT e torcer. Em 2026 é um pipeline integrado: a IA revisa cada PR antes de qualquer humano olhar, sugere correções inline e até abre PRs resolvendo issues. Uso isso diariamente neste portfólio. Aqui está o fluxo honesto — incluindo onde a IA me atrapalhou.",
      },
      {
        type: "heading",
        level: 2,
        content: "A camada 1: revisão automática no PR",
      },
      {
        type: "paragraph",
        content:
          "Todo PR aberto recebe um review do CodeRabbit em ~60 segundos. Ele comenta inline sobre bugs prováveis, problemas de performance e inconsistências de estilo. O valor não é pegar tudo — é pegar o óbvio antes de eu gastar tempo. Configurei via .coderabbit.yaml para focar no que importa e ignorar nits de formatação (o Prettier já cuida disso).",
      },
      {
        type: "code",
        language: "yaml",
        content: `# .coderabbit.yaml
reviews:
  profile: assertive
  request_changes_workflow: false
  high_level_summary: true
  poem: false
  path_filters:
    - "!**/*.lock"
    - "!dist/**"
    - "!**/*.snap"
  path_instructions:
    - path: "src/**/*.tsx"
      instructions: >
        Foque em acessibilidade (jsx-a11y), hooks com deps corretas,
        e re-renders desnecessários. Ignore preferências de estilo.
chat:
  auto_reply: true`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "O segredo do AI review útil é path_instructions específicas. Sem elas, a IA reclama de tudo igualmente. Com contexto do que importa em cada tipo de arquivo, os comentários ficam acionáveis.",
      },
      {
        type: "heading",
        level: 2,
        content: "A camada 2: resolução de issues com agentes",
      },
      {
        type: "paragraph",
        content:
          "Para tarefas bem definidas — atualizar dependências, corrigir um bug isolado, refatorar um componente — delego a um agente. O GitHub Copilot coding agent e o Claude Code abrem PRs completos a partir de uma descrição. A regra que aprendi: quanto mais específica a issue, melhor o resultado. 'Melhore a performance' falha; 'memoize o ProjectCard, ele re-renderiza a cada scroll' funciona.",
      },
      {
        type: "list",
        items: [
          "Tarefas mecânicas (bumps, renomeações, typos): agente resolve em minutos, quase sempre correto",
          "Bugs com repro claro: agente acerta ~70% das vezes, sempre reviso o diff",
          "Features novas com decisões de arquitetura: agente como rascunho, eu finalizo",
          "Lógica de negócio crítica: ainda escrevo eu mesmo, IA só revisa",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Onde a IA ainda erra (e como me protejo)",
      },
      {
        type: "paragraph",
        content:
          "AI review tem dois modos de falha perigosos: falsos positivos confiantes (aponta um 'bug' que não existe, com explicação plausível) e omissão silenciosa (não menciona um problema real porque está fora do diff). Por isso a IA nunca tem a palavra final. O fluxo é: IA revisa → eu reviso o review → CI valida → merge.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Meu gate antes de qualquer merge — IA não substitui isto
pnpm lint && pnpm test:run && pnpm build

# CI replica o mesmo no GitHub Actions:
# lint -> test:run -> build (matriz Node 20 + 22)
# Nenhum PR mergeia sem os 4 checks verdes,
# nem os que a IA "aprovou".`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Nunca mergeie um PR só porque a IA aprovou. Ela otimiza para parecer útil, não para estar certa. Trate o review da IA como o de um júnior esperto e apressado: pega coisas boas, mas confia demais em si mesmo. CI verde e revisão humana continuam obrigatórios.",
      },
      {
        type: "heading",
        level: 2,
        content: "O ganho real",
      },
      {
        type: "paragraph",
        content:
          "Não é 'a IA escreve meu código'. É que o ciclo de feedback ficou mais curto. Bugs óbvios morrem no PR antes de eu olhar. Tarefas chatas viram delegação. Eu gasto meu tempo nas decisões que importam — arquitetura, UX, trade-offs — em vez de caçar um ponto e vírgula. Isso é o que a IA realmente entrega em 2026.",
      },
    ],
  },
  {
    slug: "css-moderno-2026-container-has-layers",
    title: "CSS Moderno em 2026: Container Queries, :has() e Cascade Layers que Já Dá pra Usar",
    titleEn: "Modern CSS in 2026: Container Queries, :has() and Cascade Layers You Can Already Use",
    excerpt:
      "Container queries, :has(), cascade layers e subgrid têm suporte total em todos os browsers desde 2024. Em 2026 não há mais desculpa para não usar. Exemplos práticos que substituem JavaScript por CSS puro.",
    excerptEn:
      "Container queries, :has(), cascade layers and subgrid have full support across all browsers since 2024. In 2026 there's no excuse not to use them. Practical examples that replace JavaScript with pure CSS.",
    date: "2026-06-06",
    author: "Bernardo Gomes",
    tags: ["CSS", "Frontend", "Container Queries", "Web Platform"],
    readingTime: 9,
    content: [
      {
        type: "paragraph",
        content:
          "Por anos, recursos de CSS que pareciam mágicos ficavam atrás de 'mas ainda não tem suporte'. Esse argumento morreu. Container queries, :has(), cascade layers e subgrid têm suporte em Chrome, Firefox, Safari e Edge desde 2023-2024. Em 2026, usá-los é o padrão — não uma aposta. Veja o que eu uso de verdade.",
      },
      {
        type: "heading",
        level: 2,
        content: "Container Queries: responsividade baseada no componente",
      },
      {
        type: "paragraph",
        content:
          "Media queries respondem ao tamanho da viewport. Mas um card de projeto deve se adaptar ao espaço que ele ocupa, não à tela inteira. Container queries resolvem isso: o componente se ajusta ao container pai. O mesmo card fica em coluna na sidebar e em linha no grid principal — sem JavaScript, sem props de breakpoint.",
      },
      {
        type: "code",
        language: "css",
        content: `/* O container declara que pode ser consultado */
.project-grid {
  container-type: inline-size;
  container-name: projects;
}

/* O card responde ao tamanho do CONTAINER, não da tela */
.project-card {
  display: flex;
  flex-direction: column;
}

@container projects (min-width: 400px) {
  .project-card {
    flex-direction: row;
    align-items: center;
  }
}

/* Unidades de container: 50cqi = 50% da largura do container */
.project-card h3 {
  font-size: clamp(1rem, 5cqi, 1.5rem);
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Use cqi (container query inline) em vez de vw para tipografia fluida dentro de componentes. O texto escala com o componente, não com a janela — muito mais previsível em layouts complexos.",
      },
      {
        type: "heading",
        level: 2,
        content: ":has() — o seletor de pai que esperamos 20 anos",
      },
      {
        type: "paragraph",
        content:
          ":has() permite estilizar um elemento baseado no que ele contém. Antes isso exigia JavaScript: adicionar uma classe ao pai quando um filho tinha certo estado. Agora é CSS puro. Estilizo formulários com erro, cards com imagem, e navegação ativa sem tocar em JS.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Form group que tem input inválido fica vermelho */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  border-color: var(--destructive);
}

/* Card que NÃO tem imagem ganha padding extra */
.card:not(:has(img)) {
  padding-block: 2rem;
}

/* Label de checkbox marcado fica em negrito — sem JS */
label:has(input:checked) {
  font-weight: 600;
  color: var(--primary);
}

/* Dark mode condicional: body com tema escuro */
body:has(.theme-toggle[data-state="dark"]) {
  --bg: oklch(0.15 0 0);
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Cascade Layers: fim das guerras de especificidade",
      },
      {
        type: "paragraph",
        content:
          "Quem usa Tailwind + shadcn/ui + estilos próprios conhece a dor: !important para sobrescrever, ordem de import frágil, especificidade imprevisível. Cascade layers (@layer) definem uma ordem explícita de prioridade que independe de especificidade. Você declara qual camada vence, ponto.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Ordem definida UMA vez — a última vence sempre */
@layer reset, framework, components, utilities;

@layer framework {
  /* Tailwind base entra aqui */
  .btn { padding: 0.5rem 1rem; }
}

@layer components {
  /* Seus componentes sobrescrevem o framework
     SEM precisar de especificidade maior */
  .btn { padding: 0.75rem 1.5rem; }
}

/* utilities sempre vence components,
   mesmo com seletor menos específico */
@layer utilities {
  .p-0 { padding: 0; }
}`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "O Tailwind 4 já usa cascade layers internamente. Entender @layer ajuda a debugar por que uma utility não está aplicando — geralmente é ordem de camada, não especificidade. Isso elimina 90% dos !important do seu CSS.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que isso muda na prática",
      },
      {
        type: "paragraph",
        content:
          "Menos JavaScript. Cada um desses recursos substitui código que antes vivia em hooks, event listeners ou bibliotecas. Menos JS = menos bundle, menos re-renders, menos bugs. Em 2026, antes de instalar um pacote para resolver um problema de layout ou estado visual, pergunte: o CSS já faz isso? Cada vez mais, a resposta é sim.",
      },
    ],
  },
  {
    slug: "edge-functions-serverless-2026",
    title: "Edge Functions em 2026: Quando Vale a Pena Sair do Servidor Tradicional",
    titleEn: "Edge Functions in 2026: When It's Worth Leaving the Traditional Server",
    excerpt:
      "Edge functions rodam seu código a milissegundos do usuário em data centers globais. Netlify, Cloudflare e Vercel competem por latência. Mas edge não é bala de prata — veja onde brilha, onde falha e quando o servidor tradicional ainda ganha.",
    excerptEn:
      "Edge functions run your code milliseconds from the user across global data centers. Netlify, Cloudflare and Vercel compete on latency. But edge isn't a silver bullet — see where it shines, where it fails and when the traditional server still wins.",
    date: "2026-06-08",
    author: "Bernardo Gomes",
    tags: ["Edge", "Serverless", "Cloudflare", "Netlify", "Performance"],
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        content:
          "Um servidor tradicional fica em um lugar — digamos, Virginia. Um usuário em São Paulo paga ~120ms de latência só na ida e volta da rede. Edge functions resolvem isso rodando seu código no data center mais próximo do usuário: ~10ms em vez de 120ms. Em 2026 isso virou commodity. Mas migrar tudo para edge é um erro. Aqui está a decisão honesta.",
      },
      {
        type: "heading",
        level: 2,
        content: "O que edge faz bem",
      },
      {
        type: "list",
        items: [
          "Redirects e rewrites geográficos: roteie usuários por país/idioma sem round-trip ao servidor central",
          "Autenticação de borda: valide JWT e bloqueie requests não autorizados antes de chegar à origem",
          "Personalização leve: A/B testing, feature flags, geolocalização — decisões rápidas sem dados pesados",
          "Cache inteligente: sirva HTML pré-renderado por região, revalidando sob demanda",
          "Headers de segurança: injete CSP, HSTS e outros em todas as respostas, centralizado",
        ],
      },
      {
        type: "code",
        language: "typescript",
        content: `// Netlify Edge Function — geolocalização + headers de segurança
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const country = context.geo?.country?.code ?? "BR";
  const response = await context.next();

  // Redireciona PT para versão localizada na borda
  if (country === "PT" && !request.url.includes("/pt-pt")) {
    return Response.redirect(new URL("/pt-pt", request.url), 302);
  }

  // Injeta headers de segurança em toda resposta
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
};

export const config = { path: "/*" };`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Para este portfólio (SPA estática), edge functions servem para headers de segurança e redirects de SEO. O conteúdo já é estático e cacheado globalmente via CDN — então o ganho de edge é em controle, não em latência de dados.",
      },
      {
        type: "heading",
        level: 2,
        content: "As limitações reais do edge",
      },
      {
        type: "paragraph",
        content:
          "Edge runtimes não são Node completo. Eles rodam em V8 isolates (Cloudflare Workers, Vercel Edge) ou Deno (Netlify) com APIs limitadas: sem filesystem, sem muitos módulos nativos, limites de CPU por request (geralmente 50ms de CPU time). Bibliotecas que assumem Node quebram. E conexões a banco de dados são o calcanhar de Aquiles.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// PROBLEMA: conexão TCP a Postgres não funciona bem no edge
// V8 isolates não mantêm pools de conexão persistentes

// ERRADO no edge — pool TCP tradicional:
// import { Pool } from "pg";
// const pool = new Pool(); // falha ou vaza conexões

// CERTO no edge — driver HTTP/serverless:
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

// Driver via HTTP fetch — funciona em qualquer edge runtime
const posts = await sql\`SELECT * FROM posts WHERE published = true\`;`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Se sua função edge precisa de banco relacional, você PRECISA de um driver serverless (Neon, PlanetScale, Turso). Drivers TCP tradicionais (pg, mysql2) não funcionam de forma confiável em V8 isolates. Ignorar isso causa esgotamento de conexões em produção.",
      },
      {
        type: "heading",
        level: 2,
        content: "Quando o servidor tradicional ainda ganha",
      },
      {
        type: "list",
        items: [
          "Processamento pesado: jobs longos, geração de PDF, encoding de vídeo — edge tem limite de CPU por request",
          "Conexões persistentes: WebSockets de longa duração, streaming complexo",
          "Lógica que precisa de Node completo: bibliotecas com dependências nativas",
          "Latência de dados domina: se cada request faz 5 queries pesadas, edge perto do usuário não ajuda se o banco está longe",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "A arquitetura que uso em 2026",
      },
      {
        type: "paragraph",
        content:
          "Híbrida. Edge para o que é leve e geográfico: roteamento, auth, headers, cache. Origem (servidor ou serverless function regional) para o que é pesado: lógica de negócio, transações, processamento. O frontend estático vive na CDN. Cada camada faz o que faz melhor. Edge não substitui o servidor — ele tira do servidor o que não precisava estar lá.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Comece medindo. Se seus usuários estão concentrados numa região e seu servidor está perto deles, edge pode não valer a complexidade. Edge brilha com audiência global e operações leves. Otimize o gargalo real, não o que está na moda.",
      },
    ],
  },
  {
    slug: "react-server-components-producao-2026",
    title: "React Server Components em Produção: O Que Ninguém Te Conta em 2026",
    titleEn: "React Server Components in Production: What Nobody Tells You in 2026",
    excerpt:
      "RSC saiu do hype e entrou em produção real com Next.js 15 e React Router 7. Menos JavaScript no cliente, dados direto do servidor. Mas a curva de aprendizado é brutal e o modelo mental muda tudo. Lições de quem migrou.",
    excerptEn:
      "RSC left the hype and entered real production with Next.js 15 and React Router 7. Less client JavaScript, data straight from the server. But the learning curve is brutal and the mental model changes everything. Lessons from someone who migrated.",
    date: "2026-06-09",
    author: "Bernardo Gomes",
    tags: ["React", "RSC", "Server Components", "Next.js", "Performance"],
    featured: true,
    readingTime: 12,
    content: [
      {
        type: "paragraph",
        content:
          "React Server Components (RSC) foram anunciados em 2020, ficaram experimentais por anos e finalmente, em 2026, são produção mainstream. Next.js 15 os tornou default, React Router 7 os suporta e até frameworks menores aderiram. A promessa: componentes que rodam no servidor, enviando HTML e dados sem mandar JavaScript pro cliente. A realidade: poderoso, mas exige reaprender React.",
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "RSC não é 'React mais rápido'. É um modelo mental diferente. Server Components não têm estado, não têm efeitos, não acessam o DOM. Tentar usar useState num Server Component é o erro número 1 de quem migra. Entenda a divisão antes de escrever uma linha.",
      },
      {
        type: "heading",
        level: 2,
        content: "Server vs Client: a divisão fundamental",
      },
      {
        type: "paragraph",
        content:
          "Por padrão, todo componente em um app RSC é Server Component: roda no servidor, pode buscar dados direto (async/await no componente!), e não envia JS pro cliente. Quando você precisa de interatividade — estado, eventos, hooks de browser — marca o componente com 'use client'. A arte está em manter a fronteira client o menor possível.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Server Component (padrão) — busca dados direto, zero JS no cliente
async function ProjectList() {
  // Sem useEffect, sem useState, sem loading state manual
  const res = await fetch("https://api.github.com/users/bernardopg/repos");
  const projects = await res.json();

  return (
    <ul>
      {projects.map((p) => (
        // LikeButton é a ÚNICA parte que vira JS no cliente
        <li key={p.id}>
          {p.name}
          <LikeButton projectId={p.id} />
        </li>
      ))}
    </ul>
  );
}

// Client Component — só o que precisa de interatividade
"use client";
import { useState } from "react";

function LikeButton({ projectId }: { projectId: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "★" : "☆"}
    </button>
  );
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "A regra de ouro: 'use client' marca uma FRONTEIRA, não um arquivo isolado. Tudo importado por um Client Component também vira client. Coloque o 'use client' o mais fundo possível na árvore — nas folhas interativas, não no topo.",
      },
      {
        type: "heading",
        level: 2,
        content: "O ganho real de performance",
      },
      {
        type: "paragraph",
        content:
          "O benefício concreto é o bundle de JavaScript. Um app RSC bem feito envia só o JS dos Client Components — frequentemente 30-50% menos que um SPA equivalente. Menos JS = parse mais rápido, Time to Interactive menor, melhor INP. Para conteúdo (blogs, e-commerce, dashboards), o ganho de Core Web Vitals é mensurável.",
      },
      {
        type: "list",
        items: [
          "Bundle inicial: 30-50% menor (só Client Components vão pro cliente)",
          "Data fetching: sem waterfalls de useEffect — dados resolvem no servidor em paralelo",
          "SEO: HTML completo no primeiro byte, sem hidratação para conteúdo estático",
          "Segredos seguros: API keys e queries ficam no servidor, nunca no bundle",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "As armadilhas que me pegaram",
      },
      {
        type: "code",
        language: "typescript",
        content: `// ARMADILHA 1: passar função de Server pra Client
// Server Component NÃO pode passar callbacks pra Client Component
// (funções não serializam pela fronteira)

// ERRADO:
function ServerParent() {
  const handleClick = () => console.log("oi"); // server-side
  return <ClientChild onClick={handleClick} />; // ❌ erro
}

// CERTO: passe dados serializáveis, lógica fica no client
function ServerParent() {
  return <ClientChild projectId={42} />; // ✅ número serializa
}

// ARMADILHA 2: usar API de browser em Server Component
function Bad() {
  const w = window.innerWidth; // ❌ window não existe no servidor
  return <div>{w}</div>;
}`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "A fronteira server/client só aceita dados serializáveis: strings, números, objetos planos, arrays. Funções, classes, Dates complexas e Symbols não atravessam. Esse é o erro mais comum e o compilador nem sempre avisa de forma clara.",
      },
      {
        type: "heading",
        level: 2,
        content: "Vale a pena para o seu projeto?",
      },
      {
        type: "paragraph",
        content:
          "Depende. Para apps com muito conteúdo dinâmico, fetching pesado e necessidade de SEO, RSC é transformador. Para uma SPA pequena e interativa como este portfólio, o overhead de complexidade não compensa — Vite + React Router client-side com HTML pré-gerado entrega Core Web Vitals excelentes sem o peso conceitual do RSC. Use a ferramenta certa, não a mais nova.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Se você está começando um projeto novo com Next.js em 2026, RSC já é o caminho default e vale aprender. Se tem um SPA Vite funcionando bem, não migre por FOMO. RSC resolve problemas específicos de fetching e bundle — se você não tem esses problemas, não precisa da solução.",
      },
    ],
  },
];
