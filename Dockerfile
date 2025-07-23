# Dockerfile optimizado para Next.js

# Etapa 1: Dependencias
FROM node:20-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Etapa 2: Build
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar dependencias
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Build de la aplicación
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Etapa 3: Runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]