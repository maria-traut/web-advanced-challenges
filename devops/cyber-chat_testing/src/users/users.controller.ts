import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findByUsername(username: string): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }
}
