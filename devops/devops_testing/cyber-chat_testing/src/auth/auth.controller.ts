import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  SerializeOptions,
} from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { Request as ExpressRequest } from "express";
import { User } from "../users/entity/user.entity";
import { LoginDto } from "./dto/login.dto";
import { UserResponseDto } from "../users/dto/userResponse.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post("register")
  // Serialization = Daten/Objekte in ein Format bringen, das übertragen oder gespeichert werden kann.
  // Serializes the response using UserResponseDto before sending it to the client.
  // Only fields marked with @Expose() are included, passwordHash is filtered out.
  @SerializeOptions({ type: UserResponseDto })
  async register(@Body() dto: CreateUserDto) {
    // Creates new user with hashed password.
    // Returns created user.
    return this.usersService.createUser(dto);
  }

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Log in a user" })
  @ApiOkResponse({ type: LoginDto })
  // Guard triggers Passport, which runs LocalStrategy before login method executes.
  // LocalStrategy reads username + password from body and calls authService.validateUser().
  // On success, Passport attaches validated user to req.user.
  @UseGuards(AuthGuard("local"))
  async login(
    // Whole HTTP request with property user that has type User.
    @Request() req: ExpressRequest & { user: User },
    // Triggers ValidationPipe, not used directly here.
    // 'Take body of HTTP request and return it as LoginDto.'
    @Body() dto: LoginDto,
  ) {
    // req.user was attached by Passport after LocalStrategy succeeded in validation.
    // authService.login() signs and returns new JWT.
    return this.authService.login(req.user);
  }

  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the currently authenticated user" })
  @ApiOkResponse({ type: UserResponseDto })
  // Guard triggers Passport, which runs JwtStrategy before getMe method executes.
  // JwtStrategy reads token from Authorization header and calls validate().
  // On success, Passport attaches decoded payload to req.user.
  // @UseGuards(AuthGuard("jwt")) // Not needed, protected automatically by the global JwtAuthGuard (no @Public() here).
  getMe(@Request() req: ExpressRequest & { user: User }) {
    // req.user was attached by Passport from the validated payload (userId + username).
    // No database lookup is needed because the required user data is already available.
    return req.user;
  }
}
