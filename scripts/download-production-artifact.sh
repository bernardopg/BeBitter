#!/usr/bin/env bash
set -euo pipefail

artifact_id=${1:?Artifact ID required}
digest=${2:?Artifact SHA-256 required}
[[ "$artifact_id" =~ ^[0-9]+$ && "$digest" =~ ^[a-f0-9]{64}$ ]]

scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' EXIT
gh api "repos/$GH_REPO/actions/artifacts/$artifact_id/zip" > "$scratch/artifact.zip"
printf '%s  %s\n' "$digest" "$scratch/artifact.zip" | sha256sum --check
test "$(unzip -Z1 "$scratch/artifact.zip")" = 'bebitter-dist.tar.gz'
unzip -p "$scratch/artifact.zip" bebitter-dist.tar.gz > "$scratch/bebitter-dist.tar.gz"
test "$(tar -xOf "$scratch/bebitter-dist.tar.gz" ./deploy-revision.txt)" = "$GITHUB_SHA"
mv -- "$scratch/bebitter-dist.tar.gz" bebitter-dist.tar.gz
