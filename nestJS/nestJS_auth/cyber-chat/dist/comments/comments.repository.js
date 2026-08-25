"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRepository = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("../data");
let CommentsRepository = class CommentsRepository {
    comments = new Map(data_1.initialComments.map((comment) => [comment.id, comment]));
    findAll() {
        return [...this.comments.values()];
    }
    findById(id) {
        return this.comments.get(id);
    }
    findByThreadId(threadId) {
        return [...this.comments.values()].filter((comment) => comment.threadId === threadId);
    }
    create(data) {
        const commentId = Date.now();
        const newComment = {
            id: commentId,
            createdAt: new Date(),
            ...data,
        };
        this.comments.set(commentId, newComment);
        return newComment;
    }
    delete(key) {
        return this.comments.delete(key);
    }
    softDelete(key) {
        const commentToUpdate = this.comments.get(key);
        if (!commentToUpdate)
            return undefined;
        const commentWithDeletedBody = { ...commentToUpdate, body: "deleted" };
        this.comments.set(key, commentWithDeletedBody);
        return commentWithDeletedBody;
    }
};
exports.CommentsRepository = CommentsRepository;
exports.CommentsRepository = CommentsRepository = __decorate([
    (0, common_1.Injectable)()
], CommentsRepository);
//# sourceMappingURL=comments.repository.js.map