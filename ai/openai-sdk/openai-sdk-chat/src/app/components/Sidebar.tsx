import { TSidebarProps } from "../types";

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
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
          <li key={chat.id} className="flex items-center gap-1">
            <button
              onClick={() => onSelectChat(chat.id)}
              className={`flex-1 min-w-0 text-left px-3 py-2 rounded-lg truncate transition-colors ${
                chat.id === activeChatId
                  ? "bg-indigo-900/40 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {chat.title}
            </button>
            <button
              aria-label={`Rename ${chat.title}`}
              onClick={() => {
                const enteredTitle = window.prompt("Rename chat", chat.title);
                if (enteredTitle === null) return;
                void onRenameChat(chat.id, enteredTitle);
              }}
              className="px-2 py-2 rounded-lg text-xs text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Rename
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
