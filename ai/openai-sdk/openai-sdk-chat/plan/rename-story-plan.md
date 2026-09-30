# rename-story: TDD plan

All paths are relative to the project root `openai-sdk-chat/`. This file is self-contained.

## Feature

Add a server action `renameStory(storyId, title)` in `src/app/actions.ts` that updates `stories.title`. Trim the title and reject empty titles. Return a failure for a non-existent story. The sidebar reads titles from localStorage (not the DB), so the client must update its local chat state after a successful rename.

## Test command

- Single run (use this for every "Done when"): `npx vitest run`
- One file: `npx vitest run src/app/actions.test.ts`
- `npm test` is watch mode. Do not use it.

## Background the implementer needs

- Vitest ^4 is installed and configured (`vitest.config.mts`: `tsconfigPaths()` + `react()`, default env `jsdom`). There is no `globals` setting and no `setupFiles`, so import `describe, it, expect, vi, beforeEach` from `"vitest"`. The `@/*` alias resolves to `src/*`. The one existing test is `src/lib/formatSentAt.test.ts`.
- `src/app/actions.ts` starts with `"use server"` (no effect under Vitest). It imports `@/lib/openai` (reads `OPENAI_API_KEY` at import), `@/lib/db` (`export const sql = postgres(process.env.DATABASE_URL!)`) and `@/lib/stories`. Tests must mock `@/lib/db` and `@/lib/openai`, and should mock `@/lib/stories` too. Nothing else needs installing. No running Postgres or OpenAI key is needed.
- Existing style: `deleteStory(storyId: number)` at about `actions.ts:79`, and `createStory` uses `const [story] = await sql\`INSERT ... RETURNING *\``. Add `renameStory` next to `deleteStory`.
- Convention: avoid abbreviations in variable names (write `index`, `previousChats`, `event`, not `i`, `prev`, `e`, wherever you choose the name). The plan text below uses `prev` only as a shorthand for the functional `setChats` argument. Name it `previousChats` in code.
- Do not delete the commented-out code at the bottoms of `actions.ts` and `Chat.tsx`.
- Failure shape (decision): `renameStory` returns a discriminated result and never throws for expected failures:
  `type TRenameStoryResult = { ok: true; story: TStory } | { ok: false; error: string }`.
  Define `TStory = { id: number; title: string; created: Date }` and `TRenameStoryResult` in `src/app/types.ts`, where the `T`-prefixed shared types live. Note that `"use server"` files may only export async functions, so types must live in `types.ts`, not in `actions.ts`.
- Error strings (fixed, tests assert them): empty title → `"Title must not be empty"`, no row matched → `"Story not found"`.
- Mock technique for `sql` (a tagged template called as `sql(strings, ...values)` that returns a promise of rows):
  ```ts
  // @vitest-environment node
  import { beforeEach, describe, expect, it, vi } from "vitest";
  vi.mock("@/lib/db", () => ({ sql: vi.fn() }));
  vi.mock("@/lib/openai", () => ({ openai: {} }));
  vi.mock("@/lib/stories", () => ({ addMessage: vi.fn(), saveTurn: vi.fn() }));
  import { sql } from "@/lib/db";
  import { renameStory } from "./actions";
  const sqlMock = vi.mocked(sql) as unknown as ReturnType<typeof vi.fn>;
  beforeEach(() => sqlMock.mockReset());
  // query text of call n:  (sqlMock.mock.calls[n][0] as string[]).join("?")
  // bound values of call n: sqlMock.mock.calls[n].slice(1)
  ```
  (If `@/lib/stories` exports other names that `actions.ts` imports, add them to the mock factory.)
- Implementation of the action, for reference (built up across steps 1 to 5):
  ```ts
  export async function renameStory(storyId: number, title: string): Promise<TRenameStoryResult> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return { ok: false, error: "Title must not be empty" };
    const [story] = await sql`UPDATE stories SET title = ${trimmedTitle} WHERE id = ${storyId} RETURNING *`;
    if (!story) return { ok: false, error: "Story not found" };
    return { ok: true, story: story as TStory };
  }
  ```

## Steps

