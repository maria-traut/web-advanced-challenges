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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadWithCommentsResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const threadResponse_dto_1 = require("./threadResponse.dto");
const commentResponse_dto_1 = require("../../comments/dto/commentResponse.dto");
const swagger_1 = require("@nestjs/swagger");
class ThreadWithCommentsResponseDto extends threadResponse_dto_1.ThreadResponseDto {
    comments;
    static _OPENAPI_METADATA_FACTORY() {
        return { comments: { required: true, type: () => [require("../../comments/dto/commentResponse.dto").CommentResponseDto] } };
    }
}
exports.ThreadWithCommentsResponseDto = ThreadWithCommentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The comments belonging to this Thread",
        type: () => [commentResponse_dto_1.CommentResponseDto],
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => commentResponse_dto_1.CommentResponseDto),
    __metadata("design:type", Array)
], ThreadWithCommentsResponseDto.prototype, "comments", void 0);
//# sourceMappingURL=threadWithCommentsResponse.dto.js.map