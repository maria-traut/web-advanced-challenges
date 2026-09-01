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
    // Salt rounds determine how computationally expensive the bcrypt hashing process is: higher rounds mean stronger protection but slower hashing.
    const saltRounds = 10;

    // Hashes the plain-text password before storing it in the database.
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Creates a new User entity with the username and hashed password.
    const newUser = this.users.create({
      username: dto.username,
      passwordHash,
    });

    // Saves the new user to the database and returns the saved entity.
    return this.users.save(newUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.findOneBy({ username });
  }
}
