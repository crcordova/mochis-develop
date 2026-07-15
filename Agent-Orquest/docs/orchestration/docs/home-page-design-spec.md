# Home Page Design Spec — **mochis** (Nocturnal, v2)

**Version:** 2.0
**Date:** 2026-07-14
**Author:** Designer (subagent)
**Status:** Canonical consolidated spec for the redesigned Home page (v2)
**Companion documents:**
- `slices/spec-home-nocturnal-design.md` — Detailed section-by-section spec for the Coder (source of truth for v2)
- `docs/visual-style-guide.md` — Full design system reference
- `slices/plan-home-redesign-v2.md` — The plan that defined the v2 changes (6 slices)
- `docs/coder-brief-v2.md` — Focused brief for the 4 Coder slices (v2.1–v2.4)

> **This document is a single-page reference** that consolidates the visual decisions for the v2 Home page. For deep implementation detail, see the companion `spec-home-nocturnal-design.md`. For design system tokens, see `visual-style-guide.md`.
>
> **Changes vs v1 (high-level):** Hero changed from 60/40 split to full-width blurred background. Features changed from 4-card grid to 4 stacked full-width sections with alternating layout. Category Preview got a per-card glow and visible rebrand. AI Disclaimer became a compact collapsible. Mascot Band deferred.

---

## 1. Hero Section (v2)

### Layout

- **Full-width section** with no max-width on the section element itself.
- **Min height:** 80vh desktop, 75vh tablet, 70vh mobile.
- **Position:** `relative`, `overflow-hidden` (to clip blur overflow).
- **3 layers stacked:**
  1. **Background image layer (LCP):** `<Image fill priority fetchPriority="high">` with `filter: blur(40px)`, `transform: scale(1.1)`, `aria-hidden="true"`, `alt=""`.
  2. **Gradient overlay layer:** `absolute inset-0 pointer-events-none` with stacked linear (top→bottom: 0.4→0.2→0.65 black) + radial (center vignette) gradients.
  3. **Text overlay layer:** `relative z-[2]` with centered text content (H1 + sub + CTAs + disclaimer), `max-w-4xl mx-auto`, `text-center`.
- **Padding:** `py-[var(--space-2xl)] sm:py-[var(--space-3xl)]`, `px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]`.

### Content (text overlay)

