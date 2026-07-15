# Audit Report — Brand References for Rebranding

**Date:** 2026-07-12
**Reviewer:** reviewer (subagent)
**Scope:** Complete audit of "mochis-play" and "uwus" / "Uwus" references across the codebase
**Goal:** Prepare for rebranding to "mochis" (and possibly renaming "uwus" category)

---

## Executive Summary

A total of **~140 brand/category references** were found across **~67 files** (production code + docs + orchestration). The brand "mochis-play" appears in user-facing copy, SEO metadata, env vars, design tokens, file paths, and code identifiers. The category "uwus" appears as a structural identifier in 3 distinct ways: (1) data id `id: "uwus"` in `products.json`, (2) TypeScript type literal `'uwus' | 'gatos' | 'pifos' | 'default'` in `Badge`/`ProductCard`, and (3) design tokens `--color-category-uwus*`.

**Key findings:**

- A **partial rebrand is already in progress**: `TiendaClient.tsx:32` already shows `id: 'uwus', label: 'Mochis'` (id still "uwus", label already changed), and `README.md:36` already lists "Mochis" as the category name. This indicates the user has been migrating the category label gradually but never completed a sweep.
- The most **user-visible** brand references are concentrated in 5 page files (`page.tsx` x5), 1 layout file (`Header.tsx:54`), and 2 data files (`site.json`, `tutorials.json`).
- The most **technically risky** references are: env var names (`ML_UWUS_URL`), design tokens (`--color-category-uwus*`), the category id in `products.json` (a schema/contract used by `purchase.ts`, `ProductCard.tsx`, `Badge.tsx`, `FeaturesSection.tsx`, `TiendaClient.tsx`, `page.tsx`), and tracking IDs (`home_preview_uwus`, `home_category_uwus`).
- The brand URL `https://mochis-play.vercel.app` is referenced in **3 public files** (`site.json`, `llm.txt`, `robots.txt`) and is a hard production contract — defer until user confirms the production domain (`mochisplay.cl` per prior statement).
- Orchestration documents contain **~100 historical references** spread across briefs, plans, handoffs, prompts, and reports. These are **historical records** and need not be edited for runtime correctness; updating them is optional for documentation hygiene.

**Scope estimate:** Mechanical string replacement can be done in **~20 production files** plus documentation updates. Identifier changes (Badge variant type, env vars) require **~5 code changes**. File path renames (`public/images/products/uwus/` → `public/images/products/mochis/`) are a **deferred concern** because the directory is currently empty (no images shipped yet) — mechanical change is safe now.

---

## Reference Inventory

### 1. Production Code (TypeScript / TSX / CSS / JSON)

