---
name: action-js-parity
description: Test the raw bash action against genv-js so the JS engine is the verified source of truth. Load when working on parity tests, fixtures, or the action's CI test wiring.
created: 2026-06-13
updated: 2026-06-13
tags: [testing, ci, engine]
relates: [js-engine]
---

ACTIVE — adapter + parity harness done and green; now consumes the published
engine `jsr:@kindkitchen/genv` ([[005.log]]), off the submodule. CI wired
([[006.log]]) but not yet run on GitHub (parent unpushed). Owns (after the pivot
[[002.log]]): (a) the adapter mapping the action's
GitHub inputs onto the engine's agnostic sources, and (b) proving the real
action.yml resolves to the same env as the adapter over a fixture corpus.

Built in parent `parity/` ([[003.decision]]): `adapter.ts` (`from_action` /
`genv_action`), `action-runner.ts` (executes the real action.yml steps),
`fixtures.ts` (8 cases), `parity.test.ts` (semantic compare: `parse` both sides,
deep-equal). 8/8 green; lint/fmt clean. Deps (dev, parent): `@kindkitchen/genv`,
`@std/yaml`, `@std/assert`.

Next: verify the parity workflow on GitHub on first push of the parent; then this
task can close. Optionally widen the corpus (number/bool @json, regex-dialect
edges).
