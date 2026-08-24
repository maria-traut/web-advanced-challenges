import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CreateThreadDto } from "./dto/createThread.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadWithComments } from "../types";
import { PaginationQueryDto } from "../common/dto/paginationQuery.dto";

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  async create(dto: CreateThreadDto): Promise<Thread> {
    const newThread = this.threads.create(dto);
    return this.threads.save(newThread);
  }

  async findAll(pagination: PaginationQueryDto): Promise<Thread[]> {
    const { page, limit } = pagination;

    const [data, total] = await this.threads.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async find(id: string): Promise<ThreadWithComments> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found.`);
    }
    const comments = await this.comments.find({ where: { thread: { id } } });
    return { ...thread, comments };
  }

  async update(id: string, dto: UpdateThreadDto): Promise<Thread | null> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID '${id}' not found`);
    }

    Object.assign(thread, dto);
    return this.threads.save(thread);
  }

  // or:
  // async update(id: string, dto: UpdateThreadDto): Promise<Thread | null> {
  //   await this.threads.update(id, dto);
  //   return this.threads.findOneBy({ id });
  // }

  async delete(id: string): Promise<boolean> {
    const comments = await this.comments.find({
      where: {
        thread: {
          id,
        },
      },
    });
    await this.comments.remove(comments);
    // delete() or remove(), what is the difference?
    const result = await this.threads.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
