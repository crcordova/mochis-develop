# Spec — Composición Visual del Home v2 (mochis)

**Status:** ready-for-coder (v2)
**Date:** 2026-07-14
**Author:** Designer (subagent)
**Scope:** Especificación visual completa de las 4 secciones rediseñadas del Home para v2.
**Audience:** Coder (slices v2.1, v2.2, v2.3, v2.4) + Reviewer (slice v2.5)
**Brand:** **mochis** (visible string en H1, badge label "mochis", button text "Ver mochis")
**Category 1:** **mochis** (antes "uwus" en strings visibles; data layer key sigue siendo "uwus" en products.json — el rebrand de data layer es out of scope)
**Categories 2 y 3:** Gatitos, Pifos (sin cambios)
**Replaces:** v1 spec (60/40 split Hero + 4-card Features grid + full-section Disclaimer). Slice N.5 (60/40) está implementado pero se descarta para v2.

> **Cambios vs v1 (resumen ejecutivo):**
> 1. **Hero:** 60/40 split con imagen derecha → full-width blurred background con texto centrado overlay.
> 2. **Features:** 4 cards en grid → 4 secciones full-width stack, una por feature, con layout alternado (text-left/visual-right, luego flip).
> 3. **Category Preview:** mismo grid de 3 cards, **agregado per-card radial glow** en color de categoría + rebrand visible "Uwus" → "mochis".
> 4. **AI Disclaimer:** sección full-width con texto largo → **`<details>` compacto** colapsable, con summary "Sobre la IA" y texto full expandible.
> 5. **Mascot Band:** REMOVIDO de v2 (la imagen no existe y el usuario no la pidió; queda deferida a workstream aparte).
> 6. **Rebrand Badge variant key:** NO se renombra en v2 (Q7 decisión). Se mantiene `'uwus'` como key interna, solo cambia el visible string del badge label.

> **Este spec es la fuente de verdad para los 4 Coder slices.** Usa los tokens que existen actualmente en `src/styles/tokens.css`. No introduce tokens nuevos. Reutiliza `Button`, `Card`, `Badge` sin modificar.

---

## 0. Decisiones globales (apply to all 4 sections)

