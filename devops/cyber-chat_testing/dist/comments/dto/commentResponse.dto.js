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
exports.CommentResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const userResponse_dto_1 = require("../../users/dto/userResponse.dto");
// A DTO (Data Transfer Object) is a class that describes the shape of data crossing an application boundary.
// The response DTO defines what the server is willing to return.
// Response DTOs lean on class-transformer decorators to 'allowlist' the fields that ship to the client.
class CommentResponseDto {
    id;
    body;
    author;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, body: { required: true, type: () => String }, author: { required: true, type: () => require("../../users/dto/userResponse.dto").UserResponseDto }, createdAt: { required: true, type: () => Date } };
    }
}
exports.CommentResponseDto = CommentResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommentResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommentResponseDto.prototype, "body", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => userResponse_dto_1.UserResponseDto),
    __metadata("design:type", userResponse_dto_1.UserResponseDto)
], CommentResponseDto.prototype, "author", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CommentResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=commentResponse.dto.js.map