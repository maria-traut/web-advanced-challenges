import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findByUsername(username: string): Promise<User | null>;
}
//# sourceMappingURL=users.controller.d.ts.map