| File | Line | Reference | Type | Priority | Decision Needed? |
|------|------|-----------|------|----------|------------------|
| `src/data/site.json` | 3 | `"name": "mochis-play"` | BRAND_NAME_VISIBLE / BRAND_NAME_META | high | no |
| `src/data/site.json` | 5 | `"url": "https://mochis-play.vercel.app"` | BRAND_NAME_URL | medium | **YES** (mochisplay.cl pending) |
| `src/data/site.json` | 14 | `"mochis-play"` (in keywords array) | BRAND_NAME_META | high | no |
| `src/data/site.json` | 21 | `"Los peluches mochis-play utilizan..."` (disclaimer full) | BRAND_NAME_VISIBLE | high | no |
| `src/data/site.json` | 24 | `"https://instagram.com/mochisplay"` | (social handle, not brand) | n/a | no — leave as is |
| `src/data/site.json` | 25 | `"https://tiktok.com/@mochisplay"` | (social handle) | n/a | no — leave as is |
| `src/data/site.json` | 26 | `"https://youtube.com/@mochisplay"` | (social handle) | n/a | no — leave as is |
| `src/data/site.json` | 29 | `"email": "hola@mochis-play.com"` | BRAND_NAME_URL (email) | high | **YES** (user has new email?) |
| `src/data/products.json` | 4 | `"id": "uwus"` | BRAND_NAME_CATEGORY_ID | high | **YES** (rename target) |
| `src/data/products.json` | 5 | `"name": "Uwus"` | BRAND_NAME_VISIBLE (category) | high | **YES** (rename target) |
| `src/data/products.json` | 9 | `"ml_env_var": "ML_UWUS_URL"` | BRAND_NAME_ENV (reference) | medium | **YES** (rename env var?) |
| `src/data/products.json` | 15 | `"/images/products/uwus/mimi.webp"` | BRAND_NAME_FILE_PATH | medium | **YES** (rename folder?) |
| `src/data/products.json` | 23 | `"/images/products/uwus/duoduo.webp"` | BRAND_NAME_FILE_PATH | medium | **YES** |
| `src/data/products.json` | 31 | `"/images/products/uwus/paopao.webp"` | BRAND_NAME_FILE_PATH | medium | **YES** |
| `src/data/products.json` | 39 | `"/images/products/uwus/yuyu.webp"` | BRAND_NAME_FILE_PATH | medium | **YES** |
| `src/data/products.json` | 47 | `"/images/products/uwus/nana.webp"` | BRAND_NAME_FILE_PATH | medium | **YES** |
| `src/data/tutorials.json` | 6 | `"...tu peluche mochis-play por primera vez."` | BRAND_NAME_VISIBLE | high | no |
| `src/app/page.tsx` | 8 | `const uwusProduct = categories[0].products[0]; // mimi` | BRAND_NAME_IDENTIFIER | low | optional |
| `src/app/page.tsx` | 14 | `product: uwusProduct,` | BRAND_NAME_IDENTIFIER | low | optional |
| `src/app/page.tsx` | 15 | `badgeVariant: 'uwus' as const,` | BRAND_NAME_CATEGORY_ID | high | **YES** |
| `src/app/page.tsx` | 16 | `badgeLabel: 'Uwus',` | BRAND_NAME_VISIBLE (category) | high | **YES** |
| `src/app/page.tsx` | 17 | `cardTitle: uwusProduct.name as string,` | BRAND_NAME_IDENTIFIER | low | optional |
| `src/app/page.tsx` | 18 | `trackingId: 'home_preview_uwus',` | BRAND_NAME_TRACKING | medium | **YES** |
| `src/app/page.tsx` | 19 | `buttonLabel: 'home_category_uwus',` | BRAND_NAME_TRACKING | medium | **YES** |
| `src/app/page.tsx` | 20 | `buttonText: 'Ver Uwus',` | BRAND_NAME_VISIBLE (category) | high | **YES** |
| `src/app/page.tsx` | 51 | `mochis-play` (h1 text) | BRAND_NAME_VISIBLE | high | no |
| `src/app/tienda/page.tsx` | 9 | `'Catálogo de peluches inteligentes mochis-play con IA integrada.'` | BRAND_NAME_META | high | no |
| `src/app/tienda/TiendaClient.tsx` | 32 | `{ id: 'uwus', label: 'Mochis' }` | BRAND_NAME_CATEGORY_ID (label already updated) | high | **YES** (id inconsistent) |
| `src/app/tutoriales/page.tsx` | 8 | `'Videos tutoriales para configurar y personalizar tu peluche mochis-play...'` | BRAND_NAME_META | high | no |
| `src/app/tutoriales/page.tsx` | 25 | `'Aprende a configurar y personalizar tu peluche mochis-play...'` | BRAND_NAME_VISIBLE | high | no |
| `src/app/blog/page.tsx` | 8 | `'Artículos sobre bienestar digital... peluches inteligentes mochis-play.'` | BRAND_NAME_META | high | no |
| `src/app/contacto/page.tsx` | 8 | `'Contacta a mochis-play por email o WhatsApp...'` | BRAND_NAME_META | high | no |
| `src/components/layout/Header.tsx` | 54 | `mochis-play` (logo text) | BRAND_NAME_VISIBLE | high | no |
| `src/components/products/ProductCard.tsx` | 9 | `type BadgeVariant = 'uwus' \| 'gatos' \| 'pifos' \| 'default';` | BRAND_NAME_CATEGORY_ID (TS literal) | high | **YES** |
| `src/components/products/ProductCard.tsx` | 48 | `['uwus', 'gatos', 'pifos'].includes(category) ? category : 'default'` | BRAND_NAME_CATEGORY_ID (TS literal) | high | **YES** |
| `src/components/ui/Badge.tsx` | 1 | `type BadgeVariant = 'uwus' \| 'gatos' \| 'pifos' \| 'default';` | BRAND_NAME_CATEGORY_ID (TS literal) | high | **YES** |
| `src/components/ui/Badge.tsx` | 10 | `uwus: 'bg-[var(--color-category-uwus-bg)] text-[var(--color-category-uwus-text)]'` | BRAND_NAME_CATEGORY_ID + BRAND_NAME_TOKEN | high | **YES** |
| `src/components/home/FeaturesSection.tsx` | 61 | `iconBg: 'bg-[var(--color-category-uwus-bg)]'` | BRAND_NAME_TOKEN | high | **YES** |
| `src/components/home/FeaturesSection.tsx` | 62 | `iconColor: 'text-[var(--color-category-uwus-text)]'` | BRAND_NAME_TOKEN | high | **YES** |
| `src/lib/purchase.ts` | 8 | `uwus: 'ML_UWUS_URL',` | BRAND_NAME_CATEGORY_ID + BRAND_NAME_ENV | high | **YES** |
| `src/styles/tokens.css` | 2 | `mochis-play Design Tokens` (file comment) | BRAND_NAME_DOC | low | no |
| `src/styles/tokens.css` | 70 | `/* Uwus — soft rose */` (color primitive comment) | BRAND_NAME_TOKEN (comment) | low | **YES** |
| `src/styles/tokens.css` | 245 | `/* Uwus — soft rose (gender-neutral pink) */` | BRAND_NAME_TOKEN (comment) | low | **YES** |
| `src/styles/tokens.css` | 246 | `--color-category-uwus:        var(--color-rose-300);` | BRAND_NAME_TOKEN | high | **YES** |
| `src/styles/tokens.css` | 247 | `--color-category-uwus-bg:     var(--color-rose-50);` | BRAND_NAME_TOKEN | high | **YES** |
| `src/styles/tokens.css` | 248 | `--color-category-uwus-text:   var(--color-rose-500);` | BRAND_NAME_TOKEN | high | **YES** |
| `tailwind.config.js` | 58 | `uwus:   'var(--color-category-uwus)',` (accent colors) | BRAND_NAME_TOKEN | high | **YES** |
| `package.json` | 2 | `"name": "mochis-play",` | BRAND_NAME_CONFIG | low | optional |
| `package-lock.json` | 2, 8 | `"name": "mochis-play",` (auto-generated, regenerates on `npm install`) | BRAND_NAME_CONFIG | low | optional |
| `.env.example` | 2 | `ML_UWUS_URL=` | BRAND_NAME_ENV | high | **YES** |
| `.env.local` | 2 | `ML_UWUS_URL=https://mercadolibre.com/uwus` | BRAND_NAME_ENV (local-only) | high | **YES** (user action) |

