#!/usr/bin/env bash
set -euo pipefail
version_pattern='^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$'

latest_version() {
  git tag --list --sort=-version:refname "$@" | { grep -E "$version_pattern" || true; } | sed -n '1p'
}

tag=$(latest_version --points-at "$GITHUB_SHA")
if [[ ${1:-} == --tag-at-head ]]; then
  printf '%s\n' "$tag"
  exit 0
fi
if [[ -z $tag ]]; then
  latest=$(latest_version)
  if [[ $latest =~ $version_pattern ]]; then
    tag="v${BASH_REMATCH[1]}.${BASH_REMATCH[2]}.$(( BASH_REMATCH[3] + 1 ))"
  else
    tag=v0.0.1
  fi
  # Reserve the version against this SHA so a retry after an upload failure reuses it.
  gh api --method POST "repos/$GH_REPO/git/refs" -f "ref=refs/tags/$tag" -f "sha=$GITHUB_SHA" >/dev/null
fi

asset="bebitter-dist-$tag.tar.gz"
cp bebitter-dist.tar.gz "$asset"
if release=$(gh release view "$tag" --json isDraft,assets 2>/dev/null); then
  if ! jq -e --arg name "$asset" 'any(.assets[]; .name == $name and .size > 0)' <<< "$release" >/dev/null; then
    gh release upload "$tag" "$asset" --clobber
  fi
  if jq -e .isDraft <<< "$release" >/dev/null; then
    gh release edit "$tag" --draft=false
  fi
else
  gh release create "$tag" --verify-tag --title "$tag" --generate-notes "$asset"
fi
printf '### Release [%s](%s/%s/releases/tag/%s)\n' "$tag" "$GITHUB_SERVER_URL" "$GH_REPO" "$tag" >> "$GITHUB_STEP_SUMMARY"
