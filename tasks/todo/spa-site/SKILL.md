---
name: spa-site
description: Build the action's default website — landing, documentation, and an interactive playground to try genv. Load when working on the project site / SPA / docs.
created: 2026-06-12
updated: 2026-06-12
tags: [site, docs, frontend]
relates: [site-gh-pages-deploy]
---

TODO. Build a single-page site that serves as the default site for this GitHub
Action, with three parts:
- landing — what genv is and why
- documentation — the options and merge hierarchy (mirror README, kept in sync)
- interactive playground — let users try and feel the project: enter vars/secrets
  JSON + patterns + dotenv_content, see the generated dotenv update live and
  illustratively (show the 5-step merge / last-win hierarchy).

Not started. Open questions to resolve when picked up: framework/build tooling,
how to run the merge logic client-side (the action is bash+jq — reimplement the
pipeline in JS, or compile/port it), and how docs stay in sync with README.
Deployment is the separate dependent task [[site-gh-pages-deploy]].
