---
name: spa-site
description: Build the action's default website — landing, documentation, and an interactive playground to try genv. Load when working on the project site / SPA / docs.
created: 2026-06-12
updated: 2026-06-13
tags: [site, docs, frontend]
relates: [js-engine, site-gh-pages-deploy]
---

Default single-page site for the action: landing, documentation, interactive
playground. The playground is now trivial: it reuses the genv-js engine (slug
js-engine — the source of truth for the merge pipeline) instead of re-porting the
merge logic itself.

Decided ([[003.decision]]): single static `site/index.html` (vanilla, no build);
GitHub-backed comments footer (giscus recommended, utterances fallback); docs =
manual prose + a "Full spec" section generated from action.yml.

Visual style: follow the Dribbble "Build A Map" game UI/UX direction —
https://dribbble.com/shots/24895606-Build-A-Map-game-UI-UX-design (see
[[006.log]]).

State: scaffold only — `site/index.html` skeleton with placeholder sections and
TODO markers; no UI logic yet. Depends on genv-js landing first.

Next: build the playground UI over genv-js (live last-win .env render), docs
(prose + action.yml generator into the GENERATED:action-inputs block), landing
copy, giscus wiring. Deployment is the dependent task site-gh-pages-deploy.
