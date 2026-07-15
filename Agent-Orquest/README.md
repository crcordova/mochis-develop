# Orchestration System for opencode go

A portable multi-agent orchestration system for developing any kind of project: SaaS, microservices, ML projects, APIs, mobile apps, CLI tools, and monorepos.

Built for [opencode go](https://opencode.ai). Combines practical phase-based delegation with evidence-led slice workflows.

## Quick Start

### 1. Copy into your project

```bash
cp -r orquest-template/.opencode your-project/
cp orquest-template/opencode.json your-project/
cp orquest-template/AGENTS.md your-project/
cp -r orquest-template/docs your-project/
cp -r orquest-template/project-types your-project/
```

### 2. Start opencode

```bash
cd your-project
opencode
```

### 3. Send your request

The **orchestrator** is the default agent. Just describe what you want to build:

```
Build a REST API for a task management app with user auth, CRUD for tasks, and PostgreSQL
```

The orchestrator will:
1. Classify the project type
2. Delegate to the **planner** for a detailed plan
3. Parse the plan into phases
4. Spawn **coder** and **designer** subagents per phase
5. Use the **reviewer** for verification
6. Report results back to you

## Structure

```
.opencode/agents/          # Agent definitions (opencode native)
├── orchestrator.md        # Primary agent — entry point
├── planner.md             # Research + planning
├── coder.md               # Implementation
├── designer.md            # UI/UX + architecture
└── reviewer.md            # Audit + verification

AGENTS.md                  # Project instructions (auto-loaded)
opencode.json              # opencode configuration

docs/orchestration/        # Workflow documentation
├── workflow/              # Policies (lifecycle, delegation, evidence, etc.)
├── templates/             # Reusable templates (briefs, reports, closure)
└── slices/                # Durable slice records (created during work)

project-types/             # Domain-specific patterns
├── saas.md
├── microservice.md
├── ml-project.md
├── rest-api.md
├── graphql-api.md
├── mobile-app.md
├── cli-tool.md
└── monorepo.md
```

## Agents

| Agent | Role | When Used |
|-------|------|-----------|
| **orchestrator** | Coordinates work, manages phases, handles blockers | Every request (entry point) |
| **planner** | Researches codebase, creates scoped plans with stop rules | Before implementation |
| **coder** | Writes code following mandatory principles | Implementation slices |
| **designer** | UI/UX, architecture, API design, data models | Design slices |
| **reviewer** | Neutral audit, code review, evidence verification | After implementation |

## How It Works

### Execution Flow

```
User Request
    │
    ▼
Orchestrator ──► Planner (research + plan)
    │
    ▼
Parse Plan into Phases
    │
    ├── Phase 1 (parallel)
    │   ├── Slice 1.1 → Coder
    │   └── Slice 1.2 → Designer
    │
    ├── Phase 2 (sequential)
    │   └── Slice 2.1 → Coder
    │
    └── Phase 3 (review)
        └── Slice 3.1 → Reviewer
    │
    ▼
Report to User
```

### Key Concepts

- **Slice**: smallest verifiable unit of work with one owner
- **Phase**: group of slices that can run in parallel
- **Brief**: scoped task assignment with explicit boundaries
- **Evidence**: proof of work (files read/written, commands run, verification)
- **Blocker**: stops work when scope, authorization, or evidence is insufficient

### Delegation Model

Every task gets explicit boundaries:
- Allowed reads (exact paths)
- Allowed writes (exact paths)
- Allowed commands (exact commands)
- Forbidden areas
- Stop rules
- Required evidence format

## Workflow Policies

Located in `docs/orchestration/workflow/`:

| Policy | Purpose |
|--------|---------|
| [Slice Lifecycle](docs/orchestration/workflow/slice-lifecycle.md) | States from intake to closure |
| [Delegation Protocol](docs/orchestration/workflow/delegation-protocol.md) | Brief structure and scope rules |
| [Evidence & Verification](docs/orchestration/workflow/evidence-and-verification.md) | Evidence standards |
| [Blockers & Stoppers](docs/orchestration/workflow/blockers-and-stoppers.md) | When and how to stop |
| [Closure Protocol](docs/orchestration/workflow/closure-protocol.md) | Controlled end of work |
| [Parallelism Policy](docs/orchestration/workflow/parallelism-policy.md) | When parallel work is safe |
| [Context Budgeting](docs/orchestration/workflow/context-budgeting.md) | Minimal context loading |

## Customization

### Add a new project type

Create `project-types/your-type.md` with:
- Architecture patterns
- Key decisions checklist
- Standard slices
- Testing strategy

### Adjust coding principles

Edit `.opencode/agents/coder.md` to match your team's standards.

### Change the workflow

Edit files in `docs/orchestration/workflow/` to adjust policies.

## Requirements

- [opencode go](https://opencode.ai) installed
- Any LLM provider configured in opencode
