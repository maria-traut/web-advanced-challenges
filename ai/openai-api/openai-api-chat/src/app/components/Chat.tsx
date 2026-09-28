"use client";

import { useState } from "react";
import { sendChat } from "../actions";
import type { TChatProps, TMessage } from "../types";

export default function Chat({
  chat,
  onUpdateMessages,
  onDeleteChat,
}: TChatProps) {
  const [input, setInput] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedMessages: TMessage[] = [
      ...chat.messages,
      { role: "user", content: input },
    ];
    onUpdateMessages(chat.id, updatedMessages);
    setInput("");

    // placeholder for assistant for growing assistant response
    let assistantContent = "";
    onUpdateMessages(chat.id, [
      ...updatedMessages,
      { role: "assistant", content: "" },
    ]);

    const stream = await sendChat(updatedMessages);
    const reader = stream.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      assistantContent += value;
      onUpdateMessages(chat.id, [
        ...updatedMessages,
        { role: "assistant", content: assistantContent },
      ]);
    }
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => onDeleteChat(chat.id)}
        className="bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg w-10 h-10 flex items-center justify-center shrink-0 mt-4 ml-4 "
        aria-label="Delete chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <ul className="flex flex-col gap-3 p-4">
        {chat.messages.map((message, index) => (
          <li
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-2xl leading-relaxed ${
              message.role === "user"
                ? "self-end bg-indigo-800 text-white"
                : "self-start bg-indigo-200 text-black"
            }`}
          >
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 w-full">
        <label htmlFor="message" className="sr-only">
          New Post
        </label>
        <input
          name="message"
          id="message"
          type="text"
          placeholder="New post"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          required
          className="flex-1 bg-neutral-800 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-600 transition-colors rounded-lg px-3 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
          </svg>
        </button>
      </form>
      <div />
    </div>
  );
}