Do the steps in order. In each step, write the test first and run it to see it fail (red). Then make the minimal change (green), optionally refactor, and run `npx vitest run`.

### Step 1: export

- **Criterion**: `renameStory(storyId: number, title: string)` is exported from `src/app/actions.ts` (a `"use server"` file).
- **Test first (red)**:
  - File: `src/app/actions.test.ts` (new, with the header and mocks from "Mock technique" above).
  - Test: `describe("renameStory") > it("is an exported async function taking a story id and a title")`.
  - Asserts: `typeof renameStory === "function"`, and `renameStory.length === 2`. It also asserts `renameStory(1, "x")` returns a promise: set `sqlMock.mockResolvedValue([{ id: 1, title: "x" }])` and check `expect(renameStory(1, "x")).toBeInstanceOf(Promise)`.
  - Red because `renameStory` is not exported (the import is undefined).
- **Implementation (green)**:
  - `src/app/types.ts`: add `TStory` and `TRenameStoryResult` (see above).
  - `src/app/actions.ts`: import `TRenameStoryResult` (and `TStory`) from `./types` (use `import type`). Add the minimal function after `deleteStory`:
    `export async function renameStory(storyId: number, title: string): Promise<TRenameStoryResult> { const [story] = await sql\`UPDATE stories SET title = ${title} WHERE id = ${storyId} RETURNING *\`; return { ok: true, story: story as TStory }; }`
- **Refactor**: none.
- **Done when**: the new test and all existing tests pass (`npx vitest run`).

### Step 2: trim the title

- **Criterion**: the title is trimmed before it is stored (`"  Dragon Quest  "` is stored as `"Dragon Quest"`).
- **Test first (red)**:
  - File: `src/app/actions.test.ts`.
  - Test: `it("trims the title before storing it")`.
  - Setup: `sqlMock.mockResolvedValue([{ id: 1, title: "Dragon Quest" }])`.
  - Asserts: after `await renameStory(1, "  Dragon Quest  ")`, `sqlMock` was called once, and `sqlMock.mock.calls[0].slice(1)` equals `["Dragon Quest", 1]`.
- **Implementation (green)**: in `renameStory`, add `const trimmedTitle = title.trim();` and bind `${trimmedTitle}` instead of `${title}`.
- **Refactor**: none.
- **Done when**: the new test and all existing tests pass.

### Step 3: reject empty titles

- **Criterion**: an empty or whitespace-only title is rejected. No SQL `UPDATE` is executed and the action returns a clear failure.
- **Test first (red)**:
  - File: `src/app/actions.test.ts`.
  - Test: `it.each(["", "   ", "\n\t "])("rejects the empty title %j without touching the database")`.
  - Asserts: `await renameStory(1, title)` equals `{ ok: false, error: "Title must not be empty" }`, and `expect(sqlMock).not.toHaveBeenCalled()`.
- **Implementation (green)**: right after computing `trimmedTitle`, add `if (!trimmedTitle) return { ok: false, error: "Title must not be empty" };`.
- **Refactor**: none.
- **Done when**: the new test and all existing tests pass.

### Step 4: update an existing story and return it

- **Criterion**: for an existing story, the action runs `UPDATE stories SET title = <trimmed> WHERE id = <storyId> RETURNING *` and returns success with the updated story.
- **Test first (red)**:
  - File: `src/app/actions.test.ts`.
  - Test: `it("updates the story row and returns it")`.
  - Setup: `const row = { id: 7, title: "Dragon Quest", created: new Date(0) }; sqlMock.mockResolvedValue([row]);`
  - Asserts:
    - `await renameStory(7, " Dragon Quest ")` equals `{ ok: true, story: row }`.
    - `sqlMock` was called exactly once.
    - The query text (`strings.join("?")`) with whitespace collapsed (`.replace(/\s+/g, " ").trim()`) equals `"UPDATE stories SET title = ? WHERE id = ? RETURNING *"`.
    - The bound values equal `["Dragon Quest", 7]`.
- **Implementation (green)**: make `renameStory` return `{ ok: true, story }` built from the destructured `[story]` (already there from step 1). Adjust the SQL text to match exactly if it differs. Keep the query on a single template literal.
- **Refactor**: none.
- **Done when**: the new test and all existing tests pass. This step may already be green from earlier steps. If so, keep the test as a regression guard and note it in the step log.

