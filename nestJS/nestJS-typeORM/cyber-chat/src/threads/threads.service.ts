import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  // Create a thread with title and body (and author)
  addNewThread(title: string, author: string, body: string): Thread {
    if (!title || title.trim().length < 2) {
      throw new Error("Title must be at least 2 characters.");
    }
    return this.threadsRepository.create({ title, author, body });
  }

  // List all threads
  getAllThreads(): Thread[] {
    return this.threadsRepository.findAll();
  }

  // Get one thread including its comments
  getThreadByIdIncludingComments(
    id: number,
  ): (Thread & { comments: Comment[] }) | undefined {
    const thread = this.threadsRepository.findById(id);
    if (!thread) return undefined;
    const comments = this.commentsRepository.findByThreadId(id);
    return { ...thread, comments };
  }

  // Delete thread and all of its comments
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
