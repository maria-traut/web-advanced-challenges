export type TMessage = { role: TRole; content: string };

export type TRole = "user" | "assistant" | "system";

export type TChat = {
  id: string;
  storyId: number;
  title: string;
  messages: TMessage[];
  followups: string[];
};

export type TSidebarProps = {
  chats: TChat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void | Promise<void>;
};

export type TChatProps = {
  chat: TChat;
  onUpdateMessages: (
    chatId: string,
    messages: TMessage[],
    followups?: string[],
  ) => void;
  onDeleteChat: (id: string) => void;
};
