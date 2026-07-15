# Plan — Home Redesign v2 (Background Blur Hero + 4 Full-Width Features + Compact Disclaimer)

**status:** planned
**created:** 2026-07-14
**planner:** subagent (planner)
**scope:** Home page only (`src/app/page.tsx` + 3 components). 4 user-requested changes layered on top of the existing v1 nocturnal redesign (slice N.5 60/40 split is being replaced).
**methodology:** Designer updates spec first (single source of truth for the Coder), then 4 parallel Coder slices touching 4 different files, then Reviewer QA.

---

## Summary

Iterating on the recently-shipped nocturnal Home (slice N.5): the 60/40 hero split is replaced with a **full-width blurred background image** with text overlaid; the 4-card Features grid is replaced with **4 stacked full-width sections** (one per feature) that read as a story-telling flow; the Category Preview keeps its 3 cards but gets a restyle consistent with the new theme + the visible rebrand (`Uwus` → `mochis`); and the full-section AI Disclaimer is replaced with a **compact inline banner**. All existing 3-layer tokens, Button/Card/Badge components, accessibility guarantees, and tracking events are reused. Nothing in this plan touches other pages, the larger rebrand, the OG image, the env vars, or the mascot band (which is a separate workstream).

---

## Project Context

- **Type:** SaaS / landing page e-commerce (Next.js 14 App Router)
- **Current state:** Existing codebase in **mature state** (build PASS, lint PASS, dark mode active, 3-layer tokens, 5 pages, 12 products, tracking, SEO, WCAG AA, responsive). The Home was just redesigned in slice N.5 (60/40 split with `next/image` priority). The user is now requesting v2 on top of N.5.
- **Key constraints:**
  - Reuse existing components (`Button`, `Card`, `Badge`) — do not reinvent.
  - Use existing tokens (`var(--color-...)`) — no new tokens unless absolutely necessary.
  - WCAG AA — every text/background combination must pass ≥4.5:1.
  - `prefers-reduced-motion: reduce` — all animations must respect this (already globally handled in `globals.css`).
  - Spanish copy — all UI text in Spanish.
  - Brand already renamed: H1 = "mochis", H1 rebrand is **already in code** (HeroSection line 27). Larger rebrand (mochis-play → mochis across 26 files) is **explicitly out of scope**.

---

## 1. Research Summary

### 1.1 What exists today (and what changes)

| File | Lines | Current state | v2 action |
|------|------:|---------------|-----------|
| `src/app/page.tsx` | 121 | Renders `<HeroSection />` + `<FeaturesSection />` + inline Category Preview (lines 53–88) + inline AI Disclaimer (lines 90–118). | **Modify** to consume the redesigned components. Category Preview and AI Disclaimer blocks move to their own components (or are updated inline if simpler). Tracking IDs `home_preview_uwus` → `home_preview_mochis` and `home_category_uwus` → `home_category_mochis`. |
| `src/components/home/HeroSection.tsx` | 70 | Server component, 60/40 split (text left, `<Image>` right with `priority`). 80vh-ish. | **Replace** with full-width blurred-background layout. The `<Image>` becomes a CSS background (`background-image: url(...)`) with `filter: blur(...)` and a dark gradient overlay. Text is overlaid on top. |
| `src/components/home/FeaturesSection.tsx` | 229 | Client component, 4 cards in `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with `IntersectionObserver` fade-in (heading + cards). | **Replace** the card grid with 4 stacked full-width sections (one per feature), each its own `<section>`, alternating left/right layout or distinctive visual treatment per section. Order (user-specified): **Juegos → Compañía → Práctica Idiomas → Personalizable**. |
| `src/components/ui/Badge.tsx` | 37 | Variant `'uwus' | 'gatos' | 'pifos' | 'default'`, token-driven. | **Optional** rename of variant key `'uwus'` → `'mochis'` (and matching token rename in `tokens.css` `--color-category-uwus-*` → `--color-category-mochis-*`). Decision deferred to slice v2.3 owner; if implemented, must be coordinated so the home + tiendaviews both keep working. |
| `src/styles/tokens.css` | 327 | 3-layer + dark mode. Currently the rebrand tokens `category-uwus-bg/text` still exist. | **Optional** rename in sync with `Badge.tsx`. NO new tokens required for v2 (use existing `color-bg-card`, `color-bg-subtle`, `color-border`, `color-text`, `color-text-secondary`, `color-text-inverse`, `color-primary`, `color-secondary`, `color-warning`). |
| `src/data/site.json` | 32 | Has `disclaimer.short` ("Juegos cortos • Sin memoria • Puede alucinar • Usa con responsabilidad") and `disclaimer.full` (the long sentence). | **Read-only for v2.** `disclaimer.short` will be reused in the compact disclaimer; `disclaimer.full` remains the canonical text but the compact version can be a 1-line summary. |
| `src/data/products.json` | 130 | 12 products, 3 categories. Category 0 still has `id: "uwus"`, `name: "Uwus"`. Product `image` paths still point to `/images/products/uwus/...`. | **Read-only for v2.** Visible string `Uwus` in Category Preview is the ONLY data-layer touchpoint for v2. The data-layer rebrand is the **separate workstream** explicitly out of scope. |
| `public/images/hero/hero-home.webp` | 33KB | 1672×941 WebP, already generated. Mimi on crescent moon, starry night. Mimi is in the **right 2/3 of the frame** (composition was designed for a 60/40 split with text on the left). | **Reuse.** With a full-width blurred background, the 1/3 negative-space-for-text design becomes irrelevant; the blur smooths everything. The composition will be softer/dreamier. |
| `src/lib/analytics.tsx` | 77 | `trackEvent`, `trackProductView`, `trackBuyMLClick`, `trackBuyWhatsAppClick`, etc. | **Read-only.** Tracking IDs are updated inline in `page.tsx`; no new tracking events introduced. |

### 1.2 What stays untouched (out of scope, per user)

- Mascot Band (`src/components/home/MascotBand.tsx`) — does not exist in code yet; the consolidated plan/spec references it but it is a **separate workstream** and is **not** part of this v2 slice set.
- The 13 remaining image generations (Mascot Band + 12 product icons) — separate user task.
- Full rebrand (mochis-play → mochis across 26 files) — separate workstream.
- URL change (`mochisplay.cl`) — separate.
- Footer refactor — cancelled.
- Other pages (Tienda, Tutoriales, Blog, Contacto) — separate slices.
- Tienda page — NOT touched. The Category Preview v2.3 must **not** break the Badge variant that Tienda consumes (so if the variant key rename happens, Tienda must be updated in the same slice).

### 1.3 Existing reusable components

| Component | Path | Used in v2 |
|-----------|------|------------|
| `Button` | `src/components/ui/Button.tsx` | Hero CTAs (size=lg, primary+outline), Category Preview buttons (size=sm, outline), optional Features CTAs (size=md, outline) |
| `Card` | `src/components/ui/Card.tsx` | Category Preview cards (reused as-is). **NOT used in Features v2** (4 full-width sections replace the cards) |
| `Badge` | `src/components/ui/Badge.tsx` | Category Preview badges. Optional variant rename in v2.3 |
| `trackEvent` | `src/lib/analytics.tsx` | All click tracking flows through the existing Button/Card |

---

## 2. User Requirements (verbatim restatement)

### 2.1 Hero — Background image with blur

- **Current:** 60/40 split (text left, image right) — implemented in N.5.
- **New:** Image as **full-width background** with **blur/diffusion effect** (CSS `filter: blur()` or similar).
- H1 "mochis", description, CTAs, and disclaimer are **overlaid on top of the blurred background image**.
- Text must remain readable (white or cream text, possibly with subtle text-shadow or gradient overlay on the image for legibility).
- Mimi character is still visible but soft/blurred (depth + atmosphere).
- Mobile: still full-width background, text overlaid.

### 2.2 Features — 4 full-width sections

- **Current:** 4 cards in 1/2/4 column grid.
- **New:** 4 **separate full-width sections**, stacked vertically, each dedicated to a single feature.
- Each section visually distinct (different layout per section, or alternating side-image/right-image pattern).
- **Order (user-specified):**
  1. **Juegos Interactivos** (Juegos cortos, historias y adivinanzas)
  2. **Compañía Inteligente** (puedes preguntarle de todo)
  3. **Práctica Idiomas** (aprende inglés y otros idiomas de forma lúdica)
  4. **Personalizable con Roles** (configura roles y planes de estudio)
- Each section: heading, **longer** description, optional visual element (icon, illustration, or small image), optional CTA.
- Sections should feel like **story-telling flow** (one concept per section, scrolled through).

### 2.3 Category Preview — Keep but restyle

- **Current:** 3 cards (mochis, gatitos, pifos) with image, badge, title, button.
- **New:** Same content (3 categories, first product of each) but **redesigned visual style** to be consistent with the new nocturnal theme.
- Could be: 3 columns with larger images, per-card glow effects, or a different grid layout.
- **Rebrand applied here:** "Uwus" → "mochis" (visible label only). The deeper rebrand (data layer, env vars, paths) is out of scope.

### 2.4 AI Disclaimer — Reduced version

- **Current:** Full-width section with bg, padding, full text.
- **New:** **Smaller, more compact version** — single line, inline callout, or collapsible/tooltip.
- Still conveys: memory, hallucinations, responsibility.
- Options: small inline banner with icon, footer-style note.

---

## 3. Slice Decomposition

### Slice v2.0 — Update Design Spec (Hero bg blur + 4 stacked features + compact disclaimer)

- **Slice ID:** `slice-home-v2-0-spec-update`
- **Title:** Update design spec to v2 (background-blur Hero, 4 full-width Features, compact Disclaimer, restyled Category Preview)
- **Owner role:** **Designer**
- **Files to read:**
  - `src/app/page.tsx`
  - `src/components/home/HeroSection.tsx`
  - `src/components/home/FeaturesSection.tsx`
  - `src/styles/tokens.css`
  - `src/data/site.json`
  - `src/data/products.json`
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` (current, will be updated)
  - `Agent-Orquest/docs/orchestration/docs/home-page-design-spec.md` (current, will be updated)
