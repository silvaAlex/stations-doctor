#dockerfile# ─── Stage 1: dependencies ────────────────────────────────────────────────────
FROM node:22.2-alpine3.20 AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --frozen-lockfile

# ─── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22.2-alpine3.20 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ─── Stage 3: production ──────────────────────────────────────────────────────
FROM node:22.2-alpine3.20 AS runner

ENV NODE_ENV=production

WORKDIR /app

# Cria usuário não-root antes de copiar arquivos
RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nodeuser

# Copia apenas o necessário da stage de build
COPY --from=builder --chown=nodeuser:nodejs /app/dist       ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/package*.json ./

# Instala apenas dependências de produção
RUN npm ci --frozen-lockfile --omit=dev

USER nodeuser

EXPOSE 3001

CMD ["node", "dist/index.js"]
