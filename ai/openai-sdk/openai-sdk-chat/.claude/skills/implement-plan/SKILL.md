---
name: implement-plan
description: Implement plan/<feature>-plan.md step by step, test first. Follows the plan without re-exploring the codebase.
---

# Implement Plan

Implement the feature named in the arguments (`<feature>`). If no feature is given, ask for one.

## Rules

- Read only `plan/<feature>-plan.md` for guidance. Don't re-explore the codebase; open only the files a step names.
- If the plan file is missing, stop and tell the user to run the plan-tdd skill first.
- Work through the steps in order, one at a time.

## For each step

1. Write the test described in the step.
2. Run the test command and confirm the new test fails (red).
3. Make the minimal implementation change the step describes.
4. Run the tests again and confirm they all pass (green).
5. Do the refactor if the step lists one, then re-run the tests.
6. Report the step as done before starting the next one.

If a step can't be completed as planned, stop and report the failing output instead of improvising a different design.