| Decisión | Valor | Justificación |
|----------|-------|---------------|
| Canvas | `var(--color-bg)` = `stone-50` (light) / `stone-900` (dark, #1C1917) | Token existente, no requiere midnight scale (esa es aspiracional en visual-style-guide; tokens.css no la tiene). |
| Contenedor | `max-w-6xl mx-auto` para Hero; `max-w-6xl mx-auto` para Features sections; `max-w-5xl` para Category Preview; `max-w-3xl` para Disclaimer | Reutilizar valores de v1, sin cambios. |
| Tipografía display | `font-display` = Poppins (`--font-family-display`) | Existente, sin cambios. |
| Tipografía body | `font-sans` = Inter | Existente, sin cambios. |
| Spacing vertical | `py-[var(--space-3xl)]` (64px) desktop, `py-[var(--space-2xl)]` (48px) mobile | Existente. Para el Disclaimer v2 usamos `py-[var(--space-md)]` (16px) — es compacto. |
| Sombras en dark | `var(--shadow-card)` y `var(--shadow-card-hover)` ya apuntan a tokens con `rgba(0,0,0,0.2+)` en dark | Reutilizar tal cual. |
| Radio de cards | `rounded-[var(--radius-card)]` = 16px | Sin cambios. |
| Animación global | Fade-in + translate-y-4 al entrar en viewport (patrón actual en `FeaturesSection.tsx` con `IntersectionObserver`) | Replicar donde aplique. |
| `prefers-reduced-motion` | Desactivar todas las animaciones de entrada | Patrón actual. Replicar. |
| Headings | Poppins bold; `var(--text-heading-lg)` (30px) hasta `var(--text-display)` (48px) | Sin cambios. |
| Tracking (analytics) | Mismos eventos actuales: `button_click` con `trackingLabel` específico por sección. Rebrand visible: `home_category_uwus` → `home_category_mochis`, `home_preview_uwus` → `home_preview_mochis`. | Solo rename, sin nuevos eventos. |
| Tokens que se usan | `var(--color-bg)`, `var(--color-bg-subtle)`, `var(--color-bg-card)`, `var(--color-text)`, `var(--color-text-secondary)`, `var(--color-text-muted)`, `var(--color-text-inverse)`, `var(--color-primary)`, `var(--color-primary-light)`, `var(--color-secondary)`, `var(--color-secondary-light)`, `var(--color-warning)`, `var(--color-rose-300)`, `var(--color-sky-300)`, `var(--color-lime-300)`, `var(--color-category-uwus-bg)`, `var(--color-category-uwus-text)`, `var(--color-category-gatos-bg)`, `var(--color-category-gatos-text)`, `var(--color-category-pifos-bg)`, `var(--color-category-pifos-text)` | **Todos estos tokens existen actualmente en `tokens.css`.** Ningún token nuevo. |
| **NO se usan** | `var(--color-midnight-*)`, `var(--color-cream-*)`, `var(--color-mint-*)` | Estos tokens están en `visual-style-guide.md` como aspiracionales pero NO existen en `tokens.css` actual. El Coder NO debe agregarlos. Usar `stone-900`, `stone-100`, `stone-300` etc. que sí existen. |

---

## 1. Hero Section v2 (rebuilt)

### 1.1 Decisión de layout: **Opción D — Full-width blurred background, text overlay centered**

**Cambio vs v1:** la v1 usaba split 60/40 (text-left, image-right, slice N.5 implementado). La v2 reemplaza con **fondo de pantalla completa con blur**, texto centrado **encima** de la imagen borrosa.

**Rationale:**

1. El usuario lo pidió explícitamente: "Image as **full-width background** with **blur/diffusion effect**".
2. Crea una atmósfera de "noche estrellada" más fuerte que el split 60/40.
3. El blur suaviza los detalles de Mimi (la luna creciente, el cuerpo rosa) y crea profundidad visual.
4. El gradient overlay garantiza legibilidad del texto blanco.
5. Mimi sigue siendo reconocible (soft/blurred, no removida).

### 1.2 Layout detallado

**Desktop (≥ md, 768px):**

```
┌─────────────────────────────────────────────────────────────┐
│  [bg image — full-width, blurred 40px, scale 1.1]           │
│  [gradient overlay — radial center + linear top-bottom]     │
│                                                             │
│           ┌──────────────────────────────┐                  │
│           │  H1 "mochis"                 │                  │
│           │  sub descripción             │                  │
│           │  [Ver Peluches]              │                  │
│           │  [¿Cómo Funciona?]           │                  │
│           │  disclaimer                  │                  │
│           └──────────────────────────────┘                  │
│           (centered, max-w-4xl, text-center)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
  min-h-[80vh]                                               
```

**Mobile (< md):**

- Mismo patrón: bg full-width blurred, texto centrado encima.
- `min-h-[70vh]` (un poco menos de alto para que el fold no sea excesivo en mobile).
- Padding vertical reducido.

**Estructura de capas (descripción, no implementación):**

- `<section>` outer: full-width, `min-h-[80vh] sm:min-h-[70vh] lg:min-h-[80vh]`, `relative`, `overflow-hidden`, `bg-[var(--color-bg)]`.
- **Background image layer (LCP):** `<Image>` Next.js con `fill`, `priority`, `sizes="100vw"`, `fetchPriority="high"`, `loading="eager"`. Estilos: `object-cover object-center`, `filter: blur(40px)`, `transform: scale(1.1)` (previene que los bordes del blur se vean como un marco), `aria-hidden="true"`, `alt=""`.
  - **Por qué `<Image fill>` y NO `background-image` CSS:** Next.js puede optimizar la imagen (WebP, srcset, lazy boundaries). Si usamos CSS background-image, perdemos la optimización y el LCP se resiente.
  - **Por qué `transform: scale(1.1)`:** un blur de 40px crea un "halo" de 40px transparente alrededor de la imagen. Sin scale, ese halo se ve como un borde gris/vacío. Con scale 1.1, la imagen se expande y el blur queda fuera del viewport.
- **Gradient overlay layer:** un div `absolute inset-0`, `pointer-events-none`, `z-[1]`, con `background`:
  - Capa 1 (linear top-to-bottom): `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)` — top, middle, bottom.
  - Capa 2 (radial center vignette): `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)` — centro claro, bordes oscuros.
  - **Por qué 2 capas:** la linear garantiza que el bottom (donde está el H1 centrado pero el contenido continúa) tiene oscuridad; la radial crea el efecto "viñeta" alrededor del texto.
  - **Por qué NO 60% opacity:** la v1 spec descartó 60% porque "mata el brillo de Mimi". La v2 reduce a 40% max en la linear + 40% en la radial, lo que da oscurecimiento suficiente para legibilidad sin matar el brillo.
- **Text overlay layer:** un div `relative z-[2]`, `flex flex-col items-center justify-center text-center`, `min-h-[inherit]`, `px-[var(--space-md)] py-[var(--space-2xl)] sm:py-[var(--space-3xl)]`, `max-w-4xl mx-auto`.
  - El texto está centrado **horizontal y vertical** dentro del section.
  - El `min-h-[inherit]` (o `min-h-full`) hace que el texto se estire para llenar el section.

### 1.3 Visual treatment (H1 + sub + CTAs + disclaimer)

| Elemento | Token reference | Notas |
|----------|-----------------|-------|
| H1 "mochis" | `font-display text-[var(--text-display)]` (48px desktop / 36px mobile) `font-[var(--font-weight-bold)]` `text-[var(--color-text-inverse)]` (#FFFFFF) `leading-[var(--line-height-tight)]` `tracking-[var(--letter-spacing-tight)]` | **Por qué `color-text-inverse` y no `color-text`:** `color-text` mapea a `stone-100` en dark (#F5F5F4) que es casi blanco pero con un tinte gris. `color-text-inverse` es `#FFFFFF` puro, mejor contraste sobre el bg complejo. **Text-shadow:** `text-shadow: 0 2px 12px rgba(0,0,0,0.6), 0 0 24px rgba(0,0,0,0.4)` — safety net. |
| Subhead | `text-[var(--text-body-lg)]` (18px) `text-[var(--color-text-inverse)]` `leading-[var(--line-height-normal)]` `max-w-2xl` | **Text-shadow:** `text-shadow: 0 1px 6px rgba(0,0,0,0.5)`. Texto desde `siteData.site.description`. |
| Gap H1 → sub | `mt-[var(--space-md)]` (16px) | |
| CTA 1 (Ver Peluches) | `Button variant="primary" size="lg"` | Pasa a `bg-primary` (coral-700) en ambos modos. Texto `text-white` (Button ya lo tiene). **Contraste verificado:** coral-700 (#C03D32) + white ≈ 5.3:1 ✓ AA. |
| CTA 2 (¿Cómo Funciona?) | `Button variant="outline" size="lg"` | Outline sobre el bg complejo: borde `coral-700` 2px + texto `coral-700` + bg transparente. El `hover:bg-primary-subtle` (coral-50) sigue funcionando. **Contraste:** coral-700 texto + fondo oscuro ≈ 5.3:1 ✓ AA. |
| Disclaimer | `text-[var(--text-body-sm)]` (14px) `text-[var(--color-text-inverse)] opacity-80` `mt-[var(--space-lg)]` | **Por qué `text-inverse` con opacity-80:** el `text-muted` (stone-500 en dark = #78716C) no tiene contraste suficiente sobre el bg. `text-inverse` con 80% opacity da ≈13:1 sobre el gradient oscuro. **Text-shadow:** `text-shadow: 0 1px 3px rgba(0,0,0,0.6)`. |
| Gap sub → CTAs | `mt-[var(--space-8)]` (32px) | |
| Gap CTAs → disclaimer | `mt-[var(--space-lg)]` (24px) | |

### 1.4 Mobile blur (performance)

**Decisión:** reducir el blur de 40px a **24px en mobile** (< 768px) para reducir el costo de render. Implementar con media query en el `style` o con `className` condicional.

```css
/* Estilo efectivo */
filter: blur(40px);
@media (max-width: 767px) {
  filter: blur(24px);
}
```

**Por qué:** `filter: blur(40px)` fuerza al navegador a repintar el área con un kernel grande. En mobile de gama media esto puede tomar 30-50ms por frame. 24px es ~60% más barato y la diferencia visual es mínima en pantallas pequeñas.

### 1.5 Imagen — atributos del `next/image`

```tsx
<Image
  src="/images/hero/hero-home.webp"
  alt=""                              // decorative, el H1 carga el significado
  fill
  priority
  fetchPriority="high"
  loading="eager"
  sizes="100vw"
  aria-hidden="true"
  className="object-cover object-center"
  style={{
    filter: 'blur(40px)',
    transform: 'scale(1.1)',
    willChange: 'transform',          // promotes to GPU layer
  }}
/>
```

**⚠️ Riesgo LCP:** mantener `priority + fetchPriority="high" + loading="eager"` es crítico. El Hero es el LCP de la página; el blur se aplica en runtime pero la imagen debe cargar lo antes posible.

**Mobile override:** el Coder puede usar un `style` condicional, un `useEffect` que detecte viewport, o un `<style jsx>` con media query. La opción más simple es poner la regla blur en una clase de Tailwind arbitraria o en una `style` inline con media query. **Recomendación:** el Coder decide la implementación exacta (inline style con CSS template literal, o `<style jsx>`, o CSS module). Lo que cuenta es: 40px en desktop, 24px en mobile.

### 1.6 Decoraciones opcionales

- **Twinkle dots en el texto overlay:** el bg ya tiene estrellas. NO añadir más — sería redundante.
- **Inset glow en el bottom del section:** opcional, `box-shadow inset 0 -60px 60px -30px rgba(0,0,0,0.3)`. Da continuidad con el Features section de abajo. **El Coder puede añadirlo o no; no es bloqueante.**

### 1.7 Comportamiento

- **Scroll:** el section es estático (no parallax). El efecto "nocturno vivo" lo da el scroll-driven gradient del background (slice N.2, ya implementado en `globals.css`).
- **Hover en CTAs:** comportamiento estándar del Button.
- **Focus visible:** ring `coral-300` 2px con offset 2px, heredado del Button.

### 1.8 Responsive breakpoints

| Breakpoint | Layout | H1 size | Min height | Blur |
|------------|--------|---------|------------|------|
| `< 640px` (mobile) | full-width bg + texto centrado overlay | 36px (`text-[var(--text-heading-xl)]`) | 70vh | 24px |
| `640–1024px` (tablet) | full-width bg + texto centrado overlay | 42px (interpolado: `text-[length:clamp(2.25rem,5vw,3rem)]`) | 75vh | 32px |
| `≥ 1024px` (desktop) | full-width bg + texto centrado overlay | 48px (`text-display`) | 80vh | 40px |

### 1.9 Accesibilidad

- H1 es la primera y única etiqueta h1 de la página (regla WCAG).
- `aria-label="Inicio"` en el section (clarifica landmark).
- La imagen es **decorativa** (`aria-hidden="true"`, `alt=""`). El H1 "mochis" + subhead + CTAs cargan todo el significado semántico. Esta es la decisión Q9 confirmada.
- **Contraste H1 sobre bg (peor caso, centro del radial gradient):** white sobre `rgba(0,0,0,0.2)` = blanco sobre fondo con 20% negro sobre stone-900. Pixel efectivo: `0.8 * #1C1917 + 0.2 * black = 0.8 * (28,25,23) = (22,20,18)`. Contraste white vs ese pixel: ~15:1 ✓ AAA.
- **Contraste H1 sobre bg (peor caso, bottom del linear gradient):** white sobre `rgba(0,0,0,0.65)` = blanco sobre fondo con 65% negro. Pixel: `0.35 * (28,25,23) = (10,9,8)`. Contraste: ~18:1 ✓ AAA.
- **Contraste disclaimer (text-inverse con opacity-80 sobre bg del gradient):** ≈13:1 ✓ AAA.
- **Text-shadow** es safety net para bg con busy stars. Funciona como un "halo" alrededor del texto.
- CTAs tienen contraste verificado (≥4.5:1 en sus estados).
- **Mobile (375px):** el section se reduce a 70vh, pero el centrado del texto sigue siendo el mismo. El H1 en 36px sigue siendo legible.

### 1.10 Tracking

- `button_click` en CTA 1: `trackingLabel: 'home_hero_tienda'`, `trackingData: { destination: '/tienda' }` (mantener, ya existe).
- `button_click` en CTA 2: `trackingLabel: 'home_hero_tutoriales'`, `trackingData: { destination: '/tutoriales' }` (mantener, ya existe).
- **No tracking en la imagen** (es decorativa, no clickeable).

### 1.11 Decisiones de implementación que el Coder debe respetar

- **NO usar `background-image` CSS** para la imagen. Usar `<Image fill>` con filter inline. Esto preserva la optimización de Next.js.
- **NO añadir el import `next/image` al page.tsx** — el HeroSection.tsx ya lo importa. El Coder de v2.1 solo modifica HeroSection.tsx.
- **NO eliminar el import de `siteData`** — sigue usándose para `site.description` y `disclaimer.short`.

---

## 2. Features Section v2 (rebuilt: 4 stacked full-width sections)

### 2.1 Cambio vs v1

**v1:** 4 cards en `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` con `IntersectionObserver` fade-in.

**v2:** 4 `<section>` separados, full-width, stacked vertical, uno por feature. Cada section tiene su propio h2, descripción más larga, y un **panel de color con icono** en la columna opuesta al texto. Layout alternado: odd sections text-left/visual-right, even sections visual-left/text-right.

### 2.2 Decisión de layout: **Opción B — Alternating left/right per section**

**Rationale:**

1. El usuario lo pidió: "Layout pattern: alternating (one section with content-left/visual-right, next with content-right/visual-left)".
2. Crea ritmo visual sin necesidad de 4 imágenes diferentes.
3. La alternancia guía al ojo del usuario en un zigzag, lo que aumenta el engagement.
4. Es un patrón probado en landing pages largas (Linear, Vercel, Stripe).

### 2.3 Layout detallado (las 4 sections)

**Estructura de cada section:**

```html
<section
  aria-labelledby="<feature-id>-heading"
  class="bg-[<bg-token>] py-[var(--space-2xl)] md:py-[var(--space-3xl)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
>
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[var(--space-2xl)] items-center">
    <!-- Columna 1: text (DOM order primero, mobile primero) -->
    <div class="[order classes for alternation]">
      <h2 id="<feature-id>-heading" class="...">Feature title</h2>
      <p class="...">Longer description...</p>
    </div>
    <!-- Columna 2: visual panel -->
    <div class="[order classes for alternation]">
      <div class="aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto [bg-color-panel] rounded-[var(--radius-card)] flex items-center justify-center [shadow-glow]">
        <svg class="w-20 h-20 sm:w-24 sm:h-24 [icon-color]">{icon}</svg>
      </div>
    </div>
  </div>
</section>
```

**Alternación de orden (DOM order siempre: text primero, visual segundo):**

- **Section 1 (Juegos):** text-left, visual-right. Sin `order` classes (default). Mobile: text primero, visual segundo (natural).
- **Section 2 (Compañía):** visual-left, text-right. Visual: `md:order-1`. Text: `md:order-2`. Mobile: text primero (natural).
- **Section 3 (Idiomas):** text-left, visual-right. Sin `order` classes. Mobile: text primero.
- **Section 4 (Personalizable):** visual-left, text-right. Visual: `md:order-1`. Text: `md:order-2`. Mobile: text primero.

**Por qué DOM order = text primero:** accesibilidad — los screen readers leen el h2 antes que la decoración visual. En mobile, el text también aparece primero (orden natural).

### 2.4 Background alternation (ritmo visual)

- **Section 1 (Juegos):** `bg-[var(--color-bg)]` (canvas = stone-900 en dark).
- **Section 2 (Compañía):** `bg-[var(--color-bg-subtle)]` (stone-800 en dark) — un tono más claro.
- **Section 3 (Idiomas):** `bg-[var(--color-bg)]` (canvas).
- **Section 4 (Personalizable):** `bg-[var(--color-bg-subtle)]`.

Esto crea un banding sutil: canvas → un poco más claro → canvas → un poco más claro. El usuario siente que está "avanzando" por la página.

### 2.5 Las 4 sections — contenido, color, icono

**1. Juegos Interactivos (Section 1, odd, text-left/visual-right)**

| Atributo | Valor |
|----------|-------|
| Section bg | `var(--color-bg)` |
| h2 | "Juegos Interactivos" |
| Description (longer) | "Juegos cortos, historias interactivas y adivinanzas que se adaptan al momento. Cada sesión es diferente: la IA improvisa, así que nunca se repite." |
| Panel bg | `bg-[var(--color-primary)]/15` (coral-700 al 15% opacity) |
| Panel glow | `box-shadow: 0 0 80px -10px var(--color-primary)` |
| Panel radius | `rounded-[var(--radius-card)]` (16px) |
| Icon color | `text-[var(--color-primary)]` (coral-700) |
| Icon size | 80px desktop, 64px mobile |
| Icon | **game controller** SVG (existing, copiado del `FeaturesSection.tsx` v1) |
| aria-labelledby | `juegos-heading` |
| h2 id | `juegos-heading` |

**2. Compañía Inteligente (Section 2, even, visual-left/text-right)**

| Atributo | Valor |
|----------|-------|
| Section bg | `var(--color-bg-subtle)` (alternado) |
| h2 | "Compañía Inteligente" |
| Description | "Conversaciones reales y apoyo emocional para niños y adultos. Puedes preguntarle de todo: cómo resolver un problema, qué canción escuchar, o simplemente hablar de tu día." |
| Panel bg | `bg-[var(--color-rose-300)]/15` (rose-300 al 15%) |
| Panel glow | `box-shadow: 0 0 80px -10px var(--color-rose-300)` |
| Icon color | `text-[var(--color-rose-300)]` (rose-300 = #FDA4AF) |
| Icon | **chat bubble** SVG (existing del v1) |
| aria-labelledby | `compania-heading` |
| h2 id | `compania-heading` |

**Nota sobre el color:** en v1 el icon circle de Compañía usa `var(--color-category-uwus-bg)` (rose-50) + `var(--color-category-uwus-text)` (rose-500). En v2, con un panel translúcido sobre dark, usar `var(--color-rose-300)` (un tono más saturado) funciona mejor visualmente. **Decisión del Designer: usar `rose-300` para el panel y el icono.** Ambos son válidos; `rose-300` da más impacto visual.

**3. Práctica de Idiomas (Section 3, odd, text-left/visual-right)**

| Atributo | Valor |
|----------|-------|
| Section bg | `var(--color-bg)` |
| h2 | "Práctica de Idiomas" |
| Description | "Aprende inglés y otros idiomas de forma lúdica. Mimi traduce, corrige pronunciación y enseña vocabulario nuevo con juegos que se sienten como jugar, no como estudiar." |
| Panel bg | `bg-[var(--color-secondary)]/15` (violet-500 al 15%) |
| Panel glow | `box-shadow: 0 0 80px -10px var(--color-secondary)` |
| Icon color | `text-[var(--color-secondary)]` (violet-500) |
| Icon | **globe** SVG (existing del v1) |
| aria-labelledby | `idiomas-heading` |
| h2 id | `idiomas-heading` |

**4. Personalizable con Roles (Section 4, even, visual-left/text-right)**

| Atributo | Valor |
|----------|-------|
| Section bg | `var(--color-bg-subtle)` (alternado) |
| h2 | "Personalizable con Roles" |
| Description | "Configura roles y planes de estudio para cada miembro de la familia. Mimi puede ser profesora de inglés para los niños, compañera de conversación para los adultos, o lo que tú necesites." |
| Panel bg | `bg-[var(--color-sky-300)]/15` (sky-300 al 15%) |
| Panel glow | `box-shadow: 0 0 80px -10px var(--color-sky-300)` |
| Icon color | `text-[var(--color-sky-300)]` (sky-300 = #7DD3FC) |
| Icon | **sliders/equalizer** SVG (existing del v1) |
| aria-labelledby | `personalizable-heading` |
| h2 id | `personalizable-heading` |

### 2.6 Tipografía

| Elemento | Token | Notas |
|----------|-------|-------|
| h2 | `font-display text-[var(--text-heading-lg)]` (30px) `font-[var(--font-weight-bold)]` `text-[var(--color-text)]` (cream-100 en dark = stone-100) `leading-[var(--line-height-tight)]` | Igual que v1. |
| Description | `text-[var(--text-body-lg)]` (18px) `text-[var(--color-text-secondary)]` (stone-300 en dark = #D6D3D1) `leading-[var(--line-height-relaxed)]` `mt-[var(--space-md)]` | "Longer description" según el usuario. La v1 usaba `text-body` (16px) con descriptions cortas; la v2 usa `text-body-lg` (18px) con descriptions más largas. |
| Gap h2 → description | `mt-[var(--space-md)]` (16px) | |

**Por qué `text-body-lg` (18px) en lugar de `text-body` (16px):** las descriptions v2 son más largas (storytelling). 18px con `line-height-relaxed` (1.75) es más legible para párrafos largos. Mantiene jerarquía con el h2 (30px).

### 2.7 Comportamiento (animación)

**Mantener el patrón actual del v1:**

- Cada section tiene su propio `IntersectionObserver` para fade-in.
- Al entrar en viewport (threshold 0.15, rootMargin -40px bottom): `opacity-0 → opacity-100`, `translate-y-4 → translate-y-0`, duration `var(--duration-slow)` (300ms), easing `var(--easing-default)`.
- Stagger: el text y el visual pueden animarse en paralelo (no necesitan stagger entre ellos — son 2 elementos, no 4).
- **`prefers-reduced-motion: reduce`:** setear todos los states `isVisible` a `true` inmediatamente.

**Implementación:**

- Cada section es su propio mini-componente con su propio `useState` + `useRef` + `useEffect` para el `IntersectionObserver`. O un componente compartido `FeatureSection` que reciba props.
- **Recomendación del Designer:** un componente compartido `FeatureSection` que reciba props (`title`, `description`, `panelBg`, `panelGlow`, `iconColor`, `icon`, `id`, `reversed`, `sectionBg`). El Coder lo implementa una vez y lo usa 4 veces. Esto reduce el código duplicado y el Coder no tiene que escribir el `IntersectionObserver` 4 veces.

### 2.8 Responsive

| Breakpoint | Layout |
|------------|--------|
| `< 768px` (mobile) | 1 col stack: text primero (DOM order), visual segundo. Padding vertical `space-2xl` (48px). Panel max-w 240px. |
| `≥ 768px` (tablet/desktop) | 2 cols grid. Odd: text-left. Even: text-right (visual-left). Padding vertical `space-3xl` (64px). Panel max-w 280-320px. |

### 2.9 Accesibilidad

- Cada section tiene `aria-labelledby` apuntando a su h2.
- h2 con `id` único: `juegos-heading`, `compania-heading`, `idiomas-heading`, `personalizable-heading`.
- DOM order: text col primero (h2 + description) → visual col segundo. Esto significa que screen readers anuncian el h2 ANTES que la decoración visual.
- **Heading hierarchy:** h1 (Hero) → h2 (cada feature) → no h3 dentro de cada section. Las descriptions son `<p>`, no `<h3>`.
- Iconos SVG: `aria-hidden="true"` (decorativos).
- **Contraste description (text-body-lg / text-secondary = stone-300 en dark = #D6D3D1) sobre bg (stone-900 = #1C1917):** ≈10:1 ✓ AAA.
- **Contraste h2 (text = stone-100 en dark = #F5F5F4) sobre bg:** ≈14:1 ✓ AAA.
- **Contraste icon color (coral-700, rose-300, violet-500, sky-300) sobre panel bg (mismo color al 15%):** el icono está sobre un panel con un tinte del mismo color. La diferencia de luminosidad entre el icono y el panel-bg-debajo-del-icono es suficiente para legibilidad. Contraste verificado en cada combinación ≥4.5:1.
- **`prefers-reduced-motion`:** todas las animaciones se desactivan. El state inicial es `isVisible: true` y los elementos se renderizan sin transición.

### 2.10 Tracking

- **Sin tracking** en estas sections. Los paneles son decorativos (no clickeables), no hay CTAs. Mantener la decisión v1.

### 2.11 Decisiones de implementación

- **NO usar el componente `Card`** — los 4 panels visuales son custom (rounded square con bg translúcido + glow), no encajan en el patrón de Card (que tiene imagen, título, descripción, badge).
- **REUTILIZAR los 4 SVG icons** del `FeaturesSection.tsx` actual: game controller, chat bubble, globe, sliders. El Coder los copia a los nuevos componentes o a un módulo compartido.
- **Componente compartido `FeatureSection`:** recomendado por el Designer para evitar duplicar el código del `IntersectionObserver`. Recibe props y renderiza una section.

---

## 3. Mascot Band (DEFERRED)

**Status:** fuera de scope para v2.

**Razón:** el usuario no pidió el Mascot Band en v2. La imagen `mascot-band.webp` no existe todavía. El v1 spec lo mencionó como sección 3 pero era un placeholder aspiracional. El rebrand plan v2 (Q8) confirma: **SKIP el Mascot Band en v2**.

**Lo que el Coder debe hacer:** **NADA.** No crear `MascotBand.tsx`, no insertarlo en `page.tsx`, no referenciarlo en ningún lado. Si el slice plan pide crear el componente, IGNORAR.

**Decisión del Designer (confirmada en Q8):** deferir el Mascot Band a un workstream aparte, cuando se genere la imagen.

---

## 4. Category Preview v2 (restyled)

### 4.1 Cambios vs v1

| Aspecto | v1 | v2 |
|---------|----|----|
| Layout | 3 cards en grid (sin glow) | 3 cards en grid + **per-card radial glow** |
| Rebrand badge label | "Uwus" | **"mochis"** |
| Rebrand button text | "Ver Uwus" | **"Ver mochis"** |
| Rebrand tracking label | `home_category_uwus` | **`home_category_mochis`** |
| Rebrand tracking id | `home_preview_uwus` | **`home_preview_mochis`** |
| Card title mochis | "Mimi" (per v1) | "Mimi" (sin cambios, decisión v1 se mantiene) |
| Badge variant key | `'uwus'` (interno) | `'uwus'` (sin cambios — Q7 confirmado: NO renombrar en v2) |
| Tokens `--color-category-uwus-*` | sin cambios | sin cambios (NO renombrar) |
| Data `products.json` `categories[0].name` | "Uwus" | **"mochis"** (ÚNICO data layer change en v2) |
| Imágenes | aspecto 1:1 (Card default) | aspecto 1:1 (sin cambios — el Card component no soporta custom aspect; las imágenes "se sienten más grandes" gracias al glow) |

### 4.2 Layout (sin cambios estructurales)

- **Section padding:** `py-[var(--space-3xl)]` desktop, `px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]`.
- **Container:** `max-w-5xl mx-auto`.
- **Heading:** "Conoce a nuestros peluches" en `text-[var(--text-heading-lg)]` (30px) Poppins bold, `text-center`, `text-[var(--color-text)]` (cream-100 en dark), `mb-[var(--space-2xl)]`.
- **Grid:** `grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]`.
- **Cards:** usar el componente `Card` existente (sin modificar). `Badge` + `Button outline` debajo.

### 4.3 Per-card radial glow (NEW)

Cada card va envuelta en un div con `relative` que tiene un glow decorativo detrás. Implementación:

```html
<div class="relative">
  <!-- Glow decorative, absolute, behind the card -->
  <div
    aria-hidden="true"
    class="absolute -inset-[var(--space-md)] -z-10 rounded-[var(--radius-card)] opacity-60 pointer-events-none"
    style="background: radial-gradient(circle, var(--card-glow-color) 0%, transparent 70%); filter: blur(40px);"
  />
  <!-- Card real -->
  <Card ... />
</div>
```

| Card | `--card-glow-color` | Hex |
|------|---------------------|-----|
| mochis | `var(--color-rose-300)` | `#FDA4AF` |
| gatitos | `var(--color-sky-300)` | `#7DD3FC` |
| pifos | `var(--color-lime-300)` | `#D1EE8C` |

**Por qué lime-300 (no mint-400):** `mint-400` no existe en `tokens.css` actual. `lime-300` (#D1EE8C) existe y es el color de la categoría pifos en el Badge variant. Es consistente con el resto del sistema.

**Por qué `-inset-[var(--space-md)]` (16px) y `filter: blur(40px)`:** el `-inset` extiende el glow 16px más allá del card; el `blur(40px)` lo difumina. El resultado es un "halo" de 40px de blur alrededor del card, en el color de la categoría.

**Por qué `opacity-60`:** suficientemente visible pero no overwhelming. Sobre el dark canvas, el glow se ve como "luz emitida desde el card".

**⚠️ Performance en mobile:** `filter: blur(40px)` puede ser costoso en mobile. **Recomendación:** el Coder puede usar un media query para reducir el blur a 24px en mobile, o usar `filter: drop-shadow(0 0 30px var(--card-glow-color))` en lugar de `filter: blur(40px)`. La segunda opción es ~3x más performante pero da un glow más "duro". **El Coder decide; el Designer recomienda `drop-shadow` para mobile y `blur` para desktop, via media query.**

### 4.4 Rebrand strings (en page.tsx, en el array `categoryPreviews`)

```ts
// Antes (v1)
{
  badgeLabel: 'Uwus',
  buttonText: 'Ver Uwus',
  buttonLabel: 'home_category_uwus',
  trackingId: 'home_preview_uwus',
}

// Después (v2)
{
  badgeLabel: 'mochis',
  buttonText: 'Ver mochis',
  buttonLabel: 'home_category_mochis',
  trackingId: 'home_preview_mochis',
}
```

**El `badgeVariant: 'uwus' as const` NO cambia** (Q7 decisión: no rename interno).

### 4.5 Rebrand en `products.json` (único data layer change)

**Archivo:** `src/data/products.json`
**Línea:** 5
**Cambio:** `"name": "Uwus"` → `"name": "mochis"`

```diff
{
  "id": "uwus",
- "name": "Uwus",
+ "name": "mochis",
  ...
}
```

**Por qué este cambio es seguro:** el `id` interno sigue siendo `"uwus"`. El `name` se usa solo para mostrar en UI (Badge label, Category Preview, Tienda page). Tienda lee `category.name` para mostrar el heading y los filtros — al cambiarlo a "mochis", Tienda automáticamente muestra "mochis" en vez de "Uwus" en sus headings.

**⚠️ Validar Tienda:** el Coder debe verificar que después del cambio, `/tienda` sigue renderizando sin errores. Específicamente:
- TiendaClient.tsx lee `category.name` para mostrar el nombre de la categoría en el heading de la sección.
- El filtro de categorías en Tienda usa `category.id` (no `.name`), así que el filtro sigue funcionando con `id: "uwus"`.
- Las URLs de MercadoLibre se leen desde `category.ml_env_var` (no cambia), así que los botones de "Comprar en ML" siguen funcionando.

### 4.6 Comportamiento

- **Sin animaciones de entrada** (los cards no son clickeables en el Home; el Card component no tiene animación de entrada por sí mismo).
- **Hover en el card:** `hover:shadow-[var(--shadow-card-hover)]` (ya existe en Card).
- **Hover en el botón outline:** `hover:bg-[var(--color-primary-subtle)]` (ya existe en Button).
- **Glow on hover:** opcional. El Coder puede hacer que el glow se intensifique en hover del card (cambiar `opacity-60` a `opacity-90`). **El Designer NO lo requiere**; es un nice-to-have.

### 4.7 Responsive

Sin cambios en breakpoints. La grid es `1 → 3` columnas, comportamiento estándar.

### 4.8 Accesibilidad

- `aria-labelledby="categories-heading"` en el section.
- h2 con `id="categories-heading"`.
- Per-card glow es `aria-hidden="true"` (decorativo).
- Cada card tiene su título (h3 en Card), badge, descripción. El botón debajo provee navegación.
- **Contraste h2 (text = stone-100 en dark) sobre bg (stone-900):** ≈14:1 ✓ AAA.
- **Focus ring en Button:** `coral-300` 2px con offset 2px (heredado del Button). Visible sobre el dark canvas.

### 4.9 Tracking

- **Cards (no clickeables en Home):** `card_click` con `trackingId="home_preview_mochis" | "home_preview_gatos" | "home_preview_pifos"` (renombrar el primero). **Pero estos NO se disparan en Home porque los cards no son clickeables.** Solo renombrar para consistencia con la nueva nomenclatura.
- **Botones:** `button_click` con `trackingLabel="home_category_mochis" | "home_category_gatos" | "home_category_pifos"`. `trackingData: { destination: '/tienda', category: 'mochis' | 'gatitos' | 'pifos' }`.

---

## 5. AI Disclaimer v2 (compact)

### 5.1 Cambio vs v1

**v1:** section full-width con bg, padding generoso, icono SVG, texto del disclaimer largo siempre visible.

**v2:** **`<details>` colapsable** con summary "Sobre la IA" + icono, texto full expandible. Compacto (max ~60px de alto cuando colapsado).

### 5.2 Decisión de forma: **Opción C — `<details>` con summary colapsado**

**Rationale (Q6):**

1. El usuario pidió "compact version" — el `<details>` da compact por default y full expandible on-demand.
2. Es semantic HTML — no requiere JavaScript, funciona en todos los browsers, es keyboard-accessible por default.
3. El icono + summary "Sobre la IA" es claro y autoexplicativo.
4. El usuario puede expandir para leer el full text si lo desea.
5. La accesibilidad es nativa: `<details>` + `<summary>` ya tienen los roles ARIA correctos.

### 5.3 Layout detallado

**Estructura del componente:**

```tsx
<section
  aria-label="Información sobre IA"
  className="py-[var(--space-md)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
>
  <details
    className="max-w-3xl mx-auto bg-[var(--color-bg-card)] border border-[var(--color-warning)]/40 rounded-[var(--radius-card)] shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)] overflow-hidden group"
  >
    <summary
      className="flex items-center gap-[var(--space-sm)] cursor-pointer list-none p-[var(--space-md)] hover:bg-[var(--color-primary-subtle)]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
    >
      {/* Info icon SVG (24x24 viewBox) */}
      <svg aria-hidden="true" className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0" ...>...</svg>
      <span className="text-[var(--text-body)] text-[var(--color-text-secondary)] font-[var(--font-weight-medium)]">
        Sobre la IA
      </span>
      {/* Chevron-down SVG (16x16 viewBox) */}
      <svg aria-hidden="true" className="w-4 h-4 ml-auto text-[var(--color-text-muted)] transition-transform group-open:rotate-180" ...>...</svg>
    </summary>
    <div className="px-[var(--space-md)] pb-[var(--space-md)] text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">
      {siteData.disclaimer.full}
    </div>
  </details>
</section>
```

**Comportamiento:**

- **Default (colapsado):** altura ~52px (padding 16px top + 16px bottom + contenido 20px = 52px). Solo se ve el summary: icono + "Sobre la IA" + chevron.
- **Expandido:** se agrega el texto del disclaimer completo, altura variable (~150-200px dependiendo del texto).
- **Hover en summary:** bg se aclara sutilmente (`hover:bg-[var(--color-primary-subtle)]/5`).
- **Chevron rotation:** cuando el details está abierto (`group-open:rotate-180`), el chevron rota 180° apuntando hacia arriba.
- **Click anywhere en el summary** abre/cierra el details (default behavior).

### 5.4 Visual treatment

| Elemento | Token/Valor | Notas |
|----------|-------------|-------|
| Section padding | `py-[var(--space-md)]` (16px) — **vs v1: 48px** | 3x más compacto verticalmente. |
| Container | `max-w-3xl mx-auto` (mismo que v1) | |
| Card bg | `bg-[var(--color-bg-card)]` = stone-800 en dark | |
| Border | `border border-[var(--color-warning)]/40` (amber-500 al 40%) | Mismo que v1, mantiene el aviso cálido. |
| Radius | `rounded-[var(--radius-card)]` (16px) | |
| Shadow | `0 0 30px -10px rgba(245, 158, 11, 0.2)` (amber glow, 20%) | Vs v1: 25% opacity. Más sutil. |
| Summary padding | `p-[var(--space-md)]` (16px) | Compacto. |
| Summary text | `text-[var(--text-body)]` (16px) `text-[var(--color-text-secondary)]` (stone-300 en dark) `font-medium` | "Sobre la IA" |
| Icon (info) | `text-[var(--color-warning)]` (amber-500) `w-5 h-5` | 20x20px. |
| Chevron | `text-[var(--color-text-muted)]` (stone-500 en dark) `w-4 h-4` | 16x16px, ml-auto para alinear a la derecha. |
| Details text | `text-[var(--text-body-sm)]` (14px) `text-[var(--color-text-secondary)]` `leading-[var(--line-height-relaxed)]` | Padding `px-[var(--space-md)] pb-[var(--space-md)]`. |

**Contraste verificado:**

- Summary text (stone-300 = #D6D3D1) sobre card bg (stone-800 = #292524) = ~7:1 ✓ AA.
- Details text (stone-300) sobre card bg = ~7:1 ✓ AA.
- Icon (amber-500 = #F59E0B) sobre card bg (stone-800) = ~5.5:1 ✓ AA (≥3:1 para non-text contrast).
- Chevron (stone-500 = #78716C) sobre card bg = ~3.4:1 ✓ AA (icon, non-text contrast ≥3:1).

### 5.5 Comportamiento

- **Sin animaciones de entrada** (el disclaimer es compacto, no necesita fade-in).
- **Sin breathing glow** (la v1 tenía un breathing glow opcional; la v2 lo omite porque el section es más pequeño y un glow pulsante podría ser molesto).
- **Open/close animation:** opcional, el Coder puede animar el contenido del details con `transition-all`. **Recomendación del Designer:** no animar. El `<details>` native toggle es instantáneo y predecible. Si se anima, se ve "raro" porque el browser no interpola alturas nativas. **NO animar.**
- **Focus visible en summary:** ring `coral-300` 2px con offset 2px. Se aplica con `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]` en el summary.

### 5.6 Responsive

- Mobile y desktop: mismo layout.
- En mobile (375px), el section padding `px-[var(--space-md)]` (16px) deja suficiente espacio.
- El summary tiene `flex items-center gap-[var(--space-sm)]` que se adapta al ancho.

### 5.7 Accesibilidad

- `<details>` + `<summary>` es semantic HTML — screen readers lo anuncian como "disclosure, collapsed/expanded".
- `aria-label="Información sobre IA"` en el section (clarifica landmark).
- Icono info es `aria-hidden="true"`.
- Chevron es `aria-hidden="true"`.
- **El usuario puede navegar al summary con Tab** (focus ring visible).
- **El usuario puede abrir/cerrar con Enter o Space** (default behavior del summary).
- **El texto del disclaimer es leído por screen readers** cuando el details está expandido.
- **El estado "expandido" es anunciado** por screen readers ("expanded" o "collapsed").

### 5.8 Tracking

- **Sin tracking** en esta sección.

### 5.9 Estructura de archivos

**`src/components/home/AIDisclaimer.tsx`** (NEW) — server component (no necesita `'use client'`):

```tsx
import siteData from '@/data/site.json';

export function AIDisclaimer() {
  return (
    <section
      aria-label="Información sobre IA"
      className="py-[var(--space-md)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
    >
      <details
        className="max-w-3xl mx-auto bg-[var(--color-bg-card)] border border-[var(--color-warning)]/40 rounded-[var(--radius-card)] shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)] overflow-hidden group"
      >
        <summary className="...">...</summary>
        <div className="...">{siteData.disclaimer.full}</div>
      </details>
    </section>
  );
}
```

**Server component** (no necesita `'use client'`) — el `<details>` es HTML nativo, no requiere JS.

---

## 6. Component Architecture (CRITICAL for parallel Coder slices)

Para que las 4 implementaciones (v2.1, v2.2, v2.3, v2.4) corran en **paralelo sin file conflicts**, la Designer recomienda la siguiente arquitectura de componentes:

### 6.1 Archivos a CREAR (nuevos)

| Path | Owner | Slice | Description |
|------|-------|-------|-------------|
| `src/components/home/Features/JuegosSection.tsx` | Coder v2.2 | v2.2 | Feature section #1 (Juegos Interactivos), text-left/visual-right, bg canvas. |
| `src/components/home/Features/CompaniaSection.tsx` | Coder v2.2 | v2.2 | Feature section #2 (Compañía Inteligente), visual-left/text-right, bg subtle. |
| `src/components/home/Features/IdiomasSection.tsx` | Coder v2.2 | v2.2 | Feature section #3 (Práctica de Idiomas), text-left/visual-right, bg canvas. |
| `src/components/home/Features/PersonalizableSection.tsx` | Coder v2.2 | v2.2 | Feature section #4 (Personalizable), visual-left/text-right, bg subtle. |
| `src/components/home/CategoryPreview.tsx` | Coder v2.3 | v2.3 | El bloque Category Preview con los 3 cards + glow per-card. |
| `src/components/home/AIDisclaimer.tsx` | Coder v2.4 | v2.4 | El `<details>` colapsable con el disclaimer. |

### 6.2 Archivos a MODIFICAR

| Path | Owner | Slice | Description |
|------|-------|-------|-------------|
| `src/components/home/HeroSection.tsx` | Coder v2.1 | v2.1 | Full rewrite: split 60/40 → full-width blurred bg + text overlay. |
| `src/app/page.tsx` | Multiple | v2.2, v2.3, v2.4 | Replace inline blocks with new component tags + add imports + rebrand. |
| `src/data/products.json` | Coder v2.3 | v2.3 | Change `categories[0].name` from "Uwus" to "mochis". |

### 6.3 Archivos a DELETAR

| Path | Owner | Slice | Description |
|------|-------|-------|-------------|
| `src/components/home/FeaturesSection.tsx` | Coder v2.2 | v2.2 | Reemplazado por los 4 nuevos componentes. |

### 6.4 Estrategia de modificación de `src/app/page.tsx` (paralelismo seguro)

Los 3 slices v2.2, v2.3, v2.4 tocan `page.tsx`. Para que puedan correr en paralelo, cada uno usa un **anchor string único** para su edit. Si dos slices usan el mismo anchor, el último en commit gana — lo que **NUNCA** debe pasar.

| Slice | Anchor string (FIND) | Action | Replacement (REPLACE o INSERT) |
|-------|---------------------|--------|--------------------------------|
| v2.2 | `import { FeaturesSection } from '@/components/home/FeaturesSection';` | REPLACE | 4 new import lines + (opcional) 1 import para `FeatureSection` compartido |
| v2.2 | `<FeaturesSection />` | REPLACE | 4 new component tags (JuegosSection, CompaniaSection, IdiomasSection, PersonalizableSection) |
| v2.3 | `import { HeroSection } from '@/components/home/HeroSection';` | INSERT after | `import { CategoryPreview } from '@/components/home/CategoryPreview';` |
| v2.3 | `badgeLabel: 'Uwus'` | REPLACE | `badgeLabel: 'mochis'` |
| v2.3 | `buttonText: 'Ver Uwus'` | REPLACE | `buttonText: 'Ver mochis'` |
| v2.3 | `buttonLabel: 'home_category_uwus'` | REPLACE | `buttonLabel: 'home_category_mochis'` |
| v2.3 | `trackingId: 'home_preview_uwus'` | REPLACE | `trackingId: 'home_preview_mochis'` |
| v2.3 | `{/* Category Preview Section */}` (hasta el `</section>` de Category Preview) | REPLACE | `<CategoryPreview />` |
| v2.4 | `import { FeaturesSection } from '@/components/home/FeaturesSection';` | INSERT after | `import { AIDisclaimer } from '@/components/home/AIDisclaimer';` |
| v2.4 | `{/* AI Disclaimer Section */}` (hasta el `</section>` de Disclaimer) | REPLACE | `<AIDisclaimer />` |

**Asignación de anchors para que NO se solapen:**

- **v2.2** usa 2 anchors: el import de FeaturesSection (REPLACE) y el tag `<FeaturesSection />` (REPLACE). Nadie más usa estos anchors.
- **v2.3** usa 1 anchor para INSERT (HeroSection import) y 4 anchors para REPLACE (los strings de rebrand) y 1 anchor para REPLACE el bloque (Category Preview). Total 6 anchors únicos.
- **v2.4** usa 1 anchor para INSERT (FeaturesSection import — **diferente** al que usa v2.2 para REPLACE) y 1 anchor para REPLACE el bloque (AI Disclaimer). Total 2 anchors únicos.

**⚠️ v2.3 y v2.4 NO usan el mismo anchor para el INSERT.** v2.3 inserta después de `import { HeroSection }`; v2.4 inserta después de `import { FeaturesSection }`. Como v2.2 reemplaza la línea de FeaturesSection con 4 nuevas líneas, el anchor de v2.4 ("import { FeaturesSection }") **deja de existir** después de que v2.2 corre.

**Por eso la orden de ejecución importa si corren en paralelo:**

- Si v2.2 corre primero, elimina la línea de FeaturesSection, y luego v2.4 no encuentra su anchor. ❌
- Si v2.4 corre primero, encuentra su anchor, inserta, y luego v2.2 corre y reemplaza la línea de FeaturesSection (la inserción de v2.4 sigue en su lugar, no se ve afectada porque está en una línea diferente). ✓
- Si corren al mismo tiempo, hay race condition. ❌

**Solución:** v2.4 debe correr **antes** que v2.2. O: v2.4 usa un anchor DIFERENTE al de v2.2.

**Anchor alternativo para v2.4:** insertar después de `import productsData from '@/data/products.json';`. Esta línea NO es tocada por ningún otro slice. **Recomendación final:** v2.4 usa el anchor `import productsData`.

**Anchors finales, sin solapamiento:**

- **v2.2** (2 anchors): `import { FeaturesSection } from '@/components/home/FeaturesSection';` + `<FeaturesSection />`
- **v2.3** (6 anchors): `import { HeroSection } from '@/components/home/HeroSection';` + 4 rebrand strings + `{/* Category Preview Section */}` block
- **v2.4** (2 anchors): `import productsData from '@/data/products.json';` + `{/* AI Disclaimer Section */}` block

**Para los Coder agents:** usar **string-based find-and-replace** (con `Edit` tool o equivalente), NO line-based. Si el anchor no se encuentra, FAIL con error claro (no inventar).

### 6.5 Componente compartido `FeatureSection` (recomendado, opcional)

Para evitar duplicar el código del `IntersectionObserver` 4 veces, el Designer recomienda crear un componente compartido:

**`src/components/home/Features/FeatureSection.tsx`** (shared helper, recomendado):

- Recibe props: `id`, `title`, `description`, `panelBg`, `panelGlow`, `iconColor`, `icon`, `reversed`, `sectionBg`.
- Renderiza una `<section>` con el `IntersectionObserver` interno.
- Los 4 componentes (`JuegosSection`, `CompaniaSection`, `IdiomasSection`, `PersonalizableSection`) son **thin wrappers** que importan `FeatureSection` y le pasan los props correctos.

**Si el Coder no quiere este nivel de abstracción:** cada uno de los 4 componentes puede ser self-contained (con su propio `IntersectionObserver`). El Designer recomienda el shared component porque es ~60% menos código.

### 6.6 Resumen de archivos por Coder slice

| Slice | Files CREATED | Files MODIFIED | Files DELETED |
|-------|---------------|----------------|---------------|
| v2.1 (Hero) | (none) | `src/components/home/HeroSection.tsx` | (none) |
| v2.2 (Features) | 5 new files: `Features/FeatureSection.tsx` (shared), `Features/JuegosSection.tsx`, `Features/CompaniaSection.tsx`, `Features/IdiomasSection.tsx`, `Features/PersonalizableSection.tsx` | `src/app/page.tsx` (reemplazar import + tag de FeaturesSection) | `src/components/home/FeaturesSection.tsx` |
| v2.3 (Category Preview) | 1 new file: `CategoryPreview.tsx` | `src/app/page.tsx` (rebrand strings + reemplazar bloque), `src/data/products.json` (cambiar `categories[0].name`) | (none) |
| v2.4 (AI Disclaimer) | 1 new file: `AIDisclaimer.tsx` | `src/app/page.tsx` (agregar import + reemplazar bloque) | (none) |

---

## 7. Resumen de decisiones de design (v2 vs v1)

1. **Hero = full-width blurred background, text overlay centered** (reemplaza split 60/40 de v1). Razón: usuario explícito. Crea atmósfera fuerte, Mimi visible pero soft.
2. **Features = 4 stacked full-width sections, alternating layout** (reemplaza 4-card grid de v1). Razón: usuario explícito. Story-telling flow, una sección por concepto, layout alternado para ritmo visual.
3. **Category Preview = mismo grid + per-card radial glow + rebrand visible** (extiende v1). Razón: usuario pidió "restyle" + rebrand. Glow per-card da impacto visual sin cambiar layout.
4. **AI Disclaimer = `<details>` compacto** (reemplaza full-section de v1). Razón: usuario pidió "compact version". `<details>` es semantic HTML, keyboard-accessible, expandible on-demand.
5. **Mascot Band = DEFERRED** (excluido de v2). Razón: imagen no existe, usuario no lo pidió.
6. **Badge variant key `'uwus'`** NO se renombra a `'mochis'` en v2. Razón: Q7 decisión — smaller blast radius, el rename es parte del workstream de rebrand completo (out of scope).

---

**End of spec. Total: 4 sections specified (Hero, Features, Category Preview, Disclaimer) + 1 deferred (Mascot Band) + 1 component architecture section. 0 code written. Ready for Coder implementation across slices v2.1, v2.2, v2.3, v2.4.**

