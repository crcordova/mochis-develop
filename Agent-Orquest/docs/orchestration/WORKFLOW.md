# Flujo de Orquestación - mochis-play

## Cómo Funciona el Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO                                   │
│                   (Solicitud inicial)                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ORQUESTADOR                                   │
│  1. Recibe solicitud                                             │
│  2. Clasifica proyecto                                           │
│  3. Delega al Planner                                            │
│  4. Parsea plan en slices                                        │
│  5. Crea briefs para subagentes                                  │
│  6. Ejecuta fases (paralelo/serial)                              │
│  7. Verifica reportes                                            │
│  8. Reporta al usuario                                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   PLANNER    │ │   DESIGNER   │ │    CODER     │
│              │ │              │ │              │
│ Investiga    │ │ UI/UX        │ │ Implementa   │
│ Crea plan    │ │ Componentes  │ │ Código       │
│ Define scope │ │ Layout       │ │ Integración  │
│              │ │ Design tokens│ │              │
└──────────────┘ └──────────────┘ └──────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REVIEWER                                     │
│  1. Auditoría neutral                                            │
│  2. Verifica evidencia                                           │
│  3. Checkea scope adherence                                      │
│  4. Reporta closure readiness                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Documentación Generada

### 1. Plan Maestro (`slices/master-plan.md`)
- Visión general del proyecto
- Todas las fases y slices
- Mapa de paralelización
- Riesgos y preguntas abiertas

### 2. Slice Plans (`slices/slice-*.md`)
- Detalle de cada slice
- Objetivo, owner, archivos permitidos
- Reglas de stop
- Reporte de ejecución

### 3. Briefs de Agentes (`briefs/brief-*.md`)
- Instrucciones específicas para cada subagente
- Lecturas/escrituras permitidas
- Criterios de aceptación
- Formato de reporte esperado

### 4. Reportes de Ejecución (`reports/report-*.md`)
- Estado de cada fase
- Slices completados
- Issues encontrados
- Próximos pasos

## Flujo de Trabajo Típico

### Paso 1: Solicitud del Usuario
```
"Desarrolla la landing page para mochis-play..."
```

### Paso 2: Orquestador → Planner
```
Orquestador: "Planner, investiga y crea un plan para..."
Planner: → Investiga codebase, skills, docs
        → Crea master-plan.md con fases y slices
```

### Paso 3: Orquestador → Briefs
```
Orquestador: → Parsea plan en slices
            → Crea brief-1.1-design-tokens.md
            → Crea brief-1.2-ui-components.md
            → etc.
```

### Paso 4: Ejecución Paralela/Serie
```
Orquestador: → Spawna Designer para Slice 1.1
            → Spawna Designer para Slice 1.2
            → Spawna Coder para Slice 1.4
            → (todos en paralelo)
```

### Paso 5: Reportes de Subagentes
```
Designer 1.1: → status: pass
              → summary: "Design tokens definidos"
              → files: [tokens.css, tailwind.config.js]

Designer 1.2: → status: pass
              → summary: "Componentes UI creados"
              → files: [Button.tsx, Card.tsx, Badge.tsx]
```

### Paso 6: Verificación y Cierre
```
Orquestador: → Verifica reportes
            → Checkea que build pasa
            → Reporta al usuario

Reviewer:    → Auditoría final
            → Closure readiness
```

## Comandos para el Usuario

### Ver el Plan
```bash
cat Agent-Orquest/docs/orchestration/slices/master-plan.md
```

### Ver Brief de una Tarea
```bash
cat Agent-Orquest/docs/orchestration/briefs/brief-1.1-design-tokens.md
```

### Ver Reporte de Ejecución
```bash
cat Agent-Orquest/docs/orchestration/reports/report-phase0.md
```

## Estado Actual del Proyecto

| Fase | Status | Documentación |
|------|--------|---------------|
| Phase 0 | ✅ Completado | `slices/slice-0.*.md`, `reports/report-phase0.md` |
| Phase 1 | 📋 Planificado | `briefs/brief-phase1.md`, `briefs/brief-1.*.md` |
| Phase 2 | ⏳ Pendiente | - |
| Phase 3 | ⏳ Pendiente | - |
| Phase 4 | ⏳ Pendiente | - |

## Próxima Ejecución

**Phase 1** está lista para ejecutar con los briefs creados:
- 5 slices en paralelo
- Briefs detallados con scope explícito
- Criterios de aceptación definidos

Para ejecutar:
```
"Orquestador, ejecuta la Phase 1 según los briefs en briefs/brief-phase1.md"
```
