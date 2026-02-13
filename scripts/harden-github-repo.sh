#!/usr/bin/env bash
set -euo pipefail

OWNER="${1:-bernardopg}"
REPO="${2:-BeBitter}"
DEFAULT_BRANCH="${3:-main}"
FULL_REPO="${OWNER}/${REPO}"

echo "Applying GitHub hardening for ${FULL_REPO}..."
gh auth status >/dev/null

echo "Updating repository settings..."
gh api -X PATCH "repos/${FULL_REPO}" \
  -f description="Portfolio profissional de Bernardo Gomes com React, TypeScript e foco em performance." \
  -f homepage="https://bebitterbebetter.com.br" \
  -F has_issues=true \
  -F has_projects=false \
  -F has_wiki=false \
  -F has_discussions=true \
  -F allow_squash_merge=true \
  -F allow_merge_commit=false \
  -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true \
  -F web_commit_signoff_required=true \
  >/dev/null

echo "Updating repository topics..."
gh api -X PUT "repos/${FULL_REPO}/topics" \
  -H "Accept: application/vnd.github+json" \
  -f "names[]=portfolio" \
  -f "names[]=react" \
  -f "names[]=typescript" \
  -f "names[]=vite" \
  -f "names[]=frontend" \
  -f "names[]=performance" \
  >/dev/null

echo "Enabling security features..."
gh api -X PUT "repos/${FULL_REPO}/vulnerability-alerts" \
  -H "Accept: application/vnd.github+json" \
  >/dev/null
gh api -X PUT "repos/${FULL_REPO}/automated-security-fixes" \
  -H "Accept: application/vnd.github+json" \
  >/dev/null

echo "Applying branch protection on ${DEFAULT_BRANCH}..."
tmp_payload="$(mktemp)"
cat >"${tmp_payload}" <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "CI / Lint, Test and Build (Node 20.x)",
      "CI / Lint, Test and Build (Node 22.x)",
      "CodeQL / Analyze (javascript-typescript)",
      "Dependency Review / Check dependency changes"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": true
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "lock_branch": false,
  "allow_fork_syncing": true
}
EOF

gh api -X PUT "repos/${FULL_REPO}/branches/${DEFAULT_BRANCH}/protection" \
  -H "Accept: application/vnd.github+json" \
  --input "${tmp_payload}" \
  >/dev/null

rm -f "${tmp_payload}"
echo "GitHub hardening complete for ${FULL_REPO}."
