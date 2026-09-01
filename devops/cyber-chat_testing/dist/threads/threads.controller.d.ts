import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import type { AuthenticatedRequest, ThreadWithComments } from "../types/types";
import { CreateThreadDto } from "./dto/createThread.dto";
import { CreateCommentDto } from "../comments/dto/createComment.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
export declare class ThreadsController {
    private readonly threadsService;
    private readonly commentsService;
    constructor(threadsService: ThreadsService, commentsService: CommentsService);
    getAllThreads(): Promise<Thread[]>;
    getThread(id: string): Promise<ThreadWithComments>;
    createThread(req: AuthenticatedRequest, dto: CreateThreadDto): Promise<Thread>;
    createComment(id: string, req: AuthenticatedRequest, dto: CreateCommentDto): Promise<Comment>;
    update(id: string, req: AuthenticatedRequest, dto: UpdateThreadDto): Promise<Thread>;
    deleteThread(id: string, req: AuthenticatedRequest): Promise<void>;
}
//# sourceMappingURL=threads.controller.d.ts.map