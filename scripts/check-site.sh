#!/usr/bin/env bash
set -euo pipefail
site=${1%/}
dist=${2:-}
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' EXIT
query="?site-check=$(date +%s%N)"

fetch() {
  local route=$1 output=$2 type=$3
  local actual
  actual=$(curl --fail --silent --show-error --connect-timeout 8 --max-time 20 \
    --retry 2 --retry-all-errors --retry-max-time 45 -H 'Cache-Control: no-cache' \
    --output "$output" --write-out '%{content_type}' "$site$route$query")
  if [[ $type == text/javascript && $actual == application/javascript* ]]; then return 0; fi
  [[ $actual == "$type"* ]] || { echo "$route: Content-Type inesperado ($actual)" >&2; return 1; }
}

for route in / /blog/ /services/ /now/; do
  fetch "$route" "$scratch/page" text/html
  grep -Fq '<h1' "$scratch/page"
  if grep -Fq '<div id="root"></div>' "$scratch/page"; then
    echo "$route: conteúdo pré-renderizado ausente" >&2
    exit 1
  fi
  printf '%s OK\n' "$route"
  if [[ $route == / ]]; then cp "$scratch/page" "$scratch/home"; fi
done

fetch /robots.txt "$scratch/robots" text/plain
grep -Fq 'Sitemap:' "$scratch/robots"
fetch /sitemap.xml "$scratch/sitemap" application/xml
grep -Fq '<urlset' "$scratch/sitemap"
fetch /feed.xml "$scratch/feed" application/xml
grep -Fq '<rss' "$scratch/feed"

assets_from() {
  grep -oE '(src|href)="/assets/[^"]+\.(js|css)"' "$1" | cut -d '"' -f 2 | sort -u
}
assets_from "$scratch/home" > "$scratch/assets"
grep -q '\.js$' "$scratch/assets"
grep -q '\.css$' "$scratch/assets"
if [[ -n $dist ]]; then
  assets_from "$dist/index.html" > "$scratch/expected"
  diff -u "$scratch/expected" "$scratch/assets"
  if [[ -f $dist/deploy-revision.txt ]]; then
    fetch /deploy-revision.txt "$scratch/revision" text/plain
    cmp "$dist/deploy-revision.txt" "$scratch/revision"
  fi
fi

while IFS= read -r asset; do
  type=text/css
  if [[ $asset == *.js ]]; then type=text/javascript; fi
  fetch "$asset" "$scratch/asset" "$type"
  if [[ -n $dist ]]; then cmp "$dist$asset" "$scratch/asset"; fi
done < "$scratch/assets"
echo 'Rotas, metadados e assets verificados.'
