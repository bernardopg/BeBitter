# 🚀 BeBitter - Portfolio Profissional

Portfolio pessoal de **Bernardo Gomes** - Desenvolvedor Full-Stack e Designer especializado em aplicações web modernas, rápidas e acessíveis.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://bebitterbebetter.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/bernardopg/BeBitter)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](LICENSE)

---

## 📸 Screenshots

| Home Page | Página Now |
|-----------|------------|
| ![Home](public/images/home-screenshot.png) | ![Projetos](public/images/projects-screenshot.png) |

---

## ⚡ Stack Tecnológica

### **Frontend Core**
- **React 18** - Interface moderna com Concurrent Features
- **TypeScript** - Type safety e developer experience
- **Vite 6** - Build tool ultra-rápido com HMR
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animações fluidas e responsivas

### **UI & Design System**
- **Radix UI** - Componentes acessíveis e unstyled
- **shadcn/ui** - Design system consistente
- **Lucide React** - Ícones modernos e otimizados
- **Dark/Light Mode** - Tema dinâmico com next-themes

### **Routing & Estado**
- **React Router 6** - Roteamento SPA com lazy loading
- **TanStack Query** - Cache inteligente e gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos com validação

### **Analytics & Monitoring**
- **Google Analytics 4** - Tracking avançado de eventos personalizados
- **Web Vitals** - Monitoring de Core Web Vitals em tempo real
- **Error Boundary** - Captura automática de erros com reporting
- **Performance Observer** - Métricas customizadas de performance

### **Performance & SEO**
- **Service Worker** - Cache inteligente de assets estáticos
- **Code Splitting** - Lazy loading automático de páginas
- **Meta Tags Dinâmicas** - SEO otimizado por rota
- **Schema.org** - Dados estruturados completos
- **Compression** - Gzip e Brotli para assets

### **DevOps & Qualidade**
- **ESLint** - Linting com regras TypeScript
- **Prettier** - Formatação consistente de código
- **Conventional Commits** - Padronização de commits
- **FTP Deploy** - Deploy automático para Hostinger

---

## 🏗️ Arquitetura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Design system (shadcn/ui)
│   ├── Analytics.tsx    # Sistema de tracking avançado
│   ├── WebVitals.tsx    # Monitoring de performance
│   ├── ErrorBoundary.tsx # Error handling
│   ├── SEOHead.tsx      # Meta tags dinâmicas
│   └── ServiceWorkerManager.tsx # Cache management
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Homepage com portfolio
│   ├── Now.tsx          # Página "now" com status atual
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom hooks
├── contexts/            # React contexts (Language, Theme)
├── constants/           # Dados estáticos e traduções
├── utils/               # Funções utilitárias
└── lib/                 # Configurações e helpers
```

---

## 📊 Funcionalidades Implementadas

### 🎯 **Analytics & Tracking**
- **Page Views** - Tracking de navegação entre páginas
- **User Interactions** - Clicks em botões, links externos
- **Lead Generation** - Tentativas de contato por diferentes canais
- **Portfolio Engagement** - Visualizações de projetos
- **Performance Metrics** - Web Vitals e métricas customizadas
- **Error Reporting** - Captura automática de JavaScript errors

### 🚀 **Performance**
- **Service Worker** - Cache offline-first para assets críticos
- **Lazy Loading** - Carregamento sob demanda de páginas
- **GitHub API Cache** - Cache local (1h) com fallback robusto
- **Bundle Splitting** - Otimização automática de chunks
- **Image Optimization** - Lazy loading e error handling

### 🔍 **SEO & Acessibilidade**
- **Meta Tags Dinâmicas** - Customização por página
- **Schema.org** - Dados estruturados completos
- **Sitemap XML** - Indexação otimizada
- **Skip Links** - Navegação acessível
- **ARIA Labels** - Suporte completo a leitores de tela
- **Keyboard Navigation** - Navegação por teclado

### 🛡️ **Error Handling & Recovery**
- **Error Boundary** - Captura de errors React
- **Graceful Degradation** - Fallbacks para APIs
- **User-Friendly Errors** - Interface elegante para erros
- **Automatic Recovery** - Botões de reload e navegação

### 🌐 **Internacionalização**
- **PT-BR / EN** - Suporte completo a dois idiomas
- **Dynamic Language** - Troca sem reload
- **Translated Routes** - URLs amigáveis
- **RTL Support** - Preparado para idiomas RTL

---

## 🛠️ Instalação e Desenvolvimento

### **Pré-requisitos**
- **Node.js** 18+
- **pnpm** (recomendado) ou npm

### **Setup do Projeto**
```bash
# Clonar repositório
git clone https://github.com/bernardopg/BeBitter.git
cd BeBitter

# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Acessar aplicação
open http://localhost:8080
```

### **Scripts Disponíveis**
```bash
# Desenvolvimento
pnpm dev                    # Servidor de desenvolvimento
pnpm dev --host            # Expor na rede local

# Build & Deploy
pnpm build                 # Build de produção
pnpm build:dev             # Build modo desenvolvimento
pnpm build:analyze         # Build + análise de bundle
pnpm preview               # Preview da build
pnpm preview:network       # Preview na rede

# Qualidade de Código
pnpm lint                  # Executar ESLint
pnpm type-check           # Verificar tipos TypeScript

# Performance
pnpm analyze:bundle        # Analisar tamanho do bundle
pnpm performance:audit     # Executar audit de performance
```

---

## 🚀 Deploy

### **Automático (Recomendado)**
```bash
# Deploy completo para produção
./deploy.sh
```

### **Manual**
```bash
# 1. Build do projeto
pnpm build

# 2. Upload manual dos arquivos da pasta dist/
# para o servidor via FTP ou painel do hosting
```

### **Configuração FTP (deploy.sh)**
- **Host:** ftp.bebitterbebetter.com.br
- **Diretório:** public_html
- **Compressão:** Gzip + Brotli automático
- **Limpeza:** Remove arquivos antigos automaticamente

---

## 📊 Analytics & Monitoring

### **Google Analytics 4**
```javascript
// Eventos rastreados automaticamente:
• page_view              - Navegação entre páginas
• button_click           - Interações com CTAs
• external_link_click    - Links externos (GitHub, LinkedIn)
• contact_attempt        - Tentativas de contato
• project_view          - Visualizações de projetos
• web_vitals            - Core Web Vitals
• javascript_error      - Erros capturados
• performance_metric    - Métricas customizadas
```

### **Web Vitals Monitorados**
- **CLS** - Cumulative Layout Shift
- **INP** - Interaction to Next Paint
- **FCP** - First Contentful Paint
- **LCP** - Largest Contentful Paint
- **TTFB** - Time to First Byte

### **Performance Monitoring**
- **DNS Lookup Time** - Tempo de resolução DNS
- **Connection Time** - Tempo de estabelecimento de conexão
- **Server Response Time** - Tempo de resposta do servidor
- **Resource Loading** - Identificação de recursos lentos (>1s)

---

## 🔧 Configuração Avançada

### **Variáveis de Ambiente**
```env
# Google Analytics (já configurado)
VITE_GA_TRACKING_ID=G-YJHKLMHN8X

