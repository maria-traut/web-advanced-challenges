import { Injectable, NotFoundException } from "@nestjs/common";
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
  async addNewThread(
    title: string,
    author: string,
    body: string,
  ): Promise<Thread> {
    if (!title || title.trim().length < 2) {
      throw new Error("Title must be at least 2 characters");
    }
    // 1. Synchronous (Local): Builds the entity instance in memory
    const newThread = this.threads.create({ title, author, body });
    // 2. Asynchronous (API): Executes the INSERT statement via TypeORM
    return this.threads.save(newThread);
  }

  // List all threads
  async getAllThreads(): Promise<Thread[]> {
    return this.threads.find();
  }

  // Get one thread including its comments
  async getThreadByIdIncludingComments(
    id: string,
  ): Promise<Thread & { comments: Comment[] }> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found.`);
    }
    const comments = await this.comments.find({ where: { thread: { id } } });
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
