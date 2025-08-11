# 🚀 Guia de Deploy - Hostinger

## Pré-requisitos

- Conta no Hostinger
- Domínio configurado: `bebitterbebetter.com.br`
- Node.js e pnpm instalados localmente

## 📋 Passos para Deploy

### 1. Build do Projeto

```bash
# Instalar dependências
pnpm install

# Fazer build para produção
pnpm build
```

### 2. Preparar Arquivos para Upload

Execute o script de deploy:

```bash
./deploy.sh
```

Isso irá:

- Fazer o build do projeto
- Criar um arquivo `bebitter-deployment.tar.gz` com todos os arquivos necessários

### 3. Upload via File Manager do Hostinger

1. **Acesse o hPanel da Hostinger**
   - Login em: <https://hpanel.hostinger.com/>

2. **Vá para File Manager**
   - No painel do seu domínio
   - Clique em "File Manager"

3. **Navegue até a pasta do domínio**
   - Vá para `public_html` (ou pasta do seu domínio)
   - **IMPORTANTE**: Limpe a pasta antes de fazer upload dos novos arquivos

4. **Upload do arquivo**
   - Faça upload do arquivo `bebitter-deployment.tar.gz`
   - Clique com botão direito e escolha "Extract"
   - Delete o arquivo .tar.gz após extrair

### 4. Upload via FTP (Alternativa)

Se preferir usar FTP:

```text
Host: ftp.bebitterbebetter.com.br
IP: 185.139.2.28
Usuário: [seu_usuario_ftp]
Senha: [sua_senha_ftp]
Porta: 21
```

**Configurações alternativas de FTP:**

- **Hostname**: 185.139.2.28
- **Tipo**: FTP (ou SFTP se disponível)
- **Modo**: Passivo (recomendado)

1. Conecte-se via FTP
2. Navegue até `public_html`
3. Upload dos arquivos da pasta `dist/`

### 5. Configurar Domínio (se necessário)

No hPanel:

1. Vá em "Domains" → "DNS Zone"
2. Certifique-se que os registros apontam para o Hostinger:

```text
Tipo: A
Nome: @
Valor: [IP do servidor Hostinger]

Tipo: CNAME
Nome: www
Valor: bebitterbebetter.com.br
```

## 🔒 SSL Certificate

O SSL já está configurado no `.htaccess` para forçar HTTPS.

No Hostinger:

1. Vá em "SSL" no hPanel
2. Instale o certificado Let's Encrypt gratuito
3. Ative "Force HTTPS"

## ✅ Verificação

Após o deploy:

1. **Teste o site**: <https://bebitterbebetter.com.br>
2. **Verifique SSL**: Procure pelo cadeado verde 🔒
3. **Teste navegação**: Todas as rotas devem funcionar (SPA)

## 🛠️ Scripts Úteis

```bash
# Development
pnpm dev

# Build para produção
pnpm build

# Preview local do build
pnpm preview

# Deploy completo (build + package)
./deploy.sh
```

## 📁 Estrutura de Deploy

Arquivos que vão para o servidor:

```text
public_html/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── images/
├── .htaccess
├── favicon.ico
└── outras assets estáticas
```

## 🆘 Troubleshooting

### Problema: Página em branco

- **Solução**: Verifique se o `.htaccess` foi uploadado corretamente

### Problema: 404 em rotas

- **Solução**: Confirme que o `.htaccess` tem as regras de rewrite para SPA

### Problema: Assets não carregam

- **Solução**: Verifique permissões dos arquivos (755 para pastas, 644 para arquivos)

### Problema: HTTPS não funciona

- **Solução**:
  1. Ative SSL no hPanel
  2. Force HTTPS nas configurações
  3. Aguarde propagação (até 24h)

## 📞 Suporte

- **Hostinger**: <https://www.hostinger.com.br/contato>
- **Documentação**: <https://support.hostinger.com/>

---

🎉 **Sucesso!** Seu site está no ar com Hostinger!
