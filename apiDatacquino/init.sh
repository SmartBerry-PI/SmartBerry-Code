#!/bin/bash
echo "Criando configurações de inicialização da DATACQUINO..."
echo "Configure arquivo de configuração '.env' abaixo"

read -p "Insira o host: " HOST
read -p "Insira o user: " USER
read -s -p "Insira a senha do $USER: " SENHA
read -p "Insira o database: " DATABASE
read -p "Insira a porta do banco: " PORTA
read -p "Insira o id da empresa para inserção: " EMPRESA
read -p "Insira a quantidade de canteiros: " CANTEIROS
read -p "Insira a quantidade de sensores: " SENSORES

cat > '.env' <<EOF
DB_HOST = '$HOST'
DB_USER = '$USER'
DB_SENHA = '$SENHA'
DB_DATABASE = '$DATABASE'
DB_PORT = $PORTA
ID_EMPRESA = $EMPRESA
QTD_CANTEIROS = $CANTEIROS
QTD_SENSORES = $SENSORES
EOF
