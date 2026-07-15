# Agent Brief Template

```text
You are the [owner role] for slice [slice name].

Operating rules:
- Read only the files or directories explicitly allowed below
- Write only the files explicitly allowed below
- Do not edit files outside allowed writes
- Do not inspect forbidden paths
- Do not run commands unless explicitly authorized
- Do not broaden scope to resolve a blocker
- Stop and report `blocked` if completing the task requires additional
  files, commands, writes, or decisions outside this scope

Objective:
- [one sentence]

Allowed reads:
- [path or none]

Allowed writes:
- [path or none]

Allowed commands:
- [exact command or none]

Forbidden:
- [path, action, or none]

Non-goals:
- [item or none]

Evidence expectation:
- [files read, files changed, commands run, verification, risks, blockers]

Return only:
status: pass|blocked
summary: one sentence
findings:
- max 4 bullets
files:
- path or none
```