### 2. Public Assets

| File | Line | Reference | Type | Priority | Decision Needed? |
|------|------|-----------|------|----------|------------------|
| `public/llm.txt` | 1 | `# mochis-play` (LLM SEO heading) | BRAND_NAME_VISIBLE | high | no |
| `public/llm.txt` | 7 | `### Uwus` (category heading) | BRAND_NAME_VISIBLE (category) | high | **YES** |
| `public/llm.txt` | 44-47 | `https://mochis-play.vercel.app/...` x4 | BRAND_NAME_URL | medium | **YES** (URL change) |
| `public/llm.txt` | 57 | `Uwus (grandes, con nombre)` | BRAND_NAME_VISIBLE (category) | high | **YES** |
| `public/robots.txt` | 4 | `Sitemap: https://mochis-play.vercel.app/sitemap.xml` | BRAND_NAME_URL | medium | **YES** (URL change) |

### 3. Documentation (root level, non-orchestration)

| File | Line(s) | Reference | Type | Priority | Decision Needed? |
|------|---------|-----------|------|----------|------------------|
| `README.md` | 1 | `# mochis-play` | BRAND_NAME_VISIBLE | medium | no |
| `README.md` | 22 | `**mochis-play** vende peluches...` | BRAND_NAME_VISIBLE | medium | no |
| `README.md` | 36 | `**Mochis**` (category — already updated) | (already updated) | n/a | (clean) |
| `README.md` | 54 | `mochis-play/` (project tree) | BRAND_NAME_CONFIG | low | no |
| `README.md` | 108, 186, 189, 191, 198, 199, 223, 233, 247, 248, 258, 383, 467 | many `uwus` references in code examples | BRAND_NAME_DOC | low | **YES** (mirrors code state) |
| `README.md` | 304, 306 | `name`, `url` examples in `site.json` snippet | BRAND_NAME_DOC | low | no |
| `README.md` | 508 | `Privado - mochis-play © 2026` | BRAND_NAME_VISIBLE | medium | no |
| `AGENTS.md` | 1, 5, 31, 128, 300, 307 | `mochis-play` (project name + docs) | BRAND_NAME_DOC | low | no |
| `AGENTS.md` | 52, 91, 134, 150, 168, 285 | `Uwus` / `uwus` references in product catalog + env var + image path examples | BRAND_NAME_DOC | low | **YES** (mirrors code state) |
| `docs/image-specs.md` | 1 | `# Especificaciones de Imágenes - mochis-play` | BRAND_NAME_DOC | low | no |
| `docs/image-specs.md` | 8 | `├── uwus/` (folder spec) | BRAND_NAME_DOC | low | **YES** (mirrors path) |
| `docs/image-specs.md` | 57 | `**Uwus**: \`{nombre}.webp\`` (naming convention) | BRAND_NAME_DOC | low | **YES** |

