# =============================================================================
# GuiMah Studio — production image
#
# Two stages so the runtime image doesn't carry Node or npm:
#   1. "build" runs the Vite build.
#   2. "runtime" is Caddy serving the resulting dist/ over HTTPS.
#
# Rebuild:  docker build -t guimah-site .
# Run:      docker run -p 80:80 -p 443:443 -v caddy_data:/data guimah-site
#
# The /data volume is where Caddy stores its Let's Encrypt account key and the
# issued certificates — keep it persistent between deploys or you'll hit the
# ACME rate limit re-issuing on every restart.
# =============================================================================

# ---------- 1. build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy manifests first so npm ci is cached until dependencies actually change.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build


# ---------- 2. runtime ----------
FROM caddy:2.8-alpine AS runtime

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

# Caddy needs write access to /data (certs) and /config (managed state).
# The base image already declares these as volumes; nothing more to do here.

EXPOSE 80 443

# Same check compose declares, so a plain `docker run` reports health too.
# Port 8081 is the loopback-only endpoint in the Caddyfile — deliberately not
# the public site, which requires the real hostname and a valid certificate.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1:8081/ || exit 1

# Caddy's default CMD reads /etc/caddy/Caddyfile — no override needed.
