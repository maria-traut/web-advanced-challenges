import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/createComment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  async find(id: string): Promise<Comment | null> {
    return this.comments.findOneBy({ id });
  }

  async create(threadId: string, dto: CreateCommentDto): Promise<Comment> {
    const newComment = this.comments.create({
      ...dto,
      thread: { id: threadId },
    });
    return this.comments.save(newComment);
  }

  async softDeleteComment(id: string): Promise<Comment | null> {
    const comment = await this.comments.findOneBy({ id });
    if (!comment) {
      return null;
    }
    comment.body = "deleted";
    return this.comments.save(comment);
  }
}
