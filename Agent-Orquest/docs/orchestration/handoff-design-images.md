# Handoff — Diseño e Imágenes Web para **mochis** (formerly mochis-play)

**Fecha:** 2026-07-12
**Estado del proyecto:** Funcional, dark mode activo, base técnica consolidada
**Próximo agente:** Designer (creación de imágenes + diseño visual del Home)
**Objetivo:** Generar el set completo de imágenes y diseñar la composición visual del Home en su identidad nocturna definitiva

---

## ⚠️ CAMBIO CRÍTICO DE MARCA (decisión del usuario, 2026-07-12)

El usuario renombró la marca. Estos son los cambios consolidados:

| Antes | Ahora | Tipo |
|-------|-------|------|
| `mochis-play` | **`mochis`** | Marca (H1, copy, metadata, package, emails) |
| `uwus` / `Uwus` (categoría) | **`mochis`** (categoría) | Categoría de producto (reemplaza a uwus) |
| `Gatitos` | `Gatitos` | **Sin cambios** |
| `Pifos` | `Pifos` | **Sin cambios** |
| `ML_UWUS_URL` (env var) | sin cambios | **No tocar env vars** (decisión explícita) |
| `mochis-play.com` / `vercel.app` | pendiente | Diferido — usuario comprará `mochisplay.cl` luego |

**Alcance de este handoff:** SOLO diseño visual + creación de imágenes. NO incluye cambios de variables de entorno, deploy, ni DNS.

---

## 📋 Resumen Ejecutivo

**mochis** (antes mochis-play) es una landing page e-commerce para peluches con IA integrada. El proyecto base está **completamente funcional** (build, lint, dark mode, tokens semánticos, 5 páginas, 12 productos, tracking, SEO, accesibilidad WCAG AA, responsive). El usuario ha solicitado evolucionar a una identidad **nocturna cálida** (violet + coral + mint) y generar el set completo de imágenes de los peluches.

**Trabajo previo completado (auditable):**

✅ **Base técnica consolidada** — 5 waves de fixes técnicos + 1 follow-up slice:
- Body tokens migrados a `var(--color-bg)` y `var(--color-text)`
- `aria-controls="mobile-nav"` ahora matchea con `id="mobile-nav"`
- Home preview titles: "Gato negro" / "Pifo rojo" (sin diminutivo, decisión 5B)
- Tailwind palette leak resuelto en Header / Footer / MobileNav / BuyButtons / TiendaClient / Button
- Tokens WhatsApp + status colors + Tailwind config
- SSR guards redundantes removidos de useTracking
- **Build:** PASS (9/9 páginas) · **Lint:** PASS

✅ **Plan de rediseño nocturno** — `Agent-Orquest/docs/orchestration/slices/plan-redesign-nocturnal-home.md`
- Dirección confirmada: Violet base + Coral glow + Mint decorativo
- 5 secciones planeadas: Hero / Features / Mascot Band / Category Preview / Disclaimer
- 11 slices de implementación + 14 prompts de imagen

✅ **Prompts de imagen production-ready:**
- `Agent-Orquest/docs/orchestration/prompts/image-prompts-redesign.md` (14 prompts, engine-agnostic)
- `Agent-Orquest/docs/orchestration/prompts/image-prompts-gemini-duckai.md` (14 prompts + 3 alternativas del Hero, optimizados para Gemini/Duck.AI)

✅ **1 imagen ya generada por el usuario:**
- `public/images/hero/hero-home.webp` (1672×941 WebP, 33KB) — Mimi en luna creciente con estrellas
- ⚠️ **Issue conocido:** la imagen no se renderiza porque `src/app/page.tsx` nunca fue actualizado para incluirla. El Hero section actual es solo texto.

✅ **Auditorías recientes:**
- `Agent-Orquest/docs/orchestration/reports/audit-home-current-state.md` (estado base)
- `Agent-Orquest/docs/orchestration/reports/report-fixes-from-audit.md` (verificación post-fixes)
- `Agent-Orquest/docs/orchestration/reports/audit-hero-missing-image.md` (issue del hero)
- `Agent-Orquest/docs/orchestration/reports/audit-rebrand-references.md` (mapeo del rebrand)

---

## 🎨 Identidad Visual (Nueva)

### Concepto
- **Tierno pero tecnológico** (cute but modern, not childish)
- **Público:** Niños Y adultos (gender-neutral)
- **Tono:** Nocturno cálido, mágico, "bedtime-story warmth"
- **Spanish brand voice** con nombres playful (Mochis, Gatitos, Pifos)

