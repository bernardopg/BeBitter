# BeBitter Full Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge Dependabot PRs, atualizar pacotes, refatorar código crítico, adicionar testes e fazer deploy no Hostinger.

**Architecture:** Abordagem incremental — manutenção primeiro, melhorias de build/código depois, testes por último, deploy ao final. Cada task tem commit próprio para rollback fácil.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind 4, Vitest, pnpm, SSH/rsync para deploy

---

## File Map

| Arquivo | Ação |
|---------|------|
| `src/pages/Index.tsx.backup` | Deletar |
| `src/components/ui/calendar.tsx` | Migrar react-day-picker v9→v10 API |
| `vite.config.ts` | Expandir manualChunks |
| `src/components/SEOHead.tsx` | Refatorar: 203 linhas → ~50 linhas |
| `src/pages/Now.tsx` | Extrair sub-componentes |
| `src/pages/Now/NowHeader.tsx` | Criar |
| `src/pages/Now/NowCurrentFocus.tsx` | Criar |
| `src/pages/Now/NowAchievements.tsx` | Criar |
| `src/pages/Now/NowContact.tsx` | Criar |
| `src/pages/Services.tsx` | Extrair sub-componentes |
| `src/pages/Services/ServicesHeader.tsx` | Criar |
| `src/pages/Services/ServicesList.tsx` | Criar |
| `src/pages/Services/ServicesProcess.tsx` | Criar |
| `src/pages/Services/ServicesCTA.tsx` | Criar |
| `src/pages/Index/sections/__tests__/AboutSection.test.tsx` | Criar |
| `src/pages/Index/sections/__tests__/ContactSection.test.tsx` | Criar |
| `src/pages/Index/sections/__tests__/ProjectsSection.test.tsx` | Criar |

---

## Task 1: Merge PRs Dependabot

**Files:**
- Nenhum arquivo local alterado

- [ ] **Step 1: Merge as 4 PRs via gh CLI**

```bash
gh pr merge 57 --merge --auto
gh pr merge 58 --merge --auto
gh pr merge 59 --merge --auto
gh pr merge 60 --merge --auto
```

Expected: cada comando retorna `Merged pull request #XX`

- [ ] **Step 2: Puxar as mudanças mergidas**

```bash
git pull origin main
```

Expected: atualiza `.github/workflows/ci.yml` e `dependabot.yml`

---

## Task 2: Deletar arquivo morto

**Files:**
- Delete: `src/pages/Index.tsx.backup`

- [ ] **Step 1: Confirmar que o arquivo nunca é importado**

```bash
grep -r "Index.tsx.backup" src/ --include="*.ts" --include="*.tsx"
```

Expected: sem output (nenhuma importação)

- [ ] **Step 2: Deletar**

```bash
rm src/pages/Index.tsx.backup
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused Index.tsx.backup (53KB dead code)"
```

---

## Task 3: Atualizar pacotes patch/minor

**Files:**
- `package.json`
- `pnpm-lock.yaml`

> **Atenção:** `react-day-picker` é migrado separadamente na Task 4. Aqui excluímos ele.

- [ ] **Step 1: Baseline — testes passando antes da atualização**

```bash
pnpm test:run
```

Expected: todos os testes PASS

- [ ] **Step 2: Atualizar todos os pacotes exceto react-day-picker**

```bash
pnpm update --latest --filter '!react-day-picker'
```

- [ ] **Step 3: Verificar o que foi atualizado**

```bash
pnpm outdated
```

Expected: apenas `react-day-picker` ainda aparece como outdated

- [ ] **Step 4: Rodar testes após atualização**

```bash
pnpm test:run
```

Expected: todos os testes PASS. Se algum falhar, investigar e corrigir antes de continuar.

- [ ] **Step 5: Verificar build**

```bash
pnpm build
```

Expected: build termina sem erros

- [ ] **Step 6: Checar tailwindcss 4.3 — verificar breaking changes**

```bash
# tailwind 4.2→4.3: verificar se alguma classe foi removida
grep -r "text-opacity\|bg-opacity\|border-opacity" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Expected: sem output (essas classes foram removidas no Tailwind 4.x)

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): update 21 packages to latest patch/minor versions"
```

---

## Task 4: Migrar react-day-picker v9 → v10

**Files:**
- Modify: `src/components/ui/calendar.tsx`

> react-day-picker v10 renomeia todas as chaves de `classNames` e muda o componente `IconLeft`/`IconRight` para `Chevron`.

