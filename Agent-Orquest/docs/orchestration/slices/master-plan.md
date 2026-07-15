# Plan Maestro - mochis-play Landing Page

status: active
created: 2026-07-07
last_updated: 2026-07-12 (Phase 5 slices 5.1-5.2 completed)

## Summary

Desarrollo de landing page para mochis-play: tienda de peluches con IA integrada. Next.js + Tailwind + Vercel. Enfoque en tracking, SEO para LLMs, y UX amigable para niños y adultos.

## Project Context

- Type: saas / landing-page
- Current state: greenfield
- Key constraints: 
  - Sin carrito de compras (solo redirección ML/WhatsApp)
  - Tracking de clicks obligatorio
  - SEO para agentes LLM (llm.txt)
  - Datos en JSON para fácil mantenimiento
  - Videos de YouTube (redirección)

## Implementation Phases

### Phase 0: Fundación (COMPLETADO)
- [x] Slice 0.1: Instalar skills locales
- [x] Slice 0.2: Scaffold Next.js + Tailwind
- [x] Slice 0.3: Configurar Vercel
- [x] Slice 0.4: Variables de entorno
- [x] Slice 0.5: Estructura carpetas imágenes
- [x] Slice 0.6: JSON productos (5 uwus + 3 gatos + 4 pifos)
- [x] Slice 0.7: JSON tutoriales
- [x] Slice 0.8: JSON blog
- [x] Slice 0.9: Documentar specs imágenes
- [x] Slice 0.10: Analytics wrapper (Vercel + GA4 opcional)

### Phase 1: Design System + Componentes Base (COMPLETADO)
- [x] Slice 1.1: Design tokens (colores coral/violeta, tipografía, espaciado) → Designer
  - Files: `src/styles/tokens.css`, `tailwind.config.js`, `src/app/globals.css`
  - Depends on: none
- [x] Slice 1.2: Button component (4 variantes, 3 tamaños, tracking) → Coder
  - Files: `src/components/ui/Button.tsx`, `src/components/ui/index.ts`
  - Depends on: Slice 1.1
- [x] Slice 1.3: Card & Badge components → Coder
  - Files: `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`
  - Depends on: Slice 1.1
- [x] Slice 1.4: Header & MobileNav (responsive, tracking) → Coder
  - Files: `src/components/layout/Header.tsx`, `MobileNav.tsx`, `index.ts`
  - Depends on: Slice 1.1
- [x] Slice 1.5: Footer (3-column, social links, disclaimer) → Coder
  - Files: `src/components/layout/Footer.tsx`
  - Depends on: Slice 1.1
- [x] Slice 1.6: Tracking hooks (6 funciones tipadas, SSR-safe) → Coder
  - Files: `src/lib/useTracking.ts`, `src/hooks/index.ts`
  - Depends on: Slice 1.1

### Phase 2: Layout Integration (COMPLETADO)
- [x] Pre-fix: Contraste colores (WCAG AA) → Coder
  - Files: `src/styles/tokens.css`, `src/app/globals.css`
- [x] Pre-fix: Dark mode (bg-white → tokens) → Coder
  - Files: `src/components/layout/Header.tsx`, `MobileNav.tsx`
- [x] Pre-fix: Deduplicación NAV_LINKS → Coder
  - Files: `src/data/navigation.ts`, Header, Footer, MobileNav
- [x] Pre-fix: Configuración ESLint → Coder
  - Files: `.eslintrc.json`, `.eslintignore`
- [x] Slice 2.1: Integrar Header/Footer en layout.tsx + Skip link → Coder
  - Files: `src/app/layout.tsx`
  - Depends on: Phase 1

### Phase 3: Páginas Completas (COMPLETADO)
- [x] Slice 3.1: Home page (hero, features, categories preview, disclaimer) → Coder
  - Files: `src/app/page.tsx`, `src/components/home/FeaturesSection.tsx`
  - Depends on: Phase 2
  - Brief: `briefs/phase-3/brief-3.1-home.md`
- [x] Slice 3.2: Tienda page (product grid, filtros, botones ML/WhatsApp) → Coder
  - Files: `src/lib/purchase.ts`, `src/components/products/*`, `src/app/tienda/*`
  - Depends on: Phase 2
  - Brief: `briefs/phase-3/brief-3.2-tienda.md`
- [x] Slice 3.3: Tutoriales page (videos YouTube agrupados) → Coder
  - Files: `src/app/tutoriales/page.tsx`, `TutorialesClient.tsx`
  - Depends on: Phase 2
  - Brief: `briefs/phase-3/brief-3.3-tutoriales.md`