### Paleta Nocturna (Hex codes — usar en TODAS las imágenes)

| Token | Hex | Uso |
|-------|-----|-----|
| Midnight 50 | `#2A1F4D` | Background más cálido |
| Midnight 100 | `#1B1438` | |
| Midnight 300 | `#0B0820` | Background de página |
| Midnight 400 | `#060416` | Top del gradient del hero |
| Coral 500 | `#F97066` | Glow cálido, accent del plush |
| Coral 700 | `#C03D32` | Interactivo, text on light |
| Mint 300 | `#6EE7B7` | Highlights decorativos, rim light |
| Mint 600 | `#059669` | |
| Cream 50 | `#FFFBF1` | Text on dark, highlights suaves |
| Rose 300 | `#FDA4AF` | **Color del Mochis Mimi** |

### Color por personaje (referencia rápida)

**Mochis (5 peluches grandes, antes "Uwus"):**
- Mimi → `#FDA4AF` (rose-300) — dulce, cariñosa
- Duoduo → `#7DD3FC` (sky-300) — tranquilo, sabio
- Paopao → `#FAFAF9` (stone-50) — juguetón, curioso
- Yuyu → `#FDE047` (yellow-300) — alegre, enérgico
- Nana → `#C4B5FD` (violet-300) — soñadora, creativa

**Gatitos (sin cambios, 3 peluches medianos):**
- gato-negro → `#1C1917` (stone-900) — misterioso
- gato-blanco → `#FAFAF9` (stone-50) — suave
- gato-gris → `#A8A29E` (stone-400) — equilibrado

**Pifos (sin cambios, 4 peluches pequeños):**
- pifo-rojo → `#F87171` (red-400) — vibrante
- pifo-verde → `#86EFAC` (green-300) — natural
- pifo-azul → `#93C5FD` (blue-300) — calmado
- pifo-amarillo → `#FCD34D` (amber-300) — alegre

---

## 🖼️ Set de Imágenes — Estado Actual

### ✅ Generada (1/14)
- **`public/images/hero/hero-home.webp`** — Mimi en luna creciente, escena nocturna
  - Tamaño: 1672×941 (16:9)
  - Formato: WebP, 33KB
  - Generada con: Gemini / Duck.AI usando el prompt V1 del documento optimizado
  - Estado: ⚠️ **NO se renderiza en el sitio** (page.tsx no la referencia)

### ⏳ Pendientes de generar (13/14)

| # | Imagen | Dimensiones | Prioridad | Archivo destino |
|---|--------|-------------|-----------|-----------------|
| 2 | **Mascot Band** (12 personajes en fila) | 2400×400 | Alta | `public/images/hero/mascot-band.webp` |
| 3 | Mimi (icon) | 400×400 | Media | `public/images/products/mochis/mimi.webp` |
| 4 | Duoduo (icon) | 400×400 | Media | `public/images/products/mochis/duoduo.webp` |
| 5 | Paopao (icon) | 400×400 | Media | `public/images/products/mochis/paopao.webp` |
| 6 | Yuyu (icon) | 400×400 | Media | `public/images/products/mochis/yuyu.webp` |
| 7 | Nana (icon) | 400×400 | Media | `public/images/products/mochis/nana.webp` |
| 8 | Gato Negro (icon) | 400×400 | Media | `public/images/products/gatos/gato-negro.webp` |
| 9 | Gato Blanco (icon) | 400×400 | Media | `public/images/products/gatos/gato-blanco.webp` |
| 10 | Gato Gris (icon) | 400×400 | Media | `public/images/products/gatos/gato-gris.webp` |
| 11 | Pifo Rojo (icon) | 400×400 | Media | `public/images/products/pifos/pifo-rojo.webp` |
| 12 | Pifo Verde (icon) | 400×400 | Media | `public/images/products/pifos/pifo-verde.webp` |
| 13 | Pifo Azul (icon) | 400×400 | Media | `public/images/products/pifos/pifo-azul.webp` |
| 14 | Pifo Amarillo (icon) | 400×400 | Media | `public/images/products/pifos/pifo-amarillo.webp` |

**⚠️ Importante sobre file paths:** El usuario decidió que "uwus" se renombra a "mochis". Los nuevos file paths de los iconos Mochis son:
- `public/images/products/mochis/` (NUEVO — antes era `uwus/`)
- `public/images/products/gatos/` (sin cambios)
- `public/images/products/pifos/` (sin cambios)

