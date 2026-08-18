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

  async addNewThread(
    title: string,
    author: string,
    body: string,
  ): Promise<Thread> {
    if (!title || title.trim().length < 2) {
      throw new Error("Title must be at least 2 characters");
    }
    const newThread = this.threads.create({ title, author, body });
    return this.threads.save(newThread);
  }

  async getAllThreads(): Promise<Thread[]> {
    return this.threads.find();
  }

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

  async deleteThreadIncludingComments(threadId: string): Promise<void> {
    const comments = await this.comments.find({
      where: {
        thread: {
          id: threadId,
        },
      },
    });
    await this.comments.remove(comments);
    await this.threads.delete(threadId);
  }
}
