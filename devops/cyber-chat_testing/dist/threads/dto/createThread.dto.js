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
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateThreadDto {
    title;
    body;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, maxLength: 100 }, body: { required: true, type: () => String, maxLength: 500 } };
    }
}
exports.CreateThreadDto = CreateThreadDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the thread",
        example: "What do you think about the color violet?",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The text content of the thread",
        example: "I'm considering violet as the main color for my room. Do you think it feels calm and welcoming, or is it too intense?",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateThreadDto.prototype, "body", void 0);
//# sourceMappingURL=createThread.dto.js.map