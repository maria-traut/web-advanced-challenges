import { Injectable } from "@nestjs/common";
import type { Comment } from "../types";
import { initialComments } from "../data";

@Injectable()
export class CommentsRepository {
  private comments = new Map<number, Comment>(
    initialComments.map((comment) => [comment.id, comment]),
  );

  findAll(): Comment[] {
    return [...this.comments.values()];
  }

  findById(id: number): Comment | undefined {
    return this.comments.get(id);
  }

  findByThreadId(threadId: number): Comment[] {
    return [...this.comments.values()].filter(
      (comment) => comment.threadId === threadId,
    );
  }

  create(data: Omit<Comment, "id" | "createdAt">): Comment {
    const commentId = Date.now();
    const newComment: Comment = {
      id: commentId,
      createdAt: new Date(),
      ...data,
    };
    this.comments.set(commentId, newComment);
    return newComment;
  }

  delete(key: number): boolean {
    return this.comments.delete(key);
  }

  softDelete(key: number): Comment | undefined {
    const commentToUpdate = this.comments.get(key);
    if (!commentToUpdate) return undefined;
    const commentWithDeletedBody = { ...commentToUpdate, body: "deleted" };
    this.comments.set(key, commentWithDeletedBody);
    return commentWithDeletedBody;
  }
}
