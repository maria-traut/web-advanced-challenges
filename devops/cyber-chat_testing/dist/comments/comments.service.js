"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const user_entity_1 = require("../users/entity/user.entity");
const thread_entity_1 = require("../threads/entities/thread.entity");
let CommentsService = class CommentsService {
    comments;
    threads;
    users;
    constructor(comments, threads, users) {
        this.comments = comments;
        this.threads = threads;
        this.users = users;
    }
    async find(id) {
        return this.comments.findOne({
            where: { id },
            relations: { author: true },
        });
    }
    async create(threadId, userId, dto) {
        const user = await this.users.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${userId}" not found.`);
        }
        const thread = await this.threads.findOneBy({ id: threadId });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID "${threadId}" not found.`);
        }
        const newComment = this.comments.create({
            ...dto,
            thread,
            author: user,
        });
        return this.comments.save(newComment);
    }
    async softDeleteComment(id, userId) {
        const comment = await this.comments.findOne({
            where: { id },
            relations: { author: true },
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID '${id}' not found`);
        }
        if (comment.author.id !== userId) {
            throw new common_1.ForbiddenException("You are not allowed to delete this comment.");
        }
        comment.body = "deleted";
        return this.comments.save(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map