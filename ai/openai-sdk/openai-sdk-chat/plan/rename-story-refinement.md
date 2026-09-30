# rename-story: refinement

All paths are relative to the project root `openai-sdk-chat/`.

## Feature

Add a server action `renameStory(storyId, title)` in `src/app/actions.ts` that updates `stories.title` for one story. The title is trimmed and must not be empty. Renaming a story that doesn't exist returns a clear failure. After renaming, the sidebar shows the new title. Because the sidebar reads titles from localStorage (not the DB), the client must also update its local chat state after a successful rename. The refinement also covers how the data layer can be tested with Vitest.

## Acceptance criteria

1. `renameStory(storyId: number, title: string)` is exported from `src/app/actions.ts` (a `"use server"` file).
2. The title is trimmed before it is stored, e.g. `"  Dragon Quest  "` is stored as `"Dragon Quest"`.
3. An empty title, or a whitespace-only title, is rejected. No SQL `UPDATE` is executed and the action returns a clear failure.
4. For an existing story, the action runs `UPDATE stories SET title = <trimmed> WHERE id = <storyId> RETURNING *` and returns success with the updated story.
5. For a non-existent `storyId` (the UPDATE matches no row), the action returns a clear failure (e.g. `{ ok: false, error: "Story not found" }`) and does not throw an unhandled error.
6. Renaming does not affect the story's messages (only `stories.title` changes).
7. On the client, `ChatRoom.tsx` has a `handleRenameChat(chatId, title)` that calls `renameStory(chat.storyId, title)`. Only on success does it update the matching `TChat.title` in the `chats` state via the functional form `setChats(prev => prev.map(...))`. The new title is persisted in localStorage and appears in the sidebar.
8. On failure (empty title or story not found), the local chat title is left unchanged.
9. A rename UI exists that lets the user trigger the rename. The exact place is decided in the plan (see Open questions).
10. Unit tests for `renameStory` run under Vitest, covering criteria 2 to 6, without needing a running Postgres or an OpenAI key.

## Route structure

- Single page `src/app/page.tsx:3-11` (server component) renders `<ChatApp />` from `./components/ChatRoom`. Root layout is `src/app/layout.tsx:31-39`. No dynamic routes, no nested layouts.
- **No API routes.** All backend logic is server actions in `src/app/actions.ts` (`"use server"` at line 1):
  - `sendChat` (line 14), `createStory` (69), `deleteStory` (79), `getMessages` (87), `getStories` (96, never called anywhere).
- Actions are called by direct import, not `useActionState` or forms:
  - `src/app/components/ChatRoom.tsx:6` imports `createStory, deleteStory`.
  - `handleNewChat` (line 11) awaits `createStory("New Chat")` and stores `storyId: story.id`, `title: story.title`.
  - `handleDeleteChat` (line 54; body around 101-109) awaits `deleteStory(chatToDelete.storyId)` and then filters the chat out with the functional `setChats`.
  - `src/app/components/Chat.tsx:4` imports `sendChat` (used at lines 27-30 and 45-48). `Chat` receives callbacks as props and never touches titles. `onDeleteChat` is wired at `Chat.tsx:60`, with the delete button near line 59.
- **The sidebar reads titles from localStorage, not the DB.**
  - `ChatRoom.tsx:51-53`: `useLocalStorageState<TChat[]>("chats", { defaultValue: [] })`, passed to `<Sidebar>` at lines 113-118.
  - `Sidebar.tsx` is presentational (no `"use client"`, no local state). It renders `{chat.title}` at line 161 inside a button at lines 153-162. It has no rename or delete UI.
  - `TSidebarProps` is in `src/app/types.ts:13-18` (`chats`, `activeChatId`, `onSelectChat`, `onNewChat`). `TChatProps` is at `types.ts:20-28`.
  - `stories.title` in the DB stays `"New Chat"`. The auto-title happens client-side only, in `handleUpdateMessages` (`ChatRoom.tsx:79-99`, title logic at lines 91-94, `getTitleFromMessage` at 72-77, truncated to 50 characters). `getStories()` is unused.
