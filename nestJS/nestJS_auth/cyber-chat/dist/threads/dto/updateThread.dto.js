"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateThreadDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createThread_dto_1 = require("./createThread.dto");
class UpdateThreadDto extends (0, mapped_types_1.PartialType)(createThread_dto_1.CreateThreadDto) {
}
exports.UpdateThreadDto = UpdateThreadDto;
//# sourceMappingURL=updateThread.dto.js.map