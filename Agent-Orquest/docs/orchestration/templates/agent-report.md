# Agent Report Template

## General Report

```text
status: pass|blocked
summary: one sentence
findings:
- blocker, risk, evidence note, or none
files:
- path or none
```

## Verifier Report

```text
status: pass|blocked
summary: one sentence
verified: yes|no
findings:
- failed check, missing evidence, skipped verification note, or none
files:
- path or none
```

## Review Report

```text
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
