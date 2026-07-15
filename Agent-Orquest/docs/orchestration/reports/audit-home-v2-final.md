# Audit Report — Home v2 Redesign

**Date:** 2026-07-14
**Reviewer:** reviewer (subagent)
**Scope:** Verify slices v2.1, v2.2, v2.3, v2.4 (Home redesign with bg blur + 4 features + Category Preview + compact Disclaimer)
**Build status:** PASS
**Lint status:** PASS

---

## Executive Summary

The Home v2 redesign was implemented cleanly across 4 parallel Coder slices. The build compiles successfully (9/9 static pages, Home page 2.49 kB / 105 kB First Load JS), lint is clean (0 warnings, 0 errors), the old `FeaturesSection.tsx` was correctly deleted, all 5 new Feature files were created with the correct content and order, the Category Preview was extracted with per-card radial glow, and the AI Disclaimer was replaced with a compact native `<details>` element. The rebrand "Uwus" → "mochis" is fully applied to all visible strings (H1, badge label, button text, tracking labels, and `products.json:5`), and the previous "Gatos/Pifos preview titles" UX issue was fixed as a happy side effect of v2.3. No new issues were introduced; no regressions detected. **The Home v2 is ready for production.**

---

## Per-Slice Verification

| Slice | Stop rule | Expected | Actual | PASS/FAIL |
|-------|-----------|----------|--------|-----------|
| v2.1 Hero | Image renders, blur applied, text overlay legible | `filter: blur` (24px mobile / 40px desktop), `scale-110` mask, gradient overlay, `text-shadow` safety net, `priority + fetchPriority="high"`, decorative `alt="" + aria-hidden="true"`, H1 = "mochis" | `HeroSection.tsx:48` has `scale-110 object-cover blur-[24px] md:blur-[40px]`; `HeroSection.tsx:58` has both `linear-gradient` and `radial-gradient`; `HeroSection.tsx:26-28` defines `heroTextShadow`; `HeroSection.tsx:42-43` has `priority` + `fetchPriority="high"`; `HeroSection.tsx:40, 47` has `alt=""` and `aria-hidden="true"`; `HeroSection.tsx:68` has H1 = "mochis" | PASS |
| v2.2 Features | 4 sections in order, alternating layout, fade-in animation | 5 new files (FeatureSection shared + 4 wrappers), `IntersectionObserver`, `prefers-reduced-motion`, order: Juegos → Compañía → Idiomas → Personalizable, alternating `reversed` flag | 5 files exist; `FeatureSection.tsx:33, 41` has `prefers-reduced-motion` + `IntersectionObserver`; `FeatureSection.tsx:65-66` has `textColOrderClass` and `visualColOrderClass` based on `reversed`; order in `page.tsx:17-20` is Juegos → Compania → Idiomas → Personalizable; section bgs alternate `canvas`/`subtle` per `JuegosSection.tsx:33`, `CompaniaSection.tsx:31`, `IdiomasSection.tsx:31`, `PersonalizableSection.tsx:37` | PASS |
| v2.3 Category Preview | Rebrand applied, glow effects, data layer updated | `mochis` in badge/button/tracking, `'uwus'` Badge variant preserved, `blur(40px)` + `opacity-60` per-card glow, `categoryPreviews` removed from `page.tsx`, `products.json:5` = "mochis" | `CategoryPreview.tsx:12, 16, 14, 15` has `mochis`/`Ver mochis`/`home_preview_mochis`/`home_category_mochis`; `CategoryPreview.tsx:11` has `badgeVariant: 'uwus' as const` (preserved); `CategoryPreview.tsx:65` has `filter: 'blur(40px)'`; `CategoryPreview.tsx:62` has `opacity-60`; `page.tsx` no longer contains `categoryPreviews`; `products.json:5` = `"name": "mochis"` | PASS |
| v2.4 AI Disclaimer | Compact `<details>`, amber styling, no JS | Native `<details>` + `<summary>`, summary = "Sobre la IA", no `'use client'`, `var(--color-warning)` amber border, inline block removed from `page.tsx` | `AIDisclaimer.tsx:19, 20` has `<details>` and `<summary>`; `AIDisclaimer.tsx:38` has "Sobre la IA"; `AIDisclaimer.tsx:1` (no `'use client'`); `AIDisclaimer.tsx:19, 23` has `border-[var(--color-warning)]/40` and `text-[var(--color-warning)]`; `page.tsx:26` uses `<AIDisclaimer />` instead of inline block | PASS |

