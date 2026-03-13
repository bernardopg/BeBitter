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
  -F has_downloads=false \
  -F has_discussions=false \
  -F allow_squash_merge=true \
  -F allow_merge_commit=false \
  -F allow_rebase_merge=false \
  -F allow_auto_merge=true \
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

echo "Ensuring standard labels exist..."
gh label create "dependencies" \
  --repo "${FULL_REPO}" \
  --color "0366d6" \
  --description "Pull requests that update a dependency file" \
  --force \
  >/dev/null
gh label create "npm" \
  --repo "${FULL_REPO}" \
  --color "5319e7" \
  --description "Pull requests that update npm dependencies" \
  --force \
  >/dev/null
gh label create "github-actions" \
  --repo "${FULL_REPO}" \
  --color "1d76db" \
  --description "Pull requests that update GitHub Actions workflows" \
  --force \
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
    "checks": [
      {
        "context": "Lint, Test and Build (Node 20.x)",
        "app_id": 15368
      },
      {
        "context": "Lint, Test and Build (Node 22.x)",
        "app_id": 15368
      },
      {
        "context": "Analyze (javascript-typescript) (javascript-typescript)",
        "app_id": 15368
      },
      {
        "context": "Check dependency changes",
        "app_id": 15368
      }
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0,
    "require_last_push_approval": false
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
