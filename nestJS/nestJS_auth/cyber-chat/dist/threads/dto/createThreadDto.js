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
exports.CreateThreadDto = void 0;
const module_1 = require();
from;
"class-validator";
class CreateThreadDto {
    title;
    body;
    author;
}
exports.CreateThreadDto = CreateThreadDto;
__decorate([
    (0, module_1.IsString)(),
    IsNotEmpty(),
    MaxLength(120),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "title", void 0);
__decorate([
    (0, module_1.IsString)(),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "body", void 0);
__decorate([
    (0, module_1.IsString)(),
    IsNotEmpty(),
    MaxLenght(120),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "author", void 0);
//# sourceMappingURL=createThreadDto.js.map