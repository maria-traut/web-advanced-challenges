import { Injectable } from "@nestjs/common";
import type { Comment } from "./entities/comment.type";

@Injectable()
export class CommentsRepository {
  private comments = new Map<number, Comment>([
    [
      1,
      {
        id: 1,
        threadId: 1,
        author: "first author",
        body: "first body",
        createdAt: new Date(),
      },
    ],
    [
      2,
      {
        id: 2,
        threadId: 2,
        author: "second author",
        body: "second body",
        createdAt: new Date(),
      },
    ],
  ]);

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

  create(data): Comment {
    const commentId = Date.now();
    const newComment: Comment = { id: commentId, ...data };
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