### 4. Orchestration Documents (Agent-Orquest/)

The full list of orchestration files containing brand references is in the table below. These are **historical records** describing past work — they do not affect the running site. They should be updated for documentation hygiene, but updating is **optional and can be batched** after the production rebrand is complete.

| File | Brand refs | Uwus refs | Notes |
|------|-----------|-----------|-------|
| `briefs/brief-1.1-design-tokens.md` | 1 | 0 | Phase 1 brief (historical) |
| `briefs/brief-1.2-ui-components.md` | 1 | 0 | Phase 1 brief (historical) |
| `briefs/brief-1.3-layout.md` | 1 | 0 | Phase 1 brief (historical) |
| `briefs/brief-phase1.md` | 1 | 0 | Phase 1 brief (historical) |
| `briefs/brief-reviewer-phase0-audit.md` | 0 | 1 | Audit brief (historical) |
| `briefs/phase-3/brief-3.1-home.md` | 2 | 1 | Home brief — references `color-category-uwus` tokens |
| `briefs/phase-3/brief-3.2-tienda.md` | 1 | 0 | Tienda brief (historical) |
| `briefs/phase-3/brief-3.3-tutoriales.md` | 1 | 0 | Tutoriales brief (historical) |
| `briefs/phase-3/brief-3.4-blog.md` | 1 | 0 | Blog brief (historical) |
| `briefs/phase-3/brief-3.5-contacto.md` | 2 | 0 | Contacto brief (historical) |
| `briefs/phase-4/brief-4.1-sitemap.md` | 2 | 0 | Sitemap brief (historical) |
| `briefs/phase-4/brief-4.2-structured-data.md` | 1 | 0 | Structured data brief (historical) |
| `briefs/phase-5/brief-5.1-audit.md` | 1 | 0 | Audit brief (historical) |
| `briefs/phase-5/brief-5.2-fixes.md` | 1 | 0 | Fixes brief (historical) |
| `handoff-design-images.md` | 4 | 10 | Handoff doc — references `uwus/` paths and "Uwus" sections |
| `prompts/image-prompts-gemini-duckai.md` | 1 | 19 | Image generation prompts (filename strings, anatomy descriptions) |
| `prompts/image-prompts-redesign.md` | 2 | 20 | Image generation prompts (filename strings, anatomy descriptions) |
| `reports/audit-hero-missing-image.md` | 3 | 1 | Audit report (historical) |
| `reports/audit-home-current-state.md` | 2 | 4 | Audit report (historical) |
| `reports/report-fixes-from-audit.md` | 0 | 2 | Fixes report (historical) |
| `reports/report-phase1.md` | 0 | 2 | Phase 1 report (historical) |
| `slices/master-plan.md` | 2 | 2 | Master plan (historical record of architecture) |
| `slices/plan-fixes-from-audit.md` | 2 | 4 | Plan for fixes (historical) |
| `slices/plan-implementation.md` | 1 | 0 | Implementation plan (historical) |
| `slices/plan-phase3.md` | 1 | 2 | Phase 3 plan (historical) |
| `slices/plan-redesign-nocturnal-home.md` | 4 | 12 | Redesign plan with token references (historical) |
| `slices/slice-1.1-design-tokens.md` | 0 | 1 | Token slice (historical) |
| `slices/slice-1.3-card-badge.md` | 0 | 1 | Card/Badge slice (historical) |
| `WORKFLOW.md` | 2 | 0 | Workflow doc (historical) |

