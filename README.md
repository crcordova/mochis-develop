# mochis-play

Landing page para tienda de peluches con IA integrada. Next.js 14 + Tailwind CSS + Vercel.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Páginas](#páginas)
- [Componentes](#componentes)
- [Datos](#datos)
- [Analytics y Tracking](#analytics-y-tracking)
- [SEO](#seo)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo](#desarrollo)
- [Deploy](#deploy)
- [Documentación de Orquestación](#documentación-de-orquestación)

## Descripción

**mochis-play** vende peluches con inteligencia artificial integrada para:
- **Niños**: Aprender idiomas, jugar juegos cortos, escuchar historias, hacer preguntas
- **Adultos**: Estudiar idiomas, compañía, apoyo emocional, planes de estudio

### Características de la IA
- Juegos cortos (la IA no guarda memoria entre sesiones)
- Puede cometer errores (alucinaciones)
- Uso responsable recomendado
- Conexión WiFi requerida

### Categorías de Productos

| Categoría | Cantidad | Identificación | Tamaño |
|-----------|----------|----------------|--------|
| **Mochis** | 5 | Nombre propio (Mimi, Duoduo, Paopao, Yuyu, Nana) | Grande |
| **Gatitos** | 3 | Color (negro, blanco, gris) | Mediano |
| **Pifos** | 4 | Color (rojo, verde, azul, amarillo) | Pequeño |

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 14.2.35 | Framework React con App Router |
| React | 18.3.1 | UI library |
| TypeScript | 5.4.5 | Type safety |
| Tailwind CSS | 3.4.3 | Utility-first CSS |
| Vercel Analytics | 1.3.1 | Analytics nativo de Vercel |
| Google Analytics 4 | Opcional | Tracking avanzado (configurar NEXT_PUBLIC_GA_ID) |

## Estructura del Proyecto

```
mochis-play/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (Header, Footer, metadata)
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Estilos globales + tokens CSS
│   │   ├── tienda/
│   │   │   └── page.tsx          # Tienda (grid de productos)
│   │   ├── tutoriales/
│   │   │   └── page.tsx          # Tutoriales (videos YouTube)
│   │   ├── blog/
│   │   │   └── page.tsx          # Blog (artículos)
│   │   ├── contacto/
│   │   │   └── page.tsx          # Contacto
│   │   ├── sitemap.ts            # Sitemap XML dinámico
│   │   └── robots.ts             # Robots.txt dinámico
│   │
│   ├── components/
│   │   ├── ui/                   # Componentes UI base
│   │   │   ├── Button.tsx        # Botón con variantes y tracking
│   │   │   ├── Card.tsx          # Card para productos/tutoriales/blog
│   │   │   ├── Badge.tsx         # Badge para categorías
│   │   │   └── index.ts          # Barrel exports
│   │   ├── layout/               # Componentes de layout
│   │   │   ├── Header.tsx        # Header con navegación
│   │   │   ├── Footer.tsx        # Footer con links sociales
│   │   │   ├── MobileNav.tsx     # Menú mobile
│   │   │   └── index.ts
│   │   ├── tracking/             # Componentes de tracking
│   │   │   └── TrackClick.tsx    # Wrapper para tracking automático
│   │   └── products/             # Componentes específicos de productos
│   │       ├── ProductGrid.tsx   # Grid de productos
│   │       ├── ProductCard.tsx   # Card de producto individual
│   │       ├── BuyButtonML.tsx   # Botón MercadoLibre
│   │       └── BuyButtonWhatsApp.tsx  # Botón WhatsApp
│   │
│   ├── data/                     # Datos JSON (editar aquí para cambios)
│   │   ├── products.json         # Catálogo de productos
│   │   ├── tutorials.json        # Tutoriales de YouTube
│   │   ├── blog.json             # Artículos del blog
│   │   └── site.json             # Metadata del sitio
│   │
│   ├── lib/                      # Utilidades
│   │   ├── analytics.tsx         # Vercel Analytics + GA4 wrapper
│   │   ├── useTracking.ts        # Custom hooks para tracking
│   │   ├── purchase.ts           # Helpers para links de compra
│   │   └── structured-data.ts    # JSON-LD para SEO
│   │
│   └── hooks/                    # Custom hooks
│       └── index.ts
│
├── public/
│   ├── images/
│   │   ├── products/
│   │   │   ├── uwus/             # mimi.webp, duoduo.webp, etc.
│   │   │   ├── gatos/            # gato-negro.webp, etc.
│   │   │   └── pifos/            # pifo-rojo.webp, etc.
│   │   ├── hero/                 # Imágenes de portada
│   │   └── thumbs/               # Thumbnails
│   ├── llm.txt                   # SEO para agentes LLM
│   └── robots.txt                # Robots.txt
│
├── Agent-Orquest/                # Metodología de orquestación
│   ├── .opencode/agents/         # Definiciones de agentes
│   └── docs/orchestration/       # Documentación de workflow
│
├── docs/
│   └── image-specs.md            # Especificaciones de imágenes
│
├── .env.local                    # Variables de entorno (no commitear)
├── .env.example                  # Template de variables
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## Páginas

### Home (`/`)
- Hero section con CTA buttons
- Preview de categorías (1 producto por categoría)
- Features section
- Disclaimer de IA

### Tienda (`/tienda`)
- Grid de productos con filtros por categoría
- Cards de productos con imagen, nombre/color, descripción, features
- Botones de compra:
  - **MercadoLibre**: Por categoría (usa ML_UWUS_URL, ML_GATOS_URL, ML_PIFOS_URL)
  - **WhatsApp**: Por producto (mensaje dinámico)

### Tutoriales (`/tutoriales`)
- Videos de YouTube agrupados por categoría:
  - Configuración inicial (hardware, WiFi)
  - Personalización (roles LLM, planes de estudio)
  - Información sobre IA (cómo funciona, alucinaciones)
- Redirección a YouTube (no embed)

### Blog (`/blog`)
- Artículos agrupados por categoría:
  - Bienestar (alternativa a pantallas, compañía adultos)
  - Educación (IA para niños, tecnología responsable)

### Contacto (`/contacto`)
- Información de contacto
- Links sociales (Instagram, TikTok, YouTube)
- WhatsApp directo

## Componentes

### UI Base

#### Button
```tsx
<Button 
  variant="primary"  // primary | secondary | outline | ghost
  size="md"          // sm | md | lg
  href="/tienda"     // Opcional: renderiza como Link
  onClick={handler}  // Opcional: handler de click
  trackingLabel="ver-peluches"  // Opcional: tracking automático
>
  Ver Peluches
</Button>
```

#### Card
```tsx
<Card
  title="Mimi"
  description="Dulce y cariñosa"
  image="/images/products/uwus/mimi.webp"
  onClick={handler}
  trackingId="mimi"
  trackingData={{ category: "uwus" }}
>
  <Badge label="Uwus" variant="uwus" />
</Card>
```

#### Badge
```tsx
<Badge 
  label="Uwus" 
  variant="uwus"  // uwus | gatos | pifos | custom
/>
```

### Layout

#### Header
- Sticky en scroll
- Logo + navegación desktop
- Menú hamburguesa mobile
- Tracking en todos los links

#### Footer
- Links de navegación
- Redes sociales
- Disclaimer de IA
- Copyright

### Tracking

#### TrackClick Wrapper
```tsx
<TrackClick 
  eventName="product_view" 
  eventData={{ id: "mimi", category: "uwus" }}
>
  <ProductCard product={product} />
</TrackClick>
```

#### useTracking Hook
```tsx
const { trackProductView, trackBuyMLClick, trackBuyWhatsAppClick } = useTracking();

<Button onClick={() => trackBuyMLClick("uwus", "Uwus")}>
  Comprar en ML
</Button>
```

## Datos

Todos los datos están en archivos JSON en `src/data/`. Para modificar productos, tutoriales o artículos, edita estos archivos.

### products.json
```json
{
  "categories": [
    {
      "id": "uwus",
      "name": "Uwus",
      "description": "...",
      "size": "grande",
      "has_name": true,
      "ml_env_var": "ML_UWUS_URL",
      "products": [
        {
          "id": "mimi",
          "name": "Mimi",
          "color": "rosa",
          "image": "/images/products/uwus/mimi.webp",
          "description": "Dulce y cariñosa",
          "features": ["Aprende idiomas", "Cuenta historias"]
        }
      ]
    }
  ]
}
```

### tutorials.json
```json
{
  "tutorials": [
    {
      "id": "config-inicial-hardware",
      "title": "Configuración Inicial del Hardware",
      "youtube_id": "VIDEO_ID",
      "youtube_url": "https://youtube.com/...",
      "category": "configuracion",
      "duration": "5:30"
    }
  ]
}
```

### blog.json
```json
{
  "posts": [
    {
      "id": "alternativa-pantallas",
      "title": "Una Alternativa al Exceso de Pantallas",
      "excerpt": "...",
      "slug": "alternativa-pantallas",
      "category": "bienestar",
      "read_time": "5 min"
    }
  ]
}
```

### site.json
```json
{
  "site": {
    "name": "mochis-play",
    "description": "...",
    "url": "https://mochis-play.vercel.app",
    "keywords": [...]
  },
  "disclaimer": {
    "short": "Juegos cortos • Sin memoria • Puede alucinar • Usa con responsabilidad",
    "full": "..."
  },
  "social": {
    "instagram": "...",
    "tiktok": "...",
    "youtube": "..."
  }
}
```

## Analytics y Tracking

### Vercel Analytics
Integrado por defecto. No requiere configuración adicional.

### Google Analytics 4 (Opcional)
1. Crear propiedad en [analytics.google.com](https://analytics.google.com)
2. Copiar Measurement ID (G-XXXXXXXXXX)
3. Agregar a `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Eventos de Tracking

| Evento | Descripción | Data |
|--------|-------------|------|
| `product_view` | Click en card de producto | `{product_id, product_name, category}` |
| `buy_ml_click` | Click en botón MercadoLibre | `{category, category_name}` |
| `buy_whatsapp_click` | Click en botón WhatsApp | `{product_id, product_name, category}` |
| `nav_click` | Click en link de navegación | `{destination}` |
| `tutorial_click` | Click en tutorial | `{video_id, title}` |

### Verificar Tracking
- **Vercel Analytics**: Dashboard de Vercel → Analytics
- **GA4**: GA4 → Reports → Realtime (o DebugView para desarrollo)

## SEO

### llm.txt
Archivo en `public/llm.txt` para que agentes LLM entiendan el sitio.

### robots.txt
Generado en `public/robots.txt`. Permite crawlers y referencia sitemap.

### sitemap.xml
Generado dinámicamente en `src/app/sitemap.ts`. Incluye todas las páginas.

### Schema.org (JSON-LD)
- **Home**: Organization schema
- **Tienda**: Product schema para cada producto
- **Páginas internas**: Breadcrumbs

### Metadata
Configurada en `src/app/layout.tsx`:
- Title template
- Description
- Keywords
- OpenGraph
- Twitter Cards
- Robots

## Variables de Entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `ML_UWUS_URL` | Link MercadoLibre categoría Uwus | `https://mercadolibre.com/...` |
| `ML_GATOS_URL` | Link MercadoLibre categoría Gatitos | `https://mercadolibre.com/...` |
| `ML_PIFOS_URL` | Link MercadoLibre categoría Pifos | `https://mercadolibre.com/...` |
| `WHATSAPP_NUMBER` | Número de WhatsApp (con código país) | `569XXXXXXXX` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (opcional) | `G-XXXXXXXXXX` |

## Desarrollo

### Instalar dependencias
```bash
npm install
```

### Correr en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Build para producción
```bash
npm run build
```

### Correr en producción
```bash
npm start
```

### Lint
```bash
npm run lint
```

## Deploy

### Vercel (Recomendado)
1. Push a GitHub/GitLab
2. Importar proyecto en [vercel.com](https://vercel.com)
3. Configurar variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

### Variables de Entorno en Vercel
Vercel Dashboard → Settings → Environment Variables

Agregar:
- `ML_UWUS_URL`
- `ML_GATOS_URL`
- `ML_PIFOS_URL`
- `WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GA_ID` (opcional)

## Estado del Proyecto

### ✅ Completado (Fases 0-5.2)
- **Fase 0: Fundación** — Next.js 14, Tailwind, estructura, datos JSON, analytics, SEO básico
- **Fase 1: Design System** — Design tokens (coral/violet), componentes UI (Button, Card, Badge), Header/Footer, tracking hooks
- **Fase 2: Layout Integration** — Header/Footer integrados, skip link, contraste WCAG AA, dark mode
- **Fase 3: Páginas Completas** — Home, Tienda, Tutoriales, Blog, Contacto (todas funcionales)
- **Fase 4: SEO Final** — Sitemap XML, Schema.org JSON-LD, metadata completa
- **Fase 5.1-5.2: QA** — Auditoría completa, fix de tracking

### ⏳ Pendiente
- **Imágenes de productos** — 12 imágenes WebP necesarias
- **Imágenes de hero/fondo** — Hero principal para Home
- **Variables de entorno reales** — ML URLs y WhatsApp number
- **Deploy a Vercel** (Slice 5.3)

### 📄 Handoff para Diseño e Imágenes
Si eres un agente de diseño/imágenes web, consulta:
- **`Agent-Orquest/docs/orchestration/handoff-design-images.md`** — Guía completa con:
  - Lista de todas las imágenes necesarias
  - Especificaciones técnicas (formato, tamaño, ubicación)
  - Contexto de marca y design system
  - Tareas priorizadas

## Imágenes

Ver [docs/image-specs.md](docs/image-specs.md) para tamaños y formato.

### Estructura
```
public/images/products/
├── uwus/
│   ├── mimi.webp
│   ├── duoduo.webp
│   ├── paopao.webp
│   ├── yuyu.webp
│   └── nana.webp
├── gatos/
│   ├── gato-negro.webp
│   ├── gato-blanco.webp
│   └── gato-gris.webp
└── pifos/
    ├── pifo-rojo.webp
    ├── pifo-verde.webp
    ├── pifo-azul.webp
    └── pifo-amarillo.webp
```

### Tamaños Recomendados
- **Card producto**: 400x400px (WebP)
- **Hero**: 1920x1080px (WebP)
- **Thumbnail**: 150x150px (WebP)

## Documentación de Orquestación

Este proyecto usa un sistema de orquestación multi-agente para desarrollo. Ver `Agent-Orquest/README.md` para detalles.

### Agentes Disponibles
- **orchestrator**: Coordina trabajo y delega a subagentes
- **planner**: Investiga y crea planes de implementación
- **coder**: Implementa código
- **designer**: UI/UX y diseño de componentes
- **reviewer**: Auditoría y verificación

### Documentación de Workflow
- `Agent-Orquest/docs/orchestration/WORKFLOW.md`: Flujo completo
- `Agent-Orquest/docs/orchestration/slices/master-plan.md`: Plan maestro
- `Agent-Orquest/docs/orchestration/briefs/`: Briefs de tareas
- `Agent-Orquest/docs/orchestration/reports/`: Reportes de ejecución

## Licencia

Privado - mochis-play © 2026
