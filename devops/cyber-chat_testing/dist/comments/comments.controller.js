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
exports.CommentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const commentResponse_dto_1 = require("./dto/commentResponse.dto");
const comment_entity_1 = require("./entities/comment.entity");
const swagger_1 = require("@nestjs/swagger");
let CommentsController = class CommentsController {
    commentsService;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async getComment(id) {
        const comment = await this.commentsService.find(id);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID "${id}" not found.`);
        }
        return comment;
    }
    async deleteComment(id, req) {
        await this.commentsService.softDeleteComment(id, req.user.userId);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.SerializeOptions)({ type: commentResponse_dto_1.CommentResponseDto }),
    (0, swagger_1.ApiOperation)({ summary: "Get a comment by id" }),
    (0, swagger_1.ApiOkResponse)({ type: comment_entity_1.Comment }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "No comment exists with that id" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComment", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete one comment by id" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "No comment exists with that id" }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Not allowed to delete this comment",
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("comments"),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map