- **Files to write/modify:**
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` (replace §1, §2, §4, §5; keep §0 and §3)
  - `Agent-Orquest/docs/orchestration/docs/home-page-design-spec.md` (replace §1, §2, §4, §5; keep §6, §7, §8, §9)
  - `Agent-Orquest/docs/orchestration/slices/plan-home-redesign-v2.md` (this file — add design decision annotations if needed)
- **Depends on:** none
- **Blocks:** v2.1, v2.2, v2.3, v2.4 (all 4 Coder slices need the updated spec as input)
- **Can run in parallel with:** none
- **Complexity:** M
- **Risk:** low
- **Stop rules:**
  - Stop if the user wants to revisit any of the 4 requirements (the spec is just transcription + design decisions on top of those requirements).
  - Stop if the user does not confirm key design decisions (see §6 Open Questions) — the spec is not "ready for coder" without them.
- **Acceptance criteria:**
  - `spec-home-nocturnal-design.md` has a new §1 (Hero v2: full-width bg with blur), new §2 (Features v2: 4 stacked sections), updated §4 (Category Preview v2: restyled), updated §5 (Disclaimer v2: compact).
  - `home-page-design-spec.md` mirrors the same changes.
  - Each section has: layout, visual treatment table, tokens used, responsive breakpoints, accessibility, tracking.
  - All 4 sections are token-driven (no new tokens required).
  - WCAG AA verification noted for each text/background combo.
  - `prefers-reduced-motion` strategy noted for each animated element.
- **Verification commands:**
  - `wc -l Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` (should be ≥ 400 lines after update)
  - `wc -l Agent-Orquest/docs/orchestration/docs/home-page-design-spec.md` (should be ≥ 250 lines after update)
  - `grep -c "v2" Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` (should be ≥ 5)

### Slice v2.1 — Hero: full-width blurred background with overlaid text

- **Slice ID:** `slice-home-v2-1-hero-bg-blur`
- **Title:** Replace 60/40 split Hero with full-width blurred background, text overlaid
- **Owner role:** **Coder**
- **Files to read:**
  - `src/app/page.tsx` (to see how `<HeroSection />` is consumed)
  - `src/components/home/HeroSection.tsx` (current)
  - `src/components/ui/Button.tsx` (to understand CTA patterns)
  - `src/data/site.json` (for `site.description` and `disclaimer.short`)
  - `public/images/hero/hero-home.webp` (image exists, 1672×941)
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` §1 (the v2 Hero section, written by v2.0)
- **Files to write/modify:**
  - `src/components/home/HeroSection.tsx` (full rewrite, keep the same export name)
  - `src/app/page.tsx` (no structural change expected; verify the `<HeroSection />` import still resolves and renders the new component)
