# mochis-play - Documentación del Proyecto

## Descripción General

**mochis-play** es una landing page e-commerce para una tienda de peluches con inteligencia artificial integrada. Los peluches están diseñados para niños y adultos, ofreciendo funciones educativas, de compañía y entretenimiento.

### Propósito del Producto
- **Niños**: Aprender idiomas, juegos cortos, historias interactivas, hacer preguntas
- **Adultos**: Estudio de idiomas, compañía, apoyo emocional, planes de estudio personalizados

### Características Clave de la IA
- Juegos cortos (la IA no guarda memoria entre sesiones)
- Puede cometer errores (alucinaciones) - uso responsable recomendado
- Conexión WiFi requerida
- Personalizable según necesidades (roles, planes de estudio, etc.)

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.2.35 | Framework React con App Router |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.4.5 | Type safety |
| **Tailwind CSS** | 3.4.3 | Utility-first CSS framework |
| **Vercel Analytics** | 1.3.1 | Analytics nativo de Vercel |
| **Google Analytics 4** | Opcional | Tracking avanzado |

## Estructura del Proyecto

```
mochis-play/
├── src/
│   ├── app/                      # Next.js App Router (páginas)
│   ├── components/               # Componentes React reutilizables
│   │   ├── ui/                   # Button, Card, Badge
│   │   ├── layout/               # Header, Footer, Nav
│   │   ├── tracking/             # TrackClick wrapper
│   │   └── products/             # ProductGrid, BuyButtons
│   ├── data/                     # JSON data (products, tutorials, blog, site)
│   ├── lib/                      # Utilities (analytics, tracking, purchase)
│   └── hooks/                    # Custom React hooks
├── public/
│   ├── images/products/          # Imágenes de productos
│   ├── llm.txt                   # SEO para LLMs
│   └── robots.txt                # Robots.txt
├── Agent-Orquest/                # Metodología de orquestación multi-agente
└── docs/                         # Documentación adicional
```

## Catálogo de Productos

### Mochis (5 peluches con nombre)
| ID | Nombre | Color | Tamaño |
|----|--------|-------|--------|
| mimi | Mimi | Rosa | Grande |
| duoduo | Duoduo | Azul | Grande |
| paopao | Paopao | Blanco | Grande |
| yuyu | Yuyu | Amarillo | Grande |
| nana | Nana | Lavanda | Grande |

### Gatitos (3 peluches por color)
| ID | Color | Tamaño |
|----|-------|--------|
| gato-negro | Negro | Mediano |
| gato-blanco | Blanco | Mediano |
| gato-gris | Gris | Mediano |

### Ponejos (4 peluches por color)
| ID | Color | Tamaño |
|----|-------|--------|
| ponejo-rojo | Rojo | Pequeño |
| ponejo-verde | Verde | Pequeño |
| ponejo-azul | Azul | Pequeño |
| ponejo-amarillo | Amarillo | Pequeño |

## Páginas y Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Hero, features, preview de categorías |
| `/tienda` | Tienda | Grid de productos con filtros, botones de compra |
| `/tutoriales` | Tutoriales | Videos de YouTube agrupados por categoría |
| `/blog` | Blog | Artículos sobre bienestar digital y educación |
| `/contacto` | Contacto | Información de contacto y redes sociales |

## Componentes Principales

### UI Components
- **Button**: Variantes (primary, secondary, outline), tamaños (sm, md, lg), tracking integrado
- **Card**: Para productos, tutoriales, blog. Tracking en click.
- **Badge**: Etiquetas de categoría (mochis, gatos, ponejos)

### Layout Components
- **Header**: Sticky, navegación responsive, tracking en links
- **Footer**: Links sociales, disclaimer de IA, copyright
- **MobileNav**: Menú hamburguesa para mobile

### Tracking Components
- **TrackClick**: Wrapper para tracking automático de clicks
- **useTracking**: Hook con funciones de tracking predefinidas

## Analytics y Tracking

