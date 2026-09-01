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
exports.Comment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const thread_entity_1 = require("../../threads/entities/thread.entity");
const user_entity_1 = require("../../users/entity/user.entity");
let Comment = class Comment {
    id;
    body;
    createdAt;
    // Many-to-one is a relation where A (thread) contains multiple instances of B (comments)
    // Many comments belong to one thread (owning side of the relation, holds the foreign key)
    thread;
    // Many comments belong to one author/user (owning side of the relation, holds the foreign key)
    author;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, body: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, thread: { required: true, type: () => require("../../threads/entities/thread.entity").Thread }, author: { required: true, type: () => require("../../users/entity/user.entity").User } };
    }
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => thread_entity_1.Thread, (thread) => thread.comments),
    __metadata("design:type", thread_entity_1.Thread)
], Comment.prototype, "thread", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.comments),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "author", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)("comments")
], Comment);
//# sourceMappingURL=comment.entity.js.map