- [ ] **Step 1: Atualizar react-day-picker**

```bash
pnpm add react-day-picker@latest
```

- [ ] **Step 2: Reescrever calendar.tsx com a API v10**

Conteúdo completo de `src/components/ui/calendar.tsx`:

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...rest} />
          ) : (
            <ChevronRight className="h-4 w-4" {...rest} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
```

- [ ] **Step 3: Verificar build**

```bash
pnpm build
```

Expected: sem erros de TypeScript referentes a `DayPicker`

- [ ] **Step 4: Verificar que Calendar continua sendo usado em ContactSection**

```bash
grep -n "Calendar" src/pages/Index/sections/ContactSection.tsx
```

Expected: `import { Calendar }` aparece — componente consumido normalmente

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/calendar.tsx pnpm-lock.yaml package.json
git commit -m "feat(deps): migrate react-day-picker v9 → v10

Rename classNames keys to v10 API (caption→month_caption, table→month_grid,
head_row→weekdays, etc.) and replace IconLeft/IconRight with Chevron component."
```

---

## Task 5: Expandir manualChunks no Vite

**Files:**
- Modify: `vite.config.ts` (seção `rollupOptions.output.manualChunks`)

> Atualmente só 3 pacotes Radix são separados. Framer Motion (~100KB), Lucide, Recharts e todos os demais Radix vão para o chunk padrão.

- [ ] **Step 1: Checar tamanho atual dos chunks antes da mudança**

```bash
pnpm build 2>&1 | grep "kB"
```

Anotar os valores de `index-*.js` e demais chunks para comparar depois.

- [ ] **Step 2: Substituir a função `manualChunks` em `vite.config.ts`**

Localizar:
```typescript
          manualChunks: (id) => {
            if (
              id.includes("@radix-ui/react-accordion") ||
              id.includes("@radix-ui/react-dialog") ||
              id.includes("@radix-ui/react-dropdown-menu")
            ) {
              return "ui";
            }

            if (id.includes("react-router-dom")) {
              return "router";
            }

            if (id.includes("@tanstack/react-query")) {
              return "query";
            }

            return undefined;
          },
```

Substituir por:
```typescript
          manualChunks: (id) => {
            if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) {
              return "react";
            }
            if (id.includes("react-router-dom") || id.includes("@remix-run/")) {
              return "router";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query";
            }
            if (id.includes("framer-motion")) {
              return "motion";
            }
            if (id.includes("@radix-ui/")) {
              return "radix";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("recharts") || id.includes("d3-")) {
              return "charts";
            }
            if (id.includes("date-fns") || id.includes("react-day-picker")) {
              return "dates";
            }
            return undefined;
          },
```

- [ ] **Step 3: Build e comparar chunk sizes**

```bash
pnpm build 2>&1 | grep "kB"
```

Expected: `index-*.js` menor que antes; novos chunks `motion-*.js`, `radix-*.js`, `icons-*.js` aparecem

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts
git commit -m "perf: expand Vite manualChunks for better code splitting

Separate framer-motion, all @radix-ui, lucide-react, recharts, and date-fns
into dedicated chunks. Reduces main bundle size and improves cache utilization."
```

---

## Task 6: Refatorar SEOHead

**Files:**
- Modify: `src/components/SEOHead.tsx`

> Reduzir 203 linhas de `querySelector`/`setAttribute` repetitivos para ~55 linhas usando uma função helper `setMeta`.

- [ ] **Step 1: Reescrever SEOHead.tsx**

Conteúdo completo de `src/components/SEOHead.tsx`:

```tsx
import { IMAGES } from "@/constants/images";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: string;
  robots?: string;
  publisher?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

function ensureMeta(name: string, content: string, prop = false) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const SEOHead = ({
  title = "Bernardo Gomes — Frontend, automation and Linux",
  description = "Frontend engineer, automation builder, and medical student building polished products for web, Linux, and healthcare workflows.",
  keywords = ["frontend engineer", "automation", "linux", "react", "typescript", "python", "fastapi", "healthcare workflows", "portfolio"],
  ogImage = `${window.location.origin}${IMAGES.PROFILE_IMAGE}`,
  canonical,
  type = "website",
  robots = "index, follow",
  publisher = "Bernardo Gomes",
}: SEOHeadProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="keywords"]', "content", keywords.join(", "));

    ensureMeta("robots", robots);
    ensureMeta("publisher", publisher);
    ensureMeta("author", "Bernardo Gomes");
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("article:author", "Bernardo Gomes", true);

    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:url"]', "content", canonical ?? window.location.href.split("?")[0].split("#")[0]);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, keywords, ogImage, canonical, type, language, robots, publisher]);

  return null;
};

