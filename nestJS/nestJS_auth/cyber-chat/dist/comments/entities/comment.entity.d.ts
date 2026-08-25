import { Thread } from "../../threads/entities/thread.entity";
import { User } from "../../users/entity/user.entity";
export declare class Comment {
    id: string;
    body: string;
    createdAt: Date;
    thread: Thread;
    author: User;
}
//# sourceMappingURL=comment.entity.d.ts.map