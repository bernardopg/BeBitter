# 🚀 Deploy Checklist - BeBitter

## 📋 **Pré-Deploy**

### ✅ **Verificações Locais:**

- [x] Build executado com sucesso (`pnpm build`)
- [x] Sitemap gerado automaticamente
- [x] robots.txt otimizado
- [x] Google Search Console metatag adicionada
- [x] GA Tracking ID configurado no `.env.local`
- [x] Testes locais passando
- [x] Lint sem erros

### 📦 **Arquivos Prontos para Deploy:**

```text
dist/
├── index.html (6.04 KB) ✅ Com metatag GSC
├── robots.txt ✅ Otimizado com AI bots
├── sitemap.xml ✅ Priority 0.9 para /now
├── assets/ ✅ CSS/JS otimizados
├── images/ ✅ Imagens otimizadas
└── sw.js ✅ Service Worker
```

---

## 🔄 **Processo de Deploy**

### **Opção 1: Deploy Manual (FTP/SFTP)**

#### **1. Conectar ao Servidor:**

```bash
# Via FTP (use FileZilla, Cyberduck, ou similar)
Host: ftp.bebitterbebetter.com.br (ou IP do Hostinger)
Username: seu_usuario
Password: sua_senha
Port: 21 (FTP) ou 22 (SFTP)
```

#### **2. Fazer Upload:**

```bash
# Fazer backup da versão atual (importante!)
# No servidor, renomeie a pasta atual:
# public_html → public_html.backup-2025-10-01

# Upload dos arquivos:
1. Acesse a pasta: /home/seu_usuario/public_html/
2. Faça upload de TODO o conteúdo da pasta dist/
3. Preserve a estrutura de pastas
```

#### **3. Verificar Permissões:**

```bash
# No terminal SSH ou painel do Hostinger:
chmod -R 755 /home/seu_usuario/public_html/
```

---

### **Opção 2: Script Automatizado via SSH (Recomendado)**

#### **1. Configurar as credenciais locais:**

```bash
# Criar arquivo local ignorado pelo Git
cp .env.deploy.example .env.deploy

# Preencher com:
# DEPLOY_SSH_HOST
# DEPLOY_SSH_PORT
# DEPLOY_SSH_USER
# DEPLOY_SSH_KEY_PATH
# DEPLOY_REMOTE_DIR=/home/USUARIO/domains/SEU-DOMINIO/public_html
```

#### **2. Deploy no Servidor:**

```bash
# Executar no terminal local
pnpm deploy:hostinger
```

O script faz:

- `pnpm build`
- backup remoto de `public_html`
- sync do conteúdo de `dist/` para a hospedagem com `rsync`
- ajuste de permissões
- validação HTTP da home, `robots.txt` e `sitemap.xml`

---

### **Opção 3: Deploy Manual via Git + SSH**

```bash
# Conectar via SSH ao servidor
ssh usuario@bebitterbebetter.com.br

# Build local ou no servidor
pnpm build

# Copiar para public_html
rsync -az dist/ usuario@host:/home/usuario/public_html/
```

---

## ✅ **Pós-Deploy - Verificações**

### **1. Verificar Arquivos em Produção:**

```bash
# robots.txt
curl https://bebitterbebetter.com.br/robots.txt

# Deve mostrar:
# - Comentários informativos
# - Bots de AI (GPTBot, Claude, CCBot)
# - Google específico
# ✅ CORRETO se mostrar a versão otimizada
```

```bash
# sitemap.xml
curl https://bebitterbebetter.com.br/sitemap.xml

# Deve mostrar:
# - <priority>0.9</priority> para /now
# - xmlns:xhtml namespace
# - Data atual (2025-10-01)
# ✅ CORRETO se mostrar a versão nova
```

```bash
# Validar XML
curl -s https://bebitterbebetter.com.br/sitemap.xml | xmllint --noout -

# ✅ CORRETO se não mostrar erros
```

### **2. Verificar Metatag do Google:**