- **Depends on:** v2.0 (the updated spec defines the exact CSS — blur radius, overlay opacity, text colors, padding)
- **Blocks:** v2.5 (Reviewer QA)
- **Can run in parallel with:** v2.2, v2.3, v2.4 (different files: `HeroSection.tsx` vs `FeaturesSection.tsx` vs `page.tsx` Category Preview/Disclaimer blocks)
- **Complexity:** M
- **Risk:** **medium**
  - **What could go wrong:** text legibility on a busy blurred image; blur filter cost on mobile; LCP regression from switching `next/image` priority to CSS `background-image` (no LCP optimization).
  - **How to detect:** Lighthouse mobile Performance < 90, contrast check on the text vs the blurred bg spot, manual mobile device test, `npm run build` LCP audit.
  - **What to do if it happens:**
    - Increase gradient overlay opacity (e.g. 40% → 60% black) to restore contrast.
    - Reduce blur radius on mobile (e.g. 24px desktop → 12px mobile via media query).
    - For LCP: use `<Image fill priority>` for the LCP element (the background), with `sizes="100vw"`. CSS `background-image` is **not** discoverable by Next's image optimizer; if LCP regresses, switch the implementation back to `<Image fill>` with absolute positioning + CSS blur on the image element, not the section.
- **Stop rules:**
  - Stop if the user wants to keep the 60/40 split (this slice is a replacement, not an alternative).
  - Stop if Lighthouse Performance drops below 85 mobile.
  - Stop if WCAG AA fails on the H1 over the blurred bg.
- **Acceptance criteria:**
  - `src/components/home/HeroSection.tsx` no longer uses the 60/40 grid. The `next/image` import is removed (replaced with CSS `background-image`) OR is used with `fill` + `filter: blur()` on the `<img>` (the second approach preserves Next image optimization).
  - The H1 "mochis" is overlaid on the blurred background.
  - The 2 CTAs (`/tienda`, `/tutoriales`) are still present with the same `trackingLabel` (`home_hero_tienda`, `home_hero_tutoriales`).
  - The short disclaimer (`siteData.disclaimer.short`) is visible.
  - `priority` flag is preserved on the LCP image (or replaced with `loading="eager"` + `fetchPriority="high"` if using `<Image fill>`).
  - Alt text is set on the background image (or the image is marked `aria-hidden="true"` if it's purely decorative under the text — Designer's call in v2.0).
  - Mobile (375px) renders as a single column, image full-width, text overlaid centered.
  - Desktop (1280px) renders as a single full-width section, text overlaid (centered or left-aligned per design decision).
  - `npm run build` passes.
  - `npm run lint` passes.
  - Lighthouse mobile Performance ≥ 90.
- **Verification commands:**
  - `npm run build`
  - `npm run lint`
  - `grep -c "filter: blur" src/components/home/HeroSection.tsx` (should be ≥ 1)
  - `grep -c "background-image" src/components/home/HeroSection.tsx` (should be ≥ 1 if CSS approach chosen)
  - `grep -c "priority\|fetchPriority" src/components/home/HeroSection.tsx` (should be ≥ 1)
  - `grep -c "home_hero_tienda\|home_hero_tutoriales" src/components/home/HeroSection.tsx` (should be ≥ 2)
  - `grep -c "siteData.disclaimer.short" src/components/home/HeroSection.tsx` (should be ≥ 1)
  - `grep -c "trackingLabel" src/components/home/HeroSection.tsx` (should be ≥ 2)

### Slice v2.2 — Features: 4 full-width stacked sections (one per feature)

- **Slice ID:** `slice-home-v2-2-features-stacked`
- **Title:** Replace 4-card Features grid with 4 stacked full-width sections (story-telling flow)
- **Owner role:** **Coder**
- **Files to read:**
  - `src/components/home/FeaturesSection.tsx` (current 4-card grid)
  - `src/app/page.tsx` (to confirm import path)
  - `src/components/ui/Button.tsx` (if CTAs are added)
  - `src/styles/tokens.css` (for spacing/text tokens)
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` §2 (the v2 Features section, written by v2.0)
- **Files to write/modify:**
  - `src/components/home/FeaturesSection.tsx` (full rewrite, keep the same export name)
  - `src/app/page.tsx` (no structural change expected; verify import still resolves)
- **Depends on:** v2.0
- **Blocks:** v2.5
- **Can run in parallel with:** v2.1, v2.3, v2.4
- **Complexity:** **L**
- **Risk:** **medium**
  - **What could go wrong:** the order change breaks the user's mental model; the longer descriptions need new copy (the user provided only short copy); visual element per section is ambiguous (icon? image? glow?).
  - **How to detect:** content review with user; mobile scroll-test to verify each section reads well; Lighthouse performance check (4 sections with optional visual elements could bloat).
  - **What to do if it happens:**
    - Use the existing short descriptions as seed and the Coder can expand them only if the Designer provided expanded copy in v2.0 (otherwise keep the existing short copy and add a Coder note in the closure).
    - If visual element is ambiguous, default to **icon only** (reuse the 4 existing SVGs from the current `FeaturesSection.tsx`) and call this out in the closure as a follow-up.
- **Stop rules:**
  - Stop if the user wants to keep the 4-card grid.
  - Stop if the order (Juegos → Compañía → Práctica Idiomas → Personalizable) is contested.
  - Stop if the per-section visual element decision is contested (escalate to Designer via Orchestrator).
- **Acceptance criteria:**
  - The `FeaturesSection` component renders exactly 4 `<section>` elements in this order: Juegos, Compañía, Práctica Idiomas, Personalizable.
  - Each section is full-width (no max-width on the section element itself, or `max-w-6xl` only on the inner content container).
  - Each section has a heading (h2 per the v2 spec), description, and optionally a visual element (icon/illustration) and/or CTA.
  - The section uses existing tokens only (`--color-bg`, `--color-bg-subtle`, `--color-text`, `--color-text-secondary`, `--color-primary`, `--color-secondary`, `--space-*`).
  - The `IntersectionObserver` fade-in pattern from the current `FeaturesSection` is preserved (or extended) to animate each section into view.
  - `prefers-reduced-motion: reduce` is respected (no animation, sections visible immediately).
  - Mobile (375px) and desktop (1280px) render correctly.
  - `npm run build` passes.
  - `npm run lint` passes.
  - Each section has unique `aria-label` or `aria-labelledby` pointing to its h2.
  - Lighthouse mobile Performance ≥ 90.
- **Verification commands:**
  - `npm run build`
  - `npm run lint`
  - `grep -c "Juegos Interactivos" src/components/home/FeaturesSection.tsx` (should be 1)
  - `grep -c "Compañía Inteligente" src/components/home/FeaturesSection.tsx` (should be 1)
  - `grep -c "Práctica Idiomas" src/components/home/FeaturesSection.tsx` (should be 1)
  - `grep -c "Personalizable con Roles" src/components/home/FeaturesSection.tsx` (should be 1)
  - `grep -c "IntersectionObserver" src/components/home/FeaturesSection.tsx` (should be ≥ 1)
  - `grep -c "prefers-reduced-motion" src/components/home/FeaturesSection.tsx` (should be ≥ 1)
  - `grep -c "aria-label\|aria-labelledby" src/components/home/FeaturesSection.tsx` (should be ≥ 4)

### Slice v2.3 — Category Preview restyle + visible rebrand (Uwus → mochis)

- **Slice ID:** `slice-home-v2-3-category-preview-restyle`
- **Title:** Restyle the 3-card Category Preview + apply visible rebrand "Uwus" → "mochis"
- **Owner role:** **Coder** (with optional Designer consultation on the visual restyle)
- **Files to read:**
  - `src/app/page.tsx` (the inline Category Preview block, lines 53–88)
  - `src/components/ui/Card.tsx` (the Card component)
  - `src/components/ui/Badge.tsx` (current variants, may need rename)
  - `src/components/ui/Button.tsx` (Button for the per-card CTA)
  - `src/data/products.json` (categories[0].name = "Uwus", will become "mochis")
  - `src/styles/tokens.css` (category-uwus tokens, may need rename)
  - `src/app/tienda/page.tsx` and `src/app/tienda/TiendaClient.tsx` (to verify the Badge variant is not used there in a way that breaks)
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` §4 (the v2 Category Preview section, written by v2.0)
- **Files to write/modify:**
  - `src/app/page.tsx` (modify the Category Preview block: restyle + apply rebrand strings)
  - `src/data/products.json` (modify `categories[0].name` from "Uwus" to "mochis" — this is the ONLY data-layer change, the rest of the rebrand is out of scope)
  - **Optional, coordinated sub-changes** (only if the v2.0 Designer explicitly chose to rename the Badge variant — see §6 Open Questions):
    - `src/components/ui/Badge.tsx` (rename variant `'uwus'` → `'mochis'` in the type and VARIANT_STYLES)
    - `src/styles/tokens.css` (rename `--color-category-uwus-bg/text` → `--color-category-mochis-bg/text`)
    - `src/app/tienda/TiendaClient.tsx` (update any `'uwus'` variant usages to `'mochis'`)
