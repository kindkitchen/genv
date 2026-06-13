---
name: js-engine
description: Build genv-js — a dependency-free, source-agnostic JS engine that merges multiple ordered key/value sources into one dotenv (last-win), with env-file parse/stringify utils. Load when working on the engine, merge logic, or the env-file utils.
created: 2026-06-13
updated: 2026-06-13
tags: [engine, js, deno, core]
relates: [action-js-parity, spa-site]
---

genv-js: a dependency-free TS engine (Deno/JSR `jsr:@kindkitchen/genv`) that
merges multiple ordered key/value sources into one dotenv, last-win on conflict.
Source-agnostic by design — knows nothing about GitHub, vars, or secrets
([[005.decision]]). Lives in its own repo https://github.com/kindkitchen/genv-js,
a git submodule at `engine/` ([[004.log]]).

Three primitives: (1) N ordered sources — public/private is just a caller label;
(2) two value kinds — a literal value, or a value that is itself env-file content
to parse + inline; (3) ordered last-win merge into one result.

Structure (planned):
- core (pure TS): ordered last-win merge + nested-content expansion, no I/O.
- utils: `parse` (env text -> object) + `stringify` (object -> env text);
  load-bearing — `parse` expands content fragments, `stringify` renders output.
- tests: spec/unit (core + utils) + e2e (pipeline + CLI).

Current code is the pre-pivot v0.1: an action.yml 5-step port in `genv.ts` /
`mod.ts` / `genv.test.ts`, green but GitHub-coupled ([[003.summary]]). To be
refactored to the agnostic core; the GitHub input mapping moves to an adapter
owned by action-js-parity, and bash-byte parity is dropped as an engine goal.

Open (working assumptions, challenge don't replace): merge collapses duplicates
into a resolved object — yes; content-vs-literal is structural per fragment, not
a key pattern — yes.

Next: implement the agnostic core + env-file utils; write spec + e2e tests;
then re-point action-js-parity at the adapter, publish to JSR, spa-site imports.
