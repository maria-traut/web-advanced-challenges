import { Thread } from "../../threads/entities/thread.entity";
import { Comment } from "../../comments/entities/comment.entity";
export declare class User {
    id: string;
    username: string;
    passwordHash: string;
    threads: Thread[];
    comments: Comment[];
}
//# sourceMappingURL=user.entity.d.ts.map