export type Thread = {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
};

export type Comment = {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
};
