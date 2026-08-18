import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  // Get one comment
  async getCommentById(id: string): Promise<Comment | null> {
    return this.comments.findOneBy({ id });
  }

  async addNewComment(
    threadId: string,
    author: string,
    body: string,
  ): Promise<Comment> {
    const newComment = this.comments.create({
      author,
      body,
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
