// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({ sql: vi.fn() }));
vi.mock("@/lib/openai", () => ({ openai: {} }));
vi.mock("@/lib/stories", () => ({ addMessage: vi.fn(), saveTurn: vi.fn() }));

import { sql } from "@/lib/db";
import { addMessage, saveTurn } from "@/lib/stories";
import { renameStory } from "./actions";

const sqlMock = vi.mocked(sql) as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => sqlMock.mockReset());

function getQueryText(callIndex: number) {
  return (sqlMock.mock.calls[callIndex][0] as string[])
    .join("?")
    .replace(/\s+/g, " ")
    .trim();
}

function getBoundValues(callIndex: number) {
  return sqlMock.mock.calls[callIndex].slice(1);
}

describe("renameStory", () => {
  it("never constructs the real database or OpenAI client", () => {
    expect(vi.isMockFunction(sql)).toBe(true);
    // reaching this point means importing ./actions did not need OPENAI_API_KEY,
    // because @/lib/openai is mocked
  });

  it("is an exported async function taking a story id and a title", () => {
    sqlMock.mockResolvedValue([{ id: 1, title: "x" }]);
    expect(typeof renameStory).toBe("function");
    expect(renameStory.length).toBe(2);
    expect(renameStory(1, "x")).toBeInstanceOf(Promise);
  });

  it.each(["", "   ", "\n\t "])(
    "rejects the empty title %j without touching the database",
    async (title) => {
      await expect(renameStory(1, title)).resolves.toEqual({
        ok: false,
        error: "Title must not be empty",
      });
      expect(sqlMock).not.toHaveBeenCalled();
    },
  );

  it("updates the story row and returns it", async () => {
    const row = { id: 7, title: "Dragon Quest", created: new Date(0) };
    sqlMock.mockResolvedValue([row]);
    await expect(renameStory(7, " Dragon Quest ")).resolves.toEqual({
      ok: true,
      story: row,
    });
    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(getQueryText(0)).toBe(
      "UPDATE stories SET title = ? WHERE id = ? RETURNING *",
    );
    expect(getBoundValues(0)).toEqual(["Dragon Quest", 7]);
  });

  it("returns a failure when no story matches the id", async () => {
    sqlMock.mockResolvedValue([]);
    await expect(renameStory(999, "Dragon Quest")).resolves.toEqual({
      ok: false,
      error: "Story not found",
    });
  });

  it("only updates stories.title and never touches messages", async () => {
    sqlMock.mockResolvedValue([{ id: 3, title: "New name" }]);
    await renameStory(3, "New name");
    expect(sqlMock).toHaveBeenCalledTimes(1);
    const queryText = getQueryText(0).toLowerCase();
    expect(queryText).toContain("update stories");
    expect(queryText).not.toContain("messages");
    expect(queryText).not.toContain("delete");
    expect(queryText).not.toContain("insert");
    expect(getBoundValues(0)).toEqual(["New name", 3]);
    expect(vi.mocked(addMessage)).not.toHaveBeenCalled();
    expect(vi.mocked(saveTurn)).not.toHaveBeenCalled();
  });

  it("trims the title before storing it", async () => {
    sqlMock.mockResolvedValue([{ id: 1, title: "Dragon Quest" }]);
    await renameStory(1, "  Dragon Quest  ");
    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(getBoundValues(0)).toEqual(["Dragon Quest", 1]);
  });
});
