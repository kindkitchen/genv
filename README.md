# genv

> _gen env_

## About

This GitHub Action compute dotenv file from github vars and secrets. Then you
may pass it whenever you need.

## The main key points on which this implementation is focused:

1. Minimum dependency between changing your vars/secrets in repository and
   changing your action's files
   > So you will have possibility to update your environment (not only values
   > but keys) without need to make new commits in your yml. So you can simply
   > rerun some workflow.
2. Flexibility in choosing strategy how you want to declare your dotenv. So this
   is combination from such factors:
   - include/exclude pattern matching
   - value as single value or as part of dotenv's content
   - mapping to new names or shorthand syntax for the same ones
   - order of merging (prioritizing)

## Usage

- #### Example with all options:
  ```yaml
  ### All options are optional,
  ### but it important to understand their relations from each other
  ### to be able flexibly satisfies all your requirements.
  ###
  ### Below the example with exhaustive usage of all options
  uses: kindkitchen/genv@v1.0.0
  with:
    dotenv_path: ./.env
    vars_obj: ${{ toJson(vars) }}
    secrets_obj: ${{ toJson(secrets) }}
    content_from_vars_include_pattern: "^CONFIG$"
    vars_include_pattern: ".*"
    vars_exclude_pattern: "^TEST"
    content_from_secrets_include_pattern: "^APP$"
    secrets_include_pattern: ".*"
    secrets_exclude_pattern: "GITHUB"
    dotenv_content: |
      HELLO=world
      OK=captain
  ```
  0. The core options:
     - `dotenv_path` the path to dotenv file where result will be stored
     - `vars_obj` json string with low priority variables _(probably you may
       want use `toJson(vars)` as in example)_
     - `secrets_obj` json string with higher priority
  1. `content_from_vars_include_pattern` - here `vars.CONFIG` will be appended
     to `.env` file. And because this defined in
     `content_from_vars_include_pattern` the content will be treated as already
     part of the `.env`. So possibly in your repository you can have var
     `CONFIG` with value
     ```
     PORT=300
     DB_NAME=example
     ```
  2. `vars_include_pattern` - we continue to processing github's `vars` that
     should have single value _(not part of the content)_.
  3. `vars_exclude_pattern` - all passed vars from previous step are filtered by
     not match this pattern
  4. Then repeat previous steps but for secrets:
     - `content_from_secrets_include_pattern`
     - `secrets_include_pattern`
     - `secrets_exclude_pattern`
  5. `dotenv_content` - the part of dotenv with absolute priority

  ---
  > **This order describe the priority of applying variables on conflict.**
  > <sub> Currently all variants of conflicted keys will be present and the
  > priority relayed on assumption that the consumer of your dotenv file will
  > use strategy `last written win` </sub>

#### May be you not need this action

> If you have not so many variables that should be passed into dotenv file - may
> be the simpler solution will be something like this:

- One of the simplest and straightforward alternatives

```yaml
- run: |
    echo "PORT=${{ vars.PORT }}" >> .env
    echo "PORT=${{ secrets.API_KEY }}" >> .env
```

- Usage of the another, more authority and famous github action:
  [https://github.com/marketplace?query=dotenv](https://github.com/marketplace?query=dotenv)
  > Read
  > [what is the main features of this action](#the-main-key-points-on-which-this-implementation-is-focused)