### Eventos Implementados

| Evento | Trigger | Data |
|--------|---------|------|
| `product_view` | Click en card de producto | `{product_id, product_name, category}` |
| `buy_ml_click` | Click en botón MercadoLibre | `{category, category_name}` |
| `buy_whatsapp_click` | Click en botón WhatsApp | `{product_id, product_name, category}` |
| `nav_click` | Click en link de navegación | `{destination}` |
| `tutorial_click` | Click en tutorial | `{video_id, title}` |

### Integración
- **Vercel Analytics**: Integrado por defecto
- **GA4**: Opcional, configurar `NEXT_PUBLIC_GA_ID` en `.env.local`

## SEO

### Implementado
- **llm.txt**: `public/llm.txt` para agentes LLM
- **robots.txt**: `public/robots.txt` dinámico
- **sitemap.xml**: `src/app/sitemap.ts` generado en build time
- **Schema.org**: JSON-LD para Organization y Product
- **Metadata**: OpenGraph, Twitter Cards, keywords

### Keywords Principales
peluches con IA, peluches inteligentes, juguetes educativos, IA para niños, aprendizaje con IA, peluches interactivos, mochis-play, compañía adultos, estudio idiomas

## Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `ML_MOCHIS_URL` | Link MercadoLibre categoría Mochis | Sí |
| `ML_GATOS_URL` | Link MercadoLibre categoría Gatitos | Sí |
| `ML_PONEJOS_URL` | Link MercadoLibre categoría Ponejos | Sí |
| `WHATSAPP_NUMBER` | Número WhatsApp (con código país) | Sí |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No (opcional) |

## Flujo de Compra

### MercadoLibre
- Botón por categoría (no por producto)
- Lee URL de variable de entorno (`ML_MOCHIS_URL`, `ML_GATOS_URL`, `ML_PONEJOS_URL`)
- Tracking: `buy_ml_click`

### WhatsApp
- Botón por producto
- Mensaje dinámico: "Hola! Me interesa [nombre] ([categoría] [color])"
- Ejemplo: "Hola! Me interesa Mimi (mochis rosa)"
- Lee número de `WHATSAPP_NUMBER`
- Tracking: `buy_whatsapp_click`

## Datos (JSON)

Todos los datos están en `src/data/` y son editables sin modificar código:

- **products.json**: Catálogo completo de productos
- **tutorials.json**: Tutoriales de YouTube
- **blog.json**: Artículos del blog
- **site.json**: Metadata del sitio, redes sociales, disclaimer

## Imágenes

### Estructura
```
public/images/products/
├── mochis/        # mimi.webp, duoduo.webp, paopao.webp, yuyu.webp, nana.webp
├── gatos/         # gato-negro.webp, gato-blanco.webp, gato-gris.webp
└── ponejos/       # ponejo-rojo.webp, ponejo-verde.webp, ponejo-azul.webp, ponejo-amarillo.webp
```

### Especificaciones
- **Formato**: WebP (70-80% más pequeño que PNG/JPG)
- **Card producto**: 400x400px
- **Hero**: 1920x1080px
- **Thumbnail**: 150x150px

Ver `docs/image-specs.md` para detalles completos.

## Desarrollo

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev          # http://localhost:3000

# Producción
npm run build        # Build para producción
npm start            # Correr build de producción

