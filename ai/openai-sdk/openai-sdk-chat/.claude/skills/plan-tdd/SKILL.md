---
name: plan-tdd
description: Turn plan/<feature>-refinement.md into a test-driven implementation plan with one step per acceptance criterion, written to plan/<feature>-plan.md.
---

# Plan TDD

Plan the feature named in the arguments (`<feature>`). If no feature is given, ask for one.

## Rules

- Read only `plan/<feature>-refinement.md`. Do not open other files or explore the codebase.
- If the refinement file is missing, stop and tell the user to run the refine skill first.
- The only file you write is `plan/<feature>-plan.md`.

## Output

Write `plan/<feature>-plan.md` with:

- **Test command**: copied from the refinement.
- **Steps**: exactly one step per acceptance criterion, in order. Each step contains:
  - **Criterion**: the acceptance criterion it covers.
  - **Test first (red)**: test file path, test name, and what it asserts.
  - **Implementation (green)**: the files to change and the minimal change to make the test pass.
  - **Refactor**: optional cleanup once green.
  - **Done when**: the new test and all existing tests pass.

This file must be self-contained: the implement-plan skill reads nothing else.