- Wiring needed:
  1. Add the `renameStory` action next to `deleteStory` (`actions.ts:79`).
  2. Add `handleRenameChat(chatId, title)` in `ChatRoom.tsx`, modelled on `handleDeleteChat`. Use the functional `setChats(prev => prev.map(c => c.id === chatId ? { ...c, title } : c))`, since the non-functional `setChats(chats.map(...))` in `handleUpdateMessages` can go stale after an `await`.
  3. Add an `onRenameChat` prop to `TSidebarProps` or `TChatProps` (`types.ts`), depending on where the UI goes.
  4. Add the rename UI: in `Sidebar.tsx` around lines 153-162, or in `Chat.tsx` near line 59. If `Sidebar.tsx` gets edit-mode state it needs `"use client"`.
- Interaction to watch: `handleUpdateMessages` (`ChatRoom.tsx:91-94`) only overwrites titles equal to `"New Chat"`, so a custom rename is safe. A user renaming a chat back to the literal "New Chat" would be auto-retitled on the next first-message update.

## Data layer

- Client: `src/lib/db.ts:1-3` is `export const sql = postgres(process.env.DATABASE_URL!)` (porsager `postgres ^3.4.9`, `package.json:16`). It is a single shared instance. It is imported as `@/lib/db` in `actions.ts:5` and as `./lib/db` in `src/instrumentation.ts:1`.
- Schema (`src/instrumentation.ts:4-19`, `CREATE TABLE IF NOT EXISTS` in `register()`):
  - `stories(id SERIAL PRIMARY KEY, title TEXT NOT NULL, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`. There is no length limit, CHECK, UNIQUE or `updated` column. `title` already exists, so **no schema change or migration is needed**.
  - `messages(id SERIAL PK, story_id INTEGER NOT NULL REFERENCES stories(id) ON DELETE CASCADE, role TEXT NOT NULL, content TEXT NOT NULL)`.
- Existing actions:
  - `createStory(title)` (`actions.ts:69-77`): `INSERT ... RETURNING *`, destructures `[story]`, returns the raw row. No validation or trimming.
  - `deleteStory(storyId: number)` (`actions.ts:79-85`): `DELETE FROM stories WHERE id = ${storyId}`, returns nothing, does not check the affected row count.
  - `getMessages` (87-94) and `getStories` (96-102, `ORDER BY created DESC`).
  - `sendChat` (14-67): its only explicit error is `throw new Error("OpenAI returned an empty response")` at line 59.
  - `src/lib/stories.ts` has `addMessage` (takes an optional `database: typeof sql | TransactionSql` argument, an injection point) and `saveTurn` (uses `sql.begin`).
- **Not-found handling: none exists today**, and there is no result-object convention (`{ ok, error }`). Actions either return rows or throw. The only relevant pattern is `const [row] = await sql\`... RETURNING *\``, which yields `undefined` when no row matches. The plan must pick one failure shape for `renameStory` (recommended: a result object, see Open questions).
- Types: `src/app/types.ts` is UI-only. `TChat` (lines 5-11) has `id: string` (client UUID), `storyId: number` (DB serial id), `title`, `messages`, `followups`. There is no `TStory` type; DB rows are untyped. The DB id is `number` on the server side.
- Recommended query: `UPDATE stories SET title = ${trimmedTitle} WHERE id = ${storyId} RETURNING *`. The `[story]` result is `undefined` when the story doesn't exist.

## Test setup

- **Vitest is already installed and configured.** Nothing needs installing for a mocked test.
  - `package.json:10`: `"test": "vitest"` (watch mode). devDependencies include `vitest ^4.1.11`, `@vitejs/plugin-react`, `jsdom`, `vite-tsconfig-paths`.
  - `vitest.config.mts:1-10`: `plugins: [tsconfigPaths(), react()]`, `test.environment: "jsdom"`. The `@/*` alias (`tsconfig.json:21-23`) is resolved by `vite-tsconfig-paths`, so no manual alias is needed.
  - No `setupFiles`, `include` or `globals`: tests must import `describe`, `it`, `expect`, `vi` from `"vitest"` explicitly, as `src/lib/formatSentAt.test.ts:1` does.
  - The only existing test is `src/lib/formatSentAt.test.ts` (pure function, no mocks). There are no `__tests__` or `__mocks__` directories and no shared helpers.
