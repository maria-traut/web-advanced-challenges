import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Sidebar from "./Sidebar";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const chats = [
  {
    id: "chat-1",
    storyId: 11,
    title: "Old title",
    messages: [],
    followups: [],
  },
];

let container: HTMLDivElement;
let root: Root;
const onSelectChat = vi.fn();
const onNewChat = vi.fn();
const onRenameChat = vi.fn();

beforeEach(async () => {
  onSelectChat.mockReset();
  onNewChat.mockReset();
  onRenameChat.mockReset();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      <Sidebar
        chats={chats}
        activeChatId="chat-1"
        onSelectChat={onSelectChat}
        onNewChat={onNewChat}
        onRenameChat={onRenameChat}
      />,
    );
  });
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    root.unmount();
  });
  container.remove();
});

function getRenameButton() {
  return container.querySelector<HTMLButtonElement>(
    'button[aria-label="Rename Old title"]',
  )!;
}

describe("Sidebar rename", () => {
  it("asks for a new title and calls onRenameChat with the chat id and the entered title", async () => {
    const promptSpy = vi.spyOn(window, "prompt").mockReturnValue("Dragon Quest");

    await act(async () => {
      getRenameButton().click();
    });

    expect(promptSpy).toHaveBeenCalledWith(expect.any(String), "Old title");
    expect(onRenameChat).toHaveBeenCalledTimes(1);
    expect(onRenameChat).toHaveBeenCalledWith("chat-1", "Dragon Quest");
  });

  it("does nothing when the prompt is cancelled", async () => {
    vi.spyOn(window, "prompt").mockReturnValue(null);

    await act(async () => {
      getRenameButton().click();
    });

    expect(onRenameChat).not.toHaveBeenCalled();
  });

  it("does not select the chat when the rename button is clicked", async () => {
    vi.spyOn(window, "prompt").mockReturnValue("Dragon Quest");

    await act(async () => {
      getRenameButton().click();
    });

    expect(onSelectChat).not.toHaveBeenCalled();
  });
});
