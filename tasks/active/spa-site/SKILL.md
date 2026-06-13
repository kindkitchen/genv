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

State: only the scaffold exists — `site/index.html` skeleton with placeholder
sections and TODO markers; no UI logic yet.

Open before building: does the playground demonstrate the generic engine (ordered
sources: data + include/exclude/content) or the GitHub action inputs
(vars/secrets/patterns via a small in-site adapter mirroring parity's
from_action)? Then: landing copy, docs generator, giscus wiring. Deployment is the
dependent task site-gh-pages-deploy.
