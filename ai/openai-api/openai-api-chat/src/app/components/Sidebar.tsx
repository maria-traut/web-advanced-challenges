import { TSidebarProps } from "../types";

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: TSidebarProps) {
  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col p-4">
      <button
        onClick={onNewChat}
        className="bg-indigo-700 hover:bg-indigo-600 transition-colors rounded-lg py-2 px-3 mb-4 font-medium"
      >
        + New Chat
      </button>
      <ul className="flex flex-col gap-1 overflow-y-auto">
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg truncate transition-colors ${
                chat.id === activeChatId
                  ? "bg-indigo-900/40 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