- **Exact test commands**
  - Watch mode: `npm test`
  - Single run (use this for CI or agents): `npx vitest run`
  - One file: `npx vitest run src/app/actions.test.ts`
- Server-code facts relevant to testing:
  - The `"use server"` directive has no effect under Vitest, so `renameStory` can be imported and called directly.
  - `actions.ts:4-6` imports `@/lib/openai` (which reads `OPENAI_API_KEY` at import, `src/lib/openai.ts:4`), `@/lib/db`, and `@/lib/stories`. Importing `actions.ts` in a test therefore needs `@/lib/db` and `@/lib/openai` mocked.
  - Vitest does not load `.env.local` (only Next does), so `DATABASE_URL` and `OPENAI_API_KEY` are undefined in tests unless set. `postgres(undefined)` doesn't throw at import (it connects lazily), but a mocked test should never construct it.
- **How the data layer can be tested with Vitest**
  - **Option A (recommended): mock modules.** No config change needed.
    - `vi.mock("@/lib/db", () => ({ sql: vi.fn() }))`. `sql` is a tagged template, called as `sql(strings, ...values)`, and returns a promise of rows. Configure `sql.mockResolvedValue([{ id: 1, title: "Dragon Quest" }])` for success and `sql.mockResolvedValue([])` for not-found.
    - `vi.mock("@/lib/openai", () => ({ openai: {} }))` so the OpenAI client is never built.
    - Assert on the SQL and values by inspecting the call: `strings.join("?")` for the query text, and the remaining args for `[trimmedTitle, storyId]`. This checks trimming and that the UPDATE runs (or doesn't run, for empty titles).
    - Add `// @vitest-environment node` at the top of the file. The default `jsdom` works but is unnecessary for server code.
    - Limitation: hand-written stubs don't verify that the SQL is valid.
  - **Option B (optional, later): real test Postgres.** Needs new setup.
    - Reuse the docker container (host port **5434**, `docker-compose.yml:10-11`) with a separate database such as `adventure_test`, so dev data isn't wiped.
    - Set `DATABASE_URL` through `test.env` in `vitest.config.mts`, use `environment: "node"` and `fileParallelism: false`, and add a `setupFiles` or `beforeAll` that creates the tables (import `register()` from `src/instrumentation.ts` or repeat the DDL) and truncates them in `beforeEach`. `@/lib/openai` still needs mocking.
    - Tests fail if the DB isn't running (`docker compose up -d`).
  - Nothing needs to be installed for either option.

## Open questions / risks

1. **Failure shape.** "Returns a clear failure" is ambiguous. Recommended: return a discriminated result, `{ ok: true, story } | { ok: false, error: string }`, rather than throwing, because thrown errors from server actions are masked in production Next builds and the client would not see a clear message. There is no existing precedent in the codebase.
2. **Where the rename UI goes** (Sidebar vs. Chat header) and its interaction (inline edit, prompt, button). The requirements only say the sidebar shows the new title. Recommendation: keep the UI minimal, and put the rename affordance in `Sidebar.tsx`, next to each chat's title.
3. **Source of truth.** The sidebar reads localStorage, so the DB rename alone has no visible effect. The client handler must update localStorage state, and only after the server action succeeds. Because auto-titles are never written to `stories.title`, DB and localStorage titles are already inconsistent, and `getStories()` is unused. This is out of scope, but a future hydration from the DB would show stale titles.
4. **Validation details not specified:** maximum title length (the column has none), and whether an unchanged title counts as success. Assume: no max length, and success. Also whether to validate `storyId` (non-integer or NaN). Assume: treat a no-match as "not found".
5. **Auto-title collision:** a user rename to exactly "New Chat" would be overwritten by the auto-title on the first user message (`ChatRoom.tsx:91-94`). Low impact; note it and leave it.
6. **Server action mocking:** mocking `sql` as a plain `vi.fn()` tagged-template stub verifies the query values but not the SQL validity. If stronger guarantees are wanted, add an integration test with Option B later.
7. **Environment quirks noted in passing (not blocking):** `.env.local.example` shows port 5432 while the compose host port is 5434, and `docker-compose.yml:13` mounts the volume at `/var/lib/postgres/data` (not the real `/var/lib/postgresql/data`), so data may not persist.
