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
import { ThreadWithComments } from "../types/types";
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

  async findAll(): Promise<Thread[]> {
    const threads = await this.threads.find();

    if (threads.length === 0) {
      throw new NotFoundException("No threads found.");
    }

    return threads;
  }

  async find(id: string): Promise<ThreadWithComments> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found.`);
    }
    const comments = await this.comments.find({ where: { thread: { id } } });
    return { ...thread, comments };
  }

  async create(userId: string, dto: CreateThreadDto): Promise<Thread> {
    const user = await this.users.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }
    const newThread = this.threads.create({ ...dto, author: user });
    return this.threads.save(newThread);
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

  async delete(id: string, userId: string): Promise<boolean> {
    // Defines which thread to look for.
    const thread = await this.threads.findOne({
      where: { id },
      // Loads the related author so I can access thread.author.id.
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

    const comments = await this.comments.find({
      // Finds all comments that belong to the thread with the given ID.
      // The nested "thread" refers to the Comment -> Thread relation.
      where: {
        thread: {
          id,
        },
      },
    });
    await this.comments.remove(comments);
    await this.threads.remove(thread);
    return true;
  }
}
