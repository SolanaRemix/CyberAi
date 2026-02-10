# CyberAi Site Dockerfile
# =======================================================
# Astro site build and deployment

FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

FROM base AS dev-deps
RUN npm ci && npm cache clean --force

FROM dev-deps AS builder
COPY . .
RUN npm run build

FROM nginx:alpine AS production
RUN apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Use default nginx config since this is for static files
# For custom config, mount it via docker-compose volumes

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
