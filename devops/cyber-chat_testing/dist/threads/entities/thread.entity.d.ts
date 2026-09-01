import { Comment } from "../../comments/entities/comment.entity";
import { User } from "../../users/entity/user.entity";
export declare class Thread {
    id: string;
    title: string;
    subtitle?: string;
    body: string;
    createdAt: Date;
    comments: Comment[];
    author: User;
}
//# sourceMappingURL=thread.entity.d.ts.map