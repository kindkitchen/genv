# DEPLOY

How to cut a release. The e2e workflows are self-invoking: each pins
`uses: kindkitchen/genv@vX.Y.Z` and so tests the action **as published at that
tag**. A tag therefore has to exist before its e2e can run, but `main` must not
be updated until the e2e is green. The candidate-tag flow below breaks that
deadlock.

## Concepts

- **candidate tag** `vX.Y.Z-candidate` — mutable and disposable. Only exists to
  drive the e2e before release. Force-move and re-push it as many times as the
  fix loop needs. Deleted after release.
- **final tag** `vX.Y.Z` — immutable. Pushed once, never moved. This is the real
  release that consumers pin.
- A **pushed git tag is enough** for `uses: kindkitchen/genv@<tag>` to resolve.
  Creating a GitHub Release / Marketplace listing is a separate, optional step
  and is not required for the e2e to pass.

Running example below: releasing `v1.0.2` (replace with your version).

## Steps

### 1. Branch and change

Work on a feature branch (or `dev`). Make the action changes.

### 2. Bump the version

- Edit the first line of `VERSION.MD` to the target semver (`# 1.0.2`) and add
  the changelog bullets.
- Run `just bump` — validates the semver and rewrites the `kindkitchen/genv@v…`
  refs in `README.md`.

### 3. Author the version's e2e

Copy the latest `e2e.self-invocation.vPREV.yml` to
`e2e.self-invocation.v1.0.2.yml`. In the new file:

- `name:` and the trigger tags cover both the candidate and the final tag:
  ```yaml
  on:
    push:
      tags:
        - v1.0.2
        - v1.0.2-candidate
      branches:
        - main
  ```
- Pin every `uses:` to the **candidate** for now:
  `uses: kindkitchen/genv@v1.0.2-candidate`
- Keep all prior scenario jobs (cumulative suite) and add one job for whatever
  behavior this version introduces.

Commit on the branch.

### 4. Candidate loop

```
git tag -f v1.0.2-candidate
git push -f origin v1.0.2-candidate
```

Pushing the candidate tag triggers the e2e against `@v1.0.2-candidate`. Watch the
run.

- **Red?** Fix on the branch, commit, then repeat the two commands above. The
  forced tag move re-points the candidate at the new HEAD and re-triggers the
  e2e. Loop until green. (You are only ever republishing the disposable
  candidate — the real tag is never touched.)

### 5. Promote

When the candidate is green, edit the e2e file's `uses:` from
`@v1.0.2-candidate` to `@v1.0.2` (drop the suffix). Commit. Only the ref string
changes; the tested code is identical.

### 6. Final tag

```
git tag v1.0.2
git push origin v1.0.2
```

This triggers the e2e against the real `@v1.0.2` — the final gate. Confirm green.
Do **not** move this tag afterwards.

### 7. Merge to main

Open the branch → `main` PR (squash). Merge once the final-tag e2e is green.

### 8. Post-merge hygiene

- Reset the branch to main so a future session does not re-replay
  already-squashed commits (the squash-merge divergence trap):
  ```
  git fetch origin
  git checkout dev
  git reset --hard origin/main
  ```
- Delete the candidate tag (local and remote):
  ```
  git push origin :refs/tags/v1.0.2-candidate
  git tag -d v1.0.2-candidate
  ```
- Optional: publish a GitHub Release / Marketplace listing for `v1.0.2`, and/or
  move a floating major tag (e.g. `v1`) to the new commit if you maintain one.

## Notes

- If a final tag already exists on the remote by mistake (e.g. a premature
  `vX.Y.Z`), reconcile it first: confirm nothing consumes it, then delete
  (`git push origin :refs/tags/vX.Y.Z`) or re-point it before continuing.
- Lighter alternative (skips candidate tags): pin `uses:@vX.Y.Z`, push the real
  `vX.Y.Z` tag pre-merge and force-move it during the fix loop, finalize when
  green. Simpler, but it mutates a release tag while iterating — only safe while
  nothing consumes that version yet.