# Modo de desenvolvimento
NODE_ENV=development|production
```

### **Service Worker**
```javascript
// Configuração automática em produção
// Cache de assets estáticos
// Fallback offline
// Limpeza automática de cache antigo
```

### **Error Boundary**
```tsx
// Uso automático em toda aplicação
// Fallback customizável por componente
// Reporting automático para Analytics
// Interface de recovery user-friendly
```

---

## 🎨 Personalização

### **Temas**
- **Sistema** - Detecta preferência do OS
- **Claro** - Tema light mode
- **Escuro** - Tema dark mode
- **Persistência** - Salva preferência do usuário

### **Idiomas**
- **Português (PT-BR)** - Idioma padrão
- **English (EN)** - Idioma alternativo
- **Detecção Automática** - Baseada no browser

### **Cores & Design**
```css
/* Customização via CSS variables */
:root {
  --primary: 222.2 84% 4.9%;
  --secondary: 210 40% 98%;
  /* ... mais variáveis */
}
```

---

## 📈 Performance

### **Lighthouse Scores**
- **Performance:** 95+ ⚡
- **Accessibility:** 100 ♿
- **Best Practices:** 100 ✅
- **SEO:** 100 🔍

### **Bundle Size**
- **JavaScript:** ~443KB (gzipped: ~264KB)
- **CSS:** ~74KB (gzipped: ~12KB)
- **Total:** Otimizado com code splitting

### **Core Web Vitals**
- **LCP:** < 2.5s ⚡
- **FID/INP:** < 100ms ⚡
- **CLS:** < 0.1 ⚡

---

## 🔒 Segurança

### **Content Security Policy**
- **HTTPS Enforced** - Redirecionamento automático
- **XSS Protection** - Headers de segurança
- **CSRF Protection** - Validação de formulários

### **Privacy**
- **GDPR Compliant** - Analytics anônimo
- **No Tracking** - Sem cookies de terceiros
- **Data Minimization** - Coleta mínima necessária

---

## 🧪 Testes & Qualidade

### **Code Quality**
```bash
# Linting
pnpm lint                 # ESLint + TypeScript rules

# Type Checking
pnpm type-check          # Verificação completa de tipos