**Total orchestration references:** ~38 "mochis-play" + ~82 "uwus/Uwus" = **~120 references across 28 orchestration files**.

---

## Decision Items (need user input)

The following items require user confirmation before a rebrand plan can be finalized:

1. **URLs** — `site.json:5` currently has `https://mochis-play.vercel.app`. The user has previously stated they are getting `mochisplay.cl` as the production domain. **Decision needed:** What is the canonical production URL to use? Options:
   - `https://mochisplay.cl` (pending)
   - `https://mochis.cl`
   - `https://mochis.com` (may not be available)
   - Keep `https://mochis-play.vercel.app` as fallback
   This decision affects: `site.json:5`, `llm.txt:44-47`, `robots.txt:4`, and the JSON-LD output in production.

2. **Category rename target** — The "uwus" category (5 named plush: Mimi, Duoduo, Paopao, Yuyu, Nana) needs a new name. Per the user's stated intent ("uwu o uwus notos esto debe ser remplzado por mochis q es la nueva marca"), the user wants to use "mochis" for both the brand AND the category. This creates a **brand/category collision**. **Decision needed:** Should the category be:
   - (a) **"Mochis"** (matches user statement, creates brand/category overlap)
   - (b) **"Mochi"** (singular, gentler)
   - (c) **Different name** (e.g., "Peluches", "Peluche Principal", "Peluche Grande")
   - (d) **Keep "Uwus"** and only rebrand the site from "mochis-play" to "mochis"
   
   **Note:** `TiendaClient.tsx:32` already shows `label: 'Mochis'` — option (a) aligns with partial progress.

3. **Other categories** — Should "Gatitos" and "Pifos" also be renamed for consistency? **Decision needed:** Yes/no/optional.

4. **File paths** — `public/images/products/uwus/` directory currently exists but is empty. Should it be renamed to match the new category? **Decision needed:** Yes/no. (Safe to rename now because no images are committed; if "uwus" is renamed to "mochis", rename to `public/images/products/mochis/`).

5. **Env var names** — `ML_UWUS_URL` (referenced in `purchase.ts:8`, `products.json:9`, `.env.example:2`, `.env.local:2`). **Decision needed:** Should env var be renamed to match new category (e.g., `ML_MOCHIS_URL`)? This is a breaking change requiring the user to update env vars in Vercel dashboard.

6. **Package name** — `package.json:2` is `"name": "mochis-play"`. This affects npm scripts and Vercel project detection. **Decision needed:** Rename to `mochis`? (Low impact since the project is private; safe mechanical change.)

7. **Email address** — `site.json:29` is `hola@mochis-play.com`. **Decision needed:** Does the user own a `hola@mochis.cl` or `hola@mochisplay.cl` mailbox? If not, the current email is the production contact. If yes, the email is a hard production contract — must be confirmed before changes.

8. **Tracking event IDs** — `home_preview_uwus` and `home_category_uwus` are tracking labels. **Decision needed:** Should they be renamed to match the new category? Renaming creates a **breaking change** for any existing analytics dashboards — historical events with old IDs will not aggregate with new ones. Recommendation: rename for cleanliness if no historical data is in production yet; otherwise, version them.

9. **Design token name** — `--color-category-uwus*` (3 tokens in `tokens.css` + Tailwind `accent.uwus`). **Decision needed:** Rename to match new category (e.g., `--color-category-mochis*` + `accent.mochis`).

---

## Classification Summary

| Type | Count (occurrences) | Files affected |
|------|---------------------|----------------|
| BRAND_NAME_VISIBLE (user-facing text: h1, labels, descriptions, copy) | ~14 | 9 |
| BRAND_NAME_META (SEO metadata, JSON-LD, page titles, descriptions) | ~10 | 7 |
| BRAND_NAME_URL (URLs, email, domain) | ~10 | 4 |
| BRAND_NAME_CATEGORY_ID (data id, type literal, label, tracking id) | ~22 | 8 |
| BRAND_NAME_IDENTIFIER (variable names, comments) | ~6 | 2 |
| BRAND_NAME_FILE_PATH (image path strings) | 5 | 1 |
| BRAND_NAME_TOKEN (CSS variables, Tailwind tokens) | 4 | 2 |
| BRAND_NAME_TRACKING (event IDs/labels) | 2 | 1 |
| BRAND_NAME_ENV (env var names + references) | 5 | 4 |
| BRAND_NAME_CONFIG (package.json, vercel.json, project name) | 3 | 2 |
| BRAND_NAME_DOC (docs, briefs, handoffs, READMEs) | ~140 | ~30 (orchestration + root) |

