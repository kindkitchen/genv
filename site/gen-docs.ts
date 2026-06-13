/**
 * Dev tool (not part of the deployed site): regenerate the "Full spec" table in
 * index.html from action.yml's `inputs`, so the docs reference can't drift from
 * the real action. Re-run after changing action.yml inputs.
 *
 *   deno run --allow-read --allow-write site/gen-docs.ts
 */
import { parse } from "jsr:@std/yaml@^1";

interface Input {
  description?: string;
  default?: string;
}

const root = new URL("../", import.meta.url);
const action = parse(
  await Deno.readTextFile(new URL("action.yml", root)),
) as { inputs: Record<string, Input> };

const esc = (s: unknown): string =>
  String(s).replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!,
  );

const rows = Object.entries(action.inputs).map(([name, spec]) => {
  const def = spec.default ?? "";
  const def_cell = def === "" ? "<em>—</em>" : `<code>${esc(def)}</code>`;
  return `          <tr><td><code>${esc(name)}</code></td><td>${
    esc(spec.description ?? "")
  }</td><td>${def_cell}</td></tr>`;
}).join("\n");

const table = `<table class="spec">
        <thead><tr><th>input</th><th>description</th><th>default</th></tr></thead>
        <tbody>
${rows}
        </tbody>
      </table>`;

const START = "<!-- GENERATED:action-inputs:start -->";
const END = "<!-- GENERATED:action-inputs:end -->";

const index = new URL("index.html", import.meta.url);
const html = await Deno.readTextFile(index);
const region = new RegExp(`${START}[\\s\\S]*?${END}`);
if (!region.test(html)) {
  console.error(`marker ${START} … ${END} not found in index.html`);
  Deno.exit(1);
}
await Deno.writeTextFile(
  index,
  html.replace(region, `${START}\n      ${table}\n      ${END}`),
);
console.log(
  `Updated Full spec table: ${Object.keys(action.inputs).length} inputs.`,
);
