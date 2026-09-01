import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/createComment.dto";
import { User } from "../users/entity/user.entity";
import { Thread } from "../threads/entities/thread.entity";
export declare class CommentsService {
    private readonly comments;
    private readonly threads;
    private readonly users;
    constructor(comments: Repository<Comment>, threads: Repository<Thread>, users: Repository<User>);
    find(id: string): Promise<Comment | null>;
    create(threadId: string, userId: string, dto: CreateCommentDto): Promise<Comment>;
    softDeleteComment(id: string, userId: string): Promise<Comment | null>;
}
//# sourceMappingURL=comments.service.d.ts.map