export type TMessage = { role: TRole; content: string };

export type TRole = "user" | "assistant" | "system";

export type TChat = {
  id: string;
  title: string;
  messages: TMessage[];
  followups: string[];
};

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

export type TAdventureResponse = {
  story: string;
  options: string[];
  ended: boolean;
};
