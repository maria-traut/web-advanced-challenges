---
name: ship
description: Run tests and linter for openai-sdk-chat, then commit staged changes with a generated message. Use when the user wants to ship or commit their work.
disable-model-invocation: true
---

Work in the `openai-sdk-chat` directory. Follow these steps in order. Stop immediately if a step fails.

1. In `openai-sdk-chat`, run the test suite (`npm run test`).
   - If any test fails: report the failures and ABORT. Do not commit.
2. Run the type checker (`npx tsc --noEmit`).
   - If there are type errors: report them and ABORT. Do not commit.
3. Run the linter (`npm run lint`).
   - If there are errors: report them and ABORT. Do not commit.
4. Run `git diff --staged -- openai-sdk-chat` from the repo root to see what will be committed.
   - If nothing is staged: tell the user and ABORT.
5. Write a concise commit message in imperative mood that describes
   the staged changes, then run `git commit -m "<message>" -- openai-sdk-chat`.
6. Show the resulting commit with `git log -1 --stat`.

Never use `git add`, `--no-verify` or force flags.
