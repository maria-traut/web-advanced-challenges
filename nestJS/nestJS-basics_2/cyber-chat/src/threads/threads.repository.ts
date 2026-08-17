import { Injectable } from "@nestjs/common";
import { initialThreads } from "../data";
import type { Thread } from "./entities/thread.type";

@Injectable()
export class ThreadsRepository {
  private threads = new Map<number, Thread>(
    initialThreads.map((thread) => [thread.id, thread]),
  );

  findAll(): Thread[] {
    return [...this.threads.values()];
  }

  findById(id: number): Thread | undefined {
    return this.threads.get(id);
  }

  create(newThread: Omit<Thread, "id">): Thread {
    const threadId = Date.now();
    const thread: Thread = { id: threadId, ...newThread };
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