- [x] Slice 3.4: Blog page (artículos agrupados) → Coder
  - Files: `src/app/blog/page.tsx`, `BlogClient.tsx`
  - Depends on: Phase 2
  - Brief: `briefs/phase-3/brief-3.4-blog.md`
- [x] Slice 3.5: Contacto page (info, social links) → Coder
  - Files: `src/app/contacto/page.tsx`, `ContactoClient.tsx`
  - Depends on: Phase 2
  - Brief: `briefs/phase-3/brief-3.5-contacto.md`
- Nota: Todas las páginas agregan id="main-content" al <main> ✅

### Phase 4: SEO Final (COMPLETADO)
- [x] Slice 4.1: Sitemap XML dinámico → Coder
  - Files: `src/app/sitemap.ts`
  - Depends on: Phase 3
  - Brief: `briefs/phase-4/brief-4.1-sitemap.md`
- [x] Slice 4.2: Schema.org structured data (JSON-LD) → Coder
  - Files: `src/lib/structured-data.tsx`, `src/app/layout.tsx`, `src/app/tienda/page.tsx`
  - Depends on: Phase 3
  - Brief: `briefs/phase-4/brief-4.2-structured-data.md`

### Phase 5: QA y Deploy (PARCIALMENTE COMPLETADO - pendiente deploy)
- [x] Slice 5.1: Auditoría final y testing → Reviewer
  - Depends on: Phase 4
  - Brief: `briefs/phase-5/brief-5.1-audit.md`
  - Result: Build ✅, Lint ✅, Accesibilidad ✅, Tracking ✅, Responsive ✅, SEO ✅, Code Quality ✅
  - Issues encontrados: 1 minor (tracking redundante en ProductCard) - corregido en Slice 5.2
- [x] Slice 5.2: Fix issues finales → Coder
  - Depends on: Slice 5.1
  - Brief: `briefs/phase-5/brief-5.2-fixes.md`
  - Result: Tracking pattern clarificado con JSDoc, build y lint pasan
- [ ] Slice 5.3: Deploy a Vercel → Coder
  - Depends on: Slice 5.2
  - Status: PENDIENTE (requiere autorización del usuario)

## Parallelization Map

- Phase 1: Slices 1.1-1.6 pueden correr en paralelo (no overlap de archivos) ✅ COMPLETADO
- Phase 2: Fixes en paralelo + Layout integration secuencial ✅ COMPLETADO
- Phase 3: Slices 3.1-3.5 corrieron TODOS en paralelo (páginas independientes, zero overlap) ✅ COMPLETADO
- Phase 4: Slices 4.1-4.2 en paralelo (SEO independiente) ✅ COMPLETADO
- Phase 5: Secuencial (QA → fixes → deploy) — Slices 5.1-5.2 ✅ COMPLETADO, Slice 5.3 pendiente

## Edge Cases and Risks

- Sin imágenes reales: usar placeholders hasta que el usuario las proporcione
- GA4 opcional: código debe funcionar sin el ID
- Links ML variables: deben venir de .env.local
- WhatsApp dinámico: mensaje cambia según producto

## Open Questions

- [RESUELTO] Nombres de uwus: Mimi, Duoduo, Paopao, Yuyu, Nana
- [RESUELTO] Gatos: 3 por color (negro, blanco, gris)
- [RESUELTO] Pifos: 4 por color (rojo, verde, azul, amarillo)
- [PENDIENTE] Links ML reales en .env.local
- [PENDIENTE] Número WhatsApp en .env.local
- [PENDIENTE] IDs de videos YouTube

## Testing Strategy

- Build debe pasar sin errores
- Lighthouse score > 90
- Accesibilidad WCAG 2.1 AA
- Tracking events visibles en consola (dev)
- Responsive: mobile, tablet, desktop

## Handoff para Próximo Agente

**Estado actual (2026-07-12):**
- Fases 0-5.2 completadas ✅
- Sitio funcional con build exitoso
- Pendiente: imágenes de productos, hero, variables de entorno reales, deploy

**Próximo paso: Diseño e Imágenes Web**
- 📄 **Handoff completo:** `Agent-Orquest/docs/orchestration/handoff-design-images.md`
- **Agente recomendado:** Designer/Imagen Web especializado
- **Objetivo:** Crear/optimizar 12 imágenes de productos + hero + banners opcionales
- **Prioridad:** CRÍTICO (sin imágenes, la tienda se ve incompleta)

**Después de imágenes:**
1. Configurar variables de entorno reales (ML URLs, WhatsApp)
2. Ejecutar Slice 5.3: Deploy a Vercel
3. Proyecto completo y en producción 🎉
