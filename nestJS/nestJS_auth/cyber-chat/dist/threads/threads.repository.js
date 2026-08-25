"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsRepository = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("../data");
let ThreadsRepository = class ThreadsRepository {
    threads = new Map(data_1.initialThreads.map((thread) => [thread.id, thread]));
    findAll() {
        return [...this.threads.values()];
    }
    findById(id) {
        return this.threads.get(id);
    }
    create(newThread) {
        const threadId = Date.now();
        const thread = {
            id: threadId,
            createdAt: new Date(),
            ...newThread,
        };
        this.threads.set(threadId, thread);
        return thread;
    }
    update(id, data) {
        const threadToBeUpdated = this.threads.get(id);
        if (!threadToBeUpdated)
            return undefined;
        const updatedThread = { ...threadToBeUpdated, ...data };
        this.threads.set(id, updatedThread);
        return updatedThread;
    }
    delete(key) {
        return this.threads.delete(key);
    }
};
exports.ThreadsRepository = ThreadsRepository;
exports.ThreadsRepository = ThreadsRepository = __decorate([
    (0, common_1.Injectable)()
], ThreadsRepository);
//# sourceMappingURL=threads.repository.js.map