FROM node:20-alpine

# 1. Instala apenas o Nest CLI (npm já vem no Node)
RUN npm install -g @nestjs/cli

WORKDIR /app

# 2. Copia as configurações do Workspace (npm utiliza o lock do npm)
COPY package.json package-lock.json tsconfig.base.json tsconfig.json ./

# 3. Copia a LIB e a API (Necessário para o build)
COPY lib ./lib
COPY termis_project_api ./termis_project_api

# 4. Instala as dependências usando npm workspaces
# O --legacy-peer-deps ajuda com conflitos de versão se houver
RUN npm install --legacy-peer-deps

# 5. Executa o build dentro da pasta da API
WORKDIR /app/termis_project_api
RUN nest build

# 6. Exposição e Inicialização
EXPOSE 3000

# O comando roda o main.js da pasta dist
CMD ["node", "/app/termis_project_api/dist/main.js"]