### Step 5: story not found

- **Criterion**: for a non-existent `storyId` (the UPDATE matches no row), the action returns a clear failure and does not throw an unhandled error.
- **Test first (red)**:
  - File: `src/app/actions.test.ts`.
  - Test: `it("returns a failure when no story matches the id")`.
  - Setup: `sqlMock.mockResolvedValue([])`.
  - Asserts: `await expect(renameStory(999, "Dragon Quest")).resolves.toEqual({ ok: false, error: "Story not found" })` (it must resolve, not reject).
- **Implementation (green)**: after the query, add `if (!story) return { ok: false, error: "Story not found" };` before the success return.
- **Refactor**: tidy `renameStory` into the final form shown in "Implementation of the action" above (remove any leftovers from steps 1 to 4).
- **Done when**: the new test and all existing tests pass.

### Step 6: messages are untouched

- **Criterion**: renaming does not affect the story's messages (only `stories.title` changes).
- **Test first (red or regression guard)**:
  - File: `src/app/actions.test.ts`.
  - Test: `it("only updates stories.title and never touches messages")`.
  - Setup: `sqlMock.mockResolvedValue([{ id: 3, title: "New name" }])`.
  - Asserts, after `await renameStory(3, "New name")`:
    - `sqlMock` was called exactly once.
    - The query text (whitespace collapsed, lower-cased) contains `"update stories"` and does not contain `"messages"`.
    - The query text does not contain `"delete"` or `"insert"`.
    - The bound values equal `["New name", 3]`, so nothing else is written.
  - Also assert the mocked `@/lib/stories` functions (`addMessage`, `saveTurn`) were not called: `expect(vi.mocked(addMessage)).not.toHaveBeenCalled()` (import them from `@/lib/stories`).
- **Implementation (green)**: no production change is expected, because the query from step 4 already only touches `stories`. If the test fails, fix `renameStory` so that it issues only that single `UPDATE`.
- **Refactor**: none.
- **Done when**: the new test and all existing tests pass. This step is expected to be green immediately. Keep it as a guard and note that in the step log.

### Step 7: `handleRenameChat` updates local state only on success

