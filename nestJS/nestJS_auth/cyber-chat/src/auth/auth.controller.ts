import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { Request as ExpressRequest } from "express";
import { User } from "../users/entity/user.entity";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(@Request() req: ExpressRequest & { user: User }) {
    return this.authService.login(req.user);
  }
}
