import { Repository } from "typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CreateThreadDto } from "./dto/createThread.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadWithComments } from "../types/types";
import { User } from "../users/entity/user.entity";
export declare class ThreadsService {
    private readonly threads;
    private readonly comments;
    private readonly users;
    constructor(threads: Repository<Thread>, comments: Repository<Comment>, users: Repository<User>);
    create(userId: string, dto: CreateThreadDto): Promise<Thread>;
    findAll(): Promise<Thread[]>;
    find(id: string): Promise<ThreadWithComments>;
    update(id: string, userId: string, dto: UpdateThreadDto): Promise<Thread | null>;
    delete(id: string, userId: string): Promise<boolean>;
}
//# sourceMappingURL=threads.service.d.ts.map