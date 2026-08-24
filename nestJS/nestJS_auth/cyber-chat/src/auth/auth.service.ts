import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { User } from "../users/entity/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Finds the user by username and verifies the provided password against the stored password hash.
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, "passwordHash"> | null> {
    const user = await this.usersService.findByUsername(username);
    // bcrypt.compare() checks whether the plain-text password matches the stored password hash.
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // Remove the password hash so it is not exposed to the caller.
      const { passwordHash: _, ...result } = user;
      return result;
    }
    // Return null if the user does not exist or the password is incorrect.
    return null;
  }

  // Creates a JWT after the user has been successfully authenticated.
  async login(user: User) {
    // The payload contains the data that will be stored in the JWT.
    // "sub" (subject) is conventionally used for the user's ID.
    const payload = {
      username: user.username,
      sub: user.id,
    };
    // Sign the payload and return the resulting JWT as an access token.
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
