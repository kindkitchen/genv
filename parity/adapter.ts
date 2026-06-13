/**
 * GitHub-action adapter: map the `action.yml` inputs onto the agnostic engine's
 * ordered `SourceInput[]`. Lives in the parent repo, not the engine — it is the
 * one place that knows about vars/secrets/include/exclude/content_from.
 *
 * The 5-step append pipeline becomes 5 ordered sources; the engine's last-win
 * merge resolves them.
 */
import { genv, type SourceInput } from "../engine/mod.ts";

/** The `vars_exclude`/`secrets_exclude` default from action.yml: matches no real key. */
const IMPOSSIBLE = "NOTING_this_is_hardcoded_impossible_pattern{10}";

/** Inputs mirroring action.yml (snake_case), each optional with the action's default. */
export interface ActionInputs {
  vars_obj?: string;
  secrets_obj?: string;
  dotenv_content?: string;
  vars_include_pattern?: string;
  vars_exclude_pattern?: string;
  secrets_include_pattern?: string;
  secrets_exclude_pattern?: string;
  content_from_vars_include_pattern?: string;
  content_from_secrets_include_pattern?: string;
}

/** Translate action inputs into the engine's ordered source list. */
export function from_action(inputs: ActionInputs): SourceInput[] {
  const vars = JSON.parse(inputs.vars_obj ?? "{}") as Record<string, string>;
  const secrets = JSON.parse(inputs.secrets_obj ?? "{}") as Record<
    string,
    string
  >;
  const vars_include = inputs.vars_include_pattern ?? ".*";
  const vars_exclude = inputs.vars_exclude_pattern ?? IMPOSSIBLE;
  const secrets_include = inputs.secrets_include_pattern ?? ".*";
  const secrets_exclude = inputs.secrets_exclude_pattern ?? IMPOSSIBLE;
  const content_from_vars = inputs.content_from_vars_include_pattern ?? "";
  const content_from_secrets = inputs.content_from_secrets_include_pattern ??
    "";

  const sources: SourceInput[] = [];
  // 1. content_from_vars: matched keys' values inlined as content.
  if (content_from_vars !== "") {
    sources.push({
      data: vars,
      include: content_from_vars,
      content: content_from_vars,
    });
  }
  // 2. vars key=value.
  sources.push({ data: vars, include: vars_include, exclude: vars_exclude });
  // 3. content_from_secrets.
  if (content_from_secrets !== "") {
    sources.push({
      data: secrets,
      include: content_from_secrets,
      content: content_from_secrets,
    });
  }
  // 4. secrets key=value (outrank vars — appended later).
  sources.push({
    data: secrets,
    include: secrets_include,
    exclude: secrets_exclude,
  });
  // 5. literal block, absolute priority.
  sources.push({ data: inputs.dotenv_content ?? "" });
  return sources;
}

/** Render the dotenv body the action would produce, via the engine. */
export function genv_action(inputs: ActionInputs): string {
  return genv(from_action(inputs));
}
