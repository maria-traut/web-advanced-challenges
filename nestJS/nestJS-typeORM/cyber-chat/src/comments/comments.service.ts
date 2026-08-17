import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import type { Comment } from "../types";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  // Get one comment
  getCommentById(id: number): Comment | undefined {
    return this.commentsRepository.findById(id);
  }

  // Create a comment in one thread
  addNewComment(threadId: number, author: string, body: string): Comment {
    return this.commentsRepository.create({ threadId, author, body });
  }

  // Sets the comments body to “deleted”, does not delete it
  softDeleteComment(id: number): Comment | undefined {
    return this.commentsRepository.softDelete(id);
  }
}
