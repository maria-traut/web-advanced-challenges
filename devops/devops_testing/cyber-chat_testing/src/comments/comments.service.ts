import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/createComment.dto";
import { User } from "../users/entity/user.entity";
import { Thread } from "../threads/entities/thread.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
    @InjectRepository(Thread) private readonly threads: Repository<Thread>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async find(id: string): Promise<Comment | null> {
    return this.comments.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  async create(
    threadId: string,
    userId: string,
    dto: CreateCommentDto,
  ): Promise<Comment> {
    const user = await this.users.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    const thread = await this.threads.findOneBy({ id: threadId });

    if (!thread) {
      throw new NotFoundException(`Thread with ID "${threadId}" not found.`);
    }

    const newComment = this.comments.create({
      ...dto,
      thread,
      author: user,
    });
    return this.comments.save(newComment);
  }

  async softDeleteComment(id: string, userId: string): Promise<Comment | null> {
    const comment = await this.comments.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID '${id}' not found`);
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException(
        "You are not allowed to delete this comment.",
      );
    }

    comment.body = "deleted";

    return this.comments.save(comment);
  }
}