- **Criterion**: on the client, `ChatRoom.tsx` has a `handleRenameChat(chatId, title)` that calls `renameStory(chat.storyId, title)`. Only on success does it update the matching `TChat.title` in the `chats` state via the functional form `setChats(prev => prev.map(...))`. The new title is persisted in localStorage and appears in the sidebar.
- **Test first (red)**:
  - File: `src/app/components/ChatRoom.test.tsx` (new, default `jsdom` env). No new dependencies: render with `react-dom/client` (`createRoot`) and `act` from `react`. Set `globalThis.IS_REACT_ACT_ENVIRONMENT = true`.
  - Mocks:
    - `vi.mock("@/app/actions", () => ({ createStory: vi.fn(), deleteStory: vi.fn(), renameStory: vi.fn() }))`. Use the same module specifier `ChatRoom.tsx` uses (it imports from `../actions`. Mock the resolved module, which is the same file, so `vi.mock("../actions", ...)` relative to the test file at `src/app/components/` also works).
    - `vi.mock("./Sidebar", ...)` with a stub component that stores its props in a module-level variable (`let latestSidebarProps`) and renders each `chat.title` in a `<li>`.
    - `vi.mock("./Chat", () => ({ default: () => null }))` (check whether `Chat` is a default or named export in `ChatRoom.tsx` and match it).
    - Leave `use-local-storage-state` real, so persistence is checked through `window.localStorage`. Seed `localStorage.setItem("chats", JSON.stringify([{ id: "chat-1", storyId: 11, title: "Old title", messages: [], followups: [] }]))` before render. Clear localStorage in `beforeEach`.
  - Test: `it("renames the chat locally after renameStory succeeds")`.
  - Setup: `vi.mocked(renameStory).mockResolvedValue({ ok: true, story: { id: 11, title: "Dragon Quest", created: new Date(0) } })`.
  - Asserts: after `await act(async () => { await latestSidebarProps.onRenameChat("chat-1", "Dragon Quest"); })`:
    - `renameStory` was called with `(11, "Dragon Quest")` (the chat's `storyId`, not its client `id`).
    - The stub sidebar shows "Dragon Quest" and not "Old title".
    - `JSON.parse(localStorage.getItem("chats")!)[0].title === "Dragon Quest"`.
  - Red because `Sidebar` gets no `onRenameChat` prop yet (`latestSidebarProps.onRenameChat` is undefined).
- **Implementation (green)**:
  - `src/app/types.ts`: add `onRenameChat: (chatId: string, title: string) => Promise<void>;` to `TSidebarProps`.
  - `src/app/components/ChatRoom.tsx`: import `renameStory` from `../actions` (next to `createStory, deleteStory`). Add, modelled on `handleDeleteChat`:
    ```ts
    async function handleRenameChat(chatId: string, title: string) {
      const chatToRename = chats.find((chat) => chat.id === chatId);
      if (!chatToRename) return;
      const result = await renameStory(chatToRename.storyId, title);
      if (!result.ok) return;
      setChats((previousChats) =>
        previousChats.map((chat) => (chat.id === chatId ? { ...chat, title: result.story.title } : chat)),
      );
    }
    ```
    Use `result.story.title` (the trimmed, stored title) rather than the raw input. Pass `onRenameChat={handleRenameChat}` to `<Sidebar>` (props are passed at about lines 113-118).
- **Refactor**: none. Do not change `handleUpdateMessages` (it keeps its existing non-functional `setChats`).
- **Done when**: the new test and all existing tests pass.

### Step 8: failure leaves the local title unchanged

- **Criterion**: on failure (empty title or story not found), the local chat title is left unchanged.
- **Test first (red or regression guard)**:
  - File: `src/app/components/ChatRoom.test.tsx`.
  - Test: `it.each([...])("keeps the local title when renameStory fails with %s")`, with the cases `"Title must not be empty"` and `"Story not found"`.
  - Setup: seed the same chat as in step 7. `vi.mocked(renameStory).mockResolvedValue({ ok: false, error })`.
  - Asserts: after calling `latestSidebarProps.onRenameChat("chat-1", "Anything")` inside `act`:
    - The stub sidebar still shows "Old title".
    - `JSON.parse(localStorage.getItem("chats")!)[0].title === "Old title"`.
    - The call does not throw (the promise resolves).
  - Add a second test: `it("does nothing when the chat id is unknown")`: `onRenameChat("missing", "x")` does not call `renameStory`.
- **Implementation (green)**: the `if (!result.ok) return;` guard and the `chatToRename` lookup from step 7 already satisfy this. If a test fails, fix `handleRenameChat` so state is only touched on success.
- **Refactor**: none.
- **Done when**: the new tests and all existing tests pass. Expected to be green immediately. Keep the tests as guards and note that in the step log.

### Step 9: rename UI in the sidebar

- **Criterion**: a rename UI exists that lets the user trigger the rename.
- **Decision**: put the affordance in `src/app/components/Sidebar.tsx` next to each chat's title (around the title button at lines 153-162, where `{chat.title}` is rendered at line 161). Keep it minimal: a "Rename" button per chat that calls `window.prompt("Rename chat", chat.title)`. If the user cancels (`null`) do nothing. Otherwise call `onRenameChat(chat.id, enteredTitle)`. Using `prompt` avoids adding edit-mode state, so `Sidebar` needs no local state. `Sidebar` is only imported by the client component `ChatRoom`, so click handlers work without adding `"use client"`. Add `"use client"` only if the build complains.
- **Test first (red)**:
  - File: `src/app/components/Sidebar.test.tsx` (new, `jsdom`). Render with `createRoot` and `act` (same setup as step 7). Do not mock `Sidebar` here.
  - Props: `chats: [{ id: "chat-1", storyId: 11, title: "Old title", messages: [], followups: [] }]`, `activeChatId: "chat-1"`, and `vi.fn()` for `onSelectChat`, `onNewChat`, `onRenameChat`. If `TSidebarProps` requires other props by then, pass them too.
  - Test 1: `it("asks for a new title and calls onRenameChat with the chat id and the entered title")`.
    - `vi.spyOn(window, "prompt").mockReturnValue("Dragon Quest")`.
    - Find the button by accessible name: `container.querySelector('button[aria-label="Rename Old title"]')`. Click it inside `act`.
    - Asserts: `window.prompt` was called with a message and default value `"Old title"`, and `onRenameChat` was called once with `("chat-1", "Dragon Quest")`.
  - Test 2: `it("does nothing when the prompt is cancelled")`: `prompt` returns `null` → `onRenameChat` not called.
  - Test 3: `it("does not select the chat when the rename button is clicked")`: `onSelectChat` not called (call `event.stopPropagation()` in the click handler if the rename button sits inside the selectable element. Prefer placing it as a sibling of the title button instead).
  - Red because no such button exists.
- **Implementation (green)**:
  - `src/app/components/Sidebar.tsx`: destructure `onRenameChat` from props and render, per chat, a small button with `aria-label={\`Rename ${chat.title}\`}` and text such as "Rename" (or an icon). Its `onClick` runs `const enteredTitle = window.prompt("Rename chat", chat.title); if (enteredTitle === null) return; void onRenameChat(chat.id, enteredTitle);`. Match the existing Tailwind styling of the sidebar buttons. Keep the layout working (e.g. wrap title button and rename button in a flex row).
  - `src/app/types.ts`: `onRenameChat` was already added to `TSidebarProps` in step 7.
- **Refactor**: extract the per-chat row into a small local component only if the JSX becomes hard to read.
- **Done when**: the new tests and all existing tests pass, and `npm run build` succeeds (type-check). Run `npm run lint` too and fix new warnings in touched files.

### Step 10: unit tests run under Vitest without external services

- **Criterion**: unit tests for `renameStory` run under Vitest, covering criteria 2 to 6, without needing a running Postgres or an OpenAI key.
- **Test first (red)**:
  - This criterion is verified by the environment rather than by a new test file. Before running, make sure the environment has neither `DATABASE_URL` nor `OPENAI_API_KEY`, and that Postgres is not needed.
  - Run: `env -u DATABASE_URL -u OPENAI_API_KEY npx vitest run src/app/actions.test.ts`.
  - Additionally add a guard test in `src/app/actions.test.ts`: `it("never constructs the real database or OpenAI client")`. It asserts `vi.isMockFunction(sql)` is true, so the file fails loudly if someone removes the `@/lib/db` mock. Add an equivalent check that `process.env.OPENAI_API_KEY` is not required: importing `./actions` in this file must not throw with the key unset (this is what the `@/lib/openai` mock ensures).
  - Verify that the coverage mapping is complete: the file must contain tests for trimming (step 2), empty title (step 3), UPDATE query and result (step 4), not found (step 5) and messages untouched (step 6). Fix any gap.
- **Implementation (green)**: make any fix needed so the run above passes with no env vars: complete the mocks (`@/lib/db`, `@/lib/openai`, `@/lib/stories`), and keep `// @vitest-environment node` on the first line of `src/app/actions.test.ts`. Do not change `vitest.config.mts` and do not add dependencies. Do not add a real-Postgres test (out of scope).
- **Refactor**: if the test file repeats the query-normalising code, extract a small helper at the top of the file, e.g. `function getQueryText(callIndex: number)` and `function getBoundValues(callIndex: number)`.
- **Done when**: `env -u DATABASE_URL -u OPENAI_API_KEY npx vitest run` passes for the whole suite (the new tests plus `src/lib/formatSentAt.test.ts`), with Postgres stopped.

## Notes and known limits (do not fix as part of this plan)

- Mocked `sql` verifies the bound values and the query text, not SQL validity. A real-Postgres integration test (separate `adventure_test` database on host port 5434, `fileParallelism: false`) is a possible follow-up.
- Auto-titles are client-side only and never written to `stories.title`, so DB and localStorage titles can already differ.
- Renaming a chat to the literal "New Chat" gets overwritten by the auto-title on the first user message (`handleUpdateMessages` only retitles chats whose title equals "New Chat"). Left as is.
- No maximum title length. An unchanged title counts as success.
