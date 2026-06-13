---
name: action-js-parity
description: Test the raw bash action against genv-js so the JS engine is the verified source of truth. Load when working on parity tests, fixtures, or the action's CI test wiring.
created: 2026-06-13
updated: 2026-06-13
tags: [testing, ci, engine]
relates: [js-engine]
---

TODO — depends on js-engine (genv-js must exist). Goal: prove the raw bash action
(action.yml) produces the same dotenv output as genv() for a corpus of inputs,
making genv-js the source of truth. Spec: [[001.draft]].

To design: a fixture corpus (inputs -> expected), a runner that executes the
bash/jq pipeline and genv() over the same inputs and diffs them, and CI wiring
that stays thin/fast per project ethos (the e2e.* actions act like real tests
covering each version). Output: parity verified in CI; divergences become bash
bugs or documented engine caveats.
