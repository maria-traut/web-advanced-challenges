import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TSidebarProps } from "../types";

vi.mock("../actions", () => ({
  createStory: vi.fn(),
  deleteStory: vi.fn(),
  renameStory: vi.fn(),
}));

let latestSidebarProps: TSidebarProps;

vi.mock("./Sidebar", () => ({
  default: (props: TSidebarProps) => {
    latestSidebarProps = props;
    return (
      <ul>
        {props.chats.map((chat) => (
          <li key={chat.id}>{chat.title}</li>
        ))}
      </ul>
    );
  },
}));

vi.mock("./Chat", () => ({ default: () => null }));

import { renameStory } from "../actions";
import ChatRoom from "./ChatRoom";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const seededChat = {
  id: "chat-1",
  storyId: 11,
  title: "Old title",
  messages: [],
  followups: [],
};

let container: HTMLDivElement;
let root: Root;

beforeEach(async () => {
  window.localStorage.clear();
  window.localStorage.setItem("chats", JSON.stringify([seededChat]));
  vi.mocked(renameStory).mockReset();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root.render(<ChatRoom />);
  });
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
});

describe("handleRenameChat", () => {
  it("renames the chat locally after renameStory succeeds", async () => {
    vi.mocked(renameStory).mockResolvedValue({
      ok: true,
      story: { id: 11, title: "Dragon Quest", created: new Date(0) },
    });

    await act(async () => {
      await latestSidebarProps.onRenameChat("chat-1", "Dragon Quest");
    });

    expect(renameStory).toHaveBeenCalledWith(11, "Dragon Quest");
    expect(container.textContent).toContain("Dragon Quest");
    expect(container.textContent).not.toContain("Old title");
    expect(
      JSON.parse(window.localStorage.getItem("chats")!)[0].title,
    ).toBe("Dragon Quest");
  });

  it.each(["Title must not be empty", "Story not found"])(
    "keeps the local title when renameStory fails with %s",
    async (error) => {
      vi.mocked(renameStory).mockResolvedValue({ ok: false, error });

      await act(async () => {
        await latestSidebarProps.onRenameChat("chat-1", "Anything");
      });

      expect(container.textContent).toContain("Old title");
      expect(
        JSON.parse(window.localStorage.getItem("chats")!)[0].title,
      ).toBe("Old title");
    },
  );

  it("does nothing when the chat id is unknown", async () => {
    await act(async () => {
      await latestSidebarProps.onRenameChat("missing", "x");
    });

    expect(renameStory).not.toHaveBeenCalled();
  });
});
