"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const threads_service_1 = require("./threads.service");
describe('ThreadsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [threads_service_1.ThreadsService],
        }).compile();
        service = module.get(threads_service_1.ThreadsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=threads.service.spec.js.map