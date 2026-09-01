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
exports.ThreadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const threads_service_1 = require("./threads.service");
const comments_service_1 = require("../comments/comments.service");
const comment_entity_1 = require("../comments/entities/comment.entity");
const createThread_dto_1 = require("./dto/createThread.dto");
const createComment_dto_1 = require("../comments/dto/createComment.dto");
const updateThread_dto_1 = require("./dto/updateThread.dto");
const threadResponse_dto_1 = require("./dto/threadResponse.dto");
const commentResponse_dto_1 = require("../comments/dto/commentResponse.dto");
const threadWithCommentsResponse_dto_1 = require("./dto/threadWithCommentsResponse.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
let ThreadsController = class ThreadsController {
    threadsService;
    commentsService;
    constructor(threadsService, commentsService) {
        this.threadsService = threadsService;
        this.commentsService = commentsService;
    }
    getAllThreads() {
        return this.threadsService.findAll();
    }
    async getThread(id) {
        const thread = await this.threadsService.find(id);
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID "${id}" not found.`);
        }
        return thread;
    }
    createThread(req, dto) {
        return this.threadsService.create(req.user.userId, dto);
    }
    createComment(id, req, dto) {
        return this.commentsService.create(id, req.user.userId, dto);
    }
    async update(id, req, dto) {
        const thread = await this.threadsService.update(id, req.user.userId, dto);
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID '${id}' not found`);
        }
        return thread;
    }
    async deleteThread(id, req) {
        const deleted = await this.threadsService.delete(id, req.user.userId);
        if (!deleted) {
            throw new common_1.NotFoundException(`Thread with ID "${id}" not found.`);
        }
    }
};
exports.ThreadsController = ThreadsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all threads" }),
    (0, swagger_1.ApiOkResponse)({ type: [threadResponse_dto_1.ThreadResponseDto] }),
    (0, common_1.SerializeOptions)({ type: threadResponse_dto_1.ThreadResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "getAllThreads", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a single thread by id" }),
    (0, swagger_1.ApiOkResponse)({ type: threadWithCommentsResponse_dto_1.ThreadWithCommentsResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Thread not found" }),
    (0, common_1.SerializeOptions)({ type: threadWithCommentsResponse_dto_1.ThreadWithCommentsResponseDto }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "getThread", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new thread" }),
    (0, swagger_1.ApiOkResponse)({ type: threadResponse_dto_1.ThreadResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "No thread exists with that id" }),
    (0, common_1.SerializeOptions)({ type: threadResponse_dto_1.ThreadResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createThread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)(":id/comments"),
    (0, swagger_1.ApiOperation)({ summary: "Add a comment to a thread" }),
    (0, swagger_1.ApiCreatedResponse)({ type: comment_entity_1.Comment }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Thread not found" }),
    (0, common_1.SerializeOptions)({ type: commentResponse_dto_1.CommentResponseDto }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, createComment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a thread partially" }),
    (0, swagger_1.ApiOkResponse)({ type: threadResponse_dto_1.ThreadResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Thread not found" }),
    (0, common_1.SerializeOptions)({ type: threadResponse_dto_1.ThreadResponseDto }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, updateThread_dto_1.UpdateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete a thread including its comments" }),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Thread not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "deleteThread", null);
exports.ThreadsController = ThreadsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("threads"),
    __metadata("design:paramtypes", [threads_service_1.ThreadsService,
        comments_service_1.CommentsService])
], ThreadsController);
//# sourceMappingURL=threads.controller.js.map