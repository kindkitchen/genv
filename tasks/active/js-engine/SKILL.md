---
name: js-engine
description: Build genv-js — a dependency-free JS port of the action's merge pipeline, made the source of truth the bash action is tested against and the SPA reuses. Load when working on the engine, the merge logic, or parity.
created: 2026-06-13
updated: 2026-06-13
tags: [engine, js, deno, core]
relates: [action-js-parity, spa-site]
---

genv-js: a Deno/JSR TypeScript library (`jsr:@kindkitchen/genv`) reproducing
action.yml's 5-step append pipeline exactly. Source of truth — the bash action is
validated against it (slug action-js-parity) and the SPA reuses it (slug
spa-site). Decision [[002.decision]]; fidelity contract [[001.draft]].

API: `genv(inputs) -> string` (inputs mirror action.yml snake_case + defaults).
Layout: root `deno.json`; `engine/genv.ts` (impl), `engine/mod.ts` (re-export +
`import.meta.main` CLI: stdin JSON -> stdout dotenv), `engine/genv.test.ts`.

State: v0.1 implemented and green ([[003.summary]]) — `deno test` 10/10, lint +
fmt clean, CLI works. Fidelity caveats documented but not yet parity-proven.

Next: parity against the bash action (action-js-parity); publish to JSR; spa-site
imports it. Maybe more edge-case tests; maybe expose a per-step breakdown for the
playground's illustrative view.
