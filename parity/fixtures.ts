/** Parity fixture corpus: action input sets exercising every step of the pipeline. */
import type { ActionInputs } from "./adapter.ts";

export interface Fixture {
  name: string;
  inputs: ActionInputs;
}

export const fixtures: Fixture[] = [
  { name: "all defaults", inputs: {} },
  {
    name: "vars key=value",
    inputs: { vars_obj: '{"PORT":"3000"}' },
  },
  {
    name: "vars exclude overrides include",
    inputs: {
      vars_obj: '{"PORT":"3000","TEST_A":"1"}',
      vars_exclude_pattern: "^TEST",
    },
  },
  {
    name: "vars include narrows",
    inputs: {
      vars_obj: '{"DB_HOST":"h","PORT":"3000"}',
      vars_include_pattern: "^DB_",
    },
  },
  {
    name: "content_from_vars inlines a multiline value",
    inputs: {
      vars_obj: '{"CONFIG":"A=1\\nB=2","NAME":"app"}',
      content_from_vars_include_pattern: "^CONFIG$",
      vars_exclude_pattern: "^CONFIG$",
    },
  },
  {
    name: "secrets outrank vars on conflict",
    inputs: {
      vars_obj: '{"K":"v1"}',
      secrets_obj: '{"K":"v2"}',
    },
  },
  {
    name: "dotenv_content appended with absolute priority",
    inputs: {
      vars_obj: '{"K":"from_vars"}',
      dotenv_content: "K=from_literal",
    },
  },
  {
    name: "full pipeline: content + kv for vars then secrets then literal",
    inputs: {
      vars_obj: '{"CONFIG":"PORT=300","NAME":"app"}',
      secrets_obj: '{"APP":"MODE=on","API_KEY":"k"}',
      content_from_vars_include_pattern: "^CONFIG$",
      vars_exclude_pattern: "^CONFIG$",
      content_from_secrets_include_pattern: "^APP$",
      secrets_exclude_pattern: "^APP$",
      dotenv_content: "HELLO=world",
    },
  },
];
