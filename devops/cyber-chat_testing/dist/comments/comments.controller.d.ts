import { CommentsService } from "./comments.service";
import type { AuthenticatedRequest } from "../types/types";
import { Comment } from "./entities/comment.entity";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getComment(id: string): Promise<Comment>;
    deleteComment(id: string, req: AuthenticatedRequest): Promise<void>;
}
//# sourceMappingURL=comments.controller.d.ts.map