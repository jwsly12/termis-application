# --- ESTÁGIO DE BUILD ---
FROM node:20-slim AS builder

WORKDIR /app

# 1. Copia os arquivos de lock para aproveitar o cache do Docker
COPY package*.json ./
# Copia os pacotes internos para o NPM resolver os workspaces
COPY artifacts/termis-web/package*.json ./artifacts/termis-web/
COPY lib/db/package*.json ./lib/db/

# 2. Instala as dependências (usando a flag que você testou com sucesso)
RUN npm install --legacy-peer-deps

# 3. Copia o resto do código
COPY . .

# 4. Roda o build do frontend
RUN npm run build --prefix artifacts/termis-web

# --- ESTÁGIO DE PRODUÇÃO ---
FROM docker.io/library/nginx:alpine
COPY --from=builder /app/artifacts/termis-web/dist/public /usr/share/nginx/html
COPY termis_project_web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]