- **Depends on:** v2.0
- **Blocks:** v2.5
- **Can run in parallel with:** v2.1, v2.2, v2.4 (different files: the Category Preview block in `page.tsx` is the same file as the Disclaimer block in `page.tsx`; **see risk note below**)
- **Complexity:** M
- **Risk:** **medium**
  - **What could go wrong:** the v2.3 and v2.4 slices both modify `src/app/page.tsx` (the Category Preview and Disclaimer blocks are both in this file). If they run in parallel, merge conflicts are likely. **Mitigation:** if the Designer in v2.0 decides to extract either block into its own component, the file overlap is removed and v2.3 and v2.4 can truly run in parallel. Otherwise, v2.3 and v2.4 must be serial.
  - **How to detect:** git diff conflict when both slices land; or `grep -c "Uwus" src/app/page.tsx` not matching the expected post-slice value.
  - **What to do if it happens:** Orchestrator sequences v2.3 then v2.4. Or, more efficient: the Designer in v2.0 should specify that BOTH Category Preview and AI Disclaimer become their own components (e.g. `src/components/home/CategoryPreview.tsx` and `src/components/home/DisclaimerBanner.tsx`), so the Coder slices touch separate files.
- **Stop rules:**
  - Stop if the user wants to keep the old 3-card style.
  - Stop if the Badge variant rename breaks Tienda (manual smoke test required if rename is performed).
  - Stop if the v2.0 spec does not define the new visual style (Designer must define it before Coder can implement).
- **Acceptance criteria:**
  - The 3 cards (mochis, gatitos, pifos) are still rendered with image, badge, title, and CTA.
  - The rebrand is applied: `categories[0].name` is "mochis" (not "Uwus"), badge label is "mochis", button text is "Ver mochis" (or equivalent per the v2.0 spec).
  - The tracking labels are renamed: `home_preview_mochis` (was `home_preview_uwus`), `home_category_mochis` (was `home_category_uwus`).
  - The visual restyle is applied per the v2.0 spec (e.g. larger images, per-card glow, different grid layout, etc.).
  - The Card and Button components are reused (no reinvention).
  - If the Badge variant key was renamed, Tienda still renders without errors.
  - `npm run build` passes.
  - `npm run lint` passes.
  - Lighthouse mobile Performance ≥ 90.
- **Verification commands:**
  - `npm run build`
  - `npm run lint`
  - `grep -c "Uwus" src/app/page.tsx src/data/products.json src/components/ui/Badge.tsx` (should be 0 after the slice, unless the Designer explicitly chose to keep the internal key as `uwus` and only change visible strings — see §6 Open Questions)
  - `grep -c "mochis" src/app/page.tsx` (should be ≥ 3: badge label, button text, tracking category)
  - `grep -c "home_category_mochis" src/app/page.tsx` (should be 1)
  - `grep -c "home_preview_mochis" src/app/page.tsx` (should be 1)
  - `grep -c "Card" src/app/page.tsx` (should still be ≥ 3 — Card component is reused)
  - If Badge renamed: `grep -c "'uwus'" src/components/ui/Badge.tsx` (should be 0)
  - If Tienda updated: `npm run build` (no compile errors)

### Slice v2.4 — AI Disclaimer: compact inline banner

