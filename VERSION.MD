# 0.1.4

- declared params
- first step - merge batch-vars values
- second step - merge vars (key=value)
- third step - merge batch-secrets values
- fourth step - merge secrets (key=value)

---

#### Important fixes

1. Steps with merging batched vars/secrets should be executed only if
   `include_pattern` is not empty string
2. **`"*"`** as **match all pattern** is not valid for `jq` _(the star should be
   applied to something)_

   - correct: `".*"`
   - so prev mention about diff between `"$"` and `'$'` in yaml _(last variant
     is incorrect)_ though still be correct - it is actually not related to prev
     bugs

## TODO

Add task to create documentation about regex specifics, extend examples, link to
`jq`.
