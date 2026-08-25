"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/decorators/public.decorator");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const createUser_dto_1 = require("../users/dto/createUser.dto");
const users_service_1 = require("../users/users.service");
const login_dto_1 = require("./dto/login.dto");
const userResponse_dto_1 = require("../users/dto/userResponse.dto");
let AuthController = class AuthController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(dto) {
        // Creates new user with hashed password.
        // Returns created user.
        return this.usersService.createUser(dto);
    }
    async login(req, dto) {
        // req.user was attached by Passport after LocalStrategy succeeded in validation.
        // authService.login() signs and returns new JWT.
        return this.authService.login(req.user);
    }
    // Guard triggers Passport, which runs JwtStrategy before getMe method executes.
    // JwtStrategy reads token from Authorization header and calls validate().
    // On success, Passport attaches decoded payload to req.user.
    // @UseGuards(AuthGuard("jwt")) // Not needed, protected automatically by the global JwtAuthGuard (no @Public() here).
    getMe(req) {
        // req.user was attached by Passport from the validated payload (userId + username).
        // No database lookup is needed because the required user data is already available.
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("register")
    // Serialization = Daten/Objekte in ein Format bringen, das übertragen oder gespeichert werden kann.
    // Serializes the response using UserResponseDto before sending it to the client.
    // Only fields marked with @Expose() are included, passwordHash is filtered out.
    ,
    (0, common_1.SerializeOptions)({ type: userResponse_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("login")
    // Guard triggers Passport, which runs LocalStrategy before login method executes.
    // LocalStrategy reads username + password from body and calls authService.validateUser().
    // On success, Passport attaches validated user to req.user.
    ,
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("me")
    // Guard triggers Passport, which runs JwtStrategy before getMe method executes.
    // JwtStrategy reads token from Authorization header and calls validate().
    // On success, Passport attaches decoded payload to req.user.
    // @UseGuards(AuthGuard("jwt")) // Not needed, protected automatically by the global JwtAuthGuard (no @Public() here).
    ,
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map