import { Injectable } from "@nestjs/common";
import { ThreadsRepository } from "./threads.repository";
import type { Thread } from "./entities/thread.type";
import type { Comment } from "../comments/entities/comment.type";
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
      throw new Error("Title must be at least 2 characters.");
    }
    return this.threadsRepository.create({ title, body });
  }

  // list all threads
  getAllThreads(): Thread[] {
    return this.threadsRepository.findAll();
  }

  // get one thread including its comments
  getThreadByIdIncludingComments(
    id: number,
  ): (Thread & { comments: Comment[] }) | undefined {
    const thread = this.threadsRepository.findById(id);
    if (!thread) return undefined;
    const comments = this.commentsRepository.findByThreadId(id);
    return { ...thread, comments };
  }

  // delete thread and all of its comments
  deleteThreadIncludingComments(threadId: number): boolean {
    // 1. get array of comments belonging to specific thread
    const commentsToDelete = this.commentsRepository.findByThreadId(threadId);
    // 2. delete every comment belonging to specific thread
    commentsToDelete.forEach((comment) =>
      this.commentsRepository.delete(comment.id),
    );
    // 3. delete specific thread itself
    return this.threadsRepository.delete(threadId);
  }
}
