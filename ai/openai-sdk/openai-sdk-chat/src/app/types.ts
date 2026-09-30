export type TMessage = { role: TRole; content: string };

export type TRole = "user" | "assistant";

export type TChat = {
  id: string;
  storyId: number;
  title: string;
  messages: TMessage[];
  followups: string[];
};

export type TStory = { id: number; title: string; created: Date };

export type TRenameStoryResult =
  | { ok: true; story: TStory }
  | { ok: false; error: string };

export type TSidebarProps = {
  chats: TChat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void | Promise<void>;
  onRenameChat: (chatId: string, title: string) => Promise<void>;
};

export type TChatProps = {
  chat: TChat;
  onUpdateMessages: (
    chatId: string,
    messages: TMessage[],
    followups?: string[],
  ) => void;
  onDeleteChat: (id: string) => void | Promise<void>;
};
