#!/usr/bin/env bash
set -euo pipefail

# BeBitter - Deploy script (Hostinger FTP)
# Improved version that properly handles FTP directory structure
#
# Required environment variables:
#  - FTP_HOST
#  - FTP_USER  
#  - FTP_PASS
# Optional:
#  - FTP_PORT        (default: 21)
#  - FTP_REMOTE_DIR  (default: public_html)
#  - LFTP_PARALLEL   (default: 4)
#  - DELETE          (default: true) - set to false for safe test runs

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"

# Load environment variables
if [[ -f ".env.deploy" ]]; then
  set -a
  source ./.env.deploy
  set +a
else
  echo "Warning: .env.deploy not found, using environment variables" >&2
fi

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
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-.}"  # Default to current directory since FTP lands in public_html
LFTP_PARALLEL="${LFTP_PARALLEL:-4}"
DELETE="${DELETE:-true}"

echo "==> Building production bundle (pnpm build)"
pnpm build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Error: build output not found at $DIST_DIR" >&2
  exit 1
fi

# Determine deletion flag for mirror command
if [[ "$DELETE" == "true" ]]; then
  DELETE_FLAG="--delete"
  echo "==> DELETE mode: Will remove files not in dist/"
else
  DELETE_FLAG=""
  echo "==> SAFE mode: Will NOT delete remote files (test mode)"
fi

echo "==> Deploying dist/ to $FTP_USER@$FTP_HOST:$FTP_REMOTE_DIR (port $FTP_PORT)"

# Build the cd command if needed
CD_CMD=""
if [[ "$FTP_REMOTE_DIR" != "." ]]; then
  CD_CMD="cd $FTP_REMOTE_DIR"
fi

# Execute lftp with proper directory handling
lftp -u "$FTP_USER","$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<LFTP_CMDS
set cmd:fail-exit yes
set ftp:ssl-allow no
set ssl:verify-certificate no
set ftp:passive-mode on
set net:max-retries 2
set net:reconnect-interval-base 5
set net:timeout 60
set xfer:clobber yes

# Show current directory (should be public_html on Hostinger)
echo "Current FTP directory:"
pwd

# Navigate if needed
$CD_CMD

# Show final directory
echo "Deploying to:"
pwd

# Mirror local dist/ to remote directory
mirror -R --verbose $DELETE_FLAG --parallel=$LFTP_PARALLEL "$DIST_DIR" .

bye
LFTP_CMDS

echo "==> Deploy completed successfully"
if [[ "$DELETE" != "true" ]]; then
  echo "==> This was a SAFE test run. To deploy with deletion:"
  echo "    DELETE=true ./deploy.sh"
fi