**Note:** BRAND_NAME_DOC dominates the count (~140 in 28 orchestration files + ~25 in root README/AGENTS/docs). Production code is ~80 references in ~25 files.

---

## Files Affected (production code only)

- **Production TypeScript / TSX code:** 13 files
  - `src/app/page.tsx`, `src/app/tienda/page.tsx`, `src/app/tienda/TiendaClient.tsx`
  - `src/app/blog/page.tsx`, `src/app/contacto/page.tsx`, `src/app/tutoriales/page.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/home/FeaturesSection.tsx`
  - `src/components/products/ProductCard.tsx`
  - `src/components/ui/Badge.tsx`
  - `src/lib/purchase.ts`
- **Production CSS / Config:** 3 files
  - `src/styles/tokens.css`
  - `tailwind.config.js`
  - `package.json` (low priority)
- **Production JSON data:** 2 files
  - `src/data/site.json`
  - `src/data/products.json`
  - `src/data/tutorials.json`
- **Public assets:** 2 files
  - `public/llm.txt`
  - `public/robots.txt`
- **Env files (local + template):** 2 files
  - `.env.example`
  - `.env.local` (user must update)
- **Root documentation:** 3 files
  - `README.md`, `AGENTS.md`, `docs/image-specs.md`
- **Orchestration documents:** 28 files
  - See section 4 above

**Total files that may need changes (excluding orchestration):** **~26 production files**.
**Total files including orchestration:** **~55 files**.

---

## Orchestration Documents Affected

**Recommended approach:** Update orchestration documents **only for documentation hygiene** — they are historical records and do not affect runtime. Prioritize:

- **High-priority update (recommended):** `AGENTS.md` (root) — the file describes the current project state and is loaded by `opencode.json` as `instructions: ["AGENTS.md"]`. If left unchanged, future agents will be confused by the mismatch.
- **Medium-priority update (optional):** `README.md` — user-facing documentation, will be read by anyone visiting the repo.
- **Low-priority update (deferrable):** All `Agent-Orquest/docs/orchestration/briefs/`, `slices/`, `prompts/`, `reports/`, `WORKFLOW.md` — these are immutable historical records of past work. Their accuracy is less important than the project itself.
- **No update needed:** `package-lock.json` (auto-regenerates on `npm install`).

---

## Recommended Approach

### Phase A: Decisions First (block all coding work)

Gather user decisions on items 1-9 in the "Decision Items" section above. Specifically:

1. Production URL (`mochisplay.cl` confirmation)
2. Category name target ("Mochis" vs "Mochi" vs other)
3. Whether to rename other categories (Gatitos, Pifos)
4. Whether to rename file paths, env vars, package name

Without these decisions, mechanical edits could land in the wrong place.

### Phase B: Mechanical String Replacements (after decisions)

If user confirms "mochis" brand + "mochis" (or "Mochi") category:

1. **BRAND_NAME_VISIBLE / BRAND_NAME_META (copy + metadata):**
   - `src/data/site.json` — name, keywords, disclaimer (4 edits)
   - `src/data/tutorials.json` — description (1 edit)
   - `src/app/page.tsx` — h1 (1 edit) + category badge label + button text (2 edits)
   - `src/app/blog/page.tsx`, `contacto/page.tsx`, `tienda/page.tsx`, `tutoriales/page.tsx` — descriptions + visible copy (5 edits)
   - `src/components/layout/Header.tsx` — logo text (1 edit)
   - `public/llm.txt` — heading, section heading, footer (3 edits)
   - **Effort:** ~20 minutes

2. **BRAND_NAME_CATEGORY_ID (data id, type literal, label, tracking id):**
   - `src/data/products.json` — category `id`, `name`, `ml_env_var` (3 edits)
   - `src/app/page.tsx` — badgeVariant literal, badgeLabel, trackingId, buttonLabel (4 edits)
   - `src/app/tienda/TiendaClient.tsx` — `id: 'uwus'` → new id (1 edit)
   - `src/components/products/ProductCard.tsx` — BadgeVariant type + array literal (2 edits)
   - `src/components/ui/Badge.tsx` — BadgeVariant type + VARIANT_STYLES key (2 edits)
   - `src/lib/purchase.ts` — `ML_URL_MAP` key (1 edit)
   - **Effort:** ~20 minutes

