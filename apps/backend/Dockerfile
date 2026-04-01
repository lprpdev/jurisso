# Stage 1: Build
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile && pnpm rebuild argon2

COPY tsconfig.json nest-cli.json ./
COPY src/ ./src/

RUN pnpm run build

# Stage 2: Production
FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -g 1001 -S nestjs && \
    adduser -S nestjs -u 1001

COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nestjs /app/package.json ./package.json

USER nestjs

EXPOSE 3001

CMD ["dumb-init", "node", "dist/main"]
