---
name: action-js-parity
description: Test the raw bash action against genv-js so the JS engine is the verified source of truth. Load when working on parity tests, fixtures, or the action's CI test wiring.
created: 2026-06-13
updated: 2026-06-13
tags: [testing, ci, engine]
relates: [js-engine]
---

ACTIVE — adapter + local parity harness done and green ([[004.summary]]); CI
wiring still pending. Owns (after the pivot [[002.log]]): (a) the adapter mapping
the action's GitHub inputs onto the engine's agnostic sources, and (b) proving the
real action.yml resolves to the same env as the adapter over a fixture corpus.

Built in parent `parity/` ([[003.decision]]): `adapter.ts` (`from_action` /
`genv_action`), `action-runner.ts` (executes the real action.yml steps),
`fixtures.ts` (8 cases), `parity.test.ts` (semantic compare: `parse` both sides,
deep-equal). 8/8 green; lint/fmt clean; uses `@std/yaml` (dev-only, parent). Not
committed yet. Spec [[001.draft]] predates the pivot — read with [[002.log]].

Next: CI wiring (thin/fast, e2e.* per version); optionally widen the corpus
(number/bool @json, regex-dialect edges). JSR publish of the engine would let this
import `jsr:@kindkitchen/genv` instead of the submodule path.
