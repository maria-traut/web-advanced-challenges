"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const threads_controller_1 = require("./threads.controller");
describe('ThreadsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [threads_controller_1.ThreadsController],
        }).compile();
        controller = module.get(threads_controller_1.ThreadsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=threads.controller.spec.js.map