export default SEOHead;
```

- [ ] **Step 2: Verificar TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: zero erros

- [ ] **Step 3: Verificar build**

```bash
pnpm build
```

Expected: build OK

- [ ] **Step 4: Commit**

```bash
git add src/components/SEOHead.tsx
git commit -m "refactor: simplify SEOHead from 203 to ~55 lines

Extract setMeta/ensureMeta helpers to eliminate 150 lines of repetitive
querySelector/setAttribute calls. Behavior identical."
```

---

## Task 7: Quebrar Now.tsx em sub-componentes

**Files:**
- Modify: `src/pages/Now.tsx` (orquestrador)
- Create: `src/pages/Now/NowHeader.tsx`
- Create: `src/pages/Now/NowCurrentFocus.tsx`
- Create: `src/pages/Now/NowAchievements.tsx`
- Create: `src/pages/Now/NowContact.tsx`

- [ ] **Step 1: Verificar build atual como baseline**

```bash
pnpm build
```

Expected: PASS

- [ ] **Step 2: Criar NowHeader.tsx**

Criar `src/pages/Now/NowHeader.tsx` extraindo a `motion.section` do cabeçalho de Now.tsx (a primeira section com título, descrição, relógio e badge). Copiar as importações necessárias.

```tsx
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface NowHeaderProps {
  isInteractive: boolean;
  currentTime: Date;
  headerRef: (node?: Element | null) => void;
  headerInView: boolean;
  prefersReducedMotion: boolean | null;
}