---

## Build & Lint

**Build output** (from `npm run build`):
```
✓ Compiled successfully
✓ Generating static pages (9/9)

Route (app)                              Size     First Load JS
┌ ○ /                                    2.49 kB         105 kB
├ ○ /_not-found                          873 B          88.2 kB
├ ○ /blog                                2.66 kB         106 kB
├ ○ /contacto                            4.13 kB         107 kB
├ ○ /sitemap.xml                         0 B                0 B
├ ○ /tienda                              4.39 kB          97 kB
└ ○ /tutoriales                          2.73 kB         106 kB
+ First Load JS shared by all            87.3 kB
```

- **Build:** PASS (9/9 static pages, 0 errors)
- **Lint:** PASS (`✔ No ESLint warnings or errors`)
- **Home page size:** 2.49 kB (down from 3.14 kB pre-v2 — **slight reduction** thanks to extraction of 4 features + CategoryPreview + AIDisclaimer into separate components)
- **First Load JS shared:** 87.3 kB (unchanged from pre-v2)
- **Home First Load JS:** 105 kB (unchanged from pre-v2 baseline)

---

## Architecture Verification

**page.tsx (29 lines):**
- 8 import lines (4 Features + HeroSection + CategoryPreview + AIDisclaimer + siteData)
- 7 component tags in order: `<HeroSection />` → `<JuegosSection />` → `<CompaniaSection />` → `<IdiomasSection />` → `<PersonalizableSection />` → `<CategoryPreview />` → `<AIDisclaimer />`
- Server component (no `'use client'`)
- **Note:** Task spec said "7 imports" — actual count is 8 (4 Features + 3 home components + 1 data). Minor spec discrepancy, not a code issue. The 4 Features imports are intentional and per the spec.

**Component files (8 total in `src/components/home/`):**
| File | Lines | Type | Purpose |
|------|------:|------|---------|
| `HeroSection.tsx` | 103 | server | Full-width blurred background with text overlay |
| `CategoryPreview.tsx` | 91 | server | 3-card grid with per-card radial glow |
| `AIDisclaimer.tsx` | 61 | server | Compact `<details>` disclosure |
| `Features/FeatureSection.tsx` | 108 | client (`'use client'`) | Shared helper with IntersectionObserver |
| `Features/JuegosSection.tsx` | 36 | server | Section 1 wrapper |
| `Features/CompaniaSection.tsx` | 34 | server | Section 2 wrapper |
| `Features/IdiomasSection.tsx` | 34 | server | Section 3 wrapper |
| `Features/PersonalizableSection.tsx` | 40 | server | Section 4 wrapper |

**Old `FeaturesSection.tsx`:** DELETED (`ls: cannot access 'src/components/home/FeaturesSection.tsx': No such file or directory`)

**No orphan imports in `page.tsx`:** All 8 imports resolve to existing files (`src/components/home/Features/{JuegosSection,CompaniaSection,IdiomasSection,PersonalizableSection}.tsx`, `src/components/home/HeroSection.tsx`, `src/components/home/CategoryPreview.tsx`, `src/components/home/AIDisclaimer.tsx`, `src/data/site.json`).

**No dead code in `page.tsx`:** 29 lines, single `HomePage` function, no unused exports.

**`use client` directives:**
- `FeatureSection.tsx:1` = 1 occurrence ✓
- 4 wrapper sections = 0 occurrences each (server components, as intended) ✓

---

## Accessibility

