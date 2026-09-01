import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { User } from "../users/entity/user.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<Omit<User, "passwordHash"> | null>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map