export function NowHeader({ isInteractive, currentTime, headerRef, headerInView, prefersReducedMotion }: NowHeaderProps) {
  const { t, language } = useLanguage();
  const MotionSection = isInteractive ? motion.section : "section";

  return (
    <MotionSection
      ref={headerRef}
      className="text-center mb-16"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          {currentTime.toLocaleDateString(language === "en" ? "en-US" : "pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
        {t("now.title")}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {t("now.description")}
      </p>
    </MotionSection>
  );
}
```

> **Nota:** O conteúdo exato do JSX deve ser extraído do `src/pages/Now.tsx` existente, preservando cada elemento sem alteração de comportamento.

- [ ] **Step 3: Criar NowCurrentFocus.tsx**

Criar `src/pages/Now/NowCurrentFocus.tsx` extraindo a section de `currentFocus` de Now.tsx (seção com os cards de foco atual).

```tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface FocusItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "outline";
}

interface NowCurrentFocusProps {
  isInteractive: boolean;
  focusRef: (node?: Element | null) => void;
  focusInView: boolean;
  prefersReducedMotion: boolean | null;
  currentFocus: FocusItem[];
}

export function NowCurrentFocus({ isInteractive, focusRef, focusInView, prefersReducedMotion, currentFocus }: NowCurrentFocusProps) {
  const { t } = useLanguage();
  const MotionSection = isInteractive ? motion.section : "section";
  const MotionDiv = isInteractive ? motion.div : "div";

  return (
    <MotionSection
      ref={focusRef}
      className="mb-16"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      animate={focusInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{t("now.currentFocus.title")}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {currentFocus.map((item, index) => (
          <MotionDiv
            key={index}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={focusInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full card-enhanced group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <Badge variant={item.badgeVariant} className="mb-2 mx-auto w-fit">{item.badge}</Badge>
                <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed text-center">{item.description}</CardDescription>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 4: Criar NowAchievements.tsx**

Criar `src/pages/Now/NowAchievements.tsx` extraindo a section de `recentAchievements` de Now.tsx.

```tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
}

interface NowAchievementsProps {
  isInteractive: boolean;
  achievementsRef: (node?: Element | null) => void;
  achievementsInView: boolean;
  prefersReducedMotion: boolean | null;
  recentAchievements: Achievement[];
}

export function NowAchievements({ isInteractive, achievementsRef, achievementsInView, prefersReducedMotion, recentAchievements }: NowAchievementsProps) {
  const { t } = useLanguage();
  const MotionSection = isInteractive ? motion.section : "section";
  const MotionDiv = isInteractive ? motion.div : "div";

  return (
    <MotionSection
      ref={achievementsRef}
      className="mb-16"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      animate={achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{t("now.achievements.title")}</h2>
      <div className="space-y-4">
        {recentAchievements.map((achievement, index) => (
          <MotionDiv
            key={index}
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
            animate={achievementsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-enhanced group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <Badge variant="outline" className="text-xs">{achievement.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 5: Criar NowContact.tsx**

Criar `src/pages/Now/NowContact.tsx` extraindo as sections de nota e contato do final de Now.tsx.

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

interface NowContactProps {
  isInteractive: boolean;
  noteRef: (node?: Element | null) => void;
  noteInView: boolean;
  contactRef: (node?: Element | null) => void;
  contactInView: boolean;
  prefersReducedMotion: boolean | null;
}

export function NowContact({ isInteractive, noteRef, noteInView, contactRef, contactInView, prefersReducedMotion }: NowContactProps) {
  const { t } = useLanguage();
  const MotionSection = isInteractive ? motion.section : "section";
  const MotionDiv = isInteractive ? motion.div : "div";

  return (
    <>
      <MotionSection
        ref={noteRef}
        className="mb-12"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={noteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="card-enhanced border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground italic">{t("now.note")}</p>
          </CardContent>
        </Card>
      </MotionSection>

      <MotionSection
        ref={contactRef}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="card-enhanced text-center">
          <CardHeader>
            <CardTitle>{t("now.contact.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{t("now.contact.description")}</p>
            <MotionDiv
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="group btn-enhanced gradient-primary text-white border-0">
                <a href="mailto:bernardo.gomes@bebitterbebetter.com.br" className="flex items-center gap-2" aria-label="Enviar e-mail para Bernardo Gomes">
                  <Mail className="h-5 w-5" />
                  {t("now.contact.email")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group btn-enhanced border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                <a href="https://wa.me/5531984916431" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" aria-label="Conversar no WhatsApp com Bernardo Gomes">
                  <MessageCircle className="h-5 w-5" />
                  {t("now.contact.whatsapp")}
                </a>
              </Button>
            </MotionDiv>
          </CardContent>
        </Card>
      </MotionSection>
    </>
  );
}
```

- [ ] **Step 6: Atualizar Now.tsx para usar os sub-componentes**

O novo `src/pages/Now.tsx` mantém estado e dados, delega JSX para os sub-componentes:

```tsx
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { Award, Code, Coffee, Heart, Lightbulb, Target, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { NowAchievements } from "./Now/NowAchievements";
import { NowContact } from "./Now/NowContact";
import { NowCurrentFocus } from "./Now/NowCurrentFocus";
import { NowHeader } from "./Now/NowHeader";

const Now = () => {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const title = language === "en" ? "Now | Bernardo Gomes" : "Now | Bernardo Gomes";
  const description =
    language === "en"
      ? "A living snapshot of what I am building, studying, and refining across frontend, automation, Linux, and healthcare-adjacent workflows."
      : "Um recorte vivo do que estou construindo, estudando e refinando entre frontend, automação, Linux e fluxos de trabalho em saúde.";

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isInteractive, setIsInteractive] = useState(false);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [focusRef, focusInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [achievementsRef, achievementsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [noteRef, noteInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    setIsInteractive(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const currentFocus = useMemo(() => [
    { icon: <Code className="h-8 w-8 text-primary" />, title: t("now.focus.frontend.title"), description: t("now.focus.frontend.description"), badge: t("now.focus.frontend.badge"), badgeVariant: "default" as const },
    { icon: <Zap className="h-8 w-8 text-yellow-500" />, title: t("now.focus.automation.title"), description: t("now.focus.automation.description"), badge: t("now.focus.automation.badge"), badgeVariant: "secondary" as const },
    { icon: <Heart className="h-8 w-8 text-red-500" />, title: t("now.focus.medicine.title"), description: t("now.focus.medicine.description"), badge: t("now.focus.medicine.badge"), badgeVariant: "outline" as const },
  ], [t]);

  const recentAchievements = useMemo(() => [
    { icon: <Award className="h-5 w-5 text-primary" />, title: t("now.achievement.1.title"), description: t("now.achievement.1.description"), date: t("now.achievement.1.date") },
    { icon: <Target className="h-5 w-5 text-green-500" />, title: t("now.achievement.2.title"), description: t("now.achievement.2.description"), date: t("now.achievement.2.date") },
    { icon: <Lightbulb className="h-5 w-5 text-yellow-500" />, title: t("now.achievement.3.title"), description: t("now.achievement.3.description"), date: t("now.achievement.3.date") },
    { icon: <Coffee className="h-5 w-5 text-orange-500" />, title: t("now.achievement.4.title"), description: t("now.achievement.4.description"), date: t("now.achievement.4.date") },
  ], [t]);

  return (
    <>
      <SEOHead title={title} description={description} canonical="https://bebitterbebetter.com.br/now" />
      <div className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <NowHeader
            isInteractive={isInteractive}
            currentTime={currentTime}
            headerRef={headerRef}
            headerInView={headerInView}
            prefersReducedMotion={prefersReducedMotion}
          />
          <NowCurrentFocus
            isInteractive={isInteractive}
            focusRef={focusRef}
            focusInView={focusInView}
            prefersReducedMotion={prefersReducedMotion}
            currentFocus={currentFocus}
          />
          <NowAchievements
            isInteractive={isInteractive}
            achievementsRef={achievementsRef}
            achievementsInView={achievementsInView}
            prefersReducedMotion={prefersReducedMotion}
            recentAchievements={recentAchievements}
          />
          <NowContact
            isInteractive={isInteractive}
            noteRef={noteRef}
            noteInView={noteInView}
            contactRef={contactRef}
            contactInView={contactInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </>
  );
};

export default Now;
```

> **Importante:** Ao extrair os sub-componentes, copiar o JSX **exato** do Now.tsx original para cada arquivo. O código acima mostra a estrutura — use o JSX original para preservar classes, textos e lógica.

- [ ] **Step 7: Verificar TypeScript e build**

```bash
pnpm tsc --noEmit && pnpm build
```

Expected: zero erros

- [ ] **Step 8: Commit**

```bash
git add src/pages/Now.tsx src/pages/Now/
git commit -m "refactor: split Now.tsx (485 lines) into 4 sub-components

Extract NowHeader, NowCurrentFocus, NowAchievements, NowContact.
Now.tsx becomes orchestrator (~70 lines)."
```

---

## Task 8: Quebrar Services.tsx em sub-componentes

**Files:**
- Modify: `src/pages/Services.tsx`
- Create: `src/pages/Services/ServicesHeader.tsx`
- Create: `src/pages/Services/ServicesList.tsx`
- Create: `src/pages/Services/ServicesProcess.tsx`
- Create: `src/pages/Services/ServicesCTA.tsx`

- [ ] **Step 1: Criar ServicesHeader.tsx**

Criar `src/pages/Services/ServicesHeader.tsx` extraindo a `motion.section` do cabeçalho de Services.tsx.

```tsx
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface ServicesHeaderProps {
  headerRef: (node?: Element | null) => void;
  headerInView: boolean;
}

export function ServicesHeader({ headerRef, headerInView }: ServicesHeaderProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      ref={headerRef}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
        {t("services.title")}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {t("services.description")}
      </p>
    </motion.section>
  );
}
```

- [ ] **Step 2: Criar ServicesList.tsx**

Criar `src/pages/Services/ServicesList.tsx` extraindo a grid de serviços de Services.tsx.

```tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge: string;
}

interface ServicesListProps {
  servicesRef: (node?: Element | null) => void;
  servicesInView: boolean;
  services: Service[];
}

export function ServicesList({ servicesRef, servicesInView, services }: ServicesListProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      ref={servicesRef}
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{t("services.list.title")}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full card-enhanced group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {service.icon}
                  <Badge variant="secondary">{service.badge}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 3: Criar ServicesProcess.tsx**

Criar `src/pages/Services/ServicesProcess.tsx` extraindo a section do processo de Services.tsx.

```tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface ProcessStep {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}

interface ServicesProcessProps {
  processRef: (node?: Element | null) => void;
  processInView: boolean;
  process: ProcessStep[];
}

export function ServicesProcess({ processRef, processInView, process }: ServicesProcessProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      ref={processRef}
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{t("services.process.title")}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {process.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full card-enhanced group text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">{step.icon}</div>
                <div className="text-xs font-mono text-primary mb-2">{step.step}</div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Criar ServicesCTA.tsx**

Criar `src/pages/Services/ServicesCTA.tsx` extraindo o bloco de CTA do final de Services.tsx.

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONFIG } from "@/constants/config";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";

interface ServicesCTAProps {
  ctaRef: (node?: Element | null) => void;
  ctaInView: boolean;
}

export function ServicesCTA({ ctaRef, ctaInView }: ServicesCTAProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      ref={ctaRef}
      initial={{ opacity: 0, y: 20 }}
      animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="card-enhanced text-center border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">{t("services.cta.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t("services.cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-enhanced gradient-primary text-white border-0">
              <a href={CONFIG.WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {t("services.cta.whatsapp")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-enhanced border-primary/20 hover:border-primary/40">
              <a href={`mailto:${CONFIG.EMAIL}`} className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("services.cta.email")}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
```

- [ ] **Step 5: Atualizar Services.tsx para usar os sub-componentes**

```tsx
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { Code, GitBranch, Globe, Lightbulb, MessageCircle, Settings } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ServicesCTA } from "./Services/ServicesCTA";
import { ServicesHeader } from "./Services/ServicesHeader";
import { ServicesList } from "./Services/ServicesList";
import { ServicesProcess } from "./Services/ServicesProcess";

const Services = () => {
  const { t, language } = useLanguage();
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const title = language === "en" ? "Services | Bernardo Gomes" : "Serviços | Bernardo Gomes";
  const description = language === "en"
    ? "Frontend development, automation, and Linux tooling services."
    : "Serviços de desenvolvimento frontend, automação e ferramentas Linux.";

  const services = [
    { icon: <Globe className="h-8 w-8 text-primary" />, title: t("services.web.title"), description: t("services.web.description"), features: [t("services.web.f1"), t("services.web.f2"), t("services.web.f3"), t("services.web.f4")], badge: t("services.web.badge") },
    { icon: <Code className="h-8 w-8 text-blue-500" />, title: t("services.frontend.title"), description: t("services.frontend.description"), features: [t("services.frontend.f1"), t("services.frontend.f2"), t("services.frontend.f3"), t("services.frontend.f4")], badge: t("services.frontend.badge") },
    { icon: <Settings className="h-8 w-8 text-yellow-500" />, title: t("services.automation.title"), description: t("services.automation.description"), features: [t("services.automation.f1"), t("services.automation.f2"), t("services.automation.f3"), t("services.automation.f4")], badge: t("services.automation.badge") },
    { icon: <GitBranch className="h-8 w-8 text-green-500" />, title: t("services.linux.title"), description: t("services.linux.description"), features: [t("services.linux.f1"), t("services.linux.f2"), t("services.linux.f3"), t("services.linux.f4")], badge: t("services.linux.badge") },
    { icon: <Lightbulb className="h-8 w-8 text-orange-500" />, title: t("services.consulting.title"), description: t("services.consulting.description"), features: [t("services.consulting.f1"), t("services.consulting.f2"), t("services.consulting.f3"), t("services.consulting.f4")], badge: t("services.consulting.badge") },
    { icon: <MessageCircle className="h-8 w-8 text-purple-500" />, title: t("services.mentoring.title"), description: t("services.mentoring.description"), features: [t("services.mentoring.f1"), t("services.mentoring.f2"), t("services.mentoring.f3"), t("services.mentoring.f4")], badge: t("services.mentoring.badge") },
  ];

  const process = [
    { icon: <MessageCircle className="h-6 w-6 text-primary" />, step: "01", title: t("services.process.1.title"), description: t("services.process.1.description") },
    { icon: <Lightbulb className="h-6 w-6 text-yellow-500" />, step: "02", title: t("services.process.2.title"), description: t("services.process.2.description") },
    { icon: <Code className="h-6 w-6 text-blue-500" />, step: "03", title: t("services.process.3.title"), description: t("services.process.3.description") },
    { icon: <GitBranch className="h-6 w-6 text-green-500" />, step: "04", title: t("services.process.4.title"), description: t("services.process.4.description") },
  ];

  return (
    <>
      <SEOHead title={title} description={description} canonical="https://bebitterbebetter.com.br/services" />
      <div className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <ServicesHeader headerRef={headerRef} headerInView={headerInView} />
          <ServicesList servicesRef={servicesRef} servicesInView={servicesInView} services={services} />
          <ServicesProcess processRef={processRef} processInView={processInView} process={process} />
          <ServicesCTA ctaRef={ctaRef} ctaInView={ctaInView} />
        </div>
      </div>
    </>
  );
};

export default Services;
```

> **Importante:** Os ícones, textos e estrutura de dados devem ser extraídos do `src/pages/Services.tsx` original. O código acima mostra a estrutura do orquestrador.

- [ ] **Step 6: TypeScript + build**

```bash
pnpm tsc --noEmit && pnpm build
```

Expected: zero erros

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services.tsx src/pages/Services/
git commit -m "refactor: split Services.tsx (406 lines) into 4 sub-components

Extract ServicesHeader, ServicesList, ServicesProcess, ServicesCTA.
Services.tsx becomes orchestrator (~70 lines)."
```

---

## Task 9: Testes para AboutSection

**Files:**
- Create: `src/pages/Index/sections/__tests__/AboutSection.test.tsx`

- [ ] **Step 1: Criar o arquivo de teste**

```tsx
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AboutSection } from '../AboutSection';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'about.title': 'About Me',
        'about.description': 'About description',
        'about.skills.title': 'Skills',
      };
      return map[key] ?? key;
    },
    language: 'en',
  }),
}));

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
    getStaggeredAnimationProps: () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
  }),
}));

vi.mock('@/contexts/projects-context', () => ({
  useProjects: () => ({
    projects: [],
    featuredProjects: [],
    totalStars: 0,
    projectsLoading: false,
    projectsError: null,
  }),
}));

describe('AboutSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the about section with id', () => {
    render(<AboutSection />);
    expect(document.querySelector('#about')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders skills title', () => {
    render(<AboutSection />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar o teste — esperar PASS**

```bash
pnpm vitest run src/pages/Index/sections/__tests__/AboutSection.test.tsx
```

Expected: 3 testes PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index/sections/__tests__/AboutSection.test.tsx
git commit -m "test: add AboutSection tests (renders section, title, skills)"
```

---

## Task 10: Testes para ContactSection

**Files:**
- Create: `src/pages/Index/sections/__tests__/ContactSection.test.tsx`

- [ ] **Step 1: Criar o arquivo de teste**

```tsx
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ContactSection } from '../ContactSection';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'contact.title': 'Contact',
        'contact.description': 'Get in touch',
        'contact.email.label': 'Email',
        'contact.whatsapp.label': 'WhatsApp',
      };
      return map[key] ?? key;
    },
    language: 'en',
  }),
}));

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
    getStaggeredAnimationProps: () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    }),
  }),
}));

vi.mock('@/components/Analytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: vi.fn(),
    trackContactAttempt: vi.fn(),
  }),
}));

vi.mock('@/components/ContactForm', () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>,
}));

vi.mock('@/utils/toast', () => ({
  showSuccess: vi.fn(),
}));

describe('ContactSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the contact section with id', () => {
    render(<ContactSection />);
    expect(document.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<ContactSection />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('renders section title', () => {
    render(<ContactSection />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar o teste — esperar PASS**

```bash
pnpm vitest run src/pages/Index/sections/__tests__/ContactSection.test.tsx
```

Expected: 3 testes PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index/sections/__tests__/ContactSection.test.tsx
git commit -m "test: add ContactSection tests (renders section, form, title)"
```

---

## Task 11: Testes para ProjectsSection

**Files:**
- Create: `src/pages/Index/sections/__tests__/ProjectsSection.test.tsx`

- [ ] **Step 1: Criar o arquivo de teste**

```tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProjectsSection } from '../ProjectsSection';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'projects.title': 'Projects',
        'projects.viewAll': 'View All',
        'projects.loading': 'Loading...',
      };
      return map[key] ?? key;
    },
    language: 'en',
  }),
}));

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
    getStaggeredAnimationProps: () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    }),
  }),
}));

vi.mock('@/components/Analytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: vi.fn(),
    trackProjectView: vi.fn(),
  }),
}));

vi.mock('@/contexts/projects-context', () => ({
  useProjects: () => ({
    projects: [],
    featuredProjects: [],
    totalStars: 42,
    projectsLoading: false,
    projectsError: null,
  }),
}));

vi.mock('@/components/ProjectCard', () => ({
  default: ({ project }: { project: { name: string } }) => (
    <div data-testid="project-card">{project.name}</div>
  ),
}));

const createWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ProjectsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the projects section with id', () => {
    render(<ProjectsSection />, { wrapper: createWrapper() });
    expect(document.querySelector('#projects')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<ProjectsSection />, { wrapper: createWrapper() });
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders empty state when no projects', () => {
    render(<ProjectsSection />, { wrapper: createWrapper() });
    expect(screen.queryAllByTestId('project-card')).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Rodar o teste — esperar PASS**

```bash
pnpm vitest run src/pages/Index/sections/__tests__/ProjectsSection.test.tsx
```

Expected: 3 testes PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index/sections/__tests__/ProjectsSection.test.tsx
git commit -m "test: add ProjectsSection tests (renders section, title, empty state)"
```

---

## Task 12: Corrigir a11y nos botões sociais do Hero

**Files:**
- Modify: `src/pages/Index/sections/HeroSection.tsx`

> Os botões sociais usam `Button asChild` com `<a>` dentro. O `onClick` no `Button` e o `href` no `<a>` são corretos via Radix Slot. O problema real: `Button` tem `role="button"` implícito mas renderiza como `<a>` — screen readers leem como link. Ao usar `asChild`, o `Button` vira o `<a>`, então está correto. Verificar se todos têm `aria-label` adequado.

- [ ] **Step 1: Verificar aria-labels atuais**

```bash
grep -A5 'variant="ghost"' src/pages/Index/sections/HeroSection.tsx | grep "aria-label"
```

Expected: cada link tem `aria-label`

- [ ] **Step 2: Verificar se `Button asChild` com `onClick` duplica eventos**

No Radix `asChild`, o `onClick` do `Button` e do filho são mergeados num único handler. Verificar:

```bash
grep -n "onClick.*handleSocialClick\|asChild" src/pages/Index/sections/HeroSection.tsx | head -20
```

- [ ] **Step 3: Mover `onClick` para dentro do `<a>` — evitar handler no Button quando `asChild`**

Em `HeroSection.tsx`, localizar cada `Button` social e mover o `onClick` de `Button` para o `<a>`:

Antes (exemplo GitHub):
```tsx
<Button
  variant="ghost"
  size="icon"
  onClick={() => handleSocialClick("GitHub", CONFIG.GITHUB_URL)}
  asChild
>
  <a
    href={CONFIG.GITHUB_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <GitHubIcon className="h-5 w-5" />
  </a>
</Button>
```

Depois:
```tsx
<Button variant="ghost" size="icon" asChild>
  <a
    href={CONFIG.GITHUB_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    onClick={() => handleSocialClick("GitHub", CONFIG.GITHUB_URL)}
  >
    <GitHubIcon className="h-5 w-5" />
  </a>
</Button>
```

Aplicar para todos os 5 botões sociais (GitHub, LinkedIn, Instagram, X, Sponsor).

- [ ] **Step 4: Rodar testes**

```bash
pnpm test:run
```

Expected: todos PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index/sections/HeroSection.tsx
git commit -m "fix(a11y): move onClick from Button to <a> in social links

With asChild, onClick on Button and child merge via Radix Slot but placing it
on the native <a> is more explicit and avoids double-handler confusion."
```

---

## Task 13: CI check completo + Deploy

- [ ] **Step 1: Rodar CI check completo**

```bash
pnpm ci:check
```

Expected: lint PASS, todos os testes PASS, build PASS

- [ ] **Step 2: Se lint falhar, corrigir**

```bash
pnpm lint:fix
git add -A
git commit -m "fix: auto-fix lint issues after full refactor"
```

- [ ] **Step 3: Gerar sitemap atualizado**

```bash
pnpm sitemap:gen
```

- [ ] **Step 4: Deploy para Hostinger via SSH**

```bash
pnpm deploy:hostinger
```

Expected:
```
✓ Build completed
✓ Backup created on remote
✓ Files synced via rsync
✓ Permissions set
✓ https://bebitterbebetter.com.br → 200 OK
✓ https://bebitterbebetter.com.br/robots.txt → 200 OK
✓ https://bebitterbebetter.com.br/sitemap.xml → 200 OK
```

- [ ] **Step 5: Validar deploy**

```bash
curl -sI https://bebitterbebetter.com.br | grep "HTTP/"
curl -s https://bebitterbebetter.com.br/robots.txt | head -5
curl -s https://bebitterbebetter.com.br/sitemap.xml | grep "<urlset"
```

Expected: `HTTP/2 200`, robots.txt e sitemap retornam conteúdo válido

- [ ] **Step 6: Commit final com tag**

```bash
git add -A
git commit -m "chore: update sitemap post-deploy"
git tag v$(date +%Y.%m.%d)
```
