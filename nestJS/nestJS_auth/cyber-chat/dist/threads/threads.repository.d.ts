import type { Thread } from "../types";
export declare class ThreadsRepository {
    private threads;
    findAll(): Thread[];
    findById(id: number): Thread | undefined;
    create(newThread: Omit<Thread, "id" | "createdAt">): Thread;
    update(id: number, data: Partial<Omit<Thread, "id">>): Thread | undefined;
    delete(key: number): boolean;
}
//# sourceMappingURL=threads.repository.d.ts.map