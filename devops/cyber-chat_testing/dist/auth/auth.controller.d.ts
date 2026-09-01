import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { Request as ExpressRequest } from "express";
import { User } from "../users/entity/user.entity";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(dto: CreateUserDto): Promise<User>;
    login(req: ExpressRequest & {
        user: User;
    }, dto: LoginDto): Promise<{
        access_token: string;
    }>;
    getMe(req: ExpressRequest & {
        user: User;
    }): Express.User & User;
}
//# sourceMappingURL=auth.controller.d.ts.map