- **Slice ID:** `slice-home-v2-4-disclaimer-compact`
- **Title:** Replace the full-section AI Disclaimer with a compact inline banner
- **Owner role:** **Coder**
- **Files to read:**
  - `src/app/page.tsx` (the inline Disclaimer block, lines 90–118)
  - `src/data/site.json` (for `disclaimer.short` and `disclaimer.full`)
  - `src/styles/tokens.css` (for `color-warning`, `color-text-*`)
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` §5 (the v2 Disclaimer section, written by v2.0)
- **Files to write/modify:**
  - `src/app/page.tsx` (modify the AI Disclaimer block)
  - **Optional:** create `src/components/home/DisclaimerBanner.tsx` (if the Designer in v2.0 decides the component is reusable across pages)
- **Depends on:** v2.0
- **Blocks:** v2.5
- **Can run in parallel with:** v2.1, v2.2 (and v2.3 if the Disclaimer block is extracted to its own file per v2.3 risk note)
- **Complexity:** S
- **Risk:** **low**
  - **What could go wrong:** the compact form loses the warning's prominence; users miss the disclaimer; the new form is hard to read on mobile.
  - **How to detect:** user feedback; Lighthouse accessibility (the `aria-label="Información sobre IA"` landmark should still be present); manual mobile device test.
  - **What to do if it happens:** Orchestrator escalates back to Designer. Most likely fix: make the banner slightly larger (taller padding), or use a `<details>` element with the full text collapsed by default.
- **Stop rules:**
  - Stop if the user wants to keep the full-width disclaimer.
  - Stop if the WCAG AA contrast check fails on the compact form (e.g. text too small, bg too dark).
  - Stop if the icon color (warning amber) does not have ≥3:1 against the bg (icons are exempt from 4.5:1 but need 3:1 for non-text contrast).
- **Acceptance criteria:**
  - The new disclaimer takes significantly less vertical space than the current full section (target: ≤ 1 line on desktop, ≤ 3 lines on mobile, with a max-height of ~80px).
  - The disclaimer still conveys the 3 key warnings: no memory, hallucinations, responsibility.
  - An icon (info-circle or warning-triangle, `aria-hidden="true"`) is present.
  - Text is in Spanish.
  - The element has `aria-label="Información sobre IA"` (or an equivalent landmark label).
  - The element uses semantic tokens only.
  - `npm run build` passes.
  - `npm run lint` passes.
  - Lighthouse mobile Accessibility ≥ 95.
- **Verification commands:**
  - `npm run build`
  - `npm run lint`
  - `grep -c "aria-label=\"Información sobre IA\"" src/app/page.tsx` (should be 1)
  - `grep -c "disclaimer.short\|disclaimer.full" src/app/page.tsx` (should be ≥ 1)
  - `wc -l src/app/page.tsx` (the line count should decrease vs the current 121 lines, because the section is simplified)

### Slice v2.5 — Reviewer QA

- **Slice ID:** `slice-home-v2-5-reviewer-qa`
- **Title:** Audit the full Home page after all v2 changes
- **Owner role:** **Reviewer**
- **Files to read:**
  - `src/app/page.tsx` (final state)
  - `src/components/home/HeroSection.tsx` (final state)
  - `src/components/home/FeaturesSection.tsx` (final state)
  - All other files modified by v2.1, v2.2, v2.3, v2.4
  - `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` (the v2 spec, for compliance)
  - `Agent-Orquest/docs/orchestration/docs/home-page-design-spec.md` (the v2 spec, for compliance)
  - All closure reports from v2.0, v2.1, v2.2, v2.3, v2.4
- **Files to write/modify:**
  - `Agent-Orquest/docs/orchestration/reports/audit-home-v2.md` (new audit report)
  - Possibly: `Agent-Orquest/docs/orchestration/reports/audit-home-v2-issues.md` (follow-up issues if any)
- **Depends on:** v2.1, v2.2, v2.3, v2.4 (all 4 Coder slices must be completed)
- **Blocks:** nothing (terminal slice)
- **Can run in parallel with:** none
- **Complexity:** M
- **Risk:** low
- **Stop rules:**
  - Stop if any blocking issue is found (build fails, lint fails, Lighthouse Performance < 85, WCAG AA fails on critical text, `prefers-reduced-motion` not respected).
  - Report non-blocking issues as `advisory` so the Coder can address them in a follow-up.
- **Acceptance criteria:**
  - `npm run build` passes.
  - `npm run lint` passes.
  - Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
  - WCAG AA verified for all text/background combinations (manual or axe-core).
  - `prefers-reduced-motion: reduce` honored (gradient no anima si lo hay, fade-ins desactivados, blur desactivado o reducido).
  - Tracking events still fire: `button_click` con `home_hero_tienda`, `home_hero_tutoriales`, `home_category_mochis`, `home_category_gatos`, `home_category_pifos`.
  - Rebrand visible en el Home: "Uwus" no aparece en el render del Home; "mochis" sí.
  - Responsive: 375px, 768px, 1280px renderizan correctamente.
  - The Hero does not have a regression in LCP (no slower than v1 60/40 split).
  - The Features v2 is **not** the old 4-card grid (verified by `grep` for `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` in `FeaturesSection.tsx` → 0).
  - The Disclaimer v2 is **not** the old full section (verified by `wc -l src/app/page.tsx` < 100 OR by structural inspection).
- **Verification commands:**
  - `npm run build`
  - `npm run lint`
  - `grep -r "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" src/components/home/FeaturesSection.tsx` (should be 0)
  - `grep -r "Uwus" src/app/page.tsx src/components/home/` (should be 0)
  - `grep -c "trackingLabel" src/app/page.tsx src/components/home/HeroSection.tsx` (should be ≥ 4)
  - `grep -c "aria-label\|aria-labelledby" src/app/page.tsx` (should be ≥ 4: hero, features, category preview, disclaimer)
  - `grep -c "prefers-reduced-motion" src/components/home/FeaturesSection.tsx` (should be ≥ 1)
  - `grep -c "filter: blur" src/components/home/HeroSection.tsx` (should be ≥ 1)

---

## 4. Execution Waves

### Wave 1: Design Spec Update (1 slice, serial)

**Wave 1: Update design spec to v2**

- **Slices in this wave:** v2.0
- **Parallelism:** serial (1 slice)
- **Why this ordering:** The 4 Coder slices in Wave 2 all need the updated spec as their source of truth. Running them in parallel without the spec would mean 4 Coder agents making different design decisions. The Designer is the single owner of design intent.

**Effort:** 1–2 hours of Designer work (update 2 spec documents with 4 sections each).

### Wave 2: Implementation (4 slices, parallel)

**Wave 2: Implement v2 changes**

- **Slices in this wave:** v2.1, v2.2, v2.3, v2.4
- **Parallelism:** **up to 4 in parallel** if the Designer in v2.0 extracts Category Preview and AI Disclaimer into their own components (so v2.3 and v2.4 don't both touch `src/app/page.tsx`). If the Designer keeps both blocks inline in `page.tsx`, then **v2.3 and v2.4 must be serial** (since they both modify `src/app/page.tsx`), and the max parallelism is 3 (v2.1 ‖ v2.2 ‖ v2.3-then-v2.4).
- **Why this ordering:** All 4 Coder slices depend only on v2.0, not on each other. They touch different components or different parts of `page.tsx` (or different files if the Designer extracted them). Once the spec is in hand, the Coder can implement each section independently.

**Sub-wave 2a (parallel):**
- v2.1 (Hero: `src/components/home/HeroSection.tsx`)
- v2.2 (Features: `src/components/home/FeaturesSection.tsx`)

**Sub-wave 2b (depends on whether Category Preview and Disclaimer are extracted):**

*If extracted (recommended):*
- v2.3 (Category Preview: `src/components/home/CategoryPreview.tsx`)
- v2.4 (AI Disclaimer: `src/components/home/DisclaimerBanner.tsx`)

*If NOT extracted (fallback):*
- v2.3 (Category Preview inline block in `src/app/page.tsx`)
- v2.4 (AI Disclaimer inline block in `src/app/page.tsx`) — **must run serial after v2.3** to avoid merge conflicts

**Effort:** ~30–60 min per Coder slice.

### Wave 3: QA (1 slice, serial)

**Wave 3: Reviewer audit**

- **Slices in this wave:** v2.5
- **Parallelism:** serial (1 slice)
- **Why this ordering:** Reviewer needs the final state of all 4 Coder slices to audit the page as a whole. Reviewer checks cross-slice concerns (visual coherence, end-to-end responsive, Lighthouse, accessibility) that only make sense after the full page is built.

**Effort:** 1–2 hours of Reviewer work.

---

## 5. Dependency Graph

```
                       [v2.0: Designer spec update]
                                  │
                  ┌───────────────┼───────────────┐
                  │               │               │
                  ▼               ▼               ▼
        [v2.1: Hero]    [v2.2: Features]   [v2.3: Cat Preview]   [v2.4: Disclaimer]
         (Coder)         (Coder)            (Coder)              (Coder)
                  │               │               │               │
                  └───────────────┴───────────────┴───────────────┘
                                          │
                                          ▼
                                [v2.5: Reviewer QA]
                                  (Reviewer)
