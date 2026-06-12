common:

- keep answers concise
- respond directly
- provide explanations only when explicitly requested
- avoid filler or emotional language
- do not use emojis
- do not push
- do not create pr
- do not create co-authors in commits
- snake_case for variables and properties
- kebab-case for files
- validate feature-request on compatibility moment, how it may affect public API

project:

- in .github/workflows the e2e.* actions acts like a real tests - the should cover at least each new version
- the github action itself should be as possible thin and fast (that's why it's fully bash scripted)
- current justfile is used internally and is not intended to be part or dependency of action

release:

- follow DEPLOY.md for any release / tag / publish task
- e2e is self-invoking (`uses: kindkitchen/genv@vX.Y.Z`), so the tag must exist
  before its e2e runs: test against a disposable `vX.Y.Z-candidate` tag, promote
  to the immutable `vX.Y.Z` tag only when green, then update main
- after a squash-merge, reset the working branch to main before continuing


