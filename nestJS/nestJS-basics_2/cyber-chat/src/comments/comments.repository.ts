import { Injectable } from "@nestjs/common";
import type { Comment } from "./entities/comment.type";
import { initialComments } from "../data";

@Injectable()
export class CommentsRepository {
  private initialComments = new Map<number, Comment>(
    initialComments.map((comment) => [comment.id, comment]),
  );

  findAll(): Comment[] {
    return [...this.initialComments.values()];
  }

  findById(id: number): Comment | undefined {
    return this.initialComments.get(id);
  }

  findByThreadId(threadId: number): Comment[] {
    return [...this.initialComments.values()].filter(
      (comment) => comment.threadId === threadId,
    );
  }

  create(data): Comment {
    const commentId = Date.now();
    const newComment: Comment = { id: commentId, ...data };
    this.initialComments.set(commentId, newComment);
    return newComment;
  }

  delete(key: number): boolean {
    return this.initialComments.delete(key);
  }

  softDelete(key: number): Comment | undefined {
    const commentToUpdate = this.initialComments.get(key);
    if (!commentToUpdate) return undefined;
    const commentWithDeletedBody = { ...commentToUpdate, body: "deleted" };
    this.initialComments.set(key, commentWithDeletedBody);
    return commentWithDeletedBody;
  }
}
