# Slice Plan Template

```text
# [slice name]

status: planned|blocked

objective:
- [one sentence]

owner_role:
- [coder | designer | reviewer]

allowed_reads:
- [path or none]

allowed_writes:
- [path or none]

allowed_commands:
- [exact command or none]

forbidden:
- [path, action, or none]

non_goals:
- [item or none]

evidence_required:
- files read
- files changed
- commands run or none
- verification performed or skipped
- blockers, risks, and next recommendation

stop_rules:
- Stop if broader scope is required
- Stop if authorization is ambiguous
- Stop if evidence is insufficient

depends_on:
- [slice name or none]

handoff:
- next_role: [role or none]
- next_prompt: [brief pointer or none]
```