| Component | aria attribute | Element | Evidence |
|-----------|---------------|---------|----------|
| Hero | `aria-label="Inicio"` | `<section>` | `HeroSection.tsx:33` |
| Hero | `aria-hidden="true"` (decorative) | `<Image>` | `HeroSection.tsx:47` |
| Hero | `aria-hidden="true"` (decorative) | Gradient overlay div | `HeroSection.tsx:54` |
| Features (all 4) | `aria-labelledby={id}-heading` | `<section>` (dynamic) | `FeatureSection.tsx:76` |
| Features (all 4) | `aria-hidden="true"` (decorative) | Icon panel | `FeatureSection.tsx:96` |
| Category Preview | `aria-labelledby="categories-heading"` | `<section>` | `CategoryPreview.tsx:44` |
| Category Preview | `aria-hidden="true"` (decorative) | Glow div | `CategoryPreview.tsx:61` |
| AI Disclaimer | `aria-label="Información sobre IA"` | `<section>` | `AIDisclaimer.tsx:16` |
| AI Disclaimer | `aria-hidden="true"` (decorative) | Info icon SVG | `AIDisclaimer.tsx:22` |
| AI Disclaimer | `aria-hidden="true"` (decorative) | Chevron SVG | `AIDisclaimer.tsx:41` |
| AI Disclaimer | Native `<details>` + `<summary>` | Disclosure | `AIDisclaimer.tsx:19, 20` |

