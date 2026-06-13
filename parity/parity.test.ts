/**
 * Semantic parity: for each fixture, the real action.yml output and the adapter's
 * engine output must resolve to the same env. Both sides are run through the
 * engine `parse` so duplicate lines and `@json` quoting are normalized away.
 */
import { genv, parse } from "../engine/mod.ts";
import { assert_equals } from "../engine/assert.ts";
import { from_action } from "./adapter.ts";
import { run_action } from "./action-runner.ts";
import { fixtures } from "./fixtures.ts";

for (const { name, inputs } of fixtures) {
  Deno.test(`parity: ${name}`, async () => {
    const from_bash = parse(await run_action(inputs as Record<string, string>));
    const from_js = parse(genv(from_action(inputs)));
    assert_equals(from_js, from_bash);
  });
}
