# Brief: UI Refresh — Purple Backgrounds, Header/Footer Transitions & Typography Update

**Brief ID:** `brief-ui-refresh-purple-typography`  
**Status:** ready-for-coder  
**Created:** 2026-07-18  
**Owner role:** Coder  
**Scope:** Global UI refresh of the mochis-play landing page. Covers design tokens, typography, fonts, header/footer transitions, and background overlays. Does NOT add new pages or change page structure.  
**Depends on:** existing design system (Phase 1 completed in `src/styles/tokens.css`)

---

## 1. User Request (verbatim restatement)

> "We are working in a project README.md. Your task will be redesign the interface of this web app. The principal we are using in this is the purple `#783CA5` for background images. Actually the header and footer are gray — I like the contrast with gray but I would like a better transition between the background and the footer/header. Also I like the color `#C03D32` into buttons but the text in all page need be improved — the text and title are small and the letter type need be improved according to the page."

### Requested changes
1. Use **purple `#783CA5`** as the dominant overlay color for background images (Hero, Features, Category Preview, Shop).
2. Keep header/footer **gray** but add a **smoother visual transition** between the purple backgrounds and the gray header/footer.
3. Keep **primary buttons `#C03D32`** (coral) — no change to button color.
4. Improve **typography**: increase title/text sizes and choose a more appropriate font pairing for the brand.

---

## 2. Current State Snapshot

| Area | Current Value | Where |
|------|---------------|-------|
| Background overlays | Very dark violet (`violet-950/900`) gradients | `HeroSection.tsx`, `FeaturesShowcase.tsx`, `CategoryPreview.tsx`, `ShopBackground.tsx` |
| Header bg | `var(--color-bg-elevated)` = `#FFFFFF` / `stone-800` dark | `Header.tsx` |
| Footer bg | `var(--color-bg-subtle)` = `stone-100` / `stone-800` dark | `Footer.tsx` |
| Primary button | `#C03D32` (`--color-coral-700`) | `tokens.css`, `Button.tsx` |
| Display font | `Poppins` | `layout.tsx` |
| Body font | `Inter` | `layout.tsx` |
| Display size | 48px (`--font-size-5xl`) | `tokens.css` |
| H1 size | 48px (`--text-display`) | `HeroSection.tsx` |
| Body size | 16px (`--text-body`) | `tokens.css` |

### Related existing work
- A previous Home redesign plan exists at `Agent-Orquest/docs/orchestration/slices/plan-home-redesign-v2.md` and `spec-home-nocturnal-design.md`. That plan addressed layout changes (blurred hero, stacked features). This brief is a **separate, later request** focused on **color palette refresh, transitions, and typography**. Do not remove the v2 layout; only update colors/fonts.

---

## 3. Design Decisions

### 3.1 Brand Purple `#783CA5`

Add a new primitive and semantic tokens so the purple can be referenced consistently. Update all background-image overlays to use this purple instead of the current dark violet.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-purple-500` | `#783CA5` | Primitive |
| `--color-brand-purple-600` | `#5E2E82` | Darker shade for gradients |
| `--color-brand-purple-700` | `#472262` | Deepest shade |
| `--color-hero-overlay` | `linear-gradient(180deg, rgba(120,60,165,0.92) 0%, rgba(120,60,165,0.78) 50%, rgba(71,34,98,0.92) 100%)` | Hero & Category Preview overlay |
| `--color-features-overlay` | `linear-gradient(180deg, rgba(94,46,130,0.90) 0%, rgba(120,60,165,0.75) 50%, rgba(94,46,130,0.90) 100%)` | Features slides overlay |
| `--color-shop-overlay` | `linear-gradient(180deg, rgba(71,34,98,0.88) 0%, rgba(120,60,165,0.72) 50%, rgba(71,34,98,0.88) 100%)` | Tienda background overlay |

**Rationale:** `#783CA5` is a warm, medium-saturated purple. White text on top passes WCAG AA when the overlay is ≥75% opaque. It matches the "cute but technological" brand and is gender-neutral.

### 3.2 Header / Footer Transition

