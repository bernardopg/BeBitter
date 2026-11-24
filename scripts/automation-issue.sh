#!/usr/bin/env bash
set -euo pipefail
title=$1
body=${2:-}
current=$(gh api --paginate "repos/$GH_REPO/issues?state=open&per_page=100" |
  jq -s -c --arg title "$title" 'add | map(select(.title == $title and .user.login == "github-actions[bot]" and (.pull_request | not))) | first // empty')

if [[ -z $body ]]; then
  if [[ -n $current ]]; then gh issue close "$(jq -r .number <<< "$current")"; fi
elif [[ -z $current ]]; then
  gh issue create --title "$title" --body "$body" --assignee "$OWNER"
elif [[ $(jq -r .body <<< "$current") != "$body" ]]; then
  gh issue edit "$(jq -r .number <<< "$current")" --body "$body"
fi
