---
name: site-gh-pages-deploy
description: Investigate how to deploy the project site to GitHub Pages from this repo. Load when working on Pages deploy, the site's CI/publish workflow, or hosting.
created: 2026-06-12
updated: 2026-06-13
tags: [site, deploy, ci, github-pages]
relates: [spa-site]
---

TODO — depends on [[spa-site]] (the site must exist first). Investigate what is
needed to deploy that site to GitHub Pages from this repository.

Investigation scope (not yet started): build/publish workflow (actions/configure-
pages, upload-pages-artifact, deploy-pages), Pages source (branch vs Actions),
base-path/routing for a project page (repo subpath) so the SPA's assets and
client-side routes resolve, and coexistence with the existing action + e2e
workflows (Pages deploy must not interfere with the thin/fast action). Output:
a recommended deploy approach, not necessarily the implementation.

Note: the SPA reuses the genv-js engine (slug js-engine), a static JS module, so
the publish just serves `site/` with that module bundled/imported — no server
side. Dependency chain: js-engine -> spa-site -> this task.