Keep the gray surfaces, but insert a **soft gradient connector** at the boundaries so the purple backgrounds do not "cut" sharply into the gray.

| Location | Treatment | Implementation hint |
|----------|-----------|---------------------|
| **Header bottom edge** | A subtle bottom border/shadow that fades from gray into the brand purple. | Add a pseudo-element or a small div with `bg-gradient-to-b from-[var(--color-bg-elevated)] to-[rgba(120,60,165,0.25)]` and `h-2`. Or use `shadow-[0_4px_20px_-5px_rgba(120,60,165,0.25)]` on the header. |
| **Footer top edge** | A top gradient band that fades from brand purple into the gray footer. | Add a top border or pseudo-element with `bg-gradient-to-b from-[rgba(120,60,165,0.30)] to-[var(--color-bg-subtle)]` and `h-3`. |
| **Scroll behavior** | Header stays sticky and gains a slightly stronger shadow when scrolled. | Already implemented (`isScrolled` shadow). Keep it, but tint the shadow with the brand purple at low opacity. |

**Constraint:** The header and footer background colors themselves must remain gray (`--color-bg-elevated` and `--color-bg-subtle`). Only the **edges** change.

### 3.3 Typography Scale (larger)

Increase the semantic type scale to make titles and body text more prominent. Update the primitive `--font-size-*` values, then let the semantic tokens inherit.

| Token | Old | New | Notes |
|-------|-----|-----|-------|
| `--font-size-5xl` | 3rem (48px) | 3.75rem (60px) | Display / H1 |
| `--font-size-4xl` | 2.25rem (36px) | 2.75rem (44px) | Page H1s |
| `--font-size-3xl` | 1.875rem (30px) | 2.25rem (36px) | Section H2s |
| `--font-size-2xl` | 1.5rem (24px) | 1.875rem (30px) | Card titles |
| `--font-size-xl` | 1.25rem (20px) | 1.5rem (24px) | Small headings |
| `--font-size-lg` | 1.125rem (18px) | 1.25rem (20px) | Lead body |
| `--font-size-base` | 1rem (16px) | 1.125rem (18px) | Body |
| `--font-size-sm` | 0.875rem (14px) | 1rem (16px) | Captions, small text |

**Semantic token updates:**
- `--text-display`: 60px
- `--text-heading-xl`: 44px
- `--text-heading-lg`: 36px
- `--text-heading-md`: 30px
- `--text-heading-sm`: 24px
- `--text-body-lg`: 20px
- `--text-body`: 18px
- `--text-body-sm`: 16px

### 3.4 Font Pairing

Replace **Poppins** (display) with **Nunito** — a rounded, friendly, modern sans-serif that fits the plush-toy/kids-and-adults brand. Keep **Inter** for body text, or optionally use Nunito for both if simpler.

| Role | Font | Weights | Reason |
|------|------|---------|--------|
| Display / Headings | `Nunito` | 600, 700, 800 | Rounded terminals, warm, playful but legible. |
| Body | `Inter` | 400, 500, 600 | Keep for maximum readability. |

**Fallback stack:** `'Nunito', system-ui, sans-serif` for display; `'Inter', system-ui, sans-serif` for body.

---

## 4. Files to Modify

| File | Changes |
|------|---------|
| `src/styles/tokens.css` | Add purple primitives + semantic overlay tokens; update typography primitive sizes; update semantic `--text-*` tokens. |
| `src/app/globals.css` | Ensure `h1-h6` use new display font; no hardcoded font sizes. |
| `src/app/layout.tsx` | Replace `Poppins` import with `Nunito`; update `weight` array and CSS variable. Keep `Inter`. |
| `tailwind.config.js` | Font-size map will automatically pick up new token values; verify no hardcoded rem values. |
| `src/components/layout/Header.tsx` | Add purple-tinted bottom transition (gradient/shadow); keep gray bg. |
| `src/components/layout/Footer.tsx` | Add purple-tinted top transition (gradient band); keep gray bg. |
| `src/components/home/HeroSection.tsx` | Replace violet overlay with brand-purple overlay token; keep blur + vignette. |
| `src/components/home/FeaturesShowcase.tsx` | Update slide overlays to use brand purple; adjust fade gradients if needed. |
| `src/components/home/CategoryPreview.tsx` | Replace violet overlay with brand-purple overlay token; update fade gradients. |
| `src/app/tienda/ShopBackground.tsx` | Replace violet overlay with brand-purple shop overlay token. |

