import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CreateThreadDto } from "./dto/createThread.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { PaginatedThreads, ThreadWithComments } from "../types";
import { plainToInstance } from "class-transformer";
import { ThreadResponseDto } from "./dto/threadResponse.dto";
import { SortFilterQueryDto } from "../common/dto/sortFilterQuery.dto";

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

  async findAll(query: SortFilterQueryDto): Promise<PaginatedThreads> {
    // Extract the current page number and the number of items per page.
    const { page, limit, sort, author } = query;
    const currentSort = sort ?? "-createdAt";
    const isDescending = currentSort.startsWith("-");
    const field = isDescending ? currentSort.slice(1) : currentSort;
    const where = author ? { author } : {};

    // Fetch the paginated threads and the total number of threads.
    const [data, total] = await this.threads.findAndCount({
      skip: (page - 1) * limit,

      // Limit the number of records returned for the current page.
      take: limit,
      order: { [field]: isDescending ? "DESC" : "ASC" },
      where,
    });

    // Transform the database entities into ThreadResponseDto instances.
    const transformedData = plainToInstance(ThreadResponseDto, data, {
      excludeExtraneousValues: true,
    });

    // Return the paginated data together with pagination metadata.
    return {
      data: transformedData,
      meta: {
        page,
        limit,
        total,
        // Calculate the total number of pages
        totalPages: Math.ceil(total / limit),
      },
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
