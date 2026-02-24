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

# Sustituir __API_URL__ en environment.docker.ts (busca en /app o subcarpetas; si no existe, lo crea)
ENV API_URL=${API_URL}
RUN set -e && \
  envDir=$(find /app -type d -name environments -path '*/src/*' | head -1) && \
  [ -n "$envDir" ] || (echo "ERROR: carpeta src/environments no encontrada" && exit 1) && \
  envFile="$envDir/environment.docker.ts" && \
  if [ ! -f "$envFile" ]; then echo "export const environment = { production: true, apiUrl: '__API_URL__' };" > "$envFile"; fi && \
  ENV_FILE="$envFile" node -e "const fs=require('fs');const p=process.env.ENV_FILE;let c=fs.readFileSync(p,'utf8');c=c.replace(/__API_URL__/g,process.env.API_URL||'http://localhost:8080');fs.writeFileSync(p,c);"

# Build desde el directorio que tenga angular.json (raíz o subcarpeta) y dejar salida en /app/dist-out
RUN buildRoot=$(dirname $(find /app -name 'angular.json' -type f | head -1)) && \
  cd "$buildRoot" && npx ng build --configuration=docker && \
  mkdir -p /app/dist-out && \
  (cp -r dist/larkon/browser/* /app/dist-out/ 2>/dev/null || cp -r dist/larkon/* /app/dist-out/)

# Dejar nginx.conf en ruta fija (solo copiar si está en otra ruta; si no existe, crear uno por defecto)
RUN f=$(find /app -name 'nginx.conf' -type f | head -1) && \
  if [ -n "$f" ] && [ "$f" != "/app/nginx.conf" ]; then cp "$f" /app/nginx.conf; elif [ ! -f /app/nginx.conf ]; then echo 'server{listen 80;server_name localhost;root /usr/share/nginx/html;index index.html;location /{try_files $uri $uri/ /index.html;}}' > /app/nginx.conf; fi

# Imagen final: nginx sirve los estáticos
FROM nginx:alpine

COPY --from=builder /app/dist-out /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
