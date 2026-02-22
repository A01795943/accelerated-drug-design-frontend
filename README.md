# Frontend — Drug Accelerator

Interfaz web del proyecto **Drug Accelerator** (diseño acelerado de fármacos). Permite gestionar proyectos, definir proteína diana y complejo, ejecutar backbones (RFdiffusion) y trabajos de generación de secuencias, visualizar estructuras PDB y comparar métricas.

## Qué hace esta aplicación

- **Lista de proyectos**: Ver todos los proyectos y acceder al detalle de cada uno.
- **Crear proyecto**: Alta de proyectos con nombre, descripción y opción de descargar diana/complejo desde la web (PDB).
- **Detalle de proyecto**: Ver y gestionar backbones (contigs, hotspots, cadenas a eliminar, ejecución), lanzar trabajos de generación y ver resultados (CSV, FASTA, mejor PDB).
- **Comparar métricas**: Comparar métricas entre dos trabajos de generación de un mismo proyecto.
- **Autenticación**: Inicio de sesión y registro (implementación actual con backend simulado; los datos de proyectos usan la API real en `localhost:8080`).

La aplicación espera que el backend del Drug Accelerator esté corriendo en `http://localhost:8080` (configurable en `src/environments/environment.ts`).

## Cómo ejecutarla

### Requisitos

- Node.js (v18 o superior recomendado)
- npm o yarn

### Instalación

```bash
cd accelerated-drug-design-frontend/Larkon-Angular
npm install
```

### Servidor de desarrollo

```bash
npm start
```

Se abre en **http://localhost:4200**. La aplicación se recarga al cambiar el código.

### Build de producción

```bash
npm run build
```

Los artefactos quedan en `dist/`.

### Tests

```bash
npm test
```

## Proyecto Drug Accelerator

Este frontend forma parte del proyecto **Drug Accelerator** (diseño acelerado de fármacos). Se comunica con el backend vía API REST para proyectos, backbones y trabajos de generación.
