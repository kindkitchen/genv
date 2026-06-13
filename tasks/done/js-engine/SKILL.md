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

Pipeline layering ([[006.decision]]):
- util `parse`: env text -> object.
- engine filter layer (non-core): include/exclude/match, per source on its
  object, after parse and before merge.
- core (pure TS): ordered last-win merge + nested-content expansion, no I/O, no
  patterns.
- util `stringify`: object -> env text. Load-bearing — `parse` also expands
  content fragments, `stringify` renders output.
- tests: spec/unit (core, filter, utils) + e2e (pipeline + CLI).

DONE — engine delivered, green, zero-dependency ([[007.summary]], status move
[[008.log]]). Modules in `engine/`: `env-file.ts` (parse/stringify, round-trip),
`merge.ts` (core: Content marker + last-win merge + content expansion, pure),
`filter.ts` (include/exclude/content), `genv.ts` (`genv`/`merge_sources` over
`SourceInput`), `mod.ts` (re-exports + dual CLI: direct-run pipes raw stdin,
`genv_cli` reads JSON sources). 30 tests pass (per-layer spec + e2e); lint/fmt
clean; `@std/assert` dropped for local `assert.ts` so `deno.lock` locks nothing;
README + CHANGELOG updated. The old action.yml port ([[003.summary]]) is fully
replaced.

Decisions realized: merge -> resolved object (no duplicate lines); content-vs-
literal is the structural `Content` marker, set by the filter `content` pattern.

Published to JSR as `jsr:@kindkitchen/genv@0.1.0` ([[009.log]]; LICENSE +
publish.exclude added). Follow-ups, owned elsewhere: GitHub adapter mapping action
inputs onto SourceInput (action-js-parity — now consumes the jsr package);
spa-site imports it.
