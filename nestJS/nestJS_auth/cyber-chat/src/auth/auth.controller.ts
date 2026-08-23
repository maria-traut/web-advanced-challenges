import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { Request as ExpressRequest } from "express";
import { User } from "../users/entity/user.entity";
import { LoginDto } from "./dto/login.dto";
import { UserResponseDto } from "../users/dto/userResponse.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    // creates new user with heashed password
    // returns created user
    return this.usersService.createUser(dto);
  }

  @Post("login")
  // Guard triggers Passport, which runs LocalStrategy before login method executes
  // LocalStrategy reads username + password from body and calls authService.validateUser()
  // on success, Passport attaches validated user to req.user
  @UseGuards(AuthGuard("local"))
  async login(
    @Request() req: ExpressRequest & { user: User },
    // triggers ValidationPipe, not used directly here
    @Body() dto: LoginDto,
  ) {
    // req.user was attached by Passport after LocalStrategy succeeded in validation
    // authService.login() signs and returns new JWT
    return this.authService.login(req.user);
  }

  @Get("me")
  // Guard triggers Passport, which runs JwtStrategy before getMe method executes
  // JwtStrategy reads token from Authorization header and calls validate()
  // on success, Passport attaches decoded payload to req.user
  @UseGuards(AuthGuard("jwt"))
  getMe(@Request() req: ExpressRequest & { user: User }) {
    // req.user was attached by Passport(userId + username from token payload)
    // no DB lookup or extra logic needed here, just return it
    return req.user;
  }
}