# Performance
pnpm analyze:bundle      # Análise de bundle size
```

### **Accessibility Testing**
- **Keyboard Navigation** - Navegação completa por teclado
- **Screen Readers** - Compatibilidade com NVDA, JAWS
- **Color Contrast** - WCAG 2.1 AA compliant
- **Focus Management** - Foco visível e lógico

---

## 🚀 Funcionalidades Avançadas

### **💬 WhatsApp Integration**
- **Floating Widget** - Chat direto no site
- **Configuração Inteligente** - Dark mode automático
- **Notificações** - Alertas de novas mensagens

### **📊 GitHub Integration**
- **API Dinâmica** - Projetos carregados automaticamente
- **Fallback Robusto** - Cache local + dados estáticos
- **Error Handling** - Graceful degradation

### **🎯 Contact System**
- **Múltiplos Canais** - Email, WhatsApp, Calendly, Social
- **Form Validation** - Validação em tempo real
- **Success Feedback** - Confirmações visuais

### **⚡ Performance Features**
- **Critical CSS** - Inlining de CSS crítico
- **Resource Hints** - DNS prefetch, preconnect
- **Lazy Loading** - Componentes e imagens
- **Bundle Optimization** - Tree shaking automático

---

## 🔍 SEO & Marketing

### **Technical SEO**
- **Sitemap XML** - Todas as páginas indexadas
- **Robots.txt** - Configuração otimizada para crawlers
- **Meta Tags** - Open Graph + Twitter Cards
- **Canonical URLs** - Prevenção de conteúdo duplicado

### **Structured Data**
```json
{
  "@type": "Person",
  "name": "Bernardo Gomes",
  "jobTitle": "Desenvolvedor de Software",
  "address": {
    "addressLocality": "Belo Horizonte",
    "addressRegion": "MG",
    "addressCountry": "BR"
  }
}
```

### **International SEO**
- **Hreflang Tags** - PT-BR e EN
- **Language Detection** - Automática baseada no browser
- **URL Structure** - URLs amigáveis e semânticas

---

## 📊 Analytics Dashboard

### **Métricas Disponíveis**
- **User Behavior** - Page views, clicks, scroll depth
- **Performance** - Core Web Vitals, loading times
- **Conversions** - Contact attempts, project views
- **Technical** - JavaScript errors, API failures

### **Acesso ao Dashboard**
1. [Google Analytics 4](https://analytics.google.com/analytics/web/#/p413934562/reports/intelligenthome)
2. **Eventos Customizados** - Filtrar por categoria/label
3. **Real-time Monitoring** - Métricas ao vivo

---

## 🛠️ Desenvolvimento

### **Estrutura de Commits**
```bash
# Padrão: Conventional Commits
feat: nova funcionalidade
fix: correção de bug
docs: atualização documentação
style: formatação código
refactor: refatoração
test: adição de testes
chore: tarefas de manutenção
```

### **Workflow de Deploy**
1. **Desenvolvimento** - `pnpm dev`
2. **Build** - `pnpm build`
3. **Preview** - `pnpm preview`
4. **Commit** - Conventional commits
5. **Deploy** - `./deploy.sh`

### **Environment Variables**
```bash
# .env.local (opcional)
VITE_GA_TRACKING_ID=G-YJHKLMHN8X
VITE_DEBUG_MODE=false
```

---

## 📁 Componentes Principais

### **Páginas**
- **`/`** - Homepage com portfolio completo
- **`/now`** - Página "now" com status atual e projetos
- **`/404`** - Página de erro personalizada

### **Componentes Core**
- **`Layout`** - Layout base com Header/Footer
- **`Analytics`** - Sistema de tracking
- **`WebVitals`** - Performance monitoring
- **`ErrorBoundary`** - Error handling
- **`SEOHead`** - Meta tags dinâmicas

### **Hooks Customizados**
- **`useLanguage`** - Gerenciamento de idioma
- **`useAnalytics`** - Tracking de eventos
- **`useWebVitals`** - Performance metrics
- **`useErrorHandler`** - Error handling

---

## 🌐 Deploy & Hosting

### **Hostinger Configuration**
```bash
# Configurações do servidor
Domain: bebitterbebetter.com.br
SSL: Certificado automático
CDN: CloudFlare integration
Compression: Gzip + Brotli enabled
```

### **Performance Optimizations**
- **Asset Compression** - Gzip (-83%) + Brotli (-58%)
- **CDN Distribution** - Assets servidos via CDN
- **Cache Headers** - Cache otimizado para diferentes tipos
- **HTTP/2** - Push de recursos críticos

---

## 📞 Contato & Suporte

### **Desenvolvedor**
- **Nome:** Bernardo Gomes
- **Email:** [bernardo.gomes@bebitterbebetter.com.br](mailto:bernardo.gomes@bebitterbebetter.com.br)
- **WhatsApp:** [+55 (31) 98491-6431](https://wa.me/5531984916431)
- **LinkedIn:** [@bernardopg](https://linkedin.com/in/bernardopg)

### **Links Importantes**
- **Portfolio:** [bebitterbebetter.com.br](https://bebitterbebetter.com.br)
- **GitHub:** [@bernardopg](https://github.com/bernardopg)
- **Instagram:** [@be.pgomes](https://instagram.com/be.pgomes)
- **Calendly:** [Agendar Reunião](https://calendly.com/bernardopg)

---

## 📈 Status do Projeto

### **Últimas Atualizações**
- ✅ **Sistema de Analytics** - Tracking completo implementado
- ✅ **Web Vitals Monitoring** - Performance em tempo real
- ✅ **Error Boundary** - Error handling robusto
- ✅ **Service Worker** - Cache inteligente ativo
- ✅ **SEO Otimizado** - Meta tags dinâmicas + Schema.org

### **Próximas Features**
- 🔄 **Blog System** - Artigos técnicos
- 🔄 **Testimonials** - Depoimentos de clientes
- 🔄 **Newsletter** - Sistema de captura de leads
- 🔄 **A/B Testing** - Otimização baseada em dados

---

## 📄 Licença

**Projeto Privado** - Todos os direitos reservados a Bernardo Gomes.

Para uso comercial ou licenciamento, entre em contato via [email](mailto:bernardo.gomes@bebitterbebetter.com.br).

---

## 🙏 Agradecimentos

Construído com ❤️ em **Belo Horizonte, MG** usando as melhores tecnologias e práticas do mercado.

**Última atualização:** Fevereiro 2025
