FROM node:20-bookworm AS builder
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm i && npm install @types/nodemailer &&  npm install nodemailer


COPY . ./
RUN npm run build
RUN npm prune --omit=dev

# ---- Final ----
FROM node:20-bookworm-slim AS final
ENV NODE_ENV=production
WORKDIR /app



RUN apt-get update && apt-get install -y --no-install-recommends \
    fontconfig libfontconfig1 libfreetype6 \
    libxrender1 libxext6 libx11-6 libxau6 libxdmcp6 \
    libxcb1 libx11-xcb1 \
    libjpeg62-turbo libpng16-16 ca-certificates \
    fonts-dejavu-core \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1001 appuser

RUN mkdir -p /app/storage/document/template/preview /app/storage/document/data \
  && chown -R appuser:appuser /app

COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --from=builder --chown=appuser:appuser /app/storage ./storage
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/package*.json ./

USER appuser
EXPOSE 4000

CMD ["npm", "run", "start-trace"]
