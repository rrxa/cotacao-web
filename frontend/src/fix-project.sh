#!/bin/bash

# Definição do diretório base do projeto
BASE_DIR=~/cotacao-web/frontend
SRC_DIR="$BASE_DIR/src"
ASSETS_DIR="$SRC_DIR/assets"
CSS_DIR="$ASSETS_DIR/css"
COMPONENTS_DIR="$SRC_DIR/components"
PAGES_DIR="$SRC_DIR/pages"

echo "🔍 Iniciando verificação e correção do projeto..."

# 1. Criar apenas as pastas corretas
echo "📁 Verificando estrutura de diretórios..."
mkdir -p "$PAGES_DIR"
mkdir -p "$COMPONENTS_DIR"
mkdir -p "$CSS_DIR"

# 2. Definir os arquivos essenciais
declare -A files=(
    ["pages/EMinuta.js"]=""
    ["pages/Rastreio.js"]=""
    ["components/Navbar.css"]=""
    ["assets/css/custom-style.css"]=""
)

# 3. Criar arquivos ausentes
echo "📂 Criando arquivos ausentes..."
for file in "${!files[@]}"; do
    FILE_PATH="$SRC_DIR/$file"
    if [[ ! -f "$FILE_PATH" ]]; then
        touch "$FILE_PATH"
        echo "✅ Criado: $file"
    else
        echo "ℹ️ Já existe: $file"
    fi
done

# 4. Remover arquivos desnecessários
echo "🗑️ Removendo arquivos desnecessários..."
find "$SRC_DIR" -type f \( -name "*.tmp" -o -name "*.bak" -o -name "*.log" -o -name "*.DS_Store" \) -exec rm -f {} \;
