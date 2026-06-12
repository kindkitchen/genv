---
name: script-ops-audit
description: Audit of all technical script operations (action.yml, JUSTFILE, e2e workflows). Load when reviewing or fixing genv's bash/jq pipeline, version tooling, or CI tests.
created: 2026-06-12
updated: 2026-06-12
tags: [ci, scripts, action]
relates: []
---

Audited genv's script operations. action.yml pipeline and JUSTFILE verified
working. Of three issues found, two were accepted as intended behavior
(dotenv last-win duplication, trailing newline) and one was actioned: e2e tests
now cumulative.

Done: `e2e.self-invocation.v1.0.0.yml` rewritten as a six-job cumulative suite —
one job per still-valid historical scenario, all against `@v1.0.0`. Older
per-version e2e files kept as-is. Convention: each new version copies the latest
e2e, bumps refs/trigger, adds one job for its new behavior.

Status blocked on CI: user opens a PR, watches the GitHub Actions e2e runs, and
moves the task to `done` only once they pass. Unaddressed-by-design: e2e still
pins the published tag, so it smoke-tests the shipped artifact, not pre-merge
local code.
