import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CreateThreadDto } from "./dto/createThread.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadWithComments } from "../types";
import { User } from "../users/entity/user.entity";

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(userId: string, dto: CreateThreadDto): Promise<Thread> {
    const user = await this.users.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }
    const newThread = this.threads.create({ ...dto, author: user });
    return this.threads.save(newThread);
  }

  // async create(dto: CreateThreadDto): Promise<Thread> {
  //   const newThread = this.threads.create(dto);
  //   return this.threads.save(newThread);
  // }

  async findAll(): Promise<Thread[]> {
    return this.threads.find();
  }

  async find(id: string): Promise<ThreadWithComments> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found.`);
    }
    const comments = await this.comments.find({ where: { thread: { id } } });
    return { ...thread, comments };
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateThreadDto,
  ): Promise<Thread | null> {
    const thread = await this.threads.findOne({
      where: { id },
      relations: { author: true },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with ID '${id}' not found`);
    }

    if (thread.author.id !== userId) {
      throw new ForbiddenException(
        "You are not allowed to update this thread.",
      );
    }

    Object.assign(thread, dto);
    return this.threads.save(thread);
  }

  // or:
  // async update(id: string, dto: UpdateThreadDto): Promise<Thread | null> {
  //   await this.threads.update(id, dto);
  //   return this.threads.findOneBy({ id });
  // }

  async delete(id: string, userId: string): Promise<boolean> {
    const thread = await this.threads.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }

    if (thread.author.id !== userId) {
      throw new ForbiddenException(
        "You are not allowed to delete this thread.",
      );
    }

    await this.comments.find({
      where: {
        thread: {
          id,
        },
      },
    });

    await this.threads.remove(thread);
    return true;
  }
}