3. **BRAND_NAME_TOKEN (CSS + Tailwind):**
   - `src/styles/tokens.css` — 3 token renames + 2 comments (5 edits)
   - `tailwind.config.js` — `accent.uwus` rename (1 edit)
   - `src/components/home/FeaturesSection.tsx` — 2 token references (2 edits)
   - `src/components/ui/Badge.tsx` — token references already touched in step 2 (no extra edit)
   - **Effort:** ~15 minutes

4. **BRAND_NAME_FILE_PATH (image paths):**
   - `src/data/products.json` — 5 image paths (5 edits)
   - **Optional:** `mv public/images/products/uwus/ public/images/products/{new_id}/` (1 shell op)
   - **Effort:** ~5 minutes (folder is empty, safe rename)

5. **BRAND_NAME_ENV (env vars):**
   - `.env.example` — rename `ML_UWUS_URL` (1 edit)
   - `.env.local` — user must rename and update value (1 user action)
   - `src/data/products.json` — `ml_env_var` field already updated in step 2
   - `src/lib/purchase.ts` — `ML_URL_MAP` value already updated in step 2
   - **Effort:** ~5 minutes (excluding user action)

6. **BRAND_NAME_CONFIG (package.json):**
   - `package.json:2` — `name: "mochis-play"` → `name: "mochis"` (1 edit)
   - `package-lock.json` will regenerate on next `npm install`
   - **Effort:** ~2 minutes

7. **BRAND_NAME_URL (production URL — DEFER):**
   - `src/data/site.json:5`, `public/llm.txt:44-47`, `public/robots.txt:4` — requires user to confirm production URL (do not change until confirmed)
   - **Effort:** ~5 minutes once URL confirmed

### Phase C: Documentation Hygiene (optional, post-rebrand)

- Update root `README.md` (replace brand string in ~12 spots, update `uwus` code examples)
- Update root `AGENTS.md` (replace brand string in ~6 spots, update `Uwus` references in catalog)
- Update `docs/image-specs.md` (rename folder spec)
- Update orchestration documents (28 files) — can be a separate "documentation sweep" plan

### Phase D: Verification

- Run `npm run build` to confirm no broken imports
- Run `npm run lint` to confirm no lint errors
- Manual smoke test of `/` and `/tienda` to confirm UI renders correctly
- Test the env var rename end-to-end (MercadoLibre button should still work)

---

## Risks

1. **SEO impact of URL change:** If `https://mochis-play.vercel.app` is changed to a new production URL, the sitemap, robots.txt, and JSON-LD will all reflect the new URL. This is fine for a new domain but **any existing backlinks or Google index entries to the old URL will break**. Mitigation: add 301 redirects from old URL to new in Vercel if the old domain is kept live. If the old `.vercel.app` is dropped entirely, SEO impact is zero (no existing rank).

2. **Breaking change to tracking IDs:** Renaming `home_preview_uwus` and `home_category_uwus` will create **separate event streams** in GA4 (old events vs new events). Mitigation: if no production data exists yet, safe to rename. If production data exists, add new IDs and keep old ones for historical continuity (deprecated).

3. **Breaking change to env var name:** `ML_UWUS_URL` rename requires updating the Vercel dashboard env var. If the user forgets, the MercadoLibre button will silently fall back to "MercadoLibre no disponible". Mitigation: include a migration checklist in the user's hand-off.

4. **Breaking change to product category id:** The id `"uwus"` flows through `purchase.ts`, `ProductCard.tsx`, `Badge.tsx`, `TiendaClient.tsx`, `page.tsx`. Missing one location will cause a silent badge fallback to "default" color. Mitigation: a `grep -r "uwus" src/` after the rename should return zero matches.

5. **Brand/category collision (if "mochis" is used for both):** The header logo will say "mochis" and the category badge will also say "mochis". This may cause user confusion in the Tienda page filter ("Mochis / Gatitos / Pifos" → "mochis / gatos / pifos" looks fine actually; collision only exists in copy). **Mitigation:** Confirm with the user before locking in the category name.

6. **Stale ImagePlaceholders in production:** Renaming `public/images/products/uwus/` to a new folder will not break anything (the folder is empty), but it requires also updating `products.json` image paths. Already in scope (BRAND_NAME_FILE_PATH).

