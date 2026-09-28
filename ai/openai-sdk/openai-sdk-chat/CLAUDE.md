# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A bootcamp exercise: an AI-driven **text adventure** chat app built on Next.js 16 (App Router, React 19, Tailwind v4), the `openai` SDK, and Postgres (via the `postgres` / porsager client). There is no test suite.

## Commands

```bash
docker compose up -d   # start Postgres (host port 5434 -> container 5432)
npm run dev            # dev server on http://localhost:3000
npm run build          # production build (also type-checks)
npm run lint           # ESLint (flat config: next core-web-vitals + typescript)
```

## Environment

- `.env` — `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB`, read by `docker-compose.yml`.
- `.env.local` — `DATABASE_URL` and `OPENAI_API_KEY`, read by Next.js.
- `DATABASE_URL` must use port **5434** (the compose host port). Note `.env.local.example` still shows 5432.
- Path alias: `@/*` → `src/*`.

## Testing

Framework: Vitest. Run with `npm test`.

## Conventions

- Avoid abbreviations in variable names.

## Architecture

**Schema bootstrap:** `src/instrumentation.ts` runs `CREATE TABLE IF NOT EXISTS` for `stories` and `messages` (cascade on delete) at server startup. There are no migrations; schema changes go there.

**Server actions (`src/app/actions.ts`)** are the only backend. There are no API routes. `sendChat(storyId, messages)`:

1. Persists only the _last_ client message (if it's from the user) to `messages`.
2. Reloads the full history for that story **from the DB**, not from the client payload, prepends the game-master system prompt, and calls `gpt-4o-mini` with a strict `json_schema` response format `{ story, options, ended }`.
3. Stores `story` as the assistant message and returns the parsed object.

**Two sources of state:** the client keeps its own copy of chats in `localStorage` (`use-local-storage-state`, key `"chats"`, in `ChatRoom.tsx`). Each `TChat` has a client UUID `id` plus the DB `storyId` from `createStory`. Postgres is the source of truth for the model's context; localStorage drives the UI (sidebar list, rendered messages, titles). Keep these consequences in mind:

- Deleting a chat calls `deleteStory`, which removes the story (and its messages via cascade) from the DB, then removes the chat from localStorage.
- Chat titles are derived client-side from the first user message and never written back to `stories.title`.
- Follow-up options (`options` from the model) live in `Chat.tsx` component state and are lost on chat switch or reload. `handleUpdateMessages` defaults `followups` to `[]`.

**Components:** `page.tsx` → `ChatRoom.tsx` (state owner, exported as `ChatApp`) → `Sidebar.tsx` + `Chat.tsx`. `Chat` is keyed by chat id, so it remounts on switch. Messages render through `react-markdown` with `remark-gfm` and `rehype-highlight`. Shared prop and data types live in `src/app/types.ts` (`T`-prefixed names).

**Commented-out code:** the bottoms of `actions.ts` and `Chat.tsx` hold an earlier generic chat version (`reply`/`followups` schema) and a streaming (`ReadableStream`) variant. They are kept as learning reference, so don't delete them unless asked.
