/**
 * Run the real `action.yml` composite steps over a set of inputs and return the
 * dotenv text it produces. Parses action.yml (so it tracks the actual action,
 * not a copy), resolves `${{ inputs.* }}` in each step's env, honours the step
 * `if` conditions, and executes the bash/jq `run` blocks against a temp file.
 */
import { parse as parse_yaml } from "@std/yaml";

interface Step {
  name?: string;
  if?: string;
  run: string;
  env?: Record<string, string>;
}

interface Action {
  inputs: Record<string, { default?: string }>;
  runs: { steps: Step[] };
}

const action_path = new URL("../action.yml", import.meta.url);
const action = parse_yaml(await Deno.readTextFile(action_path)) as Action;

/** action.yml input defaults. */
function defaults(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, spec] of Object.entries(action.inputs)) {
    out[key] = spec.default ?? "";
  }
  return out;
}

/** Resolve `${{ inputs.NAME }}` references against the resolved inputs. */
function interpolate(text: string, inputs: Record<string, string>): string {
  return text.replace(
    /\$\{\{\s*inputs\.([a-zA-Z_]+)\s*\}\}/g,
    (_, name: string) => inputs[name] ?? "",
  );
}

/** Evaluate the supported `if` form: `${{ inputs.NAME != '' }}`. */
function step_enabled(step: Step, inputs: Record<string, string>): boolean {
  if (!step.if) return true;
  const match = step.if.match(/inputs\.([a-zA-Z_]+)\s*!=\s*''/);
  if (!match) throw new Error(`unhandled step \`if\`: ${step.if}`);
  return (inputs[match[1]] ?? "") !== "";
}

/** Execute the action over `overrides` (action input names) and return the dotenv text. */
export async function run_action(
  overrides: Record<string, string>,
): Promise<string> {
  const inputs = { ...defaults(), ...overrides };
  const dotenv_path = await Deno.makeTempFile();
  inputs.dotenv_path = dotenv_path;
  try {
    for (const step of action.runs.steps) {
      if (!step_enabled(step, inputs)) continue;
      const env: Record<string, string> = {};
      for (const [key, value] of Object.entries(step.env ?? {})) {
        env[key] = interpolate(value, inputs);
      }
      const { success, stderr } = await new Deno.Command("bash", {
        args: ["-c", step.run],
        env,
        stdout: "null",
        stderr: "piped",
      }).output();
      if (!success) {
        throw new Error(
          `action step failed (${step.name}): ${
            new TextDecoder().decode(stderr)
          }`,
        );
      }
    }
    return await Deno.readTextFile(dotenv_path);
  } finally {
    await Deno.remove(dotenv_path);
  }
}
