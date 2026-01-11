# Base stage
FROM node:20-alpine AS base

# Development/Build stage
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
# Ensure adapter-pg and other dependencies required at runtime are present
# npm ci --only=production handles regular dependencies, but we need to make sure prisma generate result is compatible
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