**Los prompts ya están escritos** en ambos documentos (`image-prompts-redesign.md` y `image-prompts-gemini-duckai.md`). El Designer puede usarlos como fuente.

---

## 🛠️ Motor de Imágenes del Usuario

- **Primario:** Google Gemini (Imagen 3/4)
- **Alternativo:** DuckDuckGo AI Chat (Duck.AI)
- Los prompts ya están optimizados para estas herramientas (ver documento `image-prompts-gemini-duckai.md`)
- **Tips clave:**
  1. Lenguaje natural narrativo (no keywords)
  2. NO usar negative prompts — enmarcar positivo
  3. Aspect ratio en prosa (no flags)
  4. Hex codes explícitos en el prompt
  5. Mood + atmósfera
  6. Skip "8k, hyperrealistic" — usar "Jellycat plush quality" o "Pixar softness"
  7. Composición precisa (porcentajes de posición)
  8. MUST DO / MUST AVOID inline

---

## 🎯 Misiones del Próximo Agente (Designer)

### Misión 1: Diseño Visual del Home (Prioridad Alta)
Diseñar la composición visual completa del Home en su identidad nocturna. Esto incluye:

1. **Hero Section** — Cómo integrar la imagen ya generada (`hero-home.webp`) con el H1 "mochis", los 2 botones y el disclaimer. Decidir layout (60/40 split, full-width con overlay, etc.)

2. **Features Section** — Mantener 6 cards existentes pero reestilizadas para dark mode

3. **Mascot Band** (NUEVA) — Sección horizontal mostrando los 12 personajes

4. **Category Preview** — 3 cards con badges (mochis, gatitos, pifos)

5. **AI Disclaimer** — Callout cálido ámbar

**Output esperado:** Mockup visual / spec detallada de cada sección (colores, layout, espaciado, tipografía, comportamiento responsivo) que pueda ser implementado por un Coder.

### Misión 2: Prompts de Imagen Restantes (Prioridad Media)
1. **Verificar/ajustar** el prompt V1 del Hero en `image-prompts-gemini-duckai.md` (¿funcionó bien la primera generación? ¿qué mejorar?)
2. **Optimizar** los prompts del Mascot Band y los 12 icons si es necesario
3. **Generar specs** de los iconos que faltan
4. **Validar consistencia visual** — Mimi en la imagen ya generada debe ser la "canonical" Mimi

### Misión 3: Documentar el Diseño Nocturno (Prioridad Media)
1. **Actualizar** el plan de rediseño (`plan-redesign-nocturnal-home.md`) con la nueva marca "mochis" (en vez de "mochis-play")
2. **Documentar** el design system visual nocturno con ejemplos concretos
3. **Crear** un "Visual Style Guide" que documente colores, tipografía, espaciado, sombras, radios, animaciones para dark mode

---

## 📁 Estructura del Proyecto (resumen)

```
mochis-play/                              ← (nombre de carpeta aún no renombrado)
├── src/
│   ├── app/                              ← App Router
│   │   ├── page.tsx                      ← Home (pendiente: agregar imagen del hero)
│   │   ├── layout.tsx                    ← Root layout (metadata, OG, JSON-LD)
│   │   ├── globals.css                   ← Global styles
│   │   ├── tienda/                       ← E-commerce grid + filtros
│   │   ├── tutoriales/                   ← YouTube videos
│   │   ├── blog/                         ← Artículos
│   │   ├── contacto/                     ← Contacto + redes
│   │   └── sitemap.ts                    ← Dynamic sitemap
│   ├── components/
│   │   ├── ui/                           ← Button, Card, Badge (tokens semánticos)
│   │   ├── layout/                       ← Header, Footer, MobileNav
│   │   ├── home/                         ← FeaturesSection
│   │   ├── products/                     ← ProductCard, BuyButtons
│   │   └── tracking/                     ← TrackClick wrapper (futuro)
│   ├── data/
│   │   ├── site.json                     ← Metadata, redes, disclaimer
│   │   ├── products.json                 ← 12 productos en 3 categorías
│   │   ├── tutorials.json
│   │   ├── blog.json
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── analytics.tsx                 ← trackEvent + helpers
│   │   ├── structured-data.tsx           ← JSON-LD generators
│   │   ├── purchase.ts                   ← WhatsApp message, ML URL helpers
│   │   └── useTracking.ts                ← React hook (6 funciones)
│   ├── styles/
│   │   └── tokens.css                    ← 3-layer tokens + dark mode (ya activo)
│   └── hooks/
├── public/
│   ├── images/
│   │   ├── products/
│   │   │   ├── mochis/                   ← NUEVO path (antes uwus/, aún no creado)
│   │   │   ├── gatos/
│   │   │   └── pifos/
│   │   └── hero/
│   │       └── hero-home.webp            ← ✅ YA GENERADO
│   ├── llm.txt                           ← SEO para LLMs
│   └── robots.txt
├── Agent-Orquest/
│   ├── docs/orchestration/
│   │   ├── handoff-design-images.md      ← ESTE DOCUMENTO
│   │   ├── slices/                       ← Planes + slices ejecutados
│   │   ├── prompts/                      ← 2 documentos de prompts
│   │   ├── briefs/                       ← Briefs históricos (no tocar)
│   │   └── reports/                      ← Auditorías + reportes
│   └── AGENTS.md                         ← Metodología multi-agente
├── AGENTS.md                             ← Documentación principal (desactualizada con marca antigua)
└── README.md
```