```bash
# View-source ou curl
curl -s https://bebitterbebetter.com.br | grep "google-site-verification"

# Deve retornar:
# <meta name="google-site-verification" content="j_g4wXgqn7ADhS1F_fHzZyaUGaLu8AZv_OpSgZaGlUc"/>
# ✅ CORRETO se encontrar a metatag
```

### **3. Testar o Site:**

- [ ] Homepage carrega corretamente
- [ ] Página /now carrega corretamente
- [ ] Imagens carregam
- [ ] Service Worker ativo
- [ ] Google Analytics funcionando
- [ ] Sem erros no console (exceto GA bloqueado por extensões)

### **4. Google Search Console:**

1. [ ] Acessar [Google Search Console](https://search.google.com/search-console)
2. [ ] Clicar em **Verificar propriedade**
3. [ ] Deve aparecer ✅ **Verificação bem-sucedida**
4. [ ] Ir em **Sitemaps**
5. [ ] Adicionar: `https://bebitterbebetter.com.br/sitemap.xml`
6. [ ] Status deve mudar para ✅ **Sucesso**

### **5. Testar robots.txt no Google:**

1. [ ] Acessar [Robots Testing Tool](https://support.google.com/webmasters/answer/6062598)
2. [ ] Testar: `https://bebitterbebetter.com.br/robots.txt`
3. [ ] Verificar se está sendo lido corretamente

---

## 🔍 **Troubleshooting**

### ❌ **Problema: robots.txt ainda mostra versão antiga**

**Solução:**

```bash
# 1. Verificar se o arquivo foi enviado
# 2. Limpar cache do servidor
# 3. Verificar permissões (chmod 644 robots.txt)
# 4. Fazer hard refresh (Ctrl+Shift+R)
```

### ❌ **Problema: sitemap.xml não atualiza**

**Solução:**

```bash
# 1. Garantir que o arquivo foi gerado: pnpm sitemap:gen
# 2. Verificar no dist/sitemap.xml
# 3. Re-upload do arquivo
# 4. Limpar cache CDN (CloudFlare)
```

### ❌ **Problema: Google não encontra a metatag**

**Solução:**

```bash
# 1. Verificar se o index.html foi atualizado
# 2. Fazer curl e procurar pela metatag
# 3. Limpar cache do navegador
# 4. Aguardar alguns minutos (propagação DNS)
```

---

## 📊 **Métricas de Sucesso**

Após o deploy, verificar:

| Métrica | Antes | Depois | Status |
|---------|-------|--------|--------|
| **robots.txt** | 3 linhas | 41 linhas | ⏳ Aguardando |
| **Bots suportados** | 1 (todos) | 7 (específicos) | ⏳ Aguardando |
| **Sitemap priority** | 0.8 (/now) | 0.9 (/now) | ⏳ Aguardando |
| **GSC Verification** | ❌ Falha | ✅ Sucesso | ⏳ Aguardando |
| **GA Segurança** | ❌ Exposto | ✅ Protegido | ✅ OK (local) |

---

## 🎯 **Próximos Passos Após Deploy**

### **Imediato (Dia 1):**

- [ ] Verificar todos os links funcionando
- [ ] Confirmar verificação do GSC
- [ ] Enviar sitemap ao Google
- [ ] Testar Analytics

### **Primeira Semana:**

- [ ] Monitorar erros no GSC
- [ ] Verificar indexação das páginas
- [ ] Analisar cobertura do sitemap
- [ ] Revisar Core Web Vitals

### **Primeiro Mês:**

- [ ] Analisar tráfego orgânico
- [ ] Verificar rankings
- [ ] Otimizar conforme dados
- [ ] Adicionar mais páginas ao sitemap

---

## 📞 **Suporte**

Se precisar de ajuda com o deploy:

- **Hostinger Support**: [https://www.hostinger.com.br/contato](https://www.hostinger.com.br/contato)
- **Documentação**: Ver `SEO-CHECKLIST.md`
- **Logs**: Verificar logs do servidor para erros

---

**Última atualização:** Outubro 2025
**Status:** ⏳ Aguardando deploy em produção
