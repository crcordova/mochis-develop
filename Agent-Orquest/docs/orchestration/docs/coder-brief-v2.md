# Coder Brief — Home Redesign v2

**Version:** 2.0
**Date:** 2026-07-14
**Author:** Designer (subagent)
**Audience:** 4 Coder agents (slices v2.1, v2.2, v2.3, v2.4)
**Status:** ready-for-implementation

> **This is the focused brief for the 4 Coder slices that will implement the v2 Home redesign.** The full design spec is in `slices/spec-home-nocturnal-design.md` (757 lines) and the consolidated spec is in `docs/home-page-design-spec.md` (364 lines). **Read this brief first; the full specs are reference material.**

---

## Executive Summary

The user requested 4 changes to the Home page (now branded as **mochis**):

1. **Hero:** 60/40 split → **full-width blurred background** with text overlay
2. **Features:** 4-card grid → **4 stacked full-width sections** (one per feature, alternating layout)
3. **Category Preview:** same grid, restyled with **per-card glow** + visible rebrand "Uwus" → "mochis"
4. **AI Disclaimer:** full-section → **compact `<details>` colapsable**

The 4 Coder slices can run **in parallel** because each one owns a different set of files. Critical: read §6.4 of `spec-home-nocturnal-design.md` for the **unique anchor strings** in `src/app/page.tsx` that each slice must use to avoid file conflicts.

---

## Common Constraints (ALL slices)

