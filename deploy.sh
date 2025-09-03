#!/usr/bin/env bash
set -euo pipefail

# BeBitter - Deploy script (Hostinger FTP)
# Flow:
#  1. pnpm build
#  2. Upload dist/ to remote via lftp mirror --delete
#
# Required environment variables (do NOT hardcode secrets):
#  - FTP_HOST
#  - FTP_USER
#  - FTP_PASS
# Optional:
#  - FTP_PORT        (default: 21)
#  - FTP_REMOTE_DIR  (default: .)  # e.g., "public_html"
#  - LFTP_PARALLEL   (default: 4)
#  - LFTP_SSL        (default: no) # set to "yes" to try FTPS
#  - LFTP_EXTRA      (additional lftp commands; optional)

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"

# Dependencies
if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed or not in PATH." >&2
  exit 1
fi
if ! command -v lftp >/dev/null 2>&1; then
  echo "Error: lftp is not installed. Please install lftp and re-run." >&2
  exit 1
fi

# Required secrets (do not print values)
: "${FTP_HOST:?Missing FTP_HOST}"
: "${FTP_USER:?Missing FTP_USER}"
: "${FTP_PASS:?Missing FTP_PASS}"
FTP_PORT="${FTP_PORT:-21}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-.}"
LFTP_PARALLEL="${LFTP_PARALLEL:-4}"
LFTP_SSL="${LFTP_SSL:-no}"

echo "==> Building production bundle (pnpm build)"
pnpm build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Error: build output not found at $DIST_DIR" >&2
  exit 1
fi

echo "==> Deploying dist/ to $FTP_USER@$FTP_HOST:$FTP_REMOTE_DIR (port $FTP_PORT)"

# Prepare remote directory commands if needed
REMOTE_DIR_CMDS=""
if [[ "$FTP_REMOTE_DIR" != "." && -n "$FTP_REMOTE_DIR" ]]; then
  # Use mkdir -p and cd into target dir
  REMOTE_DIR_CMDS=$(printf 'mkdir -p "%s"\ncd "%s"\n' "$FTP_REMOTE_DIR" "$FTP_REMOTE_DIR")
fi

# Execute lftp with strict failure on command errors
lftp -u "$FTP_USER","$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<LFTP_CMDS
set cmd:fail-exit yes
set ftp:ssl-allow $LFTP_SSL
set ssl:verify-certificate no
set ftp:passive-mode on
set net:max-retries 2
set net:reconnect-interval-base 5
set net:timeout 60
${LFTP_EXTRA:-}
${REMOTE_DIR_CMDS}
# Mirror local dist/ to remote dir, removing files not present locally
mirror -R --verbose --delete --parallel=$LFTP_PARALLEL "$DIST_DIR" .
bye
LFTP_CMDS

echo "==> Deploy completed successfully"
