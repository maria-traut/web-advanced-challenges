export type TMessage = { role: string; content: string };

export type Tole = "user" | "assistent";

export type TChat = { id: string; title: string; messages: TMessage[] };

export type TSidebarProps = {
  chats: TChat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

export type TChatProps = {
  chat: TChat;
  onUpdateMessages: (chatId: string, messages: TMessage[]) => void;
  onDeleteChat: (id: string) => void;
};
