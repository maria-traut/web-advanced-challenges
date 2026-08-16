import { Injectable } from "@nestjs/common";
import type { Thread } from "./entities/thread.type";

@Injectable()
export class ThreadsRepository {
  private threads = new Map<number, Thread>([
    [
      1,
      {
        id: 1,
        title: "first thread",
        author: "first author",
        body: "first body",
        createdAt: new Date(),
      },
    ],
    [
      2,
      {
        id: 2,
        title: "second thread",
        author: "second author",
        body: "second body",
        createdAt: new Date(),
      },
    ],
  ]);

  findAll(): Thread[] {
    return [...this.threads.values()];
  }

  findById(id: number): Thread | undefined {
    return this.threads.get(id);
  }

  create(data): Thread {
    const threadId = Date.now();
    const thread: Thread = { id: threadId, ...data };
    this.threads.set(threadId, thread);
    return thread;
  }

  update(id: number, data): Thread | undefined {
    const threadToBeUpdated = this.threads.get(id);
    if (!threadToBeUpdated) return undefined;

    const updatedThread = { ...threadToBeUpdated, ...data };
    this.threads.set(id, threadToBeUpdated);
    return updatedThread;
  }

  delete(key: number): boolean {
    return this.threads.delete(key);
  }
}
