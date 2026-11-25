# Entrega e operação do BeBitter

## Atualizações de dependências

O Dependabot agrupa os pacotes npm em um PR às terças-feiras e as GitHub Actions em um PR às quintas-feiras, no horário de São Paulo. O limite de um PR por ecossistema vale para atualizações de versão. Correções de segurança têm agrupamento separado e são abertas quando detectadas.

O workflow [Dependabot queue](.github/workflows/dependencies.yml) roda ao terminar o CI ou a entrega de produção, a cada duas horas e sob demanda na `main`. O workflow usa o token temporário do GitHub Actions. Ele aceita PRs do Dependabot do próprio repositório, com commits atribuídos ao bot e arquivos compatíveis com o ecossistema. Upgrades de versão passam pelos mesmos checks.

1. Confere os checks obrigatórios de CI, Dependency Review e CodeQL no SHA atual. O CI inclui lint, typecheck, testes unitários, build, validação dos workflows, navegação no Chromium e tamanho dos bundles.
2. Mescla via squash com o SHA verificado, sob a proteção estrita da `main`. O GitHub remove a branch remota após o merge.
3. Dispara a entrega na `main` explicitamente. A fila só libera o próximo merge quando o commit atual tem deploy e release bem-sucedidos.
4. Atualiza branches que ficaram atrás por rebase e aguarda os novos checks. Verifica se a atualização continua sem conflitos e se permanece combinável com a base atual.

Conflitos, checks reprovados e bloqueios ficam em uma issue atribuída ao dono do repositório. A issue é atualizada conforme os bloqueios mudam e fecha quando são resolvidos. Um PR com problema pode aguardar enquanto outro elegível avança. Para regenerar um PR com conflito, comente `@dependabot recreate` no PR após verificar se contém alterações manuais que precisam ser preservadas.

Os testes do site usam [Playwright](https://playwright.dev/docs/ci-intro) com o Chromium em modo headless. Cobrem hidratação, troca de idioma, navegação e menu móvel. O orçamento determinístico em `scripts/check-bundle-size.ts` limita JS e CSS da home a 250 KiB gzip e o conjunto de JS e CSS a 620 KiB gzip. As verificações cobrem peso e funcionamento, sem medir LCP, CLS ou TBT. Para reproduzir:

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm ci:check
pnpm test:site
```

## Production delivery

Pushes à `main` e merges feitos pela fila disparam [Production delivery](.github/workflows/deploy.yml). O workflow valida um build com as configurações de produção e empacota `dist`. O deploy e a release baixam o mesmo artefato pela API do GitHub, verificam seu SHA-256 e comparam `deploy-revision.txt` com o commit da execução.

O script confere o caminho remoto real `$HOME/domains/bebitterbebetter.com.br/public_html` antes de acessar os arquivos. O deploy usa um lock específico do BeBitter, faz backup, sincroniza com rsync preservando `.well-known` e as raízes dos subdomínios dentro de `public_html` (`browser/`, do Bitter Browser, e `idler/`), confere que esses diretórios mantêm todos os arquivos do backup (se não, restaura-os e falha), e verifica rotas, metadados, SHA e os bytes dos assets da página inicial via HTTPS. Depois da verificação, publica uma release GitHub com o tarball. Se o upload ou a verificação pública falhar, restaura o backup e verifica o site novamente.

A versão da release avança um patch a partir da tag SemVer mais alta. Uma tag SemVer que já aponta para o mesmo SHA é reutilizada, inclusive ao repetir uma publicação interrompida. `package.json` e `CHANGELOG.md` continuam com o versionamento editorial do código-fonte. As releases automáticas têm notas geradas pelo GitHub a partir dos commits.

| Secret | Uso |
| --- | --- |
| `DEPLOY_SSH_HOST`, `DEPLOY_SSH_PORT`, `DEPLOY_SSH_USER` | Conexão SSH da Hostinger |
| `DEPLOY_SSH_KEY`, `DEPLOY_SSH_KNOWN_HOSTS` | Chave privada de deploy e chave pública verificada do servidor |
| `DEPLOY_REMOTE_DIR` | Caminho absoluto de `domains/bebitterbebetter.com.br/public_html` |
| `VITE_GA_TRACKING_ID` | ID de medição usado no build público |

Variáveis opcionais no GitHub incluem `VITE_CAL_URL` e `DEPLOY_KEEP_BACKUPS` (cinco por padrão, zero desativa a poda). O prefixo `VITE_` torna o valor público no bundle. Mantenha tokens e senhas fora dessas variáveis.

Para validar o acesso e simular a sincronização, abra **Actions → Production delivery → Run workflow**, selecione `main` e marque `dry_run`. Para repetir uma entrega após corrigir uma falha, execute na `main` com `dry_run` desmarcado.

## Saúde e recuperação

[Production health](.github/workflows/health.yml) verifica o site a cada seis horas. Valida home, blog, serviços, página Now, robots.txt, sitemap, RSS, assets e validade do TLS. Uma falha abre uma issue atribuída ao dono. A recuperação fecha essa issue automaticamente.

Cada deploy mantém um backup em `public_html.backup-AAAAMMDD-HHMMSS` no diretório do domínio. Se a sessão for interrompida e sobrar `public_html.deploy-lock`, confirme que nenhum deploy está em execução antes de remover o diretório vazio do lock. Para restaurar manualmente, use SSH com o host e a chave verificados:

```bash
cd ~/domains/bebitterbebetter.com.br
rsync -a --checksum --delay-updates --delete-delay --exclude=/.well-known --exclude=/browser --exclude=/idler \
  public_html.backup-AAAAMMDD-HHMMSS/ public_html/
```

Confirme a recuperação localmente com `bash scripts/check-site.sh https://bebitterbebetter.com.br`. Corrija ou reverta o commit na `main` para que o site restaurado e a próxima entrega voltem a corresponder.

Para deploy manual com o mesmo script, copie `.env.deploy.example` para `.env.deploy`, configure a chave no `known_hosts` com a identidade verificada do servidor e rode `pnpm deploy:hostinger -- --dry-run` primeiro. O deploy manual usa o build do checkout local.

## ✅ **Pós-Deploy - Verificações**

### **1. Verificar Arquivos em Produção:**

```bash
# robots.txt
curl https://bebitterbebetter.com.br/robots.txt

# Deve mostrar:
# - Grupo User-agent: * com Allow: /
# - Sitemap com a URL HTTPS de produção
```

```bash
# sitemap.xml
curl https://bebitterbebetter.com.br/sitemap.xml

# Deve mostrar:
# - URLs canônicas de páginas e artigos
# - xmlns:xhtml namespace
# - lastmod dos artigos com a data de publicação ou revisão
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
