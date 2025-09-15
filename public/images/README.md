# 📸 Imagens do BeBitter Portfolio

Este diretório contém todas as imagens e assets visuais do projeto BeBitter.

## 📁 Estrutura de Diretórios

```text
public/images/
├── 📄 README.md                    # Este arquivo
│  
├── 📁 profile/
      ├── 📁 🖼️ MainProfigeImage.JPG         # Foto principal do Bernardo
├── 📁 icons/                       # Ícones do site
│   ├── android-chrome-192x192.png  # Ícone Android 192px
│   ├── android-chrome-512x512.png  # Ícone Android 512px
│   ├── apple-touch-icon.png        # Ícone Apple Touch
│   ├── favicon-16x16.png           # Favicon 16px
│   └── favicon-32x32.png           # Favicon 32px
├── 📁 logos/                       # Logotipos do BeBitter
│   ├── BeBitter.svg                # Logo principal
│   └── BeBitter_Alt.svg            # Logo alternativo
└── 📁 screenshots/                 # Screenshots atualizadas
    ├── .gitkeep                    # Manter diretório no Git
    ├── bebitterbebetter-br-home-light.png   # Home (pt-BR, tema claro)
    ├── bebitterbebetter-br-home-dark.png    # Home (pt-BR, tema escuro)
    ├── bebitterbebetter-en-home-dark.png    # Home (en, tema escuro)
    ├── bebitterbebetter-pt-now-light.png    # Página Now (pt, tema claro)
    └── bebitterbebetter-en-now-dark.png.png # Página Now (en, tema escuro) [extensão dupla]
```

---

## 📱 Screenshots Atualizadas

### 🏠 **Página Principal (Home)**

#### 🌞 Tema Claro

- **Arquivo**: `bebitterbebetter-br-home-light.png`
- **Resolução**: 1920x1080
- **Descrição**: Homepage (pt-BR) no tema claro

#### 🌙 Tema Escuro

- **Arquivo**: `bebitterbebetter-br-home-dark.png`
- **Resolução**: 1920x1080
- **Descrição**: Homepage (pt-BR) no tema escuro

### 📄 **Página Now**

#### 🌞 Tema Claro

- **Arquivo**: `bebitterbebetter-pt-now-light.png`
- **Resolução**: 1920x1080
- **Descrição**: Página /now (pt) no tema claro

#### 🌙 Tema Escuro

- **Arquivo**: `bebitterbebetter-en-now-dark.png.png`
- **Resolução**: 1920x1080
- **Descrição**: Página /now (en) no tema escuro — observar extensão dupla `.png.png`

---

## 🎯 **Especificações Técnicas**

### 📐 **Dimensões e Formatos**

| Tipo | Formato | Dimensões | Uso |
|------|---------|-----------|-----|
| **Screenshots** | PNG | 1920x1080 | Documentação README |
| **Favicons** | PNG | 16x16, 32x32 | Browser tabs |
| **Touch Icons** | PNG | 192x192, 512x512 | PWA e mobile |
| **Logotipos** | SVG | Vetorial | Escalabilidade |
| **Profile** | JPG | Original | Foto pessoal |

### 🖼️ **Diretrizes de Imagem**

#### Screenshots

- **Formato**: PNG para preservar qualidade
- **Resolução**: Full HD (1920x1080)
- **Compressão**: Otimizada para web
- **Nomenclatura**: `{page}-{theme}-{timestamp}.png`

#### Ícones

- **Formato**: PNG com transparência
- **Qualidade**: Alta resolução
- **Compatibilidade**: Todos os browsers e dispositivos

#### Logos

- **Formato**: SVG para escalabilidade
- **Cores**: Adaptáveis ao tema (claro/escuro)
- **Uso**: Header, footer, documentação

---

## 🔄 **Processo de Atualização**

### 📸 **Como Capturar Novas Screenshots**

1. **Executar o projeto localmente**:

   ```bash
   pnpm dev
   ```

2. **Usar Playwright para captura automatizada**:

   ```bash
   # Screenshots serão salvas automaticamente em screenshots/
   # com timestamp para controle de versão
   ```

3. **Verificar qualidade**:
   - [ ] Resolução correta (1920x1080)
   - [ ] Tema aplicado corretamente
   - [ ] Conteúdo completo visível
   - [ ] Sem elementos cortados

4. **Atualizar referências**:
   - [ ] README.md principal
   - [ ] Documentação
   - [ ] Links de preview

### 🗂️ **Organização de Arquivos**

- **Screenshots antigas**: Remover após confirmação das novas
- **Versionamento**: Manter timestamp nos nomes
- **Cleanup**: Executar limpeza regular para evitar acúmulo

---

## 📊 **Otimizações de Performance**

### 🚀 **Boas Práticas**

- **Compressão**: Todos os PNGs otimizados
- **Lazy Loading**: Screenshots carregadas sob demanda
- **Alt Text**: Descrições acessíveis em todas as imagens
- **Responsive**: Imagens adaptáveis a diferentes telas

### 📈 **Métricas**

| Métrica | Valor | Status |
|---------|--------|--------|
| **Total Size** | ~2.5MB | ✅ Otimizado |
| **Loading Time** | <2s | ✅ Rápido |
| **Compression** | ~60% | ✅ Eficiente |

---

## 🛠️ **Ferramentas Utilizadas**

### 📸 **Captura**

- **Playwright**: Screenshots automatizadas
- **Chrome DevTools**: Testes manuais
- **Browser Testing**: Cross-browser validation

### 🎨 **Edição**

- **Design Tools**: Para ajustes se necessário
- **Optimization**: Ferramentas de compressão
- **Quality Check**: Validação visual

---

## 🔗 **Referências**

- **README Principal**: [README.md](../../README.md)
- **Documentação**: [CLAUDE.md](../../CLAUDE.md)
- **Segurança**: [SECURITY.md](../../SECURITY.md)

---

*Última atualização: 15 de Setembro de 2025*  
