import type { Comment } from "../types";
export declare class CommentsRepository {
    private comments;
    findAll(): Comment[];
    findById(id: number): Comment | undefined;
    findByThreadId(threadId: number): Comment[];
    create(data: Omit<Comment, "id" | "createdAt">): Comment;
    delete(key: number): boolean;
    softDelete(key: number): Comment | undefined;
}
//# sourceMappingURL=comments.repository.d.ts.map