---

## 🔍 Decisiones Clave para el Designer

1. **Layout del Hero** — ¿60/40 split con texto a la izquierda e imagen a la derecha? ¿Imagen full-width con H1 overlay? ¿Imagen de fondo con gradiente oscuro?
2. **Mascot Band position** — ¿Entre Features y Category Preview? ¿Estática o con scroll horizontal en mobile?
3. **Scroll-driven gradient** — ¿Fondo global que cambia de color al scrollear, o gradientes fijos por sección?
4. **Comportamiento de imágenes** — ¿Lazy load? ¿Blur-up? ¿Animación de entrada?
5. **Tipografía** — Mantener Poppins (display) + Inter (body), o cambiar a fuentes más "nocturnas"?

---

## ⚠️ Issues Conocidos (a resolver en próximas fases)

1. **Imagen del hero no se renderiza** — `page.tsx:46-77` no la referencia. Fix: agregar `<Image>` o CSS background-image.
2. **Rebrand pendiente** — `mochis-play` → `mochis` y `uwus` → `mochis` (categoría). Afecta ~140 referencias en 26 archivos de producción. **No es parte de este handoff** — el usuario lo abordará por separado si lo decide.
3. **URL de producción pendiente** — Diferido hasta que el usuario compre `mochisplay.cl`.
4. **OG image (1200×630) pendiente** — Diferido.
5. **Footer server-component refactor cancelado** — Mantener `'use client'`.

---

## 🚀 Próximos Pasos Inmediatos

1. **Designer:** Leer ambos documentos de prompts (`image-prompts-redesign.md` y `image-prompts-gemini-duckai.md`)
2. **Designer:** Evaluar la imagen ya generada (`public/images/hero/hero-home.webp`) como referencia canónica de Mimi
3. **Designer:** Producir el diseño visual del Home (Misión 1)
4. **Designer:** Optimizar/ajustar los prompts restantes (Misión 2)
5. **Designer:** Documentar el nuevo design system nocturno (Misión 3)
6. **Coder (futuro):** Implementar el diseño del Home + integrar las imágenes
7. **Reviewer (futuro):** QA final del Home rediseñado

---

## 📚 Recursos Clave para el Designer

| Documento | Propósito |
|-----------|-----------|
| `Agent-Orquest/docs/orchestration/slices/plan-redesign-nocturnal-home.md` | Plan de rediseño con 5 secciones, 11 slices, 14 prompts |
| `Agent-Orquest/docs/orchestration/prompts/image-prompts-redesign.md` | 14 prompts engine-agnostic + Character Design Bible |
| `Agent-Orquest/docs/orchestration/prompts/image-prompts-gemini-duckai.md` | 14 prompts optimizados para Gemini/Duck.AI + 3 alternativas del Hero |
| `Agent-Orquest/docs/orchestration/reports/audit-hero-missing-image.md` | Diagnóstico del issue del hero (3 opciones de layout) |
| `src/styles/tokens.css` | Tokens semánticos actuales (3-layer + dark mode activo) |
| `src/app/page.tsx` | Home actual (sin imagen del hero) |
| `src/components/ui/Card.tsx` | Componente Card (usa `next/image`) |
| `src/data/products.json` | 12 productos en 3 categorías |
| `public/images/hero/hero-home.webp` | Imagen canónica de Mimi ya generada |

---

**¡Éxito con el rediseño! El sitio está listo para recibir la nueva identidad visual.** 🎨
