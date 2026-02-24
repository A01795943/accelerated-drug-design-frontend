# Frontend — Drug Accelerator

Interfaz web del proyecto **Drug Accelerator** (diseño acelerado de fármacos). Permite gestionar proyectos, definir proteína diana y complejo, ejecutar backbones (RFdiffusion) y trabajos de generación de secuencias, visualizar estructuras PDB y comparar métricas.

## Qué hace esta aplicación

- **Lista de proyectos**: Ver todos los proyectos y acceder al detalle de cada uno.
- **Crear proyecto**: Alta de proyectos con nombre, descripción y opción de descargar diana/complejo desde la web (PDB).
- **Detalle de proyecto**: Ver y gestionar backbones, lanzar trabajos de generación y ver resultados (CSV, FASTA, mejor PDB).
- **Comparar métricas**: Comparar métricas entre dos trabajos de generación de un mismo proyecto.

La aplicación consume la API del backend (puerto 8080). La URL del backend se define en el **build** con `API_URL` (configuración docker).

**Instrucciones de la VM, Docker y despliegue del backend:** [README del backend](https://github.com/A01795943/accelerated-drug-design-backend/blob/main/README.md)

---

## Instalar y desplegar el frontend (admin en GCP)

Esta guía asume que ya tienes una **VM en GCP** con Docker instalado y el **backend** desplegado ([README del backend](https://github.com/A01795943/accelerated-drug-design-backend/blob/main/README.md) para crear la VM, instalar Docker y desplegar el backend). Si el sistema core se accede por **VPN Tailscale**, instala Tailscale en la VM antes (ver [README del backend](https://github.com/A01795943/accelerated-drug-design-backend/blob/main/README.md)).

### 1. Prerrequisitos en la VM

- Docker y Docker Compose instalados (ver [README del backend](https://github.com/A01795943/accelerated-drug-design-backend/blob/main/README.md), sección “En la VM: instalar Docker”).
- Backend corriendo y accesible (por ejemplo `http://IP_VM:8080`).
- Puerto 4200 abierto en el firewall de la instancia (ver [README del backend](https://github.com/A01795943/accelerated-drug-design-backend/blob/main/README.md), “Abrir puerto 4200”).

### 2. Desplegar el frontend

Clonar el repositorio:

```bash
git clone https://github.com/A01795943/accelerated-drug-design-frontend.git
cd accelerated-drug-design-frontend
```

Construir la imagen. `API_URL` debe ser la URL pública del backend (misma IP de la VM y puerto 8080):

```bash
sudo docker build \
  --build-arg API_URL=http://IP_VM:8080 \
  -f accelerated-drug-design-frontend/Dockerfile \
  -t frontend \
  accelerated-drug-design-frontend
```

Si ya estás **dentro** de la carpeta del frontend (por ejemplo `accelerated-drug-design-frontend` que contiene `Dockerfile`, `package.json`, `src/`, etc.):

```bash
sudo docker build --build-arg API_URL=http://IP_VM:8080 -t frontend .
```

Ejemplo con IP de la VM `34.121.23.124`:

```bash
sudo docker build \
  --build-arg API_URL=http://34.121.23.124:8080 \
  -f accelerated-drug-design-frontend/Dockerfile \
  -t frontend \
  accelerated-drug-design-frontend
```

Ejecutar el contenedor:

```bash
sudo docker run -d \
  -p 4200:80 \
  --name frontend-app \
  --restart unless-stopped \
  frontend
```

El frontend queda disponible en **http://IP_VM:4200**.

---

## Ejecución local (sin Docker)

Requisitos: Node.js 18+, npm. La configuración por defecto usa el backend en `http://localhost:8080`.

```bash
npm install
npm start
```

Se abre en **http://localhost:4200**.

Build de producción (perfil local):

```bash
npm run build
```

Build para Docker (inyecta `API_URL` desde variable de entorno):

```bash
API_URL=http://34.121.23.124:8080 npm run build:docker
```

Los artefactos quedan en `dist/`. Para servir en producción puedes usar cualquier servidor estático (nginx, etc.) apuntando a la salida del build.