```

**Serialization conditions:**

- v2.1, v2.2: always parallel (different files).
- v2.3, v2.4: **parallel only if** v2.0 extracted both into separate components. Otherwise serial.
- v2.5: always last (depends on all 4 Coder slices).

**Within-wave ordering:**

- Wave 1: v2.0 alone.
- Wave 2: v2.1 ‖ v2.2 ‖ (v2.3 ‖ v2.4 if extracted, else v2.3 → v2.4).
- Wave 3: v2.5 alone.

---

## 6. Open Questions (Decisions Needed Before Coding)

These are the design decisions the user (or Designer) must confirm before the Coder can implement. The Orchestrator should present these to the user via the Designer in slice v2.0.

### Q1. Hero blur strength and overlay
- **Decision:** What blur radius (in px) and what gradient overlay opacity (in %) for the Hero background?
- **Options:**
  - A: blur 24px + 50% black radial overlay (high contrast, soft)
  - B: blur 40px + 40% black radial overlay (softer, more atmospheric, lower contrast)
  - C: blur 16px + 60% black linear overlay (top-to-bottom, dramatic)
- **Recommendation:** B (40px + 40% radial). Balances atmosphere and legibility.

### Q2. Hero text color and alignment
- **Decision:** White or cream text? Centered or left-aligned?
- **Options:**
  - A: white text, centered, no text-shadow
  - B: cream-100 (`var(--color-text)`) text, left-aligned, subtle text-shadow
  - C: white text, centered, with `text-shadow: 0 2px 8px rgba(0,0,0,0.5)` for safety
- **Recommendation:** C. The text-shadow is a safety net that doesn't depend on the gradient overlay being perfect.

### Q3. Features section layout per section
- **Decision:** Should the 4 stacked features use a consistent layout, or an alternating left/right pattern?
- **Options:**
  - A: all 4 sections identical layout (heading + description + icon, centered)
  - B: alternating pattern (section 1: text-left, icon-right; section 2: icon-left, text-right; etc.)
  - C: each section has a unique layout (Juegos has a game-board visual, Compañía has a chat-bubble visual, etc.)
- **Recommendation:** B. Creates rhythm without requiring 4 different visuals.

### Q4. Features section per-section visual element
- **Decision:** What goes on the "non-text" side of each section?
- **Options:**
  - A: the existing 4 SVG icons (current FeaturesSection has them, just enlarged)
  - B: a small image (would need to generate 4 images — out of scope for v2)
  - C: a colored panel / glow with the icon (uses existing tokens only, no new images needed)
- **Recommendation:** C. Reuses tokens, no image generation needed.

### Q5. Category Preview visual style
- **Decision:** How should the 3 cards be restyled?
- **Options:**
  - A: same grid, larger images (square → portrait), per-card category glow (from v1 spec)
  - B: carousel on mobile, 3 columns desktop
  - C: stack on mobile, 3 columns desktop with the card image taking 60% of the card height
- **Recommendation:** A. Smallest change, keeps the per-card glow that was already designed.

### Q6. AI Disclaimer compact form
- **Decision:** What is the compact form?
- **Options:**
  - A: single line of text, small icon left, no background, just muted text color
  - B: small inline pill-shaped banner with amber border, icon + 1-line text
  - C: `<details>` element with summary "Sobre la IA" and collapsed full text
  - D: footer-style note (no section, just a small line at the bottom of the page)
- **Recommendation:** C. Best balance: compact by default, expandable for full context, semantic HTML, accessible.

### Q7. Badge variant rename (`uwus` → `mochis`)
- **Decision:** Should the internal `BadgeVariant` key be renamed from `'uwus'` to `'mochis'`?
- **Options:**
  - A: yes, rename in `Badge.tsx`, `tokens.css`, and update TiendaClient.tsx (breaking change, but cleaner)
  - B: no, keep internal key as `'uwus'`, only change visible strings to "mochis" (non-breaking, but legacy name persists in code)
- **Recommendation:** B for v2 (smaller blast radius). The deeper rename is part of the larger rebrand workstream, which is out of scope.

### Q8. Mascot Band
- **Decision:** The previous design spec referenced a "Mascot Band" section. The user's v2 requirements don't mention it. Should it be included?
- **Options:**
  - A: include the Mascot Band (per the existing spec) as a 5th section between Features and Category Preview
  - B: skip the Mascot Band for v2 (it's a separate workstream anyway, and the user didn't ask for it)
- **Recommendation:** B. The user did not request it in v2, and the image doesn't exist yet. Defer.

### Q9. Hero image alt text and accessibility
- **Decision:** With a blurred background image and overlaid text, is the image decorative or semantic?
- **Options:**
  - A: decorative (`aria-hidden="true"`, `alt=""` on the Image, the H1 carries the meaning)
  - B: semantic (alt = "Mimi, peluche rosa con IA..." on the Image, the visible text complements the alt)
- **Recommendation:** A. With a blurred background image that exists only to set mood, the image is decorative. The H1, description, and CTAs carry all the semantic content.

---

## 7. Risk & Stop-Rule Strategy

### Risk Matrix

| Risk | Likelihood | Impact | Detection | Mitigation |
|------|------------|--------|-----------|------------|
| Text illegible on busy blurred bg | Medium | High (UX blocker) | Manual review, axe-core, contrast check | Increase overlay opacity, add text-shadow, reduce blur |
| LCP regression from CSS bg-image | High | High (perf) | Lighthouse mobile Performance | Use `<Image fill priority>` with `filter: blur()` on the `<img>` element, not the section. Keep Next image optimization. |
| Mobile blur cost | Medium | Medium (perf) | Lighthouse mobile Performance, manual device test | Reduce blur radius on mobile via media query, or use `will-change: transform` to force GPU compositing |
| Merge conflict between v2.3 and v2.4 | High | Low (delay) | git diff | Designer in v2.0 extracts both into separate components; if not, Orchestrator sequences v2.3 then v2.4 |
| Badge variant rename breaks Tienda | Medium | Medium (regression) | `npm run build`, smoke test on /tienda | If Q7 is "A", update TiendaClient in the same slice; if "B", no risk |
| Features section order is contested | Low | Medium (UX) | User feedback | v2.0 Designer explicitly cites the user-specified order in the spec |
| Per-section visual element in Features is ambiguous | Medium | Medium (UX) | Implementation review | Default to colored panel + existing icon; defer imagery to a future slice |
| Compact disclaimer loses prominence | Medium | Low (compliance) | User feedback, Lighthouse a11y | Use `<details>` element so the full text is 1 click away; keep `aria-label` for landmark |

### Per-Slice Stop Rules (consolidated)

**v2.0 (Designer):** Stop if user wants to revisit the 4 v2 requirements. Stop if Q1–Q9 are not answerable.

**v2.1 (Coder, Hero):** Stop if user wants to keep 60/40 split. Stop if Lighthouse mobile < 85. Stop if WCAG AA fails on H1. Stop if LCP regresses > 200ms.

**v2.2 (Coder, Features):** Stop if user wants to keep 4-card grid. Stop if the order is contested. Stop if the per-section visual decision is contested.

**v2.3 (Coder, Category Preview):** Stop if user wants to keep old 3-card style. Stop if the Badge variant rename breaks Tienda. Stop if the v2.0 spec doesn't define the new visual style.

**v2.4 (Coder, Disclaimer):** Stop if user wants to keep full-width disclaimer. Stop if WCAG AA fails. Stop if the icon contrast < 3:1.

**v2.5 (Reviewer):** Stop if any blocking issue is found (build fails, lint fails, Lighthouse Performance < 85, WCAG AA fails on critical text, `prefers-reduced-motion` not respected). Report non-blocking issues as advisory.

---

## 8. What NOT to Include (Out of Scope)

Explicitly out of scope for this v2 plan:

1. **Image generation** — The 13 remaining images (Mascot Band, 12 product icons, OG image) are separate user tasks. Only the existing `hero-home.webp` is reused.
2. **Full rebrand (mochis-play → mochis)** — Affects ~140 references in 26 files. Separate workstream.
3. **URL change (`mochisplay.cl`)** — Separate.
4. **Footer refactor** — Cancelled.
5. **Other pages** (Tienda, Tutoriales, Blog, Contacto) — Separate slices. **Exception:** if v2.3 renames the Badge variant, Tienda is updated in the same slice.
6. **New design tokens** — All visual values come from existing tokens. No new tokens.
7. **New components beyond the redesigned ones** — No new UI primitives. Reuse Button, Card, Badge.
8. **Mascot Band** — Referenced in the consolidated spec but not requested in v2; defer to a separate workstream.
9. **i18n** — Spanish only. No language switcher.
10. **Animations beyond fade-ins** — No parallax, no scroll-linked gradients, no Lottie. The existing `IntersectionObserver` fade-in pattern is the only animation in scope.

---

## 9. Testing Strategy

### Unit / Type checks
- `npm run build` (validates TypeScript, ESLint via Next config, and bundles)
- `npm run lint` (validates ESLint rules)

### Visual / Manual
- Browser preview at 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (large desktop)
- Lighthouse mobile audit (Performance, Accessibility, Best Practices, SEO)
- Manual tab/keyboard navigation: H1 → CTAs → first feature → next feature → ... → category cards → disclaimer
- Manual screen reader check: VoiceOver (macOS/iOS) or NVDA (Windows) — verify each section is announced as a landmark with the correct label
- Test in Chrome, Firefox, Safari

### Accessibility
- axe-core via `@axe-core/cli` or browser extension
- Manual contrast checks on the Hero H1 vs the blurred bg spot
- Manual `prefers-reduced-motion` toggle: enable in OS, reload, verify no animations play
- Keyboard-only navigation: Tab through all interactive elements, verify visible focus ring on each

### Performance
- Lighthouse mobile Performance ≥ 90
- LCP < 2.5s on 4G mobile
- CLS < 0.1
- Total page weight < 500KB (target)

### Tracking
- Open browser DevTools, go to Network tab, filter on `collect` or `gtag`
- Click each CTA in the Hero, each category button, and verify the corresponding `button_click` event fires with the correct `label`
- Verify the renamed tracking IDs: `home_category_mochis` (not `home_category_uwus`), `home_preview_mochis` (not `home_preview_uwus`)

### Responsive
- Resize the browser to 375px, 768px, 1280px and verify no horizontal overflow, all sections render correctly
- Mobile (375px): Hero single column, Features stacked, Category Preview single column or 3-column (per design), Disclaimer compact
- Desktop (1280px): Hero full-width bg, Features stacked with 2-column internal layout (per Q3), Category Preview 3 columns, Disclaimer compact

---

## 10. Acceptance Metrics (per phase)

### After Wave 1 (v2.0)
- [ ] `spec-home-nocturnal-design.md` updated (≥ 400 lines)
- [ ] `home-page-design-spec.md` updated (≥ 250 lines)
- [ ] Q1–Q9 answered (or explicitly deferred)

### After Wave 2 (v2.1–v2.4)
- [ ] `npm run build` PASS
- [ ] `npm run lint` PASS
- [ ] `src/components/home/HeroSection.tsx` uses blurred background (grep: `filter: blur` ≥ 1)
- [ ] `src/components/home/FeaturesSection.tsx` has 4 sections in the user-specified order (grep: each feature name = 1)
- [ ] `src/app/page.tsx` Category Preview block has the rebrand (grep: `mochis` ≥ 3, `Uwus` = 0 in visible strings)
- [ ] `src/app/page.tsx` AI Disclaimer block is compact (wc -l src/app/page.tsx < 100 OR `py-[var(--space-2xl)]` < the previous 48px)

### After Wave 3 (v2.5)
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- [ ] WCAG AA verified for all text/background combinations
- [ ] `prefers-reduced-motion: reduce` honored
- [ ] All tracking events fire with correct labels
- [ ] Rebrand "Uwus" → "mochis" visible in Home render
- [ ] 375px, 768px, 1280px render correctly
- [ ] Reviewer audit report written to `Agent-Orquest/docs/orchestration/reports/audit-home-v2.md`

---

## 11. Files to Write / Modify (consolidated)

| Action | Path | Slice |
|--------|------|-------|
| Modify | `Agent-Orquest/docs/orchestration/slices/spec-home-nocturnal-design.md` | v2.0 |
| Modify | `Agent-Orquest/docs/orchestration/docs/home-page-design-spec.md` | v2.0 |
| Modify | `src/components/home/HeroSection.tsx` | v2.1 |
| Modify | `src/components/home/FeaturesSection.tsx` | v2.2 |
| Modify | `src/app/page.tsx` (Category Preview block, rebrand strings) | v2.3 |
| Modify | `src/data/products.json` (categories[0].name) | v2.3 |
| Optional Modify | `src/components/ui/Badge.tsx` (variant rename) | v2.3 |
| Optional Modify | `src/styles/tokens.css` (category-uwus → category-mochis) | v2.3 |
| Optional Modify | `src/app/tienda/TiendaClient.tsx` (if Badge renamed) | v2.3 |
| Modify | `src/app/page.tsx` (AI Disclaimer block) | v2.4 |
| Optional Create | `src/components/home/CategoryPreview.tsx` (if extracted) | v2.3 |
| Optional Create | `src/components/home/DisclaimerBanner.tsx` (if extracted) | v2.4 |
| Create | `Agent-Orquest/docs/orchestration/reports/audit-home-v2.md` | v2.5 |
| Create | `Agent-Orquest/docs/orchestration/slices/plan-home-redesign-v2.md` (this file) | planner |

---

## 12. Agent Recommendations

### Designer slices

- **v2.0 — Update spec (1 slice)**
  - **Why Designer:** The Designer owns the design system. Updating the spec is a design task, not a code task. The Designer resolves Q1–Q9 (the 9 open design decisions) before the Coder can implement. The Designer also decides whether to extract Category Preview and Disclaimer into separate components (which determines whether v2.3 and v2.4 can run in parallel).

### Coder slices

- **v2.1 — Hero (1 slice)**
  - **Why Coder:** Implementation of an existing design spec. Touches `src/components/home/HeroSection.tsx`. Coder handles the CSS blur, gradient overlay, and Next image optimization.
- **v2.2 — Features (1 slice)**
  - **Why Coder:** Implementation of an existing design spec. Touches `src/components/home/FeaturesSection.tsx`. Coder handles the 4 stacked sections, the `IntersectionObserver` pattern, and responsive layouts.
- **v2.3 — Category Preview (1 slice)**
  - **Why Coder:** Implementation of an existing design spec. Touches `src/app/page.tsx` Category Preview block + `src/data/products.json` rebrand. Optional Badge/token rename coordinated in the same slice. Coder handles the visual restyle and the rename coordination.
- **v2.4 — AI Disclaimer (1 slice)**
  - **Why Coder:** Implementation of an existing design spec. Touches `src/app/page.tsx` AI Disclaimer block. Smallest slice. Coder handles the compact form (recommended: `<details>` element).

### Reviewer slices

- **v2.5 — QA (1 slice)**
  - **Why Reviewer:** Neutral audit. The Reviewer verifies compliance with the spec, checks accessibility, runs Lighthouse, tests responsive, validates tracking, and writes the audit report. Reviewer is the only role that can be truly objective about the combined result of all 4 Coder slices.

### Summary

- **Designer slices:** 1 (v2.0)
- **Coder slices:** 4 (v2.1, v2.2, v2.3, v2.4)
- **Reviewer slices:** 1 (v2.5)
- **Total slices:** 6

---

## 13. Estimated Effort

| Wave | Slice | Owner | Effort | Wall-clock (parallel) |
|------|-------|-------|--------|------------------------|
| 1 | v2.0 | Designer | 1–2h | 1–2h |
| 2a | v2.1 | Coder | 30–60min | 30–60min (parallel) |
| 2a | v2.2 | Coder | 60–90min | 60–90min (parallel) |
| 2b | v2.3 | Coder | 30–60min | 30–60min (parallel, if extracted) |
| 2b | v2.4 | Coder | 15–30min | 15–30min (parallel, if extracted) |
| 3 | v2.5 | Reviewer | 1–2h | 1–2h |
| **Total** | **6 slices** | **3 agents** | **~4–7h of work** | **~2.5–4.5h wall-clock** |

The wall-clock assumes:
- Wave 1: 1 Designer, 1–2h
- Wave 2: 4 Coders in parallel (if extracted), 60–90min max
- Wave 3: 1 Reviewer, 1–2h

Total wall-clock: ~2.5–4.5h, dominated by Wave 1 (Designer) and Wave 3 (Reviewer).

---

## 14. End of Plan

**Status:** ready for Orchestrator
**Next step:** Orchestrator spawns the Designer for v2.0 (spec update + Q1–Q9 resolution), then spawns 4 Coders in parallel for Wave 2, then spawns the Reviewer for v2.5.
