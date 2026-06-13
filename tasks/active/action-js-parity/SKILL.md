---
name: action-js-parity
description: Test the raw bash action against genv-js so the JS engine is the verified source of truth. Load when working on parity tests, fixtures, or the action's CI test wiring.
created: 2026-06-13
updated: 2026-06-13
tags: [testing, ci, engine]
relates: [js-engine]
---

TODO — depends on js-engine. After the engine pivot ([[002.log]]) this task owns
two things: (a) the adapter mapping the action's GitHub inputs (vars_obj,
secrets_obj, *_include/_exclude, content_from_*) onto the engine's agnostic
source/fragment model, and (b) proving the raw bash action (action.yml) produces
the same dotenv as `adapter(engine merge)` over a corpus of inputs. Spec:
[[001.draft]] (predates the pivot — read with [[002.log]]).

To design: the adapter; a fixture corpus (inputs -> expected); a runner that
executes the bash/jq pipeline and the adapter over the same inputs and diffs
them; and CI wiring that stays thin/fast per project ethos (the e2e.* actions act
like real tests covering each version). Output: parity verified in CI;
divergences become bash bugs or documented adapter caveats.