**Out of scope:**
- Do NOT change page layouts, components, or content.
- Do NOT change Button colors or variants.
- Do NOT change tracking events.
- Do NOT add/remove sections.

---

## 5. Detailed Implementation Notes

### 5.1 `src/styles/tokens.css`

1. Add primitive purples after the existing violet primitives:
   ```css
   --color-brand-purple-500: #783CA5;
   --color-brand-purple-600: #5E2E82;
   --color-brand-purple-700: #472262;
   ```

2. Add semantic overlay tokens in the semantic section:
   ```css
   --color-hero-overlay: linear-gradient(180deg, rgba(120,60,165,0.92) 0%, rgba(120,60,165,0.78) 50%, rgba(71,34,98,0.92) 100%);
   --color-features-overlay: linear-gradient(180deg, rgba(94,46,130,0.90) 0%, rgba(120,60,165,0.75) 50%, rgba(94,46,130,0.90) 100%);
   --color-shop-overlay: linear-gradient(180deg, rgba(71,34,98,0.88) 0%, rgba(120,60,165,0.72) 50%, rgba(71,34,98,0.88) 100%);
   --color-purple-glow: rgba(120, 60, 165, 0.25);
   ```

3. Update typography primitives (see §3.3).
4. Update semantic typography tokens to point to the new sizes.

### 5.2 `src/app/layout.tsx`

Replace the `Poppins` import block with `Nunito`:

```tsx
import { Inter, Nunito } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});
```

Update the `<html>` className to use `nunito.variable`. Update `globals.css` `--font-family-display` to `var(--font-nunito)`.

### 5.3 `src/app/globals.css`

Update display font variable:
```css
--font-family-display: var(--font-nunito), 'Nunito', system-ui, sans-serif;
```

Keep body font as Inter.

### 5.4 `src/components/layout/Header.tsx`

Add a bottom gradient transition. Example approach (choose one):

**Option A — gradient border pseudo-element:**
```tsx
<header className="... relative">
  <div
    aria-hidden="true"
    className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-b from-[var(--color-bg-elevated)] to-[rgba(120,60,165,0.25)]"
  />
  {/* existing content */}
</header>
```

**Option B — purple-tinted shadow on scroll:**
Update `isScrolled` shadow to something like:
```tsx
isScrolled ? 'shadow-[0_8px_30px_-10px_rgba(120,60,165,0.30)]' : 'shadow-none'
```

**Recommendation:** use **Option A** for the transition, and **Option B** only if the gradient band feels too strong.

### 5.5 `src/components/layout/Footer.tsx`

Add a top gradient band before the main footer content:
```tsx
<footer className="... relative">
  <div
    aria-hidden="true"
    className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[rgba(120,60,165,0.30)] to-transparent"
  />
  <div className="relative pt-12 ...">{/* existing content */}</div>
</footer>
```

Because the footer sits on the light/gray page body, the gradient should be subtle. In dark mode it can be slightly more visible.

### 5.6 Background components (`HeroSection`, `FeaturesShowcase`, `CategoryPreview`, `ShopBackground`)

Replace occurrences of `from-violet-950/... via-violet-900/...` with the new brand-purple overlay tokens. Keep:
- The blurred `<Image>` with `filter: blur()` and `scale(1.1)`.
- The radial vignette for text legibility.
- The top/bottom fade gradients that blend between sections.
- `aria-hidden="true"` and decorative `alt=""`.

For Tailwind `bg-gradient-to-b` classes, you can either:
- Use inline `style={{ background: 'var(--color-hero-overlay)' }}`, or
- Replace the Tailwind gradient classes with a custom utility class that references the token.

**Recommended:** use `style={{ background: 'var(--color-hero-overlay)' }}` for the main overlay, because it is a complex gradient and easier to maintain in CSS tokens.

