---
name: refine
description: Survey the codebase for a feature before planning. Runs parallel sub-agents over the route structure, data layer and test setup, then writes findings to plan/<feature>-refinement.md. Read-only; never changes code.
---

# Refine

Refine the feature named in the arguments (`<feature>`, kebab-case). If no feature is given, ask for one.

## Rules

- Do not change any code. The only file you write is `plan/<feature>-refinement.md`.
- Use the Agent tool (Explore type) to launch these three surveys in parallel, in a single message:
  1. **Route structure**: pages, API routes, layouts and how requests flow for this feature.
  2. **Data layer**: models, schemas, database/API clients, and the data the feature reads or writes.
  3. **Test setup**: test runner, config, existing test patterns, helpers/mocks, and how to run the tests.
- Ask each agent for concrete file paths (`path:line`) and a short summary, not file dumps.

## Output

Write `plan/<feature>-refinement.md` with these sections:

- **Feature**: one-paragraph summary of the goal.
- **Acceptance criteria**: a numbered list, testable and specific.
- **Route structure**: findings from agent 1.
- **Data layer**: findings from agent 2.
- **Test setup**: findings from agent 3, including the exact test command.
- **Open questions / risks**.

This file must be self-contained: the plan-tdd skill reads nothing else.
