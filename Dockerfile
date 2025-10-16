# Imagem base leve
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install --production

# Copiar código da aplicação
COPY . .

# Expor porta usada pela aplicação
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "start"]