7. **Hardcoded email in copy:** The `site.json:29` email is also referenced in `disclaimer.full` and `metadata` indirectly. Changing the email is straightforward but the user must own the new domain's mailbox.

---

## Appendix: Pre-existing Partial Rebrand Evidence

Two locations already contain the new brand/category labels but were never completed:

- `src/app/tienda/TiendaClient.tsx:32` — `{ id: 'uwus', label: 'Mochis' }` (id is still "uwus", label is already "Mochis")
- `README.md:36` — `| **Mochis** | 5 | Nombre propio (Mimi, Duoduo, Paopao, Yuyu, Nana) | Grande |` (category renamed in docs but not in code)

These are evidence that the rebrand is in-progress and a full sweep is needed to complete it.

---

## Files Read for This Audit

```
src/app/page.tsx
src/app/tienda/page.tsx
src/app/tienda/TiendaClient.tsx
src/app/blog/page.tsx
src/app/contacto/page.tsx
src/app/tutoriales/page.tsx
src/app/sitemap.ts
src/app/layout.tsx
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/home/FeaturesSection.tsx
src/components/products/ProductCard.tsx
src/components/products/BuyButtons.tsx
src/components/products/index.ts
src/components/ui/Badge.tsx
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/lib/analytics.tsx
src/lib/purchase.ts
src/lib/structured-data.tsx
src/lib/useTracking.ts
src/styles/tokens.css
src/data/site.json
src/data/products.json
src/data/tutorials.json
src/data/blog.json
src/data/navigation.ts
public/llm.txt
public/robots.txt
tailwind.config.js
next.config.js
vercel.json
opencode.json
package.json
package-lock.json
.env.example
.env.local
tsconfig.json
.gitignore
README.md
docs/image-specs.md
AGENTS.md (already loaded)
```

Orchestration files read indirectly via `grep`:
```
Agent-Orquest/docs/orchestration/briefs/brief-1.1-design-tokens.md
Agent-Orquest/docs/orchestration/briefs/brief-1.2-ui-components.md
Agent-Orquest/docs/orchestration/briefs/brief-1.3-layout.md
Agent-Orquest/docs/orchestration/briefs/brief-phase1.md
Agent-Orquest/docs/orchestration/briefs/brief-reviewer-phase0-audit.md
Agent-Orquest/docs/orchestration/briefs/phase-3/brief-3.1-home.md
Agent-Orquest/docs/orchestration/briefs/phase-3/brief-3.2-tienda.md
Agent-Orquest/docs/orchestration/briefs/phase-3/brief-3.3-tutoriales.md
Agent-Orquest/docs/orchestration/briefs/phase-3/brief-3.4-blog.md
Agent-Orquest/docs/orchestration/briefs/phase-3/brief-3.5-contacto.md
Agent-Orquest/docs/orchestration/briefs/phase-4/brief-4.1-sitemap.md
Agent-Orquest/docs/orchestration/briefs/phase-4/brief-4.2-structured-data.md
Agent-Orquest/docs/orchestration/briefs/phase-5/brief-5.1-audit.md
Agent-Orquest/docs/orchestration/briefs/phase-5/brief-5.2-fixes.md
Agent-Orquest/docs/orchestration/handoff-design-images.md
Agent-Orquest/docs/orchestration/prompts/image-prompts-gemini-duckai.md
Agent-Orquest/docs/orchestration/prompts/image-prompts-redesign.md
Agent-Orquest/docs/orchestration/reports/audit-hero-missing-image.md
Agent-Orquest/docs/orchestration/reports/audit-home-current-state.md
Agent-Orquest/docs/orchestration/reports/report-fixes-from-audit.md
Agent-Orquest/docs/orchestration/reports/report-phase1.md
Agent-Orquest/docs/orchestration/slices/master-plan.md
Agent-Orquest/docs/orchestration/slices/plan-fixes-from-audit.md
Agent-Orquest/docs/orchestration/slices/plan-implementation.md
Agent-Orquest/docs/orchestration/slices/plan-phase3.md
Agent-Orquest/docs/orchestration/slices/plan-redesign-nocturnal-home.md
Agent-Orquest/docs/orchestration/slices/slice-1.1-design-tokens.md
Agent-Orquest/docs/orchestration/slices/slice-1.3-card-badge.md
Agent-Orquest/docs/orchestration/WORKFLOW.md
```
