# Frontend Drug Accelerator: build con URL del backend por parámetro, sirve con nginx.
# Uso: docker build --build-arg API_URL=http://backend:8080 -t frontend .

ARG API_URL

FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Dependencias (incluye devDependencies para el build)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Código y build con la URL del backend (configuración docker)
COPY . .

# API_URL la usa scripts/set-docker-env.js (referenciada por build:docker)
ENV API_URL=${API_URL}
RUN npm run build:docker

# Imagen final: nginx sirve los estáticos
# Si tu build no crea la subcarpeta browser, cambia a: COPY --from=builder /app/dist/larkon .
FROM nginx:alpine

COPY --from=builder /app/dist/larkon/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
