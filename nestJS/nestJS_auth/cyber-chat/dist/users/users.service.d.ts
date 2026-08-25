import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
export declare class UsersService {
    private readonly users;
    constructor(users: Repository<User>);
    createUser(dto: CreateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
}
//# sourceMappingURL=users.service.d.ts.map