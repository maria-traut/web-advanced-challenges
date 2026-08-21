import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltOrRounds);

    const newUser = this.users.create({
      username: dto.username,
      passwordHash,
    });
    return this.users.save(newUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.findOneBy({ username });
  }
}
