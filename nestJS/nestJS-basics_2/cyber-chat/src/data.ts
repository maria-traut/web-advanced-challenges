import type { Thread } from "./threads/entities/thread.type";
import type { Comment } from "./comments/entities/comment.type";

export const initialThreads: Thread[] = [
  {
    id: 1,
    title: "first thread",
    author: "first author",
    body: "first body",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "second thread",
    author: "second author",
    body: "second body",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "third thread",
    author: "third author",
    body: "third body",
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "fourth thread",
    author: "fourth author",
    body: "fourth body",
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "fifth thread",
    author: "fifth author",
    body: "fifth body",
    createdAt: new Date(),
  },
];

export const initialComments: Comment[] = [
  {
    id: 1,
    threadId: 1,
    author: "first author",
    body: "first body",
    createdAt: new Date(),
  },
  {
    id: 2,
    threadId: 2,
    author: "second author",
    body: "second body",
    createdAt: new Date(),
  },
  {
    id: 3,
    threadId: 2,
    author: "third author",
    body: "third body",
    createdAt: new Date(),
  },
  {
    id: 4,
    threadId: 2,
    author: "fourth author",
    body: "fourth body",
    createdAt: new Date(),
  },
  {
    id: 5,
    threadId: 5,
    author: "fifth author",
    body: "fifth body",
    createdAt: new Date(),
  },
];
