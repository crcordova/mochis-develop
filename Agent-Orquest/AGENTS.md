# Orchestration System — Project Instructions

This project uses a multi-agent orchestration system for structured development.

## Agents

| Agent | Role | Mode |
|-------|------|------|
| **orchestrator** | Breaks requests into slices, delegates to subagents, manages phases | primary |
| **planner** | Researches codebase, creates plans with exact scope and stop rules | subagent |
| **coder** | Implements code following mandatory principles | subagent |
| **designer** | UI/UX, architecture, API design, data models | subagent |
| **reviewer** | Neutral audit, code review, evidence verification | subagent |

## Workflow

1. User sends request to the **orchestrator**
2. Orchestrator classifies project type and delegates to **planner**
3. Planner returns implementation steps with file assignments and dependencies
4. Orchestrator parses steps into phases (parallel when no file overlap)
5. Orchestrator spawns subagents per phase (coder/designer)
6. Each subagent reports in machine-scannable format (status/summary/findings/files)
7. Orchestrator verifies, handles blockers, and reports to user

## Key Principles

- **Small slices**: one narrow objective per task, one accountable owner
- **Explicit boundaries**: every task has allowed reads, writes, commands, forbidden areas, and stop rules
- **Evidence before advancement**: no task is complete without current evidence
- **WHAT not HOW**: describe the outcome, not the implementation
- **Blockers stop work**: report `blocked` with the smallest missing authorization

## Project Types

Check `project-types/` for domain-specific patterns:
- SaaS applications
- Microservices
- ML projects
- REST/GraphQL APIs
- Mobile apps
- CLI tools

## Workflow Documentation

Detailed workflow policies live in `docs/orchestration/workflow/`:
- Slice lifecycle, delegation protocol, evidence requirements
- Blocker handling, closure protocol, parallelism policy
- Context budgeting and portability

## Templates

Reusable templates in `docs/orchestration/templates/`:
- Slice plan, agent brief, agent report, closure note

## Durable Records

Accepted slice records are stored in `docs/orchestration/slices/` as durable project history.
