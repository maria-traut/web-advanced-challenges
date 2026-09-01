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
exports.ThreadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const thread_entity_1 = require("./entities/thread.entity");
const comment_entity_1 = require("../comments/entities/comment.entity");
const user_entity_1 = require("../users/entity/user.entity");
let ThreadsService = class ThreadsService {
    threads;
    comments;
    users;
    constructor(threads, comments, users) {
        this.threads = threads;
        this.comments = comments;
        this.users = users;
    }
    async create(userId, dto) {
        const user = await this.users.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${userId}" not found.`);
        }
        const newThread = this.threads.create({ ...dto, author: user });
        return this.threads.save(newThread);
    }
    async findAll() {
        return this.threads.find();
    }
    async find(id) {
        const thread = await this.threads.findOneBy({ id });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${id} not found.`);
        }
        const comments = await this.comments.find({ where: { thread: { id } } });
        return { ...thread, comments };
    }
    async update(id, userId, dto) {
        const thread = await this.threads.findOne({
            where: { id },
            relations: { author: true },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID '${id}' not found`);
        }
        if (thread.author.id !== userId) {
            throw new common_1.ForbiddenException("You are not allowed to update this thread.");
        }
        Object.assign(thread, dto);
        return this.threads.save(thread);
    }
    async delete(id, userId) {
        // Defines which thread to look for.
        const thread = await this.threads.findOne({
            where: { id },
            // Loads the related author so I can access thread.author.id.
            relations: {
                author: true,
            },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID "${id}" not found.`);
        }
        if (thread.author.id !== userId) {
            throw new common_1.ForbiddenException("You are not allowed to delete this thread.");
        }
        const comments = await this.comments.find({
            // Finds all comments that belong to the thread with the given ID.
            // The nested "thread" refers to the Comment -> Thread relation.
            where: {
                thread: {
                    id,
                },
            },
        });
        await this.comments.remove(comments);
        await this.threads.remove(thread);
        return true;
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ThreadsService);
//# sourceMappingURL=threads.service.js.map