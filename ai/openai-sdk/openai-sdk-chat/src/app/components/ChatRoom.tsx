"use client";

import { useState } from "react";
import type { TChat, TMessage } from "../types";
import Chat from "./Chat";
import useLocalStorageState from "use-local-storage-state";
import Sidebar from "./Sidebar";
import { createStory, deleteStory, renameStory } from "../actions";

export default function ChatApp() {
  const [chats, setChats] = useLocalStorageState<TChat[]>("chats", {
    defaultValue: [],
  });
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  async function handleNewChat() {
    const story = await createStory("New Chat");

    const newChat: TChat = {
      id: crypto.randomUUID(),
      storyId: story.id,
      title: story.title,
      messages: [],
      followups: [],
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  }

  function getTitleFromMessage(content: string, maxLength = 50): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.slice(0, maxLength).trimEnd() + "...";
  }

  function handleUpdateMessages(
    chatId: string,
    messages: TMessage[],
    followups: string[] = [],
  ) {
    setChats(
      chats.map((chat) => {
        if (chat.id !== chatId) return chat;

        const firstUserMessage = messages.find(
          (message) => message.role === "user",
        );
        const title =
          chat.title === "New Chat" && firstUserMessage
            ? getTitleFromMessage(firstUserMessage.content)
            : chat.title;

        return { ...chat, messages, title, followups };
      }),
    );
  }

  async function handleDeleteChat(chatId: string) {
    const chatToDelete = chats.find((chat) => chat.id === chatId);
    if (chatToDelete) {
      await deleteStory(chatToDelete.storyId);
    }
    setChats((previousChats) =>
      previousChats.filter((chat) => chatId !== chat.id),
    );
  }

  async function handleRenameChat(chatId: string, title: string) {
    const chatToRename = chats.find((chat) => chat.id === chatId);
    if (!chatToRename) return;
    const result = await renameStory(chatToRename.storyId, title);
    if (!result.ok) return;
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId ? { ...chat, title: result.story.title } : chat,
      ),
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
      />
      <div className="flex-1">
        {activeChat ? (
          <Chat
            key={activeChat.id}
            chat={activeChat}
            onUpdateMessages={handleUpdateMessages}
            onDeleteChat={handleDeleteChat}
          />
        ) : (
          <p className="mt-4 ml-4 ">Select or create a chat.</p>
        )}
      </div>
    </div>
  );
}