- **Reuse existing tokens:** use only `var(--color-*)` references from `src/styles/tokens.css`. Do NOT add new tokens. The visual-style-guide.md aspirational tokens (`midnight-*`, `cream-*`, `mint-*`) DO NOT EXIST in tokens.css — do not use them.
- **Reuse existing components:** do not modify `Button`, `Card`, `Badge`. Use them as-is.
- **No new images:** use the existing `public/images/hero/hero-home.webp` and the 4 SVG icons copied from the current `FeaturesSection.tsx` (game controller, chat bubble, globe, sliders).
- **WCAG AA:** all text/background combos must pass ≥4.5:1. Most will pass AAA. Verify before committing.
- **`prefers-reduced-motion: reduce`:** all animations must be disabled for this preference. The pattern from `FeaturesSection.tsx` (IntersectionObserver) is the model to replicate.
- **Spanish copy:** all UI text in Spanish. `site.description` and `disclaimer.short/full` come from `site.json` (don't hardcode).
- **Rebrand visible strings:** "mochis" (lowercase) for the brand. "Uwus" → "mochis" in the visible strings of the Category Preview (badge label, button text, tracking labels) and in `products.json` `categories[0].name`. **Do NOT** rename the `Badge` variant key `'uwus'` (Q7 decision).
- **Server components by default:** only use `'use client'` when you need hooks (e.g., IntersectionObserver, useState, useEffect). The Hero, Category Preview, and AI Disclaimer can be server components. The 4 Features sections need `'use client'` (for the IntersectionObserver).

---

## Slice v2.1 — Hero (full-width blurred background)

**Owner role:** Coder
**Files to MODIFY:** 1 file
**Files to CREATE:** 0
**Files to DELETE:** 0

### Files to modify

| Path | Action |
|------|--------|
| `src/components/home/HeroSection.tsx` | FULL REWRITE |

### Files NOT to touch

- `src/app/page.tsx` — DO NOT MODIFY. The `<HeroSection />` import remains the same because the export name stays `HeroSection`.

### What to do

1. Read the current `src/components/home/HeroSection.tsx` (70 lines) and the spec sections §1.1–§1.11 of `spec-home-nocturnal-design.md`.
2. Rewrite the file with the new layout:
   - `<section>` outer with `min-h-[80vh] sm:min-h-[70vh] lg:min-h-[80vh]`, `relative`, `overflow-hidden`, `bg-[var(--color-bg)]`, `aria-label="Inicio"`.
   - Layer 1: `<Image src="/images/hero/hero-home.webp" alt="" fill priority fetchPriority="high" loading="eager" sizes="100vw" aria-hidden="true" className="object-cover object-center" style={{ filter: 'blur(40px)', transform: 'scale(1.1)', willChange: 'transform' }} />`.
   - Layer 2: `<div className="absolute inset-0 pointer-events-none z-[1]">` with two background gradients (linear top-to-bottom + radial center vignette). CSS values specified in spec §1.2.
   - Layer 3: `<div className="relative z-[2] flex flex-col items-center justify-center text-center min-h-[inherit] max-w-4xl mx-auto px-[var(--space-md)] py-[var(--space-2xl)] sm:py-[var(--space-3xl)]">` containing:
     - `<h1 className="font-display text-[var(--text-display)] md:text-[length:clamp(2.25rem,5vw,3rem)] sm:text-[var(--text-display)] font-[var(--font-weight-bold)] text-[var(--color-text-inverse)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 0 24px rgba(0,0,0,0.4)' }}>mochis</h1>`
     - `<p className="mt-[var(--space-md)] text-[var(--text-body-lg)] text-[var(--color-text-inverse)] leading-[var(--line-height-normal)] max-w-2xl" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{siteData.site.description}</p>`
     - `<div className="mt-[var(--space-8)] flex flex-wrap justify-center gap-[var(--space-md)]">` with 2 buttons (primary Ver Peluches with `trackingLabel="home_hero_tienda"`, outline ¿Cómo Funciona? with `trackingLabel="home_hero_tutoriales"`), both `size="lg"`.
     - `<p className="mt-[var(--space-lg)] text-[var(--text-body-sm)] text-[var(--color-text-inverse)] opacity-80" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{siteData.disclaimer.short}</p>`

3. **Mobile blur override:** the spec says reduce blur to 24px on mobile. Two options:
   - Use a CSS-in-JS approach with media query in `style` (e.g., template literal with `@media`).
   - Use Tailwind's responsive classes if you can express blur via `blur-xl` (24px) vs `blur-3xl` (64px) — note: 40px is not a Tailwind default, so you'd need a custom value.
   - **Recommended:** use a `<style jsx>` block at the end of the component (with the `'use client'` directive) to define the media query for blur.

### Acceptance criteria

- [ ] `src/components/home/HeroSection.tsx` is fully rewritten.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `grep -c "filter: blur" src/components/home/HeroSection.tsx` returns ≥ 1.
- [ ] `grep -c "priority\|fetchPriority" src/components/home/HeroSection.tsx` returns ≥ 1.
- [ ] `grep -c "home_hero_tienda\|home_hero_tutoriales" src/components/home/HeroSection.tsx` returns ≥ 2.
- [ ] `grep -c "trackingLabel" src/components/home/HeroSection.tsx` returns ≥ 2.
- [ ] H1 reads "mochis" (not "mochis-play").
- [ ] Image has `alt=""` and `aria-hidden="true"`.
- [ ] No `grid-cols-1 md:grid-cols-12` (the v1 60/40 grid is gone).
- [ ] Mobile (375px) renders as a single full-width section with centered text on the blurred bg.
- [ ] Desktop (1280px) renders as a single full-width section with centered text on the blurred bg.
- [ ] Lighthouse mobile Performance ≥ 90.

### Stop rules

- Stop if the user wants to keep the 60/40 split.
- Stop if Lighthouse mobile Performance drops below 85.
- Stop if WCAG AA fails on the H1 over the blurred bg.
- Stop if the build fails.

---

## Slice v2.2 — Features (4 stacked full-width sections)

**Owner role:** Coder
**Files to CREATE:** 5 files (1 shared helper + 4 section components)
**Files to MODIFY:** 1 file (`src/app/page.tsx`)
**Files to DELETE:** 1 file (`src/components/home/FeaturesSection.tsx`)

### Files to create

| Path | Description |
|------|-------------|
| `src/components/home/Features/FeatureSection.tsx` | Shared helper component. Renders one feature section with IntersectionObserver fade-in. Receives all per-section props. `'use client'`. |
| `src/components/home/Features/JuegosSection.tsx` | Section 1 (Juegos Interactivos): text-left, visual-right, bg `var(--color-bg)`. Uses FeatureSection shared. |
| `src/components/home/Features/CompaniaSection.tsx` | Section 2 (Compañía Inteligente): visual-left, text-right, bg `var(--color-bg-subtle)`. Uses FeatureSection shared. |
| `src/components/home/Features/IdiomasSection.tsx` | Section 3 (Práctica de Idiomas): text-left, visual-right, bg `var(--color-bg)`. Uses FeatureSection shared. |
| `src/components/home/Features/PersonalizableSection.tsx` | Section 4 (Personalizable con Roles): visual-left, text-right, bg `var(--color-bg-subtle)`. Uses FeatureSection shared. |

### Files to modify

| Path | Action | Anchor string for find-and-replace |
|------|--------|------------------------------------|
| `src/app/page.tsx` | REPLACE the FeaturesSection import line | `import { FeaturesSection } from '@/components/home/FeaturesSection';` |
| `src/app/page.tsx` | REPLACE the `<FeaturesSection />` tag in the render | `<FeaturesSection />` |

### Files to delete

| Path | Action |
|------|--------|
| `src/components/home/FeaturesSection.tsx` | DELETE (replaced by the 4 new components). You can use the `bash` tool with `rm` to delete this file. |

### What to do

1. **Create `src/components/home/Features/FeatureSection.tsx`** (shared, `'use client'`):

   Props interface:
   ```ts
   interface FeatureSectionProps {
     id: string;                          // e.g., 'juegos'
     title: string;                       // e.g., 'Juegos Interactivos'
     description: string;                 // longer description (storytelling)
     panelBg: string;                     // e.g., 'bg-[var(--color-primary)]/15'
     panelGlow: string;                   // e.g., '0 0 80px -10px var(--color-primary)'
     iconColor: string;                   // e.g., 'text-[var(--color-primary)]'
     icon: React.ReactNode;               // SVG element
     reversed: boolean;                   // true for even sections (visual-left)
     sectionBg: 'canvas' | 'subtle';      // controls bg-[var(--color-bg)] vs bg-[var(--color-bg-subtle)]
   }
   ```

   Implementation:
   - `useState` for `isVisible`, `useRef` for the section element, `useEffect` with `IntersectionObserver` (threshold 0.15, rootMargin `0px 0px -40px 0px`).
   - Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` first; if true, set `isVisible: true` and return.
   - Render the section with the appropriate bg, padding, aria-labelledby pointing to the h2.
   - Inside, a `max-w-6xl mx-auto` grid with `grid-cols-1 md:grid-cols-2 gap-[var(--space-2xl)] items-center`.
   - Two children: text col (h2 + p) and visual col (panel + icon).
   - The text col and visual col use `order-` classes to alternate:
     - If `reversed: false` (sections 1, 3): no order classes. Text on left, visual on right.
     - If `reversed: true` (sections 2, 4): visual col has `md:order-1`, text col has `md:order-2`. Visual on left, text on right.
   - Both cols get the fade-in transition: `transition-all duration-[var(--duration-slow)] ease-[var(--easing-default)]` and `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`.

2. **Create the 4 section components** (each is a thin server component that imports `FeatureSection` and passes the props):

   - Copy the 4 SVG icons from the current `src/components/home/FeaturesSection.tsx`:
     - Juegos: game controller (lines ~46-56 in the current file)
     - Compañía: chat bubble (lines ~63-69)
     - Idiomas: globe (lines ~33-39)
     - Personalizable: sliders (lines ~76-89)

   - Each section component is ~30 lines: imports `FeatureSection` + the icon, returns `<FeatureSection ... />` with the right props.

3. **Modify `src/app/page.tsx`** (2 edits):

   - **Edit 1 (replace import):** find `import { FeaturesSection } from '@/components/home/FeaturesSection';` and replace with 4 new import lines:
     ```ts
     import { JuegosSection } from '@/components/home/Features/JuegosSection';
     import { CompaniaSection } from '@/components/home/Features/CompaniaSection';
     import { IdiomasSection } from '@/components/home/Features/IdiomasSection';
     import { PersonalizableSection } from '@/components/home/Features/PersonalizableSection';
     ```

   - **Edit 2 (replace tag in render):** find `<FeaturesSection />` (only 1 occurrence in the file) and replace with:
     ```tsx
     {/* Features Sections (4 stacked full-width sections, alternating layout) */}
     <JuegosSection />
     <CompaniaSection />
     <IdiomasSection />
     <PersonalizableSection />
     ```

4. **Delete `src/components/home/FeaturesSection.tsx`** (use `rm` via bash tool).

### Per-section details (from spec §2.5)

| Section | id | reversed | sectionBg | panelBg | panelGlow | iconColor | h2 | description |
|---------|----|---------|-----------|---------|-----------|-----------|-----|-------------|
| 1 | `juegos` | false | canvas | `bg-[var(--color-primary)]/15` | `0 0 80px -10px var(--color-primary)` | `text-[var(--color-primary)]` | "Juegos Interactivos" | "Juegos cortos, historias interactivas y adivinanzas que se adaptan al momento. Cada sesión es diferente: la IA improvisa, así que nunca se repite." |
| 2 | `compania` | true | subtle | `bg-[var(--color-rose-300)]/15` | `0 0 80px -10px var(--color-rose-300)` | `text-[var(--color-rose-300)]` | "Compañía Inteligente" | "Conversaciones reales y apoyo emocional para niños y adultos. Puedes preguntarle de todo: cómo resolver un problema, qué canción escuchar, o simplemente hablar de tu día." |
| 3 | `idiomas` | false | canvas | `bg-[var(--color-secondary)]/15` | `0 0 80px -10px var(--color-secondary)` | `text-[var(--color-secondary)]` | "Práctica de Idiomas" | "Aprende inglés y otros idiomas de forma lúdica. Mimi traduce, corrige pronunciación y enseña vocabulario nuevo con juegos que se sienten como jugar, no como estudiar." |
| 4 | `personalizable` | true | subtle | `bg-[var(--color-sky-300)]/15` | `0 0 80px -10px var(--color-sky-300)` | `text-[var(--color-sky-300)]` | "Personalizable con Roles" | "Configura roles y planes de estudio para cada miembro de la familia. Mimi puede ser profesora de inglés para los niños, compañera de conversación para los adultos, o lo que tú necesites." |

### Acceptance criteria

- [ ] 5 new files exist: `FeatureSection.tsx`, `JuegosSection.tsx`, `CompaniaSection.tsx`, `IdiomasSection.tsx`, `PersonalizableSection.tsx`.
- [ ] `FeaturesSection.tsx` is deleted.
- [ ] `src/app/page.tsx` has the 4 new import lines (instead of the old `FeaturesSection` import).
- [ ] `src/app/page.tsx` renders the 4 new component tags (instead of `<FeaturesSection />`).
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `grep -c "Juegos Interactivos" src/components/home/Features/JuegosSection.tsx` returns 1.
- [ ] `grep -c "Compañía Inteligente" src/components/home/Features/CompaniaSection.tsx` returns 1.
- [ ] `grep -c "Práctica de Idiomas" src/components/home/Features/IdiomasSection.tsx` returns 1.
- [ ] `grep -c "Personalizable con Roles" src/components/home/Features/PersonalizableSection.tsx` returns 1.
- [ ] `grep -c "IntersectionObserver" src/components/home/Features/FeatureSection.tsx` returns ≥ 1.
- [ ] `grep -c "prefers-reduced-motion" src/components/home/Features/FeatureSection.tsx` returns ≥ 1.
- [ ] `grep -c "aria-label\|aria-labelledby" src/components/home/Features/FeatureSection.tsx` returns ≥ 1 (the section has aria-labelledby).
- [ ] Mobile (375px) and desktop (1280px) render correctly.
- [ ] The 4 sections appear in the correct order: Juegos, Compañía, Idiomas, Personalizable.
- [ ] Lighthouse mobile Performance ≥ 90.

### Stop rules

- Stop if the user wants to keep the 4-card grid.
- Stop if the order is contested.
- Stop if the per-section visual element decision is contested (default to colored panel + existing icon).

---

## Slice v2.3 — Category Preview (restyled + rebrand)

**Owner role:** Coder
**Files to CREATE:** 1 file
**Files to MODIFY:** 2 files (`src/app/page.tsx` + `src/data/products.json`)
**Files to DELETE:** 0

### Files to create

| Path | Description |
|------|-------------|
| `src/components/home/CategoryPreview.tsx` | Server component. Contains the 3-card grid with per-card glow + rebrand strings. Imports `Card`, `Badge`, `Button` from `@/components/ui`. Reads `productsData` and renders. |

### Files to modify

| Path | Action | Anchor string |
|------|--------|--------------|
| `src/app/page.tsx` | INSERT a new import line AFTER `import { HeroSection }` | `import { HeroSection } from '@/components/home/HeroSection';` |
| `src/app/page.tsx` | REPLACE the `categoryPreviews` array strings (rebrand) | 4 unique anchors (see below) |
| `src/app/page.tsx` | REPLACE the inline Category Preview block with `<CategoryPreview />` | `{/* Category Preview Section */}` (block ends at the Category Preview's `</section>`) |
| `src/data/products.json` | REPLACE `"name": "Uwus"` with `"name": "mochis"` (line 5) | `"name": "Uwus"` |

### Anchor strings for `src/app/page.tsx` (use string-based find-and-replace, NOT line-based)

**Anchor 1 (INSERT after):** `import { HeroSection } from '@/components/home/HeroSection';`
- Action: INSERT a new line after this one: `import { CategoryPreview } from '@/components/home/CategoryPreview';`

**Anchors 2–5 (REPLACE rebrand strings):**
- `badgeLabel: 'Uwus'` → `badgeLabel: 'mochis'`
- `buttonText: 'Ver Uwus'` → `buttonText: 'Ver mochis'`
- `buttonLabel: 'home_category_uwus'` → `buttonLabel: 'home_category_mochis'`
- `trackingId: 'home_preview_uwus'` → `trackingId: 'home_preview_mochis'`

**Anchor 6 (REPLACE block):** find `{/* Category Preview Section */}` and replace the entire block (from that comment up to and including the `</section>` that closes the Category Preview, ~lines 53–88 in the current file) with: `<CategoryPreview />`.

**Why this anchor for INSERT is safe:** v2.4 (AIDisclaimer) uses a DIFFERENT anchor (`import productsData from '@/data/products.json';`). v2.2 (Features) does a REPLACE on the FeaturesSection import. None of these conflict with v2.3's INSERT-after-HeroSection.

### What to do

1. **Create `src/components/home/CategoryPreview.tsx`** (server component):

   - Import: `import { Card, Badge, Button } from '@/components/ui';` and `import productsData from '@/data/products.json';`
   - Read `categories[0].products[0]` (mimi), `categories[1].products[0]` (gato-negro), `categories[2].products[0]` (pifo-rojo) from productsData.
   - Build a local `categoryPreviews` array (or inline the 3 cards) with the rebrand strings:
     - mochis: `badgeLabel: 'mochis'`, `buttonText: 'Ver mochis'`, `buttonLabel: 'home_category_mochis'`, `trackingId: 'home_preview_mochis'`
     - gatitos: `badgeLabel: 'Gatitos'`, `buttonText: 'Ver Gatitos'`, `buttonLabel: 'home_category_gatos'`, `trackingId: 'home_preview_gatos'`
     - pifos: `badgeLabel: 'Pifos'`, `buttonText: 'Ver Pifos'`, `buttonLabel: 'home_category_pifos'`, `trackingId: 'home_preview_pifos'`
   - Render the section:
     - `<section aria-labelledby="categories-heading" className="py-[var(--space-3xl)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]">`
     - `<div className="max-w-5xl mx-auto">`
     - `<h2 id="categories-heading" className="font-display text-[var(--text-heading-lg)] font-[var(--font-weight-bold)] text-[var(--color-text)] text-center mb-[var(--space-2xl)]">Conoce a nuestros peluches</h2>`
     - `<div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">`
     - For each card, wrap in a `relative` div with the per-card glow:
       ```jsx
       <div key={...} className="relative flex flex-col gap-[var(--space-md)]">
         <div
           aria-hidden="true"
           className="absolute -inset-[var(--space-md)] -z-10 rounded-[var(--radius-card)] opacity-60 pointer-events-none"
           style={{
             background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
             filter: 'blur(40px)',
           }}
         />
         <Card title={...} description={...} image={...} trackingId={...} trackingData={{ category: ... }}>
           <Badge label={...} variant={...} />
         </Card>
         <Button href="/tienda" variant="outline" size="sm" trackingLabel={...}>
           {buttonText}
         </Button>
       </div>
       ```
     - `glowColor` per category: `var(--color-rose-300)`, `var(--color-sky-300)`, `var(--color-lime-300)`.
   - The `badgeVariant` keys remain `'uwus'`, `'gatos'`, `'pifos'` (NO rename, Q7).

2. **Modify `src/app/page.tsx`** (3 edits):
   - **Edit 1 (INSERT import):** find `import { HeroSection } from '@/components/home/HeroSection';` and insert a new line after it: `import { CategoryPreview } from '@/components/home/CategoryPreview';`
   - **Edits 2–5 (REPLACE rebrand strings):** the 4 anchors above.
   - **Edit 6 (REPLACE block):** find `{/* Category Preview Section */}` and replace the entire Category Preview `<section>...</section>` block with `<CategoryPreview />`.

3. **Modify `src/data/products.json`** (1 edit):
   - Find `"name": "Uwus"` and replace with `"name": "mochis"`. This is on line 5 inside the first category object. There may be other occurrences in the file (e.g., in the category description `"Peluches con cara, los más grandes. 5 personalidades únicas..."` — these do NOT contain "Uwus", so the anchor is unique).

4. **Smoke test Tienda:** after all edits, run `npm run build`. If it passes, manually verify `/tienda` still renders. The rebrand in `categories[0].name` propagates to:
   - Category Preview badge label (handled in CategoryPreview.tsx explicitly)
   - Tienda page heading (reads `category.name` from products.json — now shows "mochis" instead of "Uwus")
   - Tienda page filters (use `category.id` = "uwus", unaffected)
   - WhatsApp/ML buttons (use `category.ml_env_var` and `category.id`, unaffected)

### Acceptance criteria

- [ ] `src/components/home/CategoryPreview.tsx` exists.
- [ ] `src/app/page.tsx` has the new import line for CategoryPreview.
- [ ] `src/app/page.tsx` has the 4 rebrand strings applied (`mochis`, `Ver mochis`, `home_category_mochis`, `home_preview_mochis`).
- [ ] `src/app/page.tsx` has the inline Category Preview block replaced with `<CategoryPreview />`.
- [ ] `src/data/products.json` has `categories[0].name: "mochis"`.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `grep -c "Uwus" src/app/page.tsx src/data/products.json` returns 0.
- [ ] `grep -c "mochis" src/components/home/CategoryPreview.tsx` returns ≥ 3 (badge label, button text, tracking category).
- [ ] `grep -c "home_category_mochis" src/components/home/CategoryPreview.tsx` returns 1.
- [ ] `grep -c "home_preview_mochis" src/components/home/CategoryPreview.tsx` returns 1.
- [ ] `grep -c "Card" src/components/home/CategoryPreview.tsx` returns ≥ 3 (Card is reused).
- [ ] `grep -c "filter: blur\|filter: drop-shadow" src/components/home/CategoryPreview.tsx` returns ≥ 1.
- [ ] `/tienda` renders without errors (manually verify or check build log).
- [ ] Lighthouse mobile Performance ≥ 90.

### Stop rules

- Stop if the user wants to keep the old 3-card style.
- Stop if the Badge variant rename is required (it isn't — Q7).
- Stop if the v2.0 spec doesn't define the new visual style (it does — per-card glow + rebrand).
- Stop if `/tienda` build fails after the products.json change.

---

## Slice v2.4 — AI Disclaimer (compact `<details>`)

**Owner role:** Coder
**Files to CREATE:** 1 file
**Files to MODIFY:** 1 file (`src/app/page.tsx`)
**Files to DELETE:** 0

### Files to create

| Path | Description |
|------|-------------|
| `src/components/home/AIDisclaimer.tsx` | Server component (no `'use client'`). Reads `siteData.disclaimer.full` and renders the `<details>` with summary. |

### Files to modify

| Path | Action | Anchor string |
|------|--------|--------------|
| `src/app/page.tsx` | INSERT a new import line AFTER `import productsData from '@/data/products.json';` | `import productsData from '@/data/products.json';` |
| `src/app/page.tsx` | REPLACE the inline AI Disclaimer block with `<AIDisclaimer />` | `{/* AI Disclaimer Section */}` (block ends at the Disclaimer's `</section>`) |

### Anchor strings for `src/app/page.tsx` (use string-based find-and-replace)

**Anchor 1 (INSERT after):** `import productsData from '@/data/products.json';`
- Action: INSERT a new line after this one: `import { AIDisclaimer } from '@/components/home/AIDisclaimer';`

**Why this anchor is unique:** v2.3 uses a different anchor (`import { HeroSection }`). v2.2 modifies (REPLACE) the `import { FeaturesSection }` line. Nobody else touches `import productsData`. This anchor is stable.

**Anchor 2 (REPLACE block):** find `{/* AI Disclaimer Section */}` and replace the entire Disclaimer `<section>...</section>` block (lines ~90–118 in the current file) with: `<AIDisclaimer />`.

### What to do

1. **Create `src/components/home/AIDisclaimer.tsx`** (server component):

   - Import: `import siteData from '@/data/site.json';`
   - Render the section:
     ```tsx
     export function AIDisclaimer() {
       return (
         <section
           aria-label="Información sobre IA"
           className="py-[var(--space-md)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
         >
           <details
             className="max-w-3xl mx-auto bg-[var(--color-bg-card)] border border-[var(--color-warning)]/40 rounded-[var(--radius-card)] shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)] overflow-hidden group"
           >
             <summary className="flex items-center gap-[var(--space-sm)] cursor-pointer list-none p-[var(--space-md)] hover:bg-[var(--color-primary-subtle)]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]">
               {/* Info icon SVG (24x24 viewBox) */}
               <svg aria-hidden="true" className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <circle cx="12" cy="12" r="10" />
                 <path d="M12 16v-4" />
                 <path d="M12 8h.01" />
               </svg>
               <span className="text-[var(--text-body)] text-[var(--color-text-secondary)] font-[var(--font-weight-medium)]">
                 Sobre la IA
               </span>
               {/* Chevron-down SVG (16x16 viewBox) */}
               <svg aria-hidden="true" className="w-4 h-4 ml-auto text-[var(--color-text-muted)] transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="6 9 12 15 18 9" />
               </svg>
             </summary>
             <div className="px-[var(--space-md)] pb-[var(--space-md)] text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">
               {siteData.disclaimer.full}
             </div>
           </details>
         </section>
       );
     }
     ```

2. **Modify `src/app/page.tsx`** (2 edits):
   - **Edit 1 (INSERT import):** find `import productsData from '@/data/products.json';` and insert a new line after it: `import { AIDisclaimer } from '@/components/home/AIDisclaimer';`
   - **Edit 2 (REPLACE block):** find `{/* AI Disclaimer Section */}` and replace the entire `<section>...</section>` block (with the amber icon, the disclaimer text, etc.) with `<AIDisclaimer />`.

### Acceptance criteria

- [ ] `src/components/home/AIDisclaimer.tsx` exists and is a server component (no `'use client'`).
- [ ] `src/app/page.tsx` has the new import line for AIDisclaimer.
- [ ] `src/app/page.tsx` has the inline AI Disclaimer block replaced with `<AIDisclaimer />`.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `grep -c "aria-label=\"Información sobre IA\"" src/components/home/AIDisclaimer.tsx` returns 1.
- [ ] `grep -c "disclaimer.full" src/components/home/AIDisclaimer.tsx` returns 1.
- [ ] `grep -c "<details" src/components/home/AIDisclaimer.tsx` returns 1.
- [ ] `grep -c "<summary" src/components/home/AIDisclaimer.tsx` returns 1.
- [ ] `grep -c "Sobre la IA" src/components/home/AIDisclaimer.tsx` returns 1.
- [ ] `wc -l src/app/page.tsx` decreases vs the current 121 lines (because the inline block is replaced with a 1-liner).
- [ ] Lighthouse mobile Accessibility ≥ 95.
- [ ] Lighthouse mobile Performance ≥ 90.

### Stop rules

- Stop if the user wants to keep the full-width disclaimer.
- Stop if WCAG AA fails on the compact form.
- Stop if the icon contrast < 3:1 (icon contrast is 5.5:1 amber on stone-800, should pass).

---

## Parallelism & Conflict Resolution

**All 4 Coder slices (v2.1, v2.2, v2.3, v2.4) can run in parallel** because they touch different files. The only file touched by multiple slices is `src/app/page.tsx` (by v2.2, v2.3, v2.4), and each slice uses a **unique anchor string** for its edits (no overlap).

**Anchors used (consolidated):**

| Slice | Anchor | Action | Replaces/Inserts |
|-------|--------|--------|-------------------|
| v2.1 | (none in page.tsx) | — | — |
| v2.2 | `import { FeaturesSection } from '@/components/home/FeaturesSection';` | REPLACE | 4 new import lines |
| v2.2 | `<FeaturesSection />` | REPLACE | 4 new component tags |
| v2.3 | `import { HeroSection } from '@/components/home/HeroSection';` | INSERT after | `import { CategoryPreview }` |
| v2.3 | `badgeLabel: 'Uwus'` | REPLACE | `badgeLabel: 'mochis'` |
| v2.3 | `buttonText: 'Ver Uwus'` | REPLACE | `buttonText: 'Ver mochis'` |
| v2.3 | `buttonLabel: 'home_category_uwus'` | REPLACE | `buttonLabel: 'home_category_mochis'` |
| v2.3 | `trackingId: 'home_preview_uwus'` | REPLACE | `trackingId: 'home_preview_mochis'` |
| v2.3 | `{/* Category Preview Section */}` block | REPLACE | `<CategoryPreview />` |
| v2.4 | `import productsData from '@/data/products.json';` | INSERT after | `import { AIDisclaimer }` |
| v2.4 | `{/* AI Disclaimer Section */}` block | REPLACE | `<AIDisclaimer />` |

**Conflicts:** none. All anchors are unique across slices.

**Rule for all Coder agents:** use **string-based find-and-replace** (e.g., the `Edit` tool with a unique `oldString`). If the anchor is not found, FAIL with a clear error message (do not invent or guess). Do not use line-based edits — the file's line numbers will shift as other slices commit.

**Suggested execution order (if Orchestrator wants to be safe):**

1. v2.1 (Hero) — fully independent. Run first or in parallel.
2. v2.2, v2.3, v2.4 — can run in parallel because of unique anchors. If any concerns, run v2.4 first (so its INSERT after `import productsData` is in place before v2.2's REPLACE of FeaturesSection import), then v2.2, then v2.3.

But the spec says they CAN run in parallel because anchors are unique. The Orchestrator decides.

---

## Final Notes for All Coders

- **No emoji** in code, components, or text (per the project brand guidelines).
- **Spanish copy:** verify all visible strings are in Spanish. Use "mochis" lowercase.
- **Test with the dev server:** run `npm run dev` and visit `http://localhost:3000` to see your changes live. Use Chrome DevTools to test responsive (375px, 768px, 1280px) and Lighthouse audits.
- **Build before committing:** always run `npm run build` and `npm run lint` before reporting done. Both must pass.
- **Closure report format:** at the end of each slice, report in machine-scannable format:
  ```
  STATUS: complete | blocked | partial
  SUMMARY: [one sentence]
  FILES_MODIFIED: [list]
  FILES_CREATED: [list]
  FILES_DELETED: [list]
  VERIFICATION: [build PASS, lint PASS, grep results for acceptance criteria]
  ```

---

**End of Coder Brief. Companion: `slices/spec-home-nocturnal-design.md` (full design spec, 757 lines) and `docs/home-page-design-spec.md` (consolidated spec, 364 lines).**


