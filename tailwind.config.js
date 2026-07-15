/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ----------------------------------------------------------------
         Colors — mapped to CSS custom properties from tokens.css
         Use semantic names in components: text-primary, bg-secondary, etc.
         ---------------------------------------------------------------- */
      colors: {
        /* Primary: Warm Coral — friendly, inviting, gender-neutral */
        primary: {
          50:  'var(--color-coral-50)',
          100: 'var(--color-coral-100)',
          200: 'var(--color-coral-200)',
          300: 'var(--color-coral-300)',
          400: 'var(--color-coral-400)',
          500: 'var(--color-coral-500)',
          600: 'var(--color-coral-600)',
          700: 'var(--color-coral-700)',
          800: 'var(--color-coral-800)',
          900: 'var(--color-coral-900)',
          DEFAULT: 'var(--color-primary)',
        },
        /* Secondary: Violet — technology, creativity, wonder */
        secondary: {
          50:  'var(--color-violet-50)',
          100: 'var(--color-violet-100)',
          200: 'var(--color-violet-200)',
          300: 'var(--color-violet-300)',
          400: 'var(--color-violet-400)',
          500: 'var(--color-violet-500)',
          600: 'var(--color-violet-600)',
          700: 'var(--color-violet-700)',
          800: 'var(--color-violet-800)',
          900: 'var(--color-violet-900)',
          DEFAULT: 'var(--color-secondary)',
        },
        /* Neutrals: Warm Stone — soft, not clinical */
        neutral: {
          50:  'var(--color-stone-50)',
          100: 'var(--color-stone-100)',
          200: 'var(--color-stone-200)',
          300: 'var(--color-stone-300)',
          400: 'var(--color-stone-400)',
          500: 'var(--color-stone-500)',
          600: 'var(--color-stone-600)',
          700: 'var(--color-stone-700)',
          800: 'var(--color-stone-800)',
          900: 'var(--color-stone-900)',
        },
        /* Category accents — pastel/muted, gender-neutral */
        accent: {
          uwus:   'var(--color-category-uwus)',
          gatos:  'var(--color-category-gatos)',
          pifos:  'var(--color-category-pifos)',
        },
        /* Semantic surface/text colors for utility classes */
        surface: {
          DEFAULT:  'var(--color-bg)',
          subtle:   'var(--color-bg-subtle)',
          card:     'var(--color-bg-card)',
          elevated: 'var(--color-bg-elevated)',
        },
        /* WhatsApp brand color — full scale for utility classes (e.g. bg-whatsapp, text-whatsapp-700) */
        whatsapp: {
          50:  'var(--color-whatsapp-50)',
          100: 'var(--color-whatsapp-100)',
          300: 'var(--color-whatsapp-300)',
          500: 'var(--color-whatsapp-500)',
          600: 'var(--color-whatsapp-600)',
          700: 'var(--color-whatsapp-700)',
          800: 'var(--color-whatsapp-800)',
          900: 'var(--color-whatsapp-900)',
          DEFAULT: 'var(--color-whatsapp)',
        },
        /* Status colors — semantic aliases for utility classes */
        success: {
          50:  'var(--color-success-50)',
          100: 'var(--color-success-100)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          DEFAULT: 'var(--color-success)',
        },
        warning: {
          50:  'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          DEFAULT: 'var(--color-warning)',
        },
        error: {
          50:  'var(--color-error-50)',
          100: 'var(--color-error-100)',
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          DEFAULT: 'var(--color-error)',
        },
      },

      /* ----------------------------------------------------------------
         Typography
         ---------------------------------------------------------------- */
      fontFamily: {
        sans:    ['var(--font-family-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-family-display)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['var(--font-size-5xl)',   { lineHeight: 'var(--line-height-tight)' }],
        '4xl':     ['var(--font-size-4xl)',   { lineHeight: 'var(--line-height-tight)' }],
        '3xl':     ['var(--font-size-3xl)',   { lineHeight: 'var(--line-height-tight)' }],
        '2xl':     ['var(--font-size-2xl)',   { lineHeight: 'var(--line-height-tight)' }],
        'xl':      ['var(--font-size-xl)',     { lineHeight: 'var(--line-height-normal)' }],
        'lg':      ['var(--font-size-lg)',     { lineHeight: 'var(--line-height-normal)' }],
        'base':    ['var(--font-size-base)',   { lineHeight: 'var(--line-height-normal)' }],
        'sm':      ['var(--font-size-sm)',     { lineHeight: 'var(--line-height-normal)' }],
        'xs':      ['var(--font-size-xs)',     { lineHeight: 'var(--line-height-normal)' }],
      },
      fontWeight: {
        normal:   'var(--font-weight-normal)',
        medium:   'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold:     'var(--font-weight-bold)',
      },
      lineHeight: {
        tight:   'var(--line-height-tight)',
        normal:  'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },

      /* ----------------------------------------------------------------
         Spacing — 4px base scale
         ---------------------------------------------------------------- */
      spacing: {
        '0':   'var(--space-0)',
        '1':   'var(--space-1)',    /*  4px — xs */
        '2':   'var(--space-2)',    /*  8px — sm */
        '3':   'var(--space-3)',    /* 12px */
        '4':   'var(--space-4)',    /* 16px — md */
        '5':   'var(--space-5)',    /* 20px */
        '6':   'var(--space-6)',    /* 24px — lg */
        '8':   'var(--space-8)',    /* 32px — xl */
        '10':  'var(--space-10)',   /* 40px */
        '12':  'var(--space-12)',   /* 48px — 2xl */
        '16':  'var(--space-16)',   /* 64px — 3xl */
        '20':  'var(--space-20)',   /* 80px */
        '24':  'var(--space-24)',   /* 96px */
      },

      /* ----------------------------------------------------------------
         Border Radius — rounded, friendly corners
         ---------------------------------------------------------------- */
      borderRadius: {
        'sm':   'var(--radius-sm)',     /*  6px */
        'md':   'var(--radius-md)',     /* 12px — buttons, inputs */
        'lg':   'var(--radius-lg)',     /* 16px — cards */
        'xl':   'var(--radius-xl)',     /* 24px — modals */
        'full': 'var(--radius-full)',   /* pill shapes — badges */
      },

      /* ----------------------------------------------------------------
         Box Shadows — soft, subtle depth
         ---------------------------------------------------------------- */
      boxShadow: {
        'sm':       'var(--shadow-sm)',
        'md':       'var(--shadow-md)',
        'lg':       'var(--shadow-lg)',
        'xl':       'var(--shadow-xl)',
        'card':     'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'dropdown': 'var(--shadow-dropdown)',
        'modal':    'var(--shadow-modal)',
      },

      /* ----------------------------------------------------------------
         Transitions — smooth, natural motion
         ---------------------------------------------------------------- */
      transitionDuration: {
        fast: 'var(--duration-fast)',   /* 150ms */
        base: 'var(--duration-base)',   /* 200ms */
        slow: 'var(--duration-slow)',   /* 300ms */
      },
      transitionTimingFunction: {
        default: 'var(--easing-default)',
        bounce:  'var(--easing-bounce)',
      },
    },
  },
  plugins: [],
};