### 5.7 `tailwind.config.js`

No changes required if font sizes are fully token-driven. Verify the `fontSize` extension still maps to `var(--font-size-*)` and the new sizes flow through automatically.

---

## 6. Accessibility & Contrast Checks

| Combination | Target Ratio | Verification |
|-------------|--------------|--------------|
| White text on brand-purple overlay (≥78% opacity) | ≥4.5:1 | `#783CA5` on white is ~5.3:1; with 78%+ overlay opacity, white text over it passes AA. |
| Body text (`--color-text`) on `--color-bg` | ≥4.5:1 | Already passes; no text/bg colors change. |
| Primary button `#C03D32` on white | ≥4.5:1 | Already passes. |
| Header/footer gradient transition | N/A (decorative) | Mark with `aria-hidden="true"`. |

If any overlay opacity feels too light and text contrast drops, increase the opacity of the darkest gradient stop by 5–10%.

---

## 7. Acceptance Criteria

- [ ] `npm run build` passes with no errors.
- [ ] `npm run lint` passes with no errors.
- [ ] New primitive `--color-brand-purple-500` exists and equals `#783CA5`.
- [ ] Hero, Features, Category Preview, and Shop backgrounds visibly use the brand purple instead of dark violet.
- [ ] Header has a visible purple-tinted transition at its bottom edge.
- [ ] Footer has a visible purple-tinted transition at its top edge.
- [ ] Header and footer background colors remain gray (do not turn purple).
- [ ] Buttons still use `#C03D32` for primary variant.
- [ ] `Nunito` is loaded and applied to all headings (`h1-h6`).
- [ ] Body text is `Inter` (or Nunito if you chose a single font).
- [ ] Display/heading font sizes are visibly larger than before (display ≥56px, H1 ≥44px, H2 ≥36px).
- [ ] Body text is at least 18px (`--text-body`).
- [ ] No layout breakage on mobile (375px), tablet (768px), or desktop (1280px).
- [ ] WCAG AA contrast is maintained on all text/background combinations.
- [ ] `prefers-reduced-motion` is still respected (no new animations introduced).

---

## 8. Verification Commands

```bash
# Build & lint
npm run build
npm run lint

# Token checks
grep -n "color-brand-purple-500" src/styles/tokens.css
grep -n "font-size-5xl\|font-size-4xl\|font-size-3xl" src/styles/tokens.css
grep -n "Nunito" src/app/layout.tsx

# Overlay usage checks
grep -n "color-hero-overlay\|color-features-overlay\|color-shop-overlay" src/components/home/*.tsx src/app/tienda/ShopBackground.tsx src/styles/tokens.css

# Button color unchanged
grep -n "color-primary" src/components/ui/Button.tsx

# Header/footer transition checks
grep -n "from-\[rgba(120,60,165\|from-\[var(--color-bg-elevated)\|to-\[rgba(120,60,165" src/components/layout/Header.tsx src/components/layout/Footer.tsx
```

---

## 9. Risks & Stop Rules

| Risk | Mitigation | Stop rule |
|------|------------|-----------|
| White text on purple overlay fails contrast if opacity is too low | Increase overlay opacity in tokens | Stop if any critical text combo drops below 4.5:1 |
| Header/footer gradient feels too strong | Reduce opacity to 15–20% | Stop if user rejects the transition treatment |
| Larger fonts break layouts or cause overflow | Test all breakpoints | Stop if horizontal overflow appears at any breakpoint |
| Nunito missing weights causes visual fallback | Import all needed weights | Stop if headings render with fallback font |

---

## 10. Notes for Coder

- This brief is intentionally focused: **colors, transitions, typography, font**. Do not redesign layouts or components.
- The existing Home v2 layout (blurred hero, stacked features, CategoryPreview component, AIDisclaimer) stays. Only its colors/fonts change.
- All values should reference design tokens; avoid hardcoding rem/hex values in components except where absolutely necessary.
- If a conflict arises with the older `spec-home-nocturnal-design.md`, this brief takes precedence because it reflects the latest user request.

---

**End of brief.**
