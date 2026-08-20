import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CreateThreadDto } from "./dto/createThread.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";

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

  async findAll(): Promise<Thread[]> {
    return this.threads.find();
  }

  async find(id: string): Promise<Thread & { comments: Comment[] }> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found.`);
    }
    const comments = await this.comments.find({ where: { thread: { id } } });
    return { ...thread, comments };
  }

  async update(id: string, dto: UpdateThreadDto): Promise<Thread | null> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) return null;

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
