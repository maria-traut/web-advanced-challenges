"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateThreadDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const createThread_dto_1 = require("./createThread.dto");
class UpdateThreadDto extends (0, mapped_types_1.PartialType)(createThread_dto_1.CreateThreadDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateThreadDto = UpdateThreadDto;
//# sourceMappingURL=updateThread.dto.js.map