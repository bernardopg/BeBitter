#!/usr/bin/env tsx
/**
 * Pré-render (SSG): injeta o HTML de cada rota dentro do #root no dist.
 *
 * O site continua sendo uma SPA — não existe servidor Node em produção. A
 * diferença é que o HTML servido já traz o conteúdo pintável, então o primeiro
 * paint não espera o bundle baixar e executar; o React hidrata em cima desse
 * markup em vez de montar do zero.
 *
 * Roda depois de `route-html:gen`, e reaproveita os arquivos que ele gerou como
 * lista de rotas — assim a lista de rotas continua tendo uma fonte única.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

const EMPTY_ROOT = /<div id="root">\s*<\/div>/;

/** Todo dist/**\/index.html vira uma rota: dist/blog/index.html -> /blog */
function findRouteHtmlFiles(dir: string): string[] {
  const found: string[] = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      found.push(...findRouteHtmlFiles(full));
    } else if (item.name === "index.html") {
      found.push(full);
    }
  }
  return found;
}

function routeFromFile(file: string): string {
  const rel = path.relative(DIST, path.dirname(file));
  return rel === "" ? "/" : `/${rel.split(path.sep).join("/")}`;
}

/**
 * Reescreve os .gz/.br do HTML.
 *
 * O vite-plugin-compression comprime no fim do build do client — antes deste
 * script. Sem isto, dist/index.html.gz continuaria com a versão de #root vazio:
 * um artefato que diz ser o mesmo recurso mas tem outro conteúdo, e qualquer
 * servidor que sirva pré-comprimido (LiteSpeed, nginx gzip_static) entregaria o
 * HTML sem pré-render. Foi assim que o `vite preview` local mentiu.
 */
function recompress(file: string, html: string): void {
  const buffer = Buffer.from(html, "utf-8");

  fs.writeFileSync(`${file}.gz`, zlib.gzipSync(buffer, { level: 9 }));
  fs.writeFileSync(
    `${file}.br`,
    zlib.brotliCompressSync(buffer, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buffer.length,
      },
    }),
  );
}

async function main() {
  if (!fs.existsSync(SSR_ENTRY)) {
    console.error(
      `❌ ${path.relative(ROOT, SSR_ENTRY)} não encontrado — rode "pnpm build:ssr" antes`,
    );
    process.exit(1);
  }

  const { render } = (await import(SSR_ENTRY)) as {
    render: (url: string) => Promise<string>;
  };

  const files = findRouteHtmlFiles(DIST);
  let done = 0;
  let skipped = 0;
  let shellTemplate: string | null = null;

  for (const file of files) {
    const route = routeFromFile(file);
    const template = fs.readFileSync(file, "utf-8");
    if (route === "/") {
      shellTemplate = template;
    }

    if (!EMPTY_ROOT.test(template)) {
      // Sem o container vazio não há onde injetar, e sobrescrever às cegas
      // quebraria a hidratação. Melhor pular alto e claro.
      console.warn(`  ! ${route} — #root não encontrado, pulado`);
      skipped++;
      continue;
    }

    const appHtml = await render(route);
    const html = template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`);
    fs.writeFileSync(file, html, "utf-8");
    recompress(file, html);
    done++;
    console.log(`  ✓ ${route}`);
  }

  writeAppShell(shellTemplate);

  console.log(`\n✅ ${done} rotas pré-renderizadas${skipped ? ` (${skipped} puladas)` : ""}`);
}

/**
 * Guarda o template sem pré-render como app-shell.html.
 *
 * O .htaccess serve este arquivo para URLs que não viraram arquivo no build.
 * São dois casos: 404 de verdade, e rotas legítimas que só existem em runtime
 * (/projects/<repo> resolvido pela API do GitHub). Nos dois, qualquer markup
 * pré-renderizado estaria errado — servir a home faria o usuário ver a home
 * antes do 404, e o React acusaria divergência ao hidratar. Com o #root vazio o
 * cliente monta do zero, que é o comportamento correto para rota desconhecida.
 */
function writeAppShell(template: string | null): void {
  if (!template) {
    console.warn("  ! dist/index.html não encontrado — app-shell.html não gerado");
    return;
  }

  const shellPath = path.join(DIST, "app-shell.html");
  fs.writeFileSync(shellPath, template, "utf-8");
  recompress(shellPath, template);
  console.log("  ✓ app-shell.html (fallback de rotas não pré-renderizadas)");
}

main()
  .then(() => {
    // O bundle da app deixa timers e listeners vivos (react-query, efeitos de
    // UI). Nada disso importa depois que o HTML foi escrito, mas segura o event
    // loop e travaria o build — saímos explicitamente.
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erro no pré-render:", err);
    process.exit(1);
  });
