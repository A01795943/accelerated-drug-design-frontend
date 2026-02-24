# Frontend Drug Accelerator: build con URL del backend por parámetro, sirve con nginx.
# Uso: docker build --build-arg API_URL=http://backend:8080 -t frontend .

FROM node:20-bookworm-slim AS builder

ARG API_URL

WORKDIR /app

# Dependencias (incluye devDependencies para el build)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Código y build con la URL del backend (configuración docker)
COPY . .

# Sustituir __API_URL__ en environment.docker.ts (sin depender de scripts/set-docker-env.js)
ENV API_URL=${API_URL}
RUN node -e "const fs=require('fs');const p='/app/src/environments/environment.docker.ts';let c=fs.readFileSync(p,'utf8');c=c.replace(/__API_URL__/g,(process.env.API_URL||'http://localhost:8080'));fs.writeFileSync(p,c);"

RUN npx ng build --configuration=docker

# Imagen final: nginx sirve los estáticos
# Si tu build no crea la subcarpeta browser, cambia a: COPY --from=builder /app/dist/larkon .
FROM nginx:alpine

COPY --from=builder /app/dist/larkon/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
