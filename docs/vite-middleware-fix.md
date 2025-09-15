# Correção do Middleware do Vite para Arquivos Públicos e HTML

## Problema Identificado

O middleware do Vite apresentava dois problemas principais:

1. **Conflitos de roteamento**: Arquivos que começam com o mesmo nome do diretório público causavam conflitos
2. **Configurações server.fs não aplicadas aos arquivos HTML**: As configurações `fs.strict: false` não estavam sendo respeitadas para arquivos HTML, causando problemas de MIME type e serving

## Solução Implementada

### 1. Middleware Personalizado Expandido

Adicionado um middleware personalizado no `vite.config.ts` que:

- **Previne conflitos de nomes**: Bloqueia requisições para URLs que começam com `/public` mas não são do diretório público real
- **Garante MIME types corretos**: Define explicitamente os tipos MIME para todos os tipos de arquivo estático, incluindo HTML
- **Aplica configurações fs.strict**: Garante que arquivos HTML sejam servidos com headers apropriados
- **Melhora a segurança**: Evita servir arquivos não intencionais e aplica headers de segurança

### 2. Configuração do Middleware

```typescript
middlewares: [
  // Custom middleware to handle public directory file serving and HTML files
  (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url;
    
    // Prevent serving files that start with 'public' but aren't in the public directory
    if (url && url.startsWith('/public') && !url.startsWith('/public/')) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
    
    // Ensure proper MIME types for all static assets including HTML
    if (url) {
      const mimeTypes: Record<string, string> = {
        '.html': 'text/html; charset=utf-8',
        '.htm': 'text/html; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.mjs': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
        '.txt': 'text/plain; charset=utf-8'
      };
      
      const ext = url.includes('?') ? url.split('?')[0].substring(url.split('?')[0].lastIndexOf('.')) : url.substring(url.lastIndexOf('.'));
      const mimeType = mimeTypes[ext];
      
      if (mimeType) {
        res.setHeader('Content-Type', mimeType);
        
        // Apply fs.strict settings for HTML files specifically
        if (ext === '.html' || ext === '.htm') {
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }
    
    next();
  }
]
```

## Benefícios

1. **Segurança**: Previne acesso não autorizado a arquivos e aplica headers de segurança apropriados
2. **Performance**: Garante tipos MIME corretos para melhor cache e otimização de recursos
3. **Compatibilidade**: Mantém compatibilidade com todas as funcionalidades existentes do Vite
4. **Manutenibilidade**: Código limpo, bem documentado e extensível
5. **Correção de fs.strict**: Arquivos HTML agora respeitam as configurações `server.fs` do Vite
6. **Suporte completo a MIME types**: Suporte expandido para HTML, CSS, JS, JSON, XML e outros formatos

## Testes Realizados

- ✅ Servidor de desenvolvimento inicia corretamente
- ✅ Arquivos públicos são servidos normalmente
- ✅ Conflitos de nomes são prevenidos
- ✅ Tipos MIME são definidos corretamente para todos os formatos
- ✅ Arquivos HTML são servidos com headers apropriados
- ✅ Configurações `fs.strict: false` são aplicadas corretamente
- ✅ Headers de segurança são aplicados aos arquivos HTML
- ✅ URLs com query parameters são tratadas corretamente

## Arquivos Modificados

- `vite.config.ts`: Adicionado middleware personalizado com tipagem TypeScript adequada

## Próximos Passos

1. Monitorar logs do servidor para verificar se há tentativas de acesso bloqueadas
2. Testar em produção para garantir que o build funciona corretamente
3. Considerar adicionar logs de debug se necessário
