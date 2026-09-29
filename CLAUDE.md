# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A collection of web-advanced bootcamp challenge solutions, not a single app. Each topic folder (`typescript/`, `web-backend-development/`, `nestjs/`, `nextjs/`, `devops/`, `real-time-communication/`, `ai/`, `software-design/`, `coding-assessments/`) holds one subfolder per lesson, and each lesson holds one or more **independent projects**. Each project has its own `package.json`, `node_modules` and lockfile. There is no workspace tooling and no root build, lint or test command.

The task for a lesson is usually in that lesson's or project's `README.md` (e.g. "Task 1 … Task 3"). Read it before changing a challenge.

Some projects are the same app carried forward across lessons (e.g. `cyber-chat` → `cyber-chat_typeorm` → `cyber-chat_restful` → `cyber-chat_auth` → `cyber-chat_swagger` → `cyber-chat_testing`; `kikis-delivery-service` and `code-snippet-library` across the `nextjs/` lessons). Each copy is a separate snapshot. Edit only the one the user means, and don't sync changes to the other copies.

## Working in a project

Always `cd` into the specific project directory before running commands. Scripts differ between projects, so check that project's `package.json` first. Typical stacks:

- **Next.js** (`nextjs/*`, `ai/*`, `real-time-communication/polling_and_server-sent-events/*`): `npm run dev` / `npm run build`. Several have a `docker-compose.yml` for Postgres (`docker compose up -d`).
- **NestJS** (`nestjs/*`, `devops/*/cyber-chat*`): `npm run start:dev`. Most use TypeORM with SQLite (`better-sqlite3`). `cyber-chat_typeorm` has `npm run migration:generate|run|revert`. `nestjs_basics-2/cyber-chat` runs on Bun.
- **Express** (`web-backend-development/*`): `npm run dev` (`tsx watch src/index.ts`, or `nodemon` in the MVC challenge).
- **Docker** (`devops/devops_docker-*`): Dockerfiles and compose files. `scoreboard-service_adv` has `npm run docker:dev` / `docker:prod`.

## Tests

Tests are Vitest wherever they exist. Most projects have none, and their `test` script is the npm placeholder that exits 1.

- `ai/openai-sdk/openai-sdk-chat`: `npm test`, or `npx vitest run src/lib/formatSentAt.test.ts` for a single file.
- `devops/devops_testing/cyber-chat_testing`: `npx vitest run` (its `npm test` is still the placeholder). Uses `unplugin-swc` for Nest decorators, with a `src` path alias.
- `devops/devops_testing/code-along`: `npx vitest run cart.spec.ts`.
- `devops/devops_docker-basics/cyber-chat`: Jest (`npm test`, `npm run test:e2e`).

The root `package.json` only holds shared Vitest/Testing Library devDependencies.

## Project-level guidance

`ai/openai-sdk/openai-sdk-chat/CLAUDE.md` documents that app's architecture (server actions, Postgres on port 5434, localStorage vs DB state). Read it when working there.

The `/ship` skill in `ai/openai-sdk/openai-sdk-chat/.claude/skills/ship/` runs tests, `tsc` and lint for `openai-sdk-chat`, then commits the staged changes.

## Git conventions

- Commit subjects are lowercase and imperative (e.g. `add formatSentAt helper for message timestamps with tests`).
- Challenges are developed on `challenge/<topic>` branches and merged into `main` via PR.
- `coding-assessments/` challenges are meant to be solved **without AI help** (see its README). Don't write solutions there unless the user explicitly asks.
