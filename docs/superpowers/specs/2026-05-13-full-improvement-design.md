# BeBitter — Full Improvement Design

**Date:** 2026-05-13  
**Scope:** Manutenção + melhorias cirúrgicas + revisão ampla (Abordagens A+B+C)

---

## 1. Manutenção (A)

### PRs Dependabot
Merge das 4 PRs abertas:
- #60 pnpm/action-setup 6.0.5→6.0.7
- #59 dependency-review-action
- #58 tooling-and-tests group
- #57 runtime-dependencies group

### Pacotes
- Atualizar 21 pacotes patch/minor via `pnpm update`
- `react-day-picker` 9→10: migration manual (API mudou — `selected`/`onSelect` props renomeadas)
- `tailwindcss` 4.2→4.3: verificar breaking changes

### Dead code
- Deletar `src/pages/Index.tsx.backup` (53KB, nunca importado)

---

## 2. Melhorias Cirúrgicas (B)

### Build / Performance
- **`manualChunks`**: expandir splitting para todos os pacotes `@radix-ui/*`, `framer-motion`, `lucide-react`, `date-fns`, `recharts` — cada um em chunk separado ou agrupados por uso. Reduz chunk principal.
- **`@unhead/react`**: substituir `SEOHead` (203 linhas de `querySelector`/`setAttribute`) por composable head management. Mais correto, SSR-safe, menos código.

### Código / Qualidade
- **`Now.tsx`** (485 linhas): quebrar em sub-componentes — `NowHeader`, `NowCurrentStatus`, `NowReading`, `NowProjects`, etc.
- **`Services.tsx`** (406 linhas): mesma abordagem
- **Testes**: adicionar testes para `AboutSection`, `ContactSection`, `ProjectsSection` (apenas `HeroSection` tem cobertura hoje)

### SEO / Acessibilidade
- Verificar e corrigir issues de a11y nos botões sociais do Hero (duplo evento: `onClick` + `href` — redundante)
- `aria-label` consistente em todos os elementos interativos
- `lang` attribute dinâmico já implementado — verificar se está correto

---

## 3. Revisão Ampla (C)

### UI/UX
- Hero: inline styles com `animationDelay` → CSS custom properties ou Tailwind `delay-*`
- Revisar animações Framer Motion — reduzir re-renders desnecessários no scroll
- Verificar responsividade mobile em todos os breakpoints
- `Index.tsx.backup` removido no A já limpa contexto visual

### Deploy
- `pnpm deploy:hostinger` via SSH já configurado e testado (conexão OK)
- Executar após todos os outros passos com build limpo
- Validar: homepage, robots.txt, sitemap.xml pós-deploy

---

## Ordem de Execução

1. Merge PRs Dependabot (via `gh pr merge`)
2. Deletar backup file
3. `pnpm update` (todos exceto react-day-picker)
4. Migrar react-day-picker 9→10 manualmente
5. Expandir `manualChunks` no Vite
6. Substituir `SEOHead` por `@unhead/react`
7. Quebrar `Now.tsx` e `Services.tsx`
8. Adicionar testes das 3 sections
9. Corrigir a11y Hero social buttons
10. `pnpm ci:check` (lint + test + build)
11. `pnpm deploy:hostinger`

---

## Riscos

| Item | Risco | Mitigação |
|------|-------|-----------|
| react-day-picker 9→10 | API quebrada | Checar uso real antes de migrar |
| @unhead/react | Nova dependência | API simples, bem mantida |
| manualChunks expand | Cache bust em produção | Deploy imediato resolve |
| tailwindcss 4.2→4.3 | Possível breaking | Checar changelog antes |
