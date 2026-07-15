# Agent Brief - Reviewer: Auditoría Fase 0

You are the **reviewer** for audit of Phase 0 execution.

Operating rules:
- Read only the files or directories explicitly allowed below
- Do NOT write or modify any files
- Do NOT run commands unless explicitly authorized
- Do NOT implement fixes during audit
- Do NOT expand scope to clear a blocker
- If you find issues, report them — do not fix them

## Objective

Auditar la estructura actual de la aplicación Next.js creada en Fase 0 (sin documentación formal de orquestación). Verificar que la estructura sigue buenas prácticas de Next.js 14, TypeScript, Tailwind, y que los datos JSON están correctamente estructurados.

## Allowed Reads

- `src/app/**/*` (todas las páginas y layout)
- `src/data/**/*` (todos los JSONs)
- `src/lib/analytics.tsx`
- `src/components/` (estructura de carpetas)
- `src/hooks/` (estructura de carpetas)
- `src/styles/` (estructura de carpetas)
- `public/**/*` (estructura)
- `package.json`
- `next.config.js`
- `tailwind.config.js`
- `tsconfig.json`
- `vercel.json`
- `.env.local`
- `.env.example`
- `docs/image-specs.md`

## Allowed Commands

- `npm run build` (verificar que compila)
- `ls -la src/` (ver estructura)
- `ls -la public/images/` (ver estructura de imágenes)

## Forbidden

- Modificar cualquier archivo
- Instalar dependencias
- Cambiar configuración

## Non-Goals

- Implementar mejoras
- Corregir errores
- Agregar funcionalidad

## Audit Checklist

### 1. Estructura de Archivos
- [ ] Next.js App Router correctamente configurado
- [ ] Carpetas de páginas existen (tienda, tutoriales, blog, contacto)
- [ ] Layout.tsx existe y es válido
- [ ] globals.css existe

### 2. TypeScript
- [ ] tsconfig.json configurado correctamente
- [ ] Path aliases configurados (@/*)
- [ ] Strict mode habilitado

### 3. Tailwind CSS
- [ ] tailwind.config.js existe
- [ ] postcss.config.js existe
- [ ] Colores personalizados definidos
- [ ] Fuentes configuradas

### 4. Datos JSON
- [ ] products.json tiene estructura válida
- [ ] tutorials.json tiene estructura válida
- [ ] blog.json tiene estructura válida
- [ ] site.json tiene metadata del sitio
- [ ] Todos los JSONs son válidos (parseable)

### 5. Analytics
- [ ] analytics.tsx existe
- [ ] Vercel Analytics integrado
- [ ] GA4 preparado (opcional)
- [ ] Funciones de tracking definidas

### 6. Variables de Entorno
- [ ] .env.local existe
- [ ] .env.example existe
- [ ] Variables ML_UWUS_URL, ML_GATOS_URL, ML_PIFOS_URL definidas
- [ ] WHATSAPP_NUMBER definido
- [ ] NEXT_PUBLIC_GA_ID definido (opcional)

### 7. SEO
- [ ] public/llm.txt existe
- [ ] public/robots.txt existe
- [ ] Metadata en layout.tsx

### 8. Build
- [ ] npm run build pasa sin errores
- [ ] No hay errores de TypeScript
- [ ] Páginas estáticas se generan

### 9. Estructura de Carpetas
- [ ] src/components/ui/ existe
- [ ] src/components/layout/ existe
- [ ] src/components/tracking/ existe
- [ ] src/components/products/ existe
- [ ] src/hooks/ existe
- [ ] src/styles/ existe
- [ ] public/images/products/{uwus,gatos,pifos}/ existe

### 10. Documentación
- [ ] docs/image-specs.md existe
- [ ] README.md existe
- [ ] .gitignore existe

## Evidence Expectation

- files read: todos los archivos listados arriba
- files changed: none (solo auditoría)
- commands run: npm run build, ls commands
- verification: checklist completado
- risks: issues encontrados
- blockers: none

## Return Format

```
status: pass|blocked
summary: one sentence
closure_ready: yes|no
findings:
- authorization: pass|blocked - [note]
- scope: pass|blocked - [note]
- evidence: pass|blocked - [note]
- quality: pass|blocked - [note]
- security: pass|blocked - [note]
files:
- path or none
```

Additional sections:
```
code_issues:
- [severity: critical|warning|info] [file:line] [description]
recommendations:
- [improvement suggestion or none]
```
