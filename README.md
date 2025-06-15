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

```yaml
# TODO complete this part of the documentation (it is the most important one)
- uses: kindkitchen/genv@v0.0.12
```

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
