import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import type { Comment } from "./entities/comment.type";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getCommentById(id: number): Comment | undefined {
    return this.commentsRepository.findById(id);
  }

  addNewComment(threadId: number, author: string, body: string): Comment {
    return this.commentsRepository.create({ threadId, author, body });
  }

  softDeleteComment(id: number): Comment | undefined {
    return this.commentsRepository.softDelete(id);
  }
}
