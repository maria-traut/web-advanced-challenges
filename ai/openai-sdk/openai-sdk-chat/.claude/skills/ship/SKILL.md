---
name: ship
description: Run tests and linter for openai-sdk-chat, then commit staged changes with a generated message. Use when the user wants to ship or commit their work.
disable-model-invocation: true
---

Run every command from the project directory (`ai/openai-sdk/openai-sdk-chat`, the folder containing this `.claude/`). Follow these steps in order. Stop immediately if a step fails.

1. Run the test suite (`npm run test -- --run`).
   - If any test fails: report the failures and ABORT. Do not commit.
2. Run the type checker (`npx tsc --noEmit`).
   - If there are type errors: report them and ABORT. Do not commit.
3. Run the linter (`npm run lint`).
   - If there are errors: report them and ABORT. Do not commit.
4. Run `git diff --staged --name-only` to list everything that will be committed, and `git diff --staged -- .` to see the changes in this project.
   - If nothing is staged: tell the user and ABORT.
   - If staged files lie outside this project: list them for the user and ABORT.
5. Write a concise commit message in lowercase imperative mood that describes
   the staged changes, then run `git commit -m "<message>"` with no pathspec, so only the staged changes are committed.
6. Show the resulting commit with `git log -1 --stat`.

Never use `git add`, `--no-verify` or force flags.