| Element | Token | Notes |
|---------|-------|-------|
| H1 | `font-display text-[var(--text-display)]` (48px desktop / 36px mobile) `font-[var(--font-weight-bold)]` `text-[var(--color-text-inverse)]` (#FFFFFF) `leading-[var(--line-height-tight)]` `tracking-[var(--letter-spacing-tight)]` | **"mochis"** (rebrand). **Text-shadow:** `0 2px 12px rgba(0,0,0,0.6), 0 0 24px rgba(0,0,0,0.4)` (safety net). |
| Subhead | `text-[var(--text-body-lg)]` (18px) `text-[var(--color-text-inverse)]` `leading-[var(--line-height-normal)]` `max-w-2xl` | Texto desde `siteData.site.description`. **Text-shadow:** `0 1px 6px rgba(0,0,0,0.5)`. |
| Gap H1 → sub | `mt-[var(--space-md)]` (16px) | |
| CTA 1 (Ver Peluches) | `Button variant="primary" size="lg"` `trackingLabel="home_hero_tienda"` | Coral-700 bg, white text. |
| CTA 2 (¿Cómo Funciona?) | `Button variant="outline" size="lg"` `trackingLabel="home_hero_tutoriales"` | Coral-700 border + text. |
| Gap sub → CTAs | `mt-[var(--space-8)]` (32px) | |
| Gap CTAs → disclaimer | `mt-[var(--space-lg)]` (24px) | |
| Disclaimer | `text-[var(--text-body-sm)]` (14px) `text-[var(--color-text-inverse)] opacity-80` | Texto desde `siteData.disclaimer.short`. **Text-shadow:** `0 1px 3px rgba(0,0,0,0.6)`. |

### Image

- **Path:** `/images/hero/hero-home.webp` (1672×941 WebP, 33KB).
- **`<Image fill>` props:** `priority fetchPriority="high" loading="eager" sizes="100vw" aria-hidden="true" alt=""`.
- **Styles:** `object-cover object-center`, `filter: blur(40px)` (desktop) / `blur(24px)` (mobile), `transform: scale(1.1)`, `willChange: transform`.
- **Decorative** — H1 carries the meaning (Q9 decision).

### Tracking

- `button_click` with `trackingLabel: 'home_hero_tienda'` and `'home_hero_tutoriales'` (same as v1).
- No tracking on the image (decorative).

### Accesibilidad

- H1 is the first and only h1 on the page.
- `aria-label="Inicio"` on the section.
- Image is decorative (`alt=""`, `aria-hidden="true"`).
- H1 over worst-case gradient bg: ≥15:1 contrast ✓ AAA.
- Disclaimer with text-inverse + opacity-80: ≈13:1 ✓ AAA.
- Text-shadow provides safety net over busy starry background.
- CTAs have ≥4.5:1 contrast in their states.

---

## 2. Features Section v2 (4 stacked full-width sections)

### Layout pattern (alternating)

**4 separate `<section>` elements**, stacked vertically, each with its own h2, description, and visual panel. Each section uses a 2-col grid on desktop and stacks on mobile. The text col and visual col alternate sides:

| # | Section | h2 | Order (desktop) | Section bg | Panel color |
|---|---------|----|--------------------|------------|-------------|
| 1 | JuegosSection | "Juegos Interactivos" | text-left, visual-right | `var(--color-bg)` (canvas) | `var(--color-primary)`/15 (coral) |
| 2 | CompaniaSection | "Compañía Inteligente" | visual-left, text-right | `var(--color-bg-subtle)` (alt) | `var(--color-rose-300)`/15 (rose) |
| 3 | IdiomasSection | "Práctica de Idiomas" | text-left, visual-right | `var(--color-bg)` (canvas) | `var(--color-secondary)`/15 (violet) |
| 4 | PersonalizableSection | "Personalizable con Roles" | visual-left, text-right | `var(--color-bg-subtle)` (alt) | `var(--color-sky-300)`/15 (sky) |

**Mobile (< 768px):** always 1 col stack, text primero (DOM order), visual segundo. Padding vertical `space-2xl` (48px).

**Desktop (≥ 768px):** 2-col grid, items centered. Even sections flip with `md:order-1` on visual col. Padding vertical `space-3xl` (64px).

**Container:** `max-w-6xl mx-auto`.

**DOM order (always):** text col first (h2 + p), visual col second. Mobile stack follows DOM order naturally. Desktop alternation is achieved with `md:order-1` / `md:order-2` on even sections.

### Text col content

| Element | Token | Notes |
|---------|-------|-------|
| h2 | `font-display text-[var(--text-heading-lg)]` (30px) `font-[var(--font-weight-bold)]` `text-[var(--color-text)]` `leading-[var(--line-height-tight)]` | Sin cambios vs v1. |
| Description | `text-[var(--text-body-lg)]` (18px) `text-[var(--color-text-secondary)]` `leading-[var(--line-height-relaxed)]` `mt-[var(--space-md)]` `max-w-[480px]` | "Longer description" — usa `text-body-lg` (no `text-body`) para mejor legibilidad de párrafos largos. |

**Per-section copy (longer descriptions):**

1. **Juegos:** "Juegos cortos, historias interactivas y adivinanzas que se adaptan al momento. Cada sesión es diferente: la IA improvisa, así que nunca se repite."
2. **Compañía:** "Conversaciones reales y apoyo emocional para niños y adultos. Puedes preguntarle de todo: cómo resolver un problema, qué canción escuchar, o simplemente hablar de tu día."
3. **Idiomas:** "Aprende inglés y otros idiomas de forma lúdica. Mimi traduce, corrige pronunciación y enseña vocabulario nuevo con juegos que se sienten como jugar, no como estudiar."
4. **Personalizable:** "Configura roles y planes de estudio para cada miembro de la familia. Mimi puede ser profesora de inglés para los niños, compañera de conversación para los adultos, o lo que tú necesites."

### Visual col content (panel)

- **Panel wrapper:** `flex items-center justify-center`.
- **Panel:** `aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto`.
- **Panel bg:** `bg-[<panel-color>]/15` (15% opacity of the section's theme color).
- **Panel glow:** `box-shadow: 0 0 80px -10px var(--<panel-color>)`.
- **Panel radius:** `rounded-[var(--radius-card)]` (16px).
- **Icon:** 80px desktop / 64px mobile, `text-[var(--<icon-color>)]`.
- **Icons (4 existing SVGs from v1 `FeaturesSection.tsx`):**
  1. Juegos: game controller
  2. Compañía: chat bubble
  3. Idiomas: globe
  4. Personalizable: sliders/equalizer

### Animación

- Each section has its own `IntersectionObserver` for fade-in (same pattern as v1).
- Threshold 0.15, rootMargin `-40px bottom`.
- On enter: `opacity-0 → opacity-100`, `translate-y-4 → translate-y-0`, duration `var(--duration-slow)` (300ms), easing `var(--easing-default)`.
- **`prefers-reduced-motion: reduce`:** set `isVisible: true` immediately, no transition.

### Accesibilidad

- Each section: `aria-labelledby="<id>-heading"` with unique h2 id (`juegos-heading`, `compania-heading`, `idiomas-heading`, `personalizable-heading`).
- DOM order: text col first → visual col second (screen readers announce h2 first).
- Heading hierarchy: h1 (Hero) → h2 (each feature) → no h3. Descriptions are `<p>`.
- Icons: `aria-hidden="true"`.
- Contraste h2 (stone-100 en dark) sobre bg (stone-900): ≈14:1 ✓ AAA.
- Contraste description (stone-300) sobre bg: ≈10:1 ✓ AAA.

### Tracking

- **Sin tracking.** Los paneles son decorativos.

---

## 3. Mascot Band (DEFERRED)

**Status:** out of scope for v2. Skip.

The image `mascot-band.webp` does not exist yet; the user did not request this section in v2. Defer to a separate workstream when the image is generated.

---

## 4. Category Preview v2 (restyled)

### Layout (same as v1)

- **Section padding:** `py-[var(--space-3xl)]` desktop, `py-[var(--space-2xl)]` mobile.
- **Container:** `max-w-5xl mx-auto`.
- **Heading:** "Conoce a nuestros peluches" h2 (`text-[var(--text-heading-lg)]` = 30px, Poppins bold, `text-center`).
- **Grid:** `grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]`.
- **Cards:** use existing `Card` component (no modifications). `Badge` + outline `Button` debajo.

### Per-card radial glow (NEW)

Each card is wrapped in a `relative` div with a decorative glow behind:

| Card | Glow color | Hex |
|------|-----------|-----|
| mochis | `var(--color-rose-300)` | `#FDA4AF` |
| gatitos | `var(--color-sky-300)` | `#7DD3FC` |
| pifos | `var(--color-lime-300)` | `#D1EE8C` |

**Glow CSS:**
```css
position: absolute;
inset: -16px;                /* -inset-[var(--space-md)] */
z-index: -10;
border-radius: var(--radius-card);
opacity: 0.6;
background: radial-gradient(circle, var(--card-glow-color) 0%, transparent 70%);
filter: blur(40px);
pointer-events: none;
```

**Mobile performance:** Coder may use `filter: drop-shadow(0 0 30px var(--card-glow-color))` instead of `filter: blur(40px)` for better mobile performance (or media-query the blur down to 24px on mobile).

### Rebrand strings (visible)

| Aspect | v1 | v2 |
|--------|----|----|
| Badge label | "Uwus" | **"mochis"** |
| Button text | "Ver Uwus" | **"Ver mochis"** |
| Tracking label (button) | `home_category_uwus` | **`home_category_mochis`** |
| Tracking id (card) | `home_preview_uwus` | **`home_preview_mochis`** |
| `badgeVariant` key | `'uwus'` | `'uwus'` (NO cambia — Q7) |
| Token `--color-category-uwus-*` | unchanged | unchanged (NO renombrar — Q7) |
| `products.json` `categories[0].name` | "Uwus" | **"mochis"** (único data layer change) |
| `products.json` `categories[0].id` | "uwus" | "uwus" (NO cambia — Tienda usa este id para filtro) |

### Comportamiento

- **Sin animaciones de entrada** (cards no son clickeables en el Home).
- **Hover en card:** `hover:shadow-[var(--shadow-card-hover)]` (existente en Card).
- **Hover en botón outline:** `hover:bg-[var(--color-primary-subtle)]` (existente en Button).
- **Glow on hover:** opcional (no requerido por el Designer).

### Accesibilidad

- `aria-labelledby="categories-heading"`, h2 con `id="categories-heading"`.
- Per-card glow: `aria-hidden="true"`.
- Contraste h2 (stone-100) sobre bg (stone-900): ≈14:1 ✓ AAA.

### Tracking

- Cards (no clickeables): `card_click` con `trackingId="home_preview_mochis" | "home_preview_gatos" | "home_preview_pifos"` (renombrar el primero; no se dispara en Home).
- Botones: `button_click` con `trackingLabel="home_category_mochis" | "home_category_gatos" | "home_category_pifos"`, `trackingData: { destination: '/tienda', category: 'mochis' | 'gatitos' | 'pifos' }`.

---

## 5. AI Disclaimer v2 (compact)

### Layout (compact)

- **Section padding:** `py-[var(--space-md)]` (16px) — vs v1: 48px (3x más compacto).
- **Container:** `max-w-3xl mx-auto`.
- **Element:** `<details>` con `<summary>` colapsable.
- **Default state (colapsado):** altura ~52px, solo se ve summary con icono + "Sobre la IA" + chevron.
- **Expanded state:** se agrega el full disclaimer, altura variable ~150-200px.

### Visual treatment

| Elemento | Token/Valor |
|----------|-------------|
| Card bg | `bg-[var(--color-bg-card)]` (stone-800 en dark) |
| Border | `border border-[var(--color-warning)]/40` (amber-500 al 40%) |
| Radius | `rounded-[var(--radius-card)]` (16px) |
| Shadow | `0 0 30px -10px rgba(245, 158, 11, 0.2)` (amber glow) |
| Summary padding | `p-[var(--space-md)]` (16px) |
| Summary text | `text-[var(--text-body)]` (16px) `text-[var(--color-text-secondary)]` `font-medium` |
| Icon (info) | `text-[var(--color-warning)]` (amber-500) 20×20px |
| Chevron | `text-[var(--color-text-muted)]` 16×16px, rotates 180° when open (`group-open:rotate-180`) |
| Details text | `text-[var(--text-body-sm)]` (14px) `text-[var(--color-text-secondary)]` `leading-[var(--line-height-relaxed)]` |

### Comportamiento

- Sin animaciones de entrada.
- Sin breathing glow.
- Open/close es instantáneo (native `<details>` toggle).
- Hover en summary: `hover:bg-[var(--color-primary-subtle)]/5` (sutil highlight).
- Focus visible en summary: ring `coral-300` 2px con offset 2px.

### Accesibilidad

- `<details>` + `<summary>` es semantic HTML.
- `aria-label="Información sobre IA"` en el section.
- Icon y chevron: `aria-hidden="true"`.
- Tab → Enter/Space → expand/collapse (default behavior).
- Screen reader announces "disclosure, collapsed/expanded".

### Tracking

- **Sin tracking.**

---

## 6. Resumen de flujo de scroll (visual journey v2)

```
[ Top of page ]
  ↓ (scroll-driven gradient: stone-900 → stone-800)
  ↓
[ HERO ]
  - Full-width blurred bg (40px blur, 1.1 scale)
  - Radial + linear gradient overlay
  - Text overlay centered: H1 "mochis" + sub + 2 CTAs + disclaimer
  - 80vh desktop, 70vh mobile
  ↓
[ FEATURES — 4 STACKED SECTIONS ]
  1. Juegos Interactivos
     bg: canvas
     text-left, visual-right (coral panel)
  2. Compañía Inteligente
     bg: subtle (banding)
     visual-left, text-right (rose panel)
  3. Práctica de Idiomas
     bg: canvas
     text-left, visual-right (violet panel)
  4. Personalizable con Roles
     bg: subtle (banding)
     visual-left, text-right (sky panel)
  Each: h2 + longer description + colored panel with icon
  IntersectionObserver fade-in (per section)
  ↓
[ CATEGORY PREVIEW ]
  - 3 cards: mochis, gatitos, pifos
  - Per-card radial glow (rose, sky, lime)
  - "Conoce a nuestros peluches" h2
  - Rebrand: "mochis" badge label, "Ver mochis" button text
  ↓
[ AI DISCLAIMER ]
  - <details> compacto colapsable
  - "Sobre la IA" summary
  - Amber border + subtle glow
  - ~52px height when collapsed
  ↓
[ Footer ]
  - stone-700 bg
  - cream-200 text
  ↓
[ Bottom of page ]
```

---

## 7. Componentes modificados/creados (consolidado)

| Acción | Path | Slice |
|--------|------|-------|
| Modificar | `src/components/home/HeroSection.tsx` (full rewrite) | v2.1 |
| Modificar | `src/app/page.tsx` (Features import + tag) | v2.2 |
| Crear | `src/components/home/Features/FeatureSection.tsx` (shared) | v2.2 |
| Crear | `src/components/home/Features/JuegosSection.tsx` | v2.2 |
| Crear | `src/components/home/Features/CompaniaSection.tsx` | v2.2 |
| Crear | `src/components/home/Features/IdiomasSection.tsx` | v2.2 |
| Crear | `src/components/home/Features/PersonalizableSection.tsx` | v2.2 |
| Eliminar | `src/components/home/FeaturesSection.tsx` | v2.2 |
| Crear | `src/components/home/CategoryPreview.tsx` | v2.3 |
| Modificar | `src/app/page.tsx` (rebrand strings + Category Preview block) | v2.3 |
| Modificar | `src/data/products.json` (categories[0].name = "mochis") | v2.3 |
| Crear | `src/components/home/AIDisclaimer.tsx` | v2.4 |
| Modificar | `src/app/page.tsx` (AIDisclaimer import + block) | v2.4 |
| (Sin cambios) | `src/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `globals.css` | — |

---

## 8. Resumen de decisiones de design (v2)

1. **Hero = full-width blurred background, text overlay centered** (reemplaza split 60/40 de v1). Razón: usuario explícito. Crea atmósfera fuerte, Mimi visible pero soft.
2. **Features = 4 stacked full-width sections, alternating layout** (reemplaza 4-card grid de v1). Razón: usuario explícito. Story-telling flow, una sección por concepto, layout alternado para ritmo visual, background banding sutil (canvas/subtle/canvas/subtle).
3. **Category Preview = mismo grid + per-card radial glow + rebrand visible** (extiende v1). Razón: usuario pidió "restyle" + rebrand. Glow per-card da impacto visual sin cambiar layout. Solo los strings visibles cambian (`badgeLabel`, `buttonText`, `trackingLabel`/`trackingId`, y `categories[0].name` en products.json).
4. **AI Disclaimer = `<details>` compacto colapsable** (reemplaza full-section de v1). Razón: usuario pidió "compact version". `<details>` es semantic HTML, keyboard-accessible, expandible on-demand, altura ~52px cuando colapsado.
5. **Mascot Band = DEFERRED** (excluido de v2). Razón: imagen no existe, usuario no lo pidió. Decisión Q8.
6. **Badge variant key `'uwus'`** NO se renombra a `'mochis'` en v2. Razón: Q7 decisión — smaller blast radius, el rename es parte del workstream de rebrand completo (out of scope). Solo cambia el visible string del badge label.

---

## 9. Métricas de aceptación (v2)

Para que el rediseño v2 se considere "completo":

- [ ] Build pasa (`npm run build`).
- [ ] Lint pasa (`npm run lint`).
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- [ ] WCAG AA verificado para todos los text/background combinations (ver `spec-home-nocturnal-design.md`).
- [ ] `prefers-reduced-motion: reduce` honored (animaciones desactivadas, sin glow pulsante en disclaimer).
- [ ] Tracking events still fire: `button_click` con los 4 nuevos `trackingLabel` (`home_hero_tienda`, `home_hero_tutoriales`, `home_category_mochis`, `home_category_gatos`, `home_category_pifos`).
- [ ] Rebrand visible en el Home: "Uwus" no aparece en el render del Home; "mochis" sí.
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px) renderizan correctamente.
- [ ] Hero LCP ≤ 2.5s en 4G mobile (verificado con Lighthouse).
- [ ] Mobile Hero blur es 24px (no 40px) para performance.
- [ ] Tienda sigue renderizando correctamente después del rebrand (validar en smoke test).
- [ ] 4 Features sections renderizan en el orden correcto: Juegos, Compañía, Idiomas, Personalizable.
- [ ] Category Preview cards tienen glow visible (verificar en mobile y desktop).
- [ ] AI Disclaimer colapsado muestra solo el summary (icono + "Sobre la IA" + chevron).
- [ ] AI Disclaimer expandido muestra el full text del disclaimer.

---

**End of Home Page Design Spec v2.0. Total: 4 sections specified (Hero v2, Features v2, Category Preview v2, AI Disclaimer v2) + 1 deferred (Mascot Band) + 1 component architecture section. Companion: `spec-home-nocturnal-design.md` (detailed) + `coder-brief-v2.md` (Coder-focused).**
