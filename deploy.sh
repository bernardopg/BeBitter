#!/bin/bash

# Script de Upload para Hostinger via FTP
# Configurações

FTP_HOST="ftp.bebitterbebetter.com.br"
FTP_USER="u762591502.bernardo"  # Credenciais configuradas
FTP_PASS="Bz@25370080!"  # Credenciais configuradas
REMOTE_DIR="public_html"
LOCAL_DIR="dist"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando upload para Hostinger...${NC}"

# Verificar se as credenciais estão configuradas
if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo -e "${RED}❌ Erro: Credenciais FTP não configuradas!${NC}"
    echo "Por favor, edite este script e adicione:"
    echo "FTP_USER=\"seu_usuario_ftp\""
    echo "FTP_PASS=\"sua_senha_ftp\""
    exit 1
fi

# Verificar se a pasta dist existe
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}❌ Pasta 'dist' não encontrada!${NC}"
    echo "Execute 'pnpm build' primeiro."
    exit 1
fi

echo -e "${YELLOW}📦 Fazendo build do projeto...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro no build!${NC}"
    exit 1
fi

echo -e "${YELLOW}📤 Conectando ao servidor FTP...${NC}"

# Upload usando lftp
lftp -u "$FTP_USER,$FTP_PASS" "$FTP_HOST" << EOF
set ftp:ssl-allow no
set ssl:verify-certificate no
set ftp:passive-mode on
cd $REMOTE_DIR
lcd $LOCAL_DIR
mirror --reverse --delete --verbose --parallel=5 .
bye
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Upload concluído com sucesso!${NC}"
    echo -e "${GREEN}🌐 Seu site está disponível em: https://bebitterbebetter.com.br${NC}"
else
    echo -e "${RED}❌ Erro durante o upload!${NC}"
    exit 1
fi
