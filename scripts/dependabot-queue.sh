#!/usr/bin/env bash
set -euo pipefail
repo="repos/$GH_REPO"
title='BeBitter: Dependabot precisa de intervenção'
required=('Lint, Test and Build' 'Check dependency changes' 'Analyze (javascript-typescript) (javascript-typescript)')
issues=()
ready=()
behind=()
main=$(gh api "$repo/branches/main" --jq .commit.sha)
prs=$(gh api --paginate "$repo/pulls?state=open&base=main&per_page=100" |
  jq -sc --arg repo "$GH_REPO" 'add | map(select(.user.login == "dependabot[bot]" and
    .head.repo.full_name == $repo and (.head.ref | startswith("dependabot/")) and (.draft | not))) | sort_by(.number)[]')

report() {
  if (( ${#issues[@]} )); then
    body=$(printf '%s\n' "A fila continua processando atualizações independentes. Corrija os itens abaixo para liberar estes PRs." '' "${issues[@]}")
    bash scripts/automation-issue.sh "$title" "$body"
  else
    bash scripts/automation-issue.sh "$title"
  fi
}

while IFS= read -r pr; do
  [[ -n $pr ]] || continue
  number=$(jq -r .number <<< "$pr")
  url=$(jq -r .html_url <<< "$pr")
  sha=$(jq -r .head.sha <<< "$pr")
  branch=$(jq -r .head.ref <<< "$pr")
  pr=$(gh api "$repo/pulls/$number")
  [[ $(jq -r .state <<< "$pr") == open && $(jq -r .head.sha <<< "$pr") == "$sha" ]] || continue
  state=$(jq -r .mergeable_state <<< "$pr")
  [[ $state != unknown ]] || continue

  authors=$(gh api --paginate "$repo/pulls/$number/commits" --jq '.[].author.login // "unknown"' | sort -u)
  changes=$(gh api --paginate "$repo/pulls/$number/files" | jq -sc add)
  files=$(jq -r '.[].filename' <<< "$changes")
  case "$branch" in
    dependabot/npm_and_yarn/*) allowed='^(package\.json|pnpm-lock\.yaml)$' ;;
    dependabot/github_actions/*) allowed='^\.github/(workflows/[^/]+\.ya?ml|actions/.+/action\.ya?ml)$' ;;
    *) allowed='^$' ;;
  esac
  if [[ "$authors" != 'dependabot[bot]' || -z "$files" ]] || grep -qEv "$allowed" <<< "$files"; then
    issues+=("- [#$number]($url) contém commits ou arquivos fora do escopo da atualização.")
    continue
  fi

  if [[ $branch == dependabot/github_actions/* ]] && ! jq -e '
    def changed($prefix):
      split("\n") | map(select(startswith($prefix)) | .[1:]);
    def uses_only:
      length > 0 and all(test("^[[:space:]]*(-[[:space:]]+)?uses: [^[:space:]@]+@[^[:space:]]+"));
    all(.[]; .status == "modified" and (.patch | type) == "string" and (
      (.patch | changed("-")) as $before |
      (.patch | changed("+")) as $after |
      ($before | uses_only) and ($after | uses_only) and
      ($before | map(sub("@.*$"; "")) | sort) == ($after | map(sub("@.*$"; "")) | sort)
    ))' <<< "$changes" >/dev/null; then
    issues+=("- [#$number]($url) modifica workflows além das referências de versão das Actions.")
    continue
  fi

  if [[ $state == dirty ]]; then
    issues+=("- [#$number]($url) tem conflito. Tente @dependabot recreate ou revise o lockfile.")
    continue
  fi
  if [[ $(gh api "$repo/compare/$main...$sha" --jq .behind_by) != 0 ]]; then
    behind+=("$number")
    continue
  fi

  # A rebase performed by GITHUB_TOKEN may leave same-repo PR runs waiting
  # for approval. Only approve runs from the validated bot branch and SHA.
  runs=$(gh api --method GET "$repo/actions/runs" -f event=pull_request -f branch="$branch" -f head_sha="$sha" -F per_page=100)
  while IFS= read -r id; do
    [[ -n $id ]] || continue
    gh api --method POST "$repo/actions/runs/$id/approve" >/dev/null ||
      issues+=("- [#$number]($url) aguarda a [liberação do CI]($GITHUB_SERVER_URL/$GH_REPO/actions/runs/$id).")
  done < <(jq -r --arg repo "$GH_REPO" '.workflow_runs[] | select(
    .head_repository.full_name == $repo and (.status == "action_required" or .conclusion == "action_required") and
    (.path == ".github/workflows/ci.yml" or .path == ".github/workflows/dependency-review.yml" or
     .path == ".github/workflows/codeql-eslint-nodejs.yml")) | .id' <<< "$runs")

  checks=$(gh api "$repo/commits/$sha/check-runs?filter=latest&per_page=100")
  waiting=0
  for name in "${required[@]}"; do
    check=$(jq -c --arg name "$name" '[.check_runs[] | select(.app.id == 15368 and .name == $name)] | max_by(.id) // {}' <<< "$checks")
    if [[ $(jq -r .status <<< "$check") != completed ]]; then
      waiting=1
    elif [[ $(jq -r .conclusion <<< "$check") != success ]]; then
      issues+=("- [#$number]($url) falhou em [$name]($(jq -r .html_url <<< "$check")).")
      waiting=1
    fi
  done

  if (( waiting )); then
    committed=$(gh api "$repo/commits/$sha" --jq .commit.committer.date)
    if [[ $(date -d "$committed" +%s) -lt $(date -d '6 hours ago' +%s) ]] &&
       jq -e '.workflow_runs | all(.status == "completed")' <<< "$runs" >/dev/null &&
       [[ " ${issues[*]} " != *"[#$number]"* ]]; then
      issues+=("- [#$number]($url) espera há mais de seis horas por checks obrigatórios.")
    fi
  elif [[ $state == clean ]]; then
    ready+=("$number:$sha")
  else
    issues+=("- [#$number]($url) está bloqueado pela proteção da main (estado $state).")
  fi
done <<< "$prs"

trap report EXIT

# Nothing can advance until the actual main SHA has a successful deploy and release.
delivery=$(gh api "$repo/actions/workflows/deploy.yml/runs?branch=main&head_sha=$main&per_page=100" |
  jq -c --arg title "Production $main" '[.workflow_runs[] | select(.display_title == $title)] | first // {}')
if [[ $delivery == '{}' ]]; then
  gh workflow run deploy.yml --ref main
  exit 0
fi
if [[ $(jq -r .conclusion <<< "$delivery") == cancelled ]]; then
  gh workflow run deploy.yml --ref main
  exit 0
fi
[[ $(jq -r .conclusion <<< "$delivery") == success ]] || exit 0
[[ $(gh api "$repo/branches/main" --jq .commit.sha) == "$main" ]] || exit 0

if (( ${#ready[@]} )); then
  IFS=: read -r number sha <<< "${ready[0]}"
  gh pr merge "$number" --squash --match-head-commit "$sha"
  # GITHUB_TOKEN suppresses the push workflow. Explicit dispatch starts delivery.
  gh workflow run deploy.yml --ref main
elif (( ${#behind[@]} )); then
  number=${behind[0]}
  if ! gh pr update-branch "$number" --rebase; then
    issues+=("- [#$number]($GITHUB_SERVER_URL/$GH_REPO/pull/$number) não pôde ser rebaseado. Revise o PR ou peça @dependabot recreate.")
    exit 1
  fi
fi
