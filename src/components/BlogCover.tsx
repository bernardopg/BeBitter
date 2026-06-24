import {
  Atom,
  Blocks,
  BrainCircuit,
  Code2,
  Gauge,
  Heart,
  Palette,
  Server,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";

/**
 * Cover gerado on-brand (sem assets externos): gradiente determinístico + ícone
 * mapeado pela tag principal. Estilo dev.to/Hashnode auto-cover.
 */

const GRADIENTS = [
  "from-violet-600 via-indigo-600 to-blue-600",
  "from-fuchsia-600 via-purple-600 to-indigo-600",
  "from-cyan-500 via-blue-600 to-indigo-700",
  "from-emerald-500 via-teal-600 to-cyan-700",
  "from-amber-500 via-orange-600 to-rose-600",
  "from-rose-500 via-pink-600 to-purple-700",
];

const TAG_ICON: Record<string, LucideIcon> = {
  react: Atom,
  frontend: Code2,
  javascript: Code2,
  typescript: Code2,
  "boas práticas": Wrench,
  "clean code": Wrench,
  vite: Gauge,
  performance: Gauge,
  "web vitals": Gauge,
  build: Blocks,
  tailwind: Palette,
  css: Palette,
  ui: Palette,
  "shadcn/ui": Palette,
  componentes: Blocks,
  saúde: Heart,
  backend: Server,
  python: Server,
  fastapi: Server,
  linux: Terminal,
  ferramentas: Terminal,
  produtividade: Terminal,
  devops: Terminal,
  ia: BrainCircuit,
  "claude code": BrainCircuit,
  cursor: BrainCircuit,
  automação: BrainCircuit,
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickIcon(tags: string[]): LucideIcon {
  for (const tag of tags) {
    const icon = TAG_ICON[tag.toLowerCase()];
    if (icon) return icon;
  }
  return Code2;
}

interface BlogCoverProps {
  slug: string;
  tags: string[];
  primaryTag?: string;
  className?: string;
  iconClassName?: string;
}

export function BlogCover({
  slug,
  tags,
  primaryTag,
  className = "",
  iconClassName = "",
}: BlogCoverProps) {
  const gradient = GRADIENTS[hashString(slug) % GRADIENTS.length];
  const iconElement = createElement(pickIcon(tags), {
    className: `absolute -bottom-5 -right-3 text-white/15 ${iconClassName}`,
    strokeWidth: 1.25,
  });
  const label = primaryTag ?? tags[0] ?? "Article";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
      aria-hidden="true"
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* glow blob */}
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
      {iconElement}
      <div className="relative flex h-full items-end p-4">
        <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

export default BlogCover;
