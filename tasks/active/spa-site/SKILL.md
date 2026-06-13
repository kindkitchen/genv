---
name: spa-site
description: Build the action's default website — landing, documentation, and an interactive playground to try genv. Load when working on the project site / SPA / docs.
created: 2026-06-12
updated: 2026-06-13
tags: [site, docs, frontend]
relates: [js-engine, site-gh-pages-deploy]
---

ACTIVE (resumed [[007.log]]) — single-page site for the action: landing,
documentation, interactive playground. Visual style: Dribbble "Build A Map" game
UI/UX — https://dribbble.com/shots/24895606-Build-A-Map-game-UI-UX-design
([[006.log]]).

The engine is published and source-agnostic: the playground reuses
`jsr:@kindkitchen/genv` directly, in-browser via esm.sh (no build step), per the
single-static-file decision ([[003.decision]]). The old action-coupled merge spec
[[002.analysis]] is superseded by the engine API (genv/merge_sources over ordered
SourceInput; parse/stringify).

Decided ([[003.decision]]): single static `site/index.html` (vanilla, no build);
GitHub-backed comments footer (giscus); docs = manual prose + a "Full spec"
section generated from action.yml.

Playground model decided ([[008.decision]]): exposes the GitHub Action inputs
(vars/secrets/dotenv_content + 6 patterns) via an in-site `from_action` adapter
onto engine sources; engine loaded from esm.sh; output is the resolved (deduped,
last-win) env.

State ([[009.summary]]): `site/index.html` is a working single-file playground —
live inputs -> resolved `.env` + per-step merge timeline + copy; brief landing and
hand-written 5-step docs; `GENERATED:action-inputs` marker kept. Engine/adapter
logic validated against the real published engine; live-browser DOM wiring not yet
confirmed.

Next: Build-A-Map visual pass; docs "Full spec" generator from action.yml; expand
landing; giscus wiring; confirm in a browser. Deployment is the dependent task
site-gh-pages-deploy.