# Calidad
npm run lint         # ESLint
```

### Requisitos
- Node.js 18+ 
- npm 9+

## Deploy

### Vercel (Recomendado)
1. Push a GitHub/GitLab
2. Importar en [vercel.com](https://vercel.com)
3. Configurar variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

### Variables en Vercel
Vercel Dashboard → Settings → Environment Variables

Agregar todas las variables de `.env.example`.

## Metodología de Desarrollo

Este proyecto usa un sistema de **orquestación multi-agente** para desarrollo estructurado.

### Agentes

| Agente | Rol | Modo |
|--------|-----|------|
| **orchestrator** | Coordina trabajo, delega a subagentes | primary |
| **planner** | Investiga y crea planes de implementación | subagent |
| **coder** | Implementa código | subagent |
| **designer** | UI/UX, diseño de componentes | subagent |
| **reviewer** | Auditoría y verificación | subagent |

### Workflow

```
1. Usuario → Orchestrator
2. Orchestrator → Planner (investiga, crea plan)
3. Orchestrator → Crea briefs para subagentes
4. Subagentes ejecutan (paralelo/serial)
5. Subagentes → Reportes
6. Orchestrator → Verifica y reporta al usuario
```

### Documentación de Orquestación

| Archivo | Propósito |
|---------|-----------|
| `Agent-Orquest/README.md` | Introducción al sistema |
| `Agent-Orquest/docs/orchestration/WORKFLOW.md` | Flujo completo |
| `Agent-Orquest/docs/orchestration/slices/master-plan.md` | Plan maestro del proyecto |
| `Agent-Orquest/docs/orchestration/briefs/` | Briefs de tareas |
| `Agent-Orquest/docs/orchestration/reports/` | Reportes de ejecución |

### Cómo Usar los Agentes

En la terminal de opencode:

```bash
# Ver agentes disponibles (presionar Tab)
opencode

# Usar orchestrator (default)
"Orchestrator, ejecuta la Phase 1 según brief-phase1.md"

# Usar coder directamente
"Coder, implementa Button según brief-1.2-ui-components.md"

# Usar designer
"Designer, crea design tokens según brief-1.1-design-tokens.md"

# Usar reviewer
"Reviewer, audita la estructura actual según brief-reviewer-phase0-audit.md"
```

## Estado del Proyecto

### Completado (Fases 0-4)
- ✅ **Fase 0: Fundación** — Next.js 14, Tailwind, estructura, datos JSON, analytics, SEO básico
- ✅ **Fase 1: Design System** — Design tokens (coral/violet), componentes UI (Button, Card, Badge), Header/Footer, tracking hooks
- ✅ **Fase 2: Layout Integration** — Header/Footer integrados, skip link, contraste WCAG AA, dark mode
- ✅ **Fase 3: Páginas Completas** — Home (hero, features con animaciones, preview categorías), Tienda (grid, filtros, botones ML/WhatsApp), Tutoriales (videos YouTube agrupados), Blog (artículos agrupados), Contacto (info, redes sociales)
- ✅ **Fase 4: SEO Final** — Sitemap XML dinámico, Schema.org JSON-LD (Organization + Product), metadata completa
- ✅ **Fase 5 (parcial): QA** — Auditoría completa (build, lint, accesibilidad, tracking, responsive, SEO), fix de tracking en ProductCard

### Pendiente (Fase 5.3 + Contenido)
- ⏳ **Deploy a Vercel** (Slice 5.3) — requiere configuración de variables de entorno reales
- ⏳ **Imágenes de productos** — 12 imágenes WebP (5 Mochis + 3 Gatitos + 4 Ponejos)
- ⏳ **Imágenes de hero/fondo** — Hero principal para Home, banners opcionales
- ⏳ **Variables de entorno reales** — ML_MOCHIS_URL, ML_GATOS_URL, ML_PONEJOS_URL, WHATSAPP_NUMBER

### Documentación para Próximo Agente
- 📄 **Handoff de Diseño e Imágenes:** `Agent-Orquest/docs/orchestration/handoff-design-images.md`
  - Guía completa para crear/optimizar todas las imágenes del sitio
  - Especificaciones técnicas (formato, tamaño, ubicación)
  - Contexto de marca y design system
  - Lista de tareas priorizadas

Ver `Agent-Orquest/docs/orchestration/slices/master-plan.md` para plan maestro completo.

## Contacto

- **Email**: hola@mochis-play.com
- **Instagram**: @mochisplay
- **TikTok**: @mochisplay
- **YouTube**: @mochisplay

## Licencia

Privado - mochis-play © 2026
