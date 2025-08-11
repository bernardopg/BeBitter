# 🔒 Guia de Configuração de Certificado SSL

## Para bebitterbebetter.com.br

### Opção 1: Vercel (Recomendado - SSL Automático)

Se você está usando Vercel para hospedar seu site:

#### ✅ SSL Automático

O Vercel fornece certificados SSL **gratuitamente e automaticamente** para todos os domínios. Não é necessária nenhuma configuração adicional!

#### 📋 Passos para configurar domínio no Vercel

1. **Acesse o Dashboard do Vercel**

   ```text
   https://vercel.com/dashboard
   ```

2. **Vá para as configurações do projeto**
   - Clique no seu projeto
   - Vá em "Settings" → "Domains"

3. **Adicione seu domínio personalizado**
   - Clique em "Add Domain"
   - Digite: `bebitterbebetter.com.br`
   - Clique em "Add"

4. **Configure o DNS no seu provedor de domínio**

   Adicione um dos seguintes registros DNS:

   **Opção A - CNAME (Recomendado):**

   ```text
   Tipo: CNAME
   Nome: www
   Valor: cname.vercel-dns.com
   ```

   **Opção B - A Record:**

   ```text
   Tipo: A
   Nome: @
   Valor: 76.76.21.21
   ```

5. **Aguarde a propagação**
   - Pode levar até 48 horas
   - O Vercel automaticamente provisiona o certificado SSL
   - Você verá um cadeado verde quando estiver pronto

### Opção 2: Hostinger

Se você está usando Hostinger:

#### 📋 Passos para ativar SSL no Hostinger

1. **Acesse o hPanel da Hostinger**

   ```text
   https://hpanel.hostinger.com/
   ```

2. **Vá para SSL**
   - No painel do seu domínio
   - Procure por "SSL" ou "Segurança"

3. **Instale o certificado Let's Encrypt gratuito**
   - Clique em "Instalar SSL"
   - Escolha "Let's Encrypt"
   - Selecione seu domínio: `bebitterbebetter.com.br`
   - Marque também `www.bebitterbebetter.com.br`
   - Clique em "Instalar"

4. **Aguarde a instalação**
   - Leva alguns minutos
   - Você receberá um email de confirmação

5. **Force HTTPS (Recomendado)**
   - No hPanel, vá em "SSL" → "Forçar HTTPS"
   - Ative a opção

### Opção 3: Cloudflare (SSL Gratuito + CDN)

Para adicionar SSL e melhorar a performance:

#### 📋 Configuração do Cloudflare

1. **Crie uma conta no Cloudflare**

   ```text
   https://www.cloudflare.com/
   ```

2. **Adicione seu site**
   - Digite: `bebitterbebetter.com.br`
   - Escolha o plano gratuito

3. **Atualize os nameservers**
   - Cloudflare fornecerá 2 nameservers
   - Atualize no seu registrador de domínio

4. **Configure SSL**
   - Vá em "SSL/TLS"
   - Escolha "Full (strict)" ou "Flexible"

5. **Ative Always Use HTTPS**
   - Em "SSL/TLS" → "Edge Certificates"
   - Ative "Always Use HTTPS"

## 🔍 Verificando o Certificado SSL

### Como verificar se está funcionando

1. **Acesse seu site com HTTPS**

   ```text
   https://bebitterbebetter.com.br
   ```

2. **Procure pelo cadeado verde** 🔒
   - Clique no cadeado na barra de endereço
   - Verifique "Conexão segura"

3. **Use ferramentas online**
   - SSL Checker: <https://www.sslshopper.com/ssl-checker.html>
   - SSL Labs: <https://www.ssllabs.com/ssltest/>

## ⚠️ Redirecionamento HTTP → HTTPS

### Para Vercel

Adicione ao `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

### Para Hostinger

Adicione ao `.htaccess`:

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# HSTS Header
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## 🎯 Benefícios do SSL

✅ **Segurança**: Criptografa dados entre o usuário e o servidor
✅ **SEO**: Google prioriza sites com HTTPS
✅ **Confiança**: Mostra profissionalismo
✅ **Performance**: HTTP/2 requer HTTPS
✅ **PWA**: Necessário para Progressive Web Apps

## 🆘 Troubleshooting

### Problema: "Conexão não é privada"

- **Solução**: Aguarde propagação do DNS (até 48h)
- Limpe o cache do navegador

### Problema: Conteúdo misto (Mixed Content)

- **Solução**: Certifique-se que todos os recursos usam HTTPS
- Atualize links de HTTP para HTTPS no código

### Problema: Certificado expirado

- **Solução**:
  - Vercel/Cloudflare: Renovação automática
  - Hostinger: Verifique renovação do Let's Encrypt

## 📞 Suporte

- **Vercel**: <https://vercel.com/support>
- **Hostinger**: <https://www.hostinger.com.br/contato>
- **Cloudflare**: <https://support.cloudflare.com/>

---

🎉 **Pronto!** Seu site agora está seguro com HTTPS!
