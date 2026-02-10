# CyberAi Advanced Multi-Stage Dockerfile
# =======================================================
# Optimized for production with security best practices

# Stage 1: Base image with dependencies
FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    git \
    bash \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-workspace.yaml ./

# Stage 2: Dependencies installation
FROM base AS deps

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Stage 3: Development dependencies
FROM base AS dev-deps

# Install all dependencies including dev
RUN npm ci && npm cache clean --force

# Stage 4: Builder
FROM dev-deps AS builder

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Run tests (optional - comment out for faster builds)
RUN npm run typecheck
RUN npm test

# Stage 5: Production image
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Copy production dependencies from deps stage
COPY --chown=nodejs:nodejs --from=deps /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nodejs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/src/index.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Stage 6: Development image
FROM dev-deps AS development

# Install additional development tools
RUN apk add --no-cache \
    vim \
    curl \
    && rm -rf /var/cache/apk/*

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=development

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