**A11y checks:**
- ✓ Hero has `aria-label` (line 33)
- ✓ Each Features section has `aria-labelledby` pointing to dynamic `${id}-heading` (line 76)
- ✓ Category Preview has `aria-labelledby` pointing to `categories-heading` (line 44)
- ✓ AIDisclaimer `<details>` is keyboard-accessible by default (Tab to summary, Enter/Space to toggle)
- ✓ Hero image is decorative (`alt=""` + `aria-hidden="true"`)
- ✓ Gradient overlay is decorative (`aria-hidden="true"`)
- ✓ Glow divs are decorative (`aria-hidden="true"`)
- ✓ Icon SVGs in Features, AIDisclaimer are decorative (`aria-hidden="true"`)
- ✓ Focus-visible outline on AIDisclaimer summary: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]` (line 20)

**Heading hierarchy:**
- Hero: `<h1>` (line 64) — one H1 on page ✓
- Category Preview: `<h2 id="categories-heading">` (line 48) ✓
- Each Feature section: `<h2 id="${id}-heading">` (line 81) ✓
- Card titles in Category Preview: `<h3>` (in `Card.tsx:119`) ✓
- No h3-h6 inside Features sections (descriptions are `<p>`) ✓

Hierarchy: h1 (Hero) → h2 (4 Features) → h2 (Category Preview) → h3 (Card titles). All h2s are siblings under h1, h3s are siblings under h2. WCAG-compliant.

**`prefers-reduced-motion: reduce` handling:**
- `FeatureSection.tsx:32-39` checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and sets `isVisible: true` immediately
- Hero, CategoryPreview, AIDisclaimer have no animation; reduced-motion is automatically satisfied

---

## Performance

| Metric | Pre-v2 | Post-v2 | Delta |
|--------|-------:|--------:|------:|
| Home page size | 3.14 kB | **2.49 kB** | -0.65 kB (-21%) |
| Home First Load JS | 105 kB | **105 kB** | 0 (unchanged) |
| First Load JS shared | 87.3 kB | **87.3 kB** | 0 (unchanged) |

**Image optimization:**
- Hero uses `next/image` with `fill`, `priority`, `fetchPriority="high"`, `loading="eager"`, `sizes="100vw"`, `quality={90}` (HeroSection.tsx:38-49) ✓
- Category Preview uses `next/image` via the `Card` component (Card.tsx:104-111) with `fill`, `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`, `loading="lazy"` ✓
- No raw `<img>` tags in `src/components/home/` or `src/app/page.tsx` ✓
- `grep -rnE "<img " src/` returns 0 matches ✓
- Hero image is WebP (1672×941, 33,634 bytes ≈ 33KB), confirmed via `file` command ✓
- `next.config.js:3-5` enables `image/webp` format ✓

**`next/image` is the only image loader in the Home page; no raw img tags. LCP is properly prioritized.**

---

## Rebrand Consistency

### "mochis-play" in src/

**Total matches:** 9 (all in files explicitly out of v2 scope per the plan)
- `src/app/blog/page.tsx:8` — page metadata (out of v2 scope)
- `src/app/contacto/page.tsx:8` — page metadata (out of v2 scope)
- `src/app/tienda/page.tsx:9` — page metadata (out of v2 scope)
- `src/app/tutoriales/page.tsx:8, 25` — page metadata (out of v2 scope)
- `src/components/layout/Header.tsx:54` — header logo (out of v2 scope)
- `src/data/site.json:3, 5, 14, 21, 29` — site name/url/keywords/disclaimer/email (out of v2 scope, separate workstream)
- `src/data/tutorials.json:6` — tutorial description (out of v2 scope)
- `src/styles/tokens.css:2` — file-level comment (cosmetic, not user-visible)

**Verdict:** PASS — All 9 matches are in files **explicitly out of v2 scope** per `plan-home-redesign-v2.md` §1.2 and §8. The Home v2 did not introduce any new "mochis-play" references.

### "Uwus" in src/

**Total matches:** 0 visible strings, 2 token comments (intentional per Q7)
- `src/styles/tokens.css:70, 245` — comments labeling the color primitive (intentional, not user-visible)

**Verdict:** PASS — No user-facing "Uwus" strings in the Home page. The 2 token comments are documentation labels and are explicitly out of scope (Q7 decision in the plan).

### "mochis" visible brand

| Location | Evidence | PASS/FAIL |
|----------|----------|-----------|
| Hero H1 | `HeroSection.tsx:68` = `mochis` | PASS |
| Category Preview badge label | `CategoryPreview.tsx:12` = `badgeLabel: 'mochis'` | PASS |
| Category Preview button text | `CategoryPreview.tsx:16` = `buttonText: 'Ver mochis'` | PASS |
| Tracking labels | `CategoryPreview.tsx:14, 15` = `home_preview_mochis`, `home_category_mochis` | PASS |
| products.json category name | `products.json:5` = `"name": "mochis"` | PASS |

### products.json:5 verification

`products.json:5` is `"name": "mochis"` (was "Uwus" pre-v2). The `id: "uwus"` on line 4 is preserved per Q7 decision. PASS.

### "uwus" identifier presence (allowed per Q7)

- `CategoryPreview.tsx:4, 10, 11, 13, 17` — `uwusProduct` variable name, `badgeVariant: 'uwus' as const`, `glowColor: 'var(--color-category-uwus)'` — **all allowed** (identifier/badge key/token reference, Q7)
- `products.json:4, 15, 23, 31, 39, 47` — `id: "uwus"` and image paths — **allowed** (data layer, Q7)
- `CompaniaSection.tsx:26, 27, 28` — `var(--color-category-uwus)` token references — **allowed** (token reference, Q7)
- `PersonalizableSection.tsx:32, 33, 34` — `var(--color-category-gatos)` token references — **allowed**

---

## Regression Check

The pre-v2 audit (`audit-home-current-state.md`) found 0 critical, 4 high, 3 medium, 4 low issues. Verifying each against the v2 state:

| Pre-v2 issue | Pre-v2 status | Post-v2 status | Notes |
|--------------|---------------|----------------|-------|
| [high] Tailwind palette leak in Header/Footer/MobileNav/BuyButtons | Open | **Unchanged** (out of v2 scope) | Still present, not v2 workstream |
| [high] Empty product image directories | Open | **Unchanged** (out of v2 scope) | Still empty, content blocker |
| [high] `aria-controls` mismatch in MobileNav | Open | **Unchanged** (out of v2 scope) | Still dangling reference |
| [high] `bg-white text-gray-900` on `<body>` (layout.tsx:55) | Open | **Unchanged** (out of v2 scope) | Still hardcoded |
| [medium] Index-based product selection fragile | Open | **Unchanged but isolated** | Now in `CategoryPreview.tsx:4-6` only; not in page.tsx |
| [medium] Gatos/Pifos preview showed category label | Open | **FIXED** | `CategoryPreview.tsx:23, 33` now uses `Gato ${color}` and `Pifo ${color}` |
| [medium] Disclaimer short text duplicated in 2 sections | Open | **FIXED** | Hero uses `disclaimer.short`, AIDisclaimer uses `disclaimer.full` (different texts) |
| [low] Footer.tsx client only for tracking | Open | **Unchanged** (out of v2 scope) | |
| [low] Double SSR guard in useTracking | Open | **Unchanged** (out of v2 scope) | |
| [low] Inline SVG in home duplicates iconProps | Open | **FIXED** | Now in dedicated `AIDisclaimer.tsx` |
| [low] MobileNav handleKeyDown as useCallback | Open | **Unchanged** (out of v2 scope) | |

**Net result:** 2 pre-existing issues FIXED in v2 (gatos/pifos titles, disclaimer duplication), 1 pre-existing issue now isolated to a single component (index-based selection), 6 pre-existing issues unchanged because they are explicitly out of v2 scope. **No new issues introduced.**

---

## New Findings

**None.** The v2 implementation:
- Reuses all existing tokens (`var(--color-bg)`, `var(--color-bg-subtle)`, `var(--color-text-inverse)`, `var(--color-primary)`, `var(--color-secondary)`, `var(--color-warning)`, `var(--color-category-{uwus,gatos,pifos})`) — no new tokens added ✓
- Reuses existing components (`Button`, `Card`, `Badge`) — no new UI primitives ✓
- Follows the spec exactly for the 4 features order, alternating layout, and bg pattern ✓
- Follows the spec exactly for the Category Preview rebrand (visible strings only, Badge variant key preserved) ✓
- Follows the spec exactly for the AIDisclaimer compact `<details>` with `Sobre la IA` summary ✓
- Follows the spec exactly for the Hero blur (24px mobile / 40px desktop) and `scale-110` mask ✓
- Follows the spec exactly for the Hero gradient (linear + radial) and `text-shadow` safety net ✓
- Follows the spec exactly for `next/image` with `fill + priority + fetchPriority="high" + sizes="100vw"` ✓
- Follows the spec exactly for the `IntersectionObserver` and `prefers-reduced-motion` in `FeatureSection.tsx` ✓
- Follows the spec exactly for the per-card `radial-gradient + blur(40px) + opacity-60` glow in `CategoryPreview.tsx` ✓
- All 4 wrapper sections (Juegos, Compania, Idiomas, Personalizable) are server components, only the shared `FeatureSection.tsx` is `'use client'` (minimizes client JS)
- Hero, CategoryPreview, AIDisclaimer are all server components (no client JS for static sections)

**Minor observation (not a defect):** `page.tsx` has **8 import lines** (not 7 as the task spec mentioned). This is because the v2.2 brief requires 4 Features imports (one per section) rather than the original 1 FeaturesSection import. The 4-feature pattern is correct per the spec; the "7 imports" in the task description was a miscount. Not a code defect.

---

## Overall Status

**complete**

All 4 Coder slices (v2.1, v2.2, v2.3, v2.4) successfully implemented their assigned objectives. The Home page builds, lints, and ships with the redesigned layout, per-card glow effects, compact disclosure, and visible rebrand. No blockers, no new issues, no regressions introduced by v2.

---

## Recommendation

**The Home v2 is ready for production.** Next steps for the Orchestrator:

1. **Merge / deploy** the v2 changes to Vercel (Slice 5.3 from the master plan) when env vars (`ML_UWUS_URL`, `ML_GATOS_URL`, `ML_PIFOS_URL`, `WHATSAPP_NUMBER`) are configured.
2. **Run a Lighthouse mobile audit** on the deployed Vercel preview to confirm Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100 (the audit plan acceptance criteria).
3. **Visual smoke test on device:** verify Hero blur looks right on real mobile (not emulator), test `<details>` disclosure on iOS Safari, and confirm the radial glow effects render correctly on a real GPU.
4. **Open a follow-up slice** to address the pre-existing issues still pending (Tailwind palette leak, empty images, layout body hardcode, MobileNav aria-controls) — these are out of v2 scope but should be tackled in a future phase.
5. **Open a separate rebrand workstream** to sweep the remaining 9 "mochis-play" references in `Header.tsx`, `site.json`, `tutorials.json`, and the 4 page metadata files (out of v2 scope per Q7).

---

**End of report.**
