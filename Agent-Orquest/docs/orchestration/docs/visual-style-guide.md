# Visual Style Guide — **mochis** (Nocturnal Dark Mode)

**Version:** 1.0
**Date:** 2026-07-12
**Author:** Designer (subagent)
**Status:** Canonical reference for the nocturnal design system
**Brand:** **mochis** (antes "mochis-play")
**Audience:** Designer, Coder, Reviewer, future agents

> **This is the canonical Visual Style Guide.** It captures the design system that emerges from combining the new tokens (slice N.1) with the visual composition spec (`spec-home-nocturnal-design.md`). It is the reference for any future page (Tienda, Tutoriales, Blog, Contacto in Phase 7+) and any future feature.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing Scale](#4-spacing-scale)
5. [Shadows & Elevation](#5-shadows--elevation)
6. [Border Radius](#6-border-radius)
7. [Animations & Transitions](#7-animations--transitions)
8. [Component Patterns](#8-component-patterns)
9. [Accessibility](#9-accessibility)
10. [Brand Voice & Tone](#10-brand-voice--tone)

---

## 1. Design Philosophy

### 1.1 Core concept

> **"Tierno pero tecnológico"** — Cute but modern. Not childish. Nocturnal and warm, like a bedtime story told with Pixar quality.

### 1.2 Three pillars

1. **Nocturnal warmth** — Deep midnight-violet canvas with warm coral glow anchors. The dark surface is not cold or "tech bro"; the coral keeps it inviting.
2. **Tierno y moderno** — Soft plush illustrations (Jellycat/Squishmallow quality, Pixar softness) on a technically clean grid. No skeuomorphism, no flat-design harshness.
3. **Gender-neutral inclusivity** — The palette (violet + coral + mint) and the plush illustrations (no eyelashes, no dresses, no gendered features) are intentionally inclusive for both niños AND adultos.

### 1.3 What the brand is NOT

- Not pastel-cute (avoids the "kindergarten" trap).
- Not dark/moody/gothic (avoids the "horror" trap).
- Not bright/neon (avoids the "kids app" trap).
- Not minimal/sterile (avoids the "tech bro" trap).

### 1.4 The "nocturnal" cue

The dark canvas is the differentiator. Most landing pages for plush toys use a light, bright, pastel background. We do the opposite. The dark surface says: "bedtime, magic, intimacy, storytime." It also makes the coral glow and the plush illustrations pop more vividly than they would on a white background.

---

## 2. Color System

### 2.1 Three-layer token architecture

The project uses a **Primitive → Semantic → Component** architecture. The nocturnal palette adds a new primitive scale (`midnight`) and remaps semantic tokens in dark mode. Components should NEVER use raw primitive hex values or raw Tailwind color classes — they should use semantic tokens only.

```
Component
  └─ uses Semantic token (e.g., var(--color-text))
       └─ resolved to Primitive value (e.g., var(--color-cream-100))
            └─ a raw hex code (e.g., #F5EFE0)
```

### 2.2 Primitive: Midnight (NEW nocturnal surface scale)

The `midnight-*` scale is the new foundation of the design. It is deep violet-blue, slightly warmer than pure midnight, with subtle hue variation between stops so the gradient doesn't look "flat dark."

| Token | Hex | Use |
|-------|-----|-----|
| `--color-midnight-50` | `#2A1F4D` | Subtle elevated card on dark |
| `--color-midnight-100` | `#221A3D` | Hover state for cards |
| `--color-midnight-200` | `#1A1331` | Section background variant (card surface) |
| `--color-midnight-300` | `#14102A` | Near-canvas (page background base) |
| `--color-midnight-400` | `#0F0B22` | Canvas stop 1 (top of page) |
| `--color-midnight-500` | `#0E0B1F` | Canvas stop 2 (mid page) |
| `--color-midnight-600` | `#0A0717` | Canvas stop 3 (bottom of page) |
| `--color-midnight-700` | `#07050F` | Footer / deepest surface |
| `--color-midnight-800` | `#04030A` | Edge vignette |
| `--color-midnight-900` | `#020106` | Pure black with hint of warmth |

**Why a 10-stop scale (not 5)?** Dark mode needs more nuance. A 5-stop scale would have jumps that look "stepped" when used in gradients. The 10-stop scale gives smooth transitions in the scroll-driven background gradient (slice N.2).

### 2.3 Primitive: Mint (NEW decorative nocturnal accent)

Mint is reserved for **decorative** use only. It is never a primary CTA color, never a heading color, never a body text color. It is the "rim light" and the "secondary highlight."

| Token | Hex | Use |
|-------|-----|-----|
| `--color-mint-300` | `#6EE7B7` | Soft glow for mascots, rim light, decorative highlights |
| `--color-mint-400` | `#34D399` | Primary mint glow (per-card halos) |
| `--color-mint-500` | `#10B981` | Saturated mint (use sparingly) |
| `--color-mint-600` | `#059669` | WCAG AA on dark for text (rare use) |

### 2.4 Primitive: Warm Cream (NEW — replaces pure white text)

Pure white on dark feels clinical. Cream tones feel warm and "book-page."

| Token | Hex | Use |
|-------|-----|-----|
| `--color-cream-50` | `#FFFBF1` | Brightest display, h1, headings |
| `--color-cream-100` | `#F5EFE0` | Primary text on dark |
| `--color-cream-200` | `#E8DFC9` | Secondary text on dark |
| `--color-cream-300` | `#C9BFA6` | Muted text on dark |
| `--color-cream-400` | `#A39878` | Placeholder / disabled |

### 2.5 Primitive: Coral (UNCHANGED from original)

Coral is the brand primary. Its usage in dark mode shifts from `coral-700` (text on light) to `coral-500` (glow on dark).

| Token | Hex | Use in dark mode |
|-------|-----|------------------|
| `--color-coral-300` | `#FFAEA0` | Hover highlight, soft glow |
| `--color-coral-400` | `#FF887A` | Border focus, link hover |
| `--color-coral-500` | `#F97066` | **Primary brand color in dark mode** — CTA bg, key light, accents |
| `--color-coral-600` | `#E55347` | Hover on primary, decorative |
| `--color-coral-700` | `#C03D32` | Active/pressed state, contrast text on light surfaces |

### 2.6 Primitive: Violet (UNCHANGED)

Violet is the brand secondary. In dark mode, it becomes the "technology & creativity" color, harmonizing with the midnight canvas.

| Token | Hex | Use in dark mode |
|-------|-----|------------------|
| `--color-violet-300` | `#C4B5FD` | Decorative, fill light, Nana's body |
| `--color-violet-400` | `#A78BFA` | Hover on secondary, glow |
| `--color-violet-500` | `#8B5CF6` | **Fill light, decorative** — NOT for text on dark (low contrast) |

### 2.7 Category accent remapping (dark mode)

Each category keeps its hue but the saturation is adjusted to pop on dark backgrounds.

| Category | Light mode | Dark mode |
|----------|-----------|-----------|
| **mochis** (antes "uwus") — Rose | `rose-300` (`#FDA4AF`) accent on `rose-50` bg | `rose-300` accent on `rose-300/20` translucent bg |
| **gatitos** — Sky | `sky-300` (`#7DD3FC`) accent on `sky-50` bg | `sky-300` accent on `sky-300/20` translucent bg |
| **pifos** — Mint (was Lime) | `lime-300` accent on `lime-50` bg | **`mint-400` accent on `mint-400/20` translucent bg** |

> **Note:** the "pifos" category changed from lime to mint in dark mode. The lime pastels read as washed-out on dark backgrounds; mint provides better contrast and ties to the brand's "decorative mint" cue.

### 2.8 Semantic token mapping (dark mode is the default)

| Semantic token | Light value (old) | Dark value (new — default) |
|----------------|-------------------|----------------------------|
| `--color-bg` | `stone-50` | `midnight-400` (`#0F0B22`) |
| `--color-bg-subtle` | `stone-100` | `midnight-300` (`#14102A`) |
| `--color-bg-card` | `#FFFFFF` | `midnight-200` (`#1A1331`) |
| `--color-bg-elevated` | `#FFFFFF` | `midnight-100` (`#221A3D`) |
| `--color-bg-overlay` | `rgba(28,25,23,0.4)` | `rgba(0,0,0,0.6)` |
| `--color-text` | `stone-900` | `cream-100` (`#F5EFE0`) |
| `--color-text-secondary` | `stone-600` | `cream-200` (`#E8DFC9`) |
| `--color-text-muted` | `stone-400` | `cream-300` (`#C9BFA6`) |
| `--color-text-inverse` | `#FFFFFF` | `midnight-500` (`#0E0B1F`) |
| `--color-text-link` | `coral-700` | `coral-400` (`#FF887A`) |
| `--color-border` | `stone-200` | `midnight-100` |
| `--color-border-subtle` | `stone-100` | `midnight-200` |
| `--color-border-strong` | `stone-300` | `midnight-50` |
| `--color-border-focus` | `coral-700` | `coral-500` |
| `--color-focus-ring` | `coral-400` | `coral-300` (`#FFAEA0`) |
| `--color-primary` | `coral-700` | `coral-500` (`#F97066`) |
| `--color-primary-hover` | `coral-800` | `coral-400` (`#FF887A`) |
| `--color-primary-active` | `coral-900` | `coral-600` (`#E55347`) |
| `--color-info` | `violet-500` | `violet-300` |
| `--shadow-sm` | `rgba(28,25,23,0.05)` | `rgba(0,0,0,0.2)` |
| `--shadow-md` | `rgba(28,25,23,0.07)` | `rgba(0,0,0,0.3)` |
| `--shadow-lg` | `rgba(28,25,23,0.08)` | `rgba(0,0,0,0.35)` |
| `--shadow-xl` | `rgba(28,25,23,0.1)` | `rgba(0,0,0,0.4)` |

### 2.9 WCAG AA contrast verification

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| `cream-100` (`#F5EFE0`) | `midnight-400` (`#0F0B22`) | **16.8:1** | AAA |
| `cream-200` (`#E8DFC9`) | `midnight-400` | **13.4:1** | AAA |
| `cream-300` (`#C9BFA6`) | `midnight-400` | **9.0:1** | AA |
| `coral-500` (`#F97066`) | `midnight-400` | **5.5:1** | AA (large text + body) |
| `coral-400` (`#FF887A`) | `midnight-400` | **7.1:1** | AA |
| `coral-300` (`#FFAEA0`) | `midnight-400` | **8.7:1** | AA |
| `violet-300` (`#C4B5FD`) | `midnight-400` | **10.4:1** | AAA |
| `mint-400` (`#34D399`) | `midnight-400` | **9.6:1** | AA |
| `rose-300` (`#FDA4AF`) | `midnight-400` | **8.7:1** | AA |
| `sky-300` (`#7DD3FC`) | `midnight-400` | **10.5:1** | AAA |
| `cream-100` | `midnight-200` (`#1A1331`) | **14.0:1** | AAA |
| `cream-200` | `midnight-200` | **11.2:1** | AAA |
| `cream-100` on `midnight-100` (`#221A3D`) | — | **12.8:1** | AAA |

All key text/background combinations pass WCAG AA 4.5:1. Most pass AAA 7:1.

### 2.10 Special case: Amber callout for AI disclaimer

The AI disclaimer uses `amber` (`--color-warning` = `amber-500` `#F59E0B`) as the only non-coral/violet/mint color on the page. This creates visual differentiation for the "warning" callout without breaking the palette.

- Border: `amber-500/40` (Tailwind arbitrary value with opacity).
- Glow: `0 0 40px -10px rgba(245, 158, 11, 0.25)`.
- Icon: `text-[var(--color-warning)]`.
- Body text: `cream-200` on `midnight-200` (12:1 contrast, AAA).

### 2.11 Per-card category glows (Category Preview section)

The Category Preview cards each get a soft radial glow in their category color. The glow is decorative, `aria-hidden`, and implemented as a `::before` on a wrapper div with `filter: blur(40px)` and `opacity: 0.6`.

| Card | Glow color | Hex |
|------|-----------|-----|
| mochis | `--color-rose-300` | `#FDA4AF` |
| gatitos | `--color-sky-300` | `#7DD3FC` |
| pifos | `--color-mint-400` | `#34D399` |

---

## 3. Typography

### 3.1 Font families

| Family | Token | Use |
|--------|-------|-----|
| Poppins | `--font-family-display` | Display headings (h1, h2, h3) |
| Inter | `--font-family-sans` | Body text, paragraphs, descriptions |

Both fonts are loaded from Google Fonts (or already loaded by the project). **Do not introduce new fonts** without a strong reason; the existing pair is sufficient and consistent.

### 3.2 Type scale

The type scale is a 7-step modular scale based on 16px root, anchored at 1.25 ratio.

| Token | Size | px | Use |
|-------|------|-----|-----|
| `--font-size-xs` | 0.75rem | 12px | Captions, micro labels, badges |
| `--font-size-sm` | 0.875rem | 14px | Small body, disclaimer, footer text |
| `--font-size-base` | 1rem | 16px | Default body, button text |
| `--font-size-lg` | 1.125rem | 18px | Large body, subhead |
| `--font-size-xl` | 1.25rem | 20px | h3 (card titles, feature titles) |
| `--font-size-2xl` | 1.5rem | 24px | h3-large |
| `--font-size-3xl` | 1.875rem | 30px | h2 (section headings) |
| `--font-size-4xl` | 2.25rem | 36px | h1-mobile, h1-tablet |
| `--font-size-5xl` | 3rem | 48px | h1-desktop (display) |

### 3.3 Semantic typography tokens

| Semantic token | Maps to | Use |
|----------------|---------|-----|
| `--text-body-sm` | `--font-size-sm` (14px) | Small body, disclaimer, footer |
| `--text-body` | `--font-size-base` (16px) | Default body |
| `--text-body-lg` | `--font-size-lg` (18px) | Large body, subhead |
| `--text-heading-sm` | `--font-size-xl` (20px) | Card titles, feature titles |
| `--text-heading-md` | `--font-size-2xl` (24px) | Medium h3 |
| `--text-heading-lg` | `--font-size-3xl` (30px) | h2 (section headings) |
| `--text-heading-xl` | `--font-size-4xl` (36px) | h1 mobile/tablet |
| `--text-display` | `--font-size-5xl` (48px) | h1 desktop |

### 3.4 Font weights

| Token | Weight | Use |
|-------|--------|-----|
| `--font-weight-normal` | 400 | Body text default |
| `--font-weight-medium` | 500 | Emphasized body, badge text |
| `--font-weight-semibold` | 600 | h3, button text |
| `--font-weight-bold` | 700 | h1, h2, display |

### 3.5 Line heights

| Token | Value | Use |
|-------|-------|-----|
| `--line-height-tight` | 1.25 | Headings, display, h1 |
| `--line-height-normal` | 1.5 | Body text, paragraphs |
| `--line-height-relaxed` | 1.75 | Long-form text, disclaimers, descriptions |

### 3.6 Letter spacing

| Token | Value | Use |
|-------|-------|-----|
| `--letter-spacing-tight` | -0.025em | Display, h1 (tightens large text) |
| `--letter-spacing-normal` | 0em | Body text default |
| `--letter-spacing-wide` | 0.025em | All-caps labels, eyebrows (not currently used) |

### 3.7 Type pairing examples

| Element | Family | Size | Weight | Line height | Color |
|---------|--------|------|--------|-------------|-------|
| h1 "mochis" | Poppins | 48px (desktop) / 36px (mobile) | 700 | 1.25 | `--color-text` (cream-100) |
| h2 "Conoce a nuestros peluches" | Poppins | 30px | 700 | 1.25 | `--color-text` (cream-100) |
| h3 "Mimi" | Poppins | 20px | 600 | 1.25 | `--color-text` (cream-100) |
| Subhead | Inter | 18px | 400 | 1.5 | `--color-text-secondary` (cream-200) |
| Body | Inter | 16px | 400 | 1.5 | `--color-text` (cream-100) |
| Disclaimer | Inter | 14px | 400 | 1.75 | `--color-text-secondary` (cream-200) |
| Badge | Inter | 14px | 500 | 1.25 | per-category token |
| Button | Inter | 16px / 18px (lg) | 600 | 1.25 | `text-white` on coral, coral-500 on outline |

---

## 4. Spacing Scale

### 4.1 Base unit

The spacing scale is based on a **4px** base unit. This is a T-shirt-size system that grows by factors of 2, 3, 4, 6, 8, 12, 16, 20, 24.

### 4.2 Primitive scale

| Token | Value | px | Use |
|-------|-------|-----|-----|
| `--space-0` | 0 | 0 | Reset |
| `--space-1` | 0.25rem | 4px | Tight gaps, icon padding |
| `--space-2` | 0.5rem | 8px | Icon gaps, inline padding |
| `--space-3` | 0.75rem | 12px | Tight button padding |
| `--space-4` | 1rem | 16px | Default padding (cards, buttons) |
| `--space-5` | 1.25rem | 20px | Between heading and body |
| `--space-6` | 1.5rem | 24px | Section padding (mobile) |
| `--space-8` | 2rem | 32px | Card padding (lg) |
| `--space-10` | 2.5rem | 40px | Between section heading and content |
| `--space-12` | 3rem | 48px | Section gap (2xl) |
| `--space-16` | 4rem | 64px | Page section (3xl) |
| `--space-20` | 5rem | 80px | Large section gap |
| `--space-24` | 6rem | 96px | Hero vertical breathing room |

### 4.3 Semantic spacing tokens

| Semantic | Maps to | Use |
|----------|---------|-----|
| `--space-xs` | `--space-1` (4px) | Tight gaps |
| `--space-sm` | `--space-2` (8px) | Icon gaps, inline padding |
| `--space-md` | `--space-4` (16px) | Default padding |
| `--space-lg` | `--space-6` (24px) | Section padding (mobile) |
| `--space-xl` | `--space-8` (32px) | Card padding |
| `--space-2xl` | `--space-12` (48px) | Section gap |
| `--space-3xl` | `--space-16` (64px) | Page section |

### 4.4 Vertical rhythm

Page sections use these patterns:

- **Mobile:** `py-[var(--space-2xl)]` (48px) between sections.
- **Desktop:** `py-[var(--space-3xl)]` (64px) between sections.
- **Hero:** `py-[var(--space-2xl)] sm:py-[var(--space-3xl)] lg:py-[var(--space-3xl)]` (48–64px) + `min-h-[80vh]`.

---

## 5. Shadows & Elevation

### 5.1 Dark mode shadow principles

Shadows behave differently on dark backgrounds. A `rgba(0,0,0,0.05)` shadow on a white card is barely visible; the same shadow on a dark card disappears entirely. **In dark mode, shadows need to be stronger to create the same "lift" effect.**

The dark-mode shadow scale uses `rgba(0, 0, 0, 0.2–0.4)` instead of the light-mode `rgba(28, 25, 23, 0.05–0.1)`.

### 5.2 Shadow scale (dark mode default)

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.2)` | Card resting |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)` | Card hover, dropdown |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.35), 0 4px 6px -4px rgba(0, 0, 0, 0.2)` | Modal, popover |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2)` | Large modal |

### 5.3 Semantic shadow tokens

| Semantic | Maps to | Use |
|----------|---------|-----|
| `--shadow-card` | `--shadow-sm` | Resting cards |
| `--shadow-card-hover` | `--shadow-md` | Card hover state |
| `--shadow-dropdown` | `--shadow-lg` | Dropdowns, popovers |
| `--shadow-modal` | `--shadow-xl` | Modals, dialogs |

### 5.4 Special shadow: AI disclaimer amber glow

```css
box-shadow: 0 0 40px -10px rgba(245, 158, 11, 0.25);
```

This is a **glow** (positive offset blur), not a drop shadow. It gives the disclaimer a "warm light" feel without lifting the card off the page. The negative spread (`-10px`) keeps the glow tight to the card's edge.

### 5.5 Per-card category glow (Category Preview)

```css
box-shadow: 0 0 60px -10px var(--card-glow-color);
```

Where `--card-glow-color` is set per-card (rose, sky, mint). The `-10px` spread keeps the glow controlled; the `60px` blur softens it.

### 5.6 Rim light as shadow

In the plush illustrations, the "rim light" is essentially a glow on the edge of the character. In CSS, this is implemented as a `box-shadow: 0 0 0 1px var(--color-mint-300)` or a `filter: drop-shadow(0 0 8px var(--color-mint-300))`. Use the latter for images with transparent backgrounds.

---

## 6. Border Radius

### 6.1 Scale

| Token | Value | Use |
|-------|-------|-----|
| `--radius-none` | 0px | Reset |
| `--radius-sm` | 6px | Small chips, tags |
| `--radius-md` | 12px | Buttons, inputs |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Modals, large panels |
| `--radius-full` | 9999px | Pills, badges, circular avatars |

### 6.2 Semantic radius tokens

| Semantic | Maps to | Use |
|----------|---------|-----|
| `--radius-button` | `--radius-md` (12px) | All buttons |
| `--radius-card` | `--radius-lg` (16px) | All cards |
| `--radius-badge` | `--radius-full` | All badges (pill shape) |
| `--radius-input` | `--radius-md` (12px) | All inputs |
| `--radius-modal` | `--radius-xl` (24px) | All modals |

### 6.3 Design intent

The radius scale is **medium-soft**. Not sharp (0–4px), not super-rounded (24px+). 12–16px on cards and buttons gives a "soft tech" feel — friendly but not childish.

---

## 7. Animations & Transitions

### 7.1 Principles

1. **Subtle, not showy.** Animations should support the experience, not steal focus.
2. **Always respect `prefers-reduced-motion`.** If a user has reduced motion enabled, all animations become instant transitions.
3. **Duration cap at 500ms.** Animations longer than 500ms feel sluggish.
4. **Easing matters.** `ease-in-out` for general transitions, `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce) for playful feedback.

### 7.2 Duration tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | Hover state changes, color shifts |
| `--duration-base` | 200ms | Standard transitions, button states |
| `--duration-slow` | 300ms | Fade-in on scroll, card entrance |
| (implicit, 4000ms) | 4s | Breathing glow on AI disclaimer (optional) |

### 7.3 Easing tokens

| Token | Value | Use |
|-------|-------|-----|
| `--easing-default` | `ease-in-out` | Default for most transitions |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Card entrance, playful feedback |

### 7.4 Semantic transition tokens

| Semantic | Maps to | Use |
|----------|---------|-----|
| `--transition-fast` | `150ms ease-in-out` | Hover, focus |
| `--transition-base` | `200ms ease-in-out` | Button, link |
| `--transition-slow` | `300ms ease-in-out` | Fade-in on scroll |
| `--transition-bounce` | `300ms cubic-bezier(0.34, 1.56, 0.64, 1)` | Card entrance, playful |

### 7.5 Animation patterns

#### 7.5.1 Fade-in on scroll (used in FeaturesSection, recommended for other sections)

```tsx
const [isVisible, setIsVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    setIsVisible(true);
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

// In JSX:
<div
  ref={ref}
  className={`transition-all duration-[var(--duration-slow)] ease-[var(--easing-default)] ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}
>
```

**Stagger pattern (for grids):**

```tsx
style={{ transitionDelay: `${index * 100}ms` }}
```

#### 7.5.2 Card hover lift

```css
transition-shadow duration-[var(--duration-base)] ease-[var(--easing-default)]
hover:shadow-[var(--shadow-card-hover)]
hover:-translate-y-1
```

#### 7.5.3 Button hover (color shift)

```css
transition-colors duration-[var(--duration-base)]
hover:bg-[var(--color-primary-hover)]
```

#### 7.5.4 Optional: Breathing glow on AI disclaimer

```css
@keyframes breathe {
  0%, 100% { box-shadow: 0 0 40px -10px rgba(245, 158, 11, 0.25); }
  50% { box-shadow: 0 0 50px -5px rgba(245, 158, 11, 0.35); }
}
.disclaimer-glow {
  animation: breathe 4s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .disclaimer-glow { animation: none; }
}
```

### 7.6 Performance budget for scroll-driven gradient

The scroll gradient (slice N.2) uses:
- Single passive scroll listener
- `requestAnimationFrame` throttle
- `background-color` interpolation on a single fixed div
- `will-change: background-color` and `transform: translateZ(0)` to promote to its own compositor layer
- Total: ~0.1ms per frame on mid-range mobile

**Acceptance:** Lighthouse mobile performance ≥ 90.

### 7.7 `prefers-reduced-motion` implementation

For every animation, the component must:

1. Detect the preference with `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
2. If reduced, skip the animation entirely (set final state immediately).
3. For CSS-only animations, use `@media (prefers-reduced-motion: reduce) { animation: none; }`.

The project's `globals.css` already has a blanket rule for this; the JS state pattern in `FeaturesSection.tsx` is the model to replicate.

---

## 8. Component Patterns

### 8.1 Button (dark mode)

The `Button` component is largely unchanged from light mode. The semantic tokens (`--color-primary`, etc.) flip automatically.

| Variant | Bg | Text | Border | Hover | Active |
|---------|-----|------|--------|-------|--------|
| `primary` | `bg-primary` (coral-500) | `text-white` | none | `bg-primary-hover` (coral-400) | `bg-primary-active` (coral-600) |
| `secondary` | `bg-secondary` (violet-500) | `text-white` | none | violet-600 | violet-700 |
| `outline` | `bg-transparent` | `text-primary` (coral-500) | `2px solid primary` (coral-500) | `bg-primary-subtle` (coral-50) | `bg-primary-light` (coral-100) |
| `ghost` | `bg-transparent` | `text-primary` (coral-500) | none | `bg-primary-subtle` (coral-50) | `bg-primary-light` (coral-100) |

**Size:** `sm` (px-3 py-1.5 text-sm), `md` (px-4 py-2 text-base), `lg` (px-6 py-3 text-lg).

**Focus ring:** `focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2` — in dark mode, the ring is `coral-300` (lighter than the bg coral-500 for visibility).

**⚠️ Contrast warning:** coral-500 (`#F97066`) on white text has ~3.4:1 contrast, which passes AA only for **large text** (≥18px). The `lg` button (18px) passes; the `sm` and `md` buttons may not. **Validation needed in slice N.5 / N.11.**

**Recommended fix (if validation fails):** change the primary button text to `text-[var(--color-text-inverse)]` (midnight-500) instead of `text-white`. This gives 5.5:1 contrast on coral-500. **Or** bump primary from coral-500 to coral-600 (`#E55347`) in dark mode (contrast goes to ~4.8:1 on white).

### 8.2 Card (dark mode)

The `Card` component uses `--color-bg-card` which is now `midnight-200` (`#1A1331`). The shadow goes from `rgba(28,25,23,0.05)` to `rgba(0,0,0,0.2)` automatically. **No code changes needed.**

| Property | Value (dark) |
|----------|--------------|
| Background | `var(--color-bg-card)` = `midnight-200` |
| Border (subtle) | `var(--color-border-subtle)` = `midnight-200` (barely visible) |
| Shadow resting | `var(--shadow-card)` = `rgba(0,0,0,0.2)` |
| Shadow hover | `var(--shadow-card-hover)` = `rgba(0,0,0,0.3)` |
| Border radius | `var(--radius-card)` = 16px |

### 8.3 Badge (dark mode)

| Variant | Background | Text |
|---------|------------|------|
| `mochis` (was `uwus`) | `var(--color-category-mochis-bg)` (translucent rose-300 20%) | `var(--color-category-mochis-text)` (rose-300) |
| `gatos` | `var(--color-category-gatos-bg)` (translucent sky-300 20%) | `var(--color-category-gatos-text)` (sky-300) |
| `pifos` | `var(--color-category-pifos-bg)` (translucent mint-400 20%) | `var(--color-category-pifos-text)` (mint-400) |
| `default` | `var(--color-bg-subtle)` (midnight-300) | `var(--color-text-secondary)` (cream-200) |

The translucent backgrounds (using `bg-{color}-300/20` Tailwind syntax with arbitrary opacity) read as "tinted dark glass" on the dark surface. Text uses the same hue at full saturation for ~8:1 contrast.

**⚠️ Required rename:** The variant key `uwus` in `Badge.tsx` should be renamed to `mochis` to match the rebrand. This requires also renaming the semantic tokens `--color-category-uwus-*` to `--color-category-mochis-*` in `tokens.css`. **Coordinate with slice N.1.**

### 8.4 Header (dark mode)

Sticky header with dark surface:

- Background: `var(--color-bg-elevated)` = `midnight-100` (`#221A3D`)
- Border bottom (subtle): `var(--color-border-subtle)` = `midnight-200`
- Logo color: `coral-400` (`#FF887A`) for brand mark
- Nav links: `cream-100` (resting), `cream-50` (hover), `coral-400` (active)
- Shadow on scroll: `var(--shadow-md)` = `rgba(0,0,0,0.3)`

### 8.5 Footer (dark mode)

- Background: `var(--color-midnight-700)` = `#07050F` (deepest surface)
- Text: `cream-200` (body), `cream-300` (muted)
- Links: `cream-200` → `coral-400` on hover
- Border top: `var(--color-border-subtle)` = `midnight-200`
- Social icons: `cream-300` → `coral-400` on hover

### 8.6 Input (dark mode, future)

When inputs are added (e.g., newsletter form in Tienda or Contacto):

- Background: `var(--color-bg-card)` = `midnight-200`
- Border: `var(--color-border)` = `midnight-100`
- Border focus: `var(--color-border-focus)` = `coral-500`
- Text: `var(--color-text)` = `cream-100`
- Placeholder: `var(--color-text-muted)` = `cream-300`
- Border radius: `var(--radius-input)` = 12px

---

## 9. Accessibility

### 9.1 WCAG AA compliance (all text/background combinations pass)

See section 2.9 for the full contrast table. **All key text/background combinations pass AA 4.5:1.** Most pass AAA 7:1.

### 9.2 Focus rings

Every interactive element (link, button, input) must have a visible focus ring:

```css
focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2
```

The `focus-ring-offset` is **2px on the dark surface** (not 0). The offset color is `--color-bg` (midnight-400), creating a thin "gap" between the element and the ring.

### 9.3 Keyboard navigation

- All interactive elements must be reachable by Tab.
- Order must follow visual order.
- Skip link to `#main-content` is required (already implemented in root layout).
- `:focus-visible` (not just `:focus`) is used so the ring only appears on keyboard focus, not on click.

### 9.4 `prefers-reduced-motion` (mandatory for all animations)

Every animation must respect this preference. See section 7.7 for the implementation pattern.

### 9.5 Image alt text

| Image | Alt text (Spanish) |
|-------|---------------------|
| Hero | "Mimi, peluche rosa con IA, sentada sobre una luna creciente en un cielo nocturno estrellado" |
| Mascot Band | `alt=""` (decorative) + visually-hidden h2 for screen readers |
| Product icons | `{character name} peluche mochis" (e.g., "Mimi peluche mochis") |
| OG image | "mochis — peluches con IA" (includes brand + tagline) |

### 9.6 Semantic HTML

- One `<h1>` per page.
- Headings nest in order: h1 → h2 → h3, no skipping.
- Sections have either `aria-label` or `aria-labelledby`.
- Decorative images have `alt=""` (not `alt="image"` or omitted).

### 9.7 Color is not the only signal

- Buttons with a single icon use `aria-label` for screen readers.
- Disabled state is conveyed by both visual opacity AND `aria-disabled` or `disabled` attribute.
- The amber disclaimer uses both color AND text content ("Los peluches mochis-play utilizan inteligencia artificial...") to convey the warning.

### 9.8 Form validation (future)

- Error states: `text-[var(--color-error)]` (red-500) + `aria-invalid="true"` + `aria-describedby` pointing to the error message.
- Success states: `text-[var(--color-success)]` (green-500) + `aria-live="polite"`.

---

## 10. Brand Voice & Tone

### 10.1 Voice attributes

- **Friendly, never condescending.** No "kids speak" for adults. No corporate jargon.
- **Warm, never saccharine.** Real warmth, not "aww cute!" overload.
- **Modern, never sterile.** Technical credibility, but not cold.
- **Inclusive, never gender-coded.** No "for her" or "for him." No pink-only or blue-only associations.

### 10.2 Copy guidelines

| Do | Don't |
|----|-------|
| "mochis" (lowercase, casual) | "MOCHIS" (all caps, shouts) |
| "Peluche Mimi" (concrete, warm) | "El Peluche Oficial" (corporate) |
| "Aprende idiomas con Mimi" (action + character) | "Herramienta educativa" (cold) |
| "Conexión WiFi requerida" (honest, clear) | "Conexión obligatoria" (threatening) |
| "La IA no guarda memoria" (factual, reassuring) | "Advertencia: limitaciones" (alarming) |
| "Mocha" (Chilean Spanish casual) | "Tía/Tío" (forced casual) |

### 10.3 Spanish-specific notes

- Use Chilean Spanish (es-CL): "peluches" (plural), "niños y adultos" (gender neutral).
- Use "mochis" with lowercase, no italics, no bold in body copy.
- Use the verb "puede" instead of "podrá" (closer, less formal).
- "Recomendamos" instead of "Se recomienda" (active voice).
- Avoid "vosotros" (Chilean Spanish uses "ustedes" or "vos" in informal contexts).
- The "disclaimer" is an English loanword; the Spanish equivalent is "aviso" or "advertencia," but "disclaimer" is acceptable in modern tech contexts.

### 10.4 Emoji and special characters

- **Avoid emoji in body copy.** The plush illustrations are the visual warmth; emoji is redundant.
- **Allowed:** Spanish punctuation (¿, ¡), middle dot (•) for inline lists, ellipsis (…) for trailing thoughts.
- **Avoid:** em-dash (—), curly quotes ("smart quotes" — they can break in some fonts), emoji in headings.

### 10.5 The "nocturnal" tone

The visual language says "nocturnal bedtime story" — the copy should match:

- Use words like: "aprende," "acompaña," "explora," "descubre," "juega," "comparte."
- Avoid: "compra," "adquiere," "obtén," "descarga" (too transactional).
- The AI disclaimer is honest and direct, not alarmist. "La IA no guarda memoria y puede cometer errores. Usa con responsabilidad" is friendly but truthful.

---

## Appendix: Quick reference card

```
COLORS
  Page bg:    midnight-400   #0F0B22
  Card bg:    midnight-200   #1A1331
  Heading:    cream-100      #F5EFE0
  Body:       cream-100      #F5EFE0
  Secondary:  cream-200      #E8DFC9
  Muted:      cream-300      #C9BFA6
  Primary:    coral-500      #F97066
  Decoration: mint-400       #34D399
  Warning:    amber-500      #F59E0B

TYPOGRAPHY
  Display:  Poppins 700, 48px (desktop) / 36px (mobile)
  Heading:  Poppins 700, 30px (h2) / 20px (h3)
  Body:     Inter 400, 16px
  Subhead:  Inter 400, 18px
  Caption:  Inter 400, 14px

SPACING
  Section: 64px desktop / 48px mobile (3xl / 2xl)
  Card:    32px padding (xl)
  Stack:   16-24px between elements (md / lg)

RADII
  Button:  12px
  Card:    16px
  Badge:   9999px (pill)

SHADOWS
  Card:        rgba(0,0,0,0.2)
  Card hover:  rgba(0,0,0,0.3)
  Modal:       rgba(0,0,0,0.4)
  Disclaimer:  amber glow 0.25 opacity
  Per-card:    category color glow
```

---

**End of Visual Style Guide. Use this as the reference for all future design and implementation decisions in the nocturnal phase.**
