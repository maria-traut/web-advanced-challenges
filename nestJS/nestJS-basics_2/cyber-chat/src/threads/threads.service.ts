import { Injectable } from "@nestjs/common";
import { ThreadsRepository } from "./threads.repository";
import type { Thread } from "./entities/thread.type";
import { CommentsRepository } from "../comments/comments.repository";

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  // create a thread with title and body
  addNewThread(title: string, body: string): Thread {
    if (!title || title.trim().length < 2) {
      throw new Error("Title must be at least 2 characters");
    }
    return this.threadsRepository.create({ title, body });
  }

  // list all threads
  getAllThreads(): Thread[] {
    return this.threadsRepository.findAll();
  }

  // add a comment to a thread
  getThreadById(id: number): Thread | undefined {
    return this.threadsRepository.findById(id);
  }

  // delete thread and all of its comments
  deleteThread(key: number): boolean {
    this.commentsRepository.delete(key);
    return this.threadsRepository.delete(key);
  }
}
