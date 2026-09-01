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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(config) {
        // Read JWT secret from environment via ConfigService, not hardcoded
        const secret = config.get("JWT_SECRET");
        if (!secret) {
            // Fail fast at startup if secret is missing, instead of failing later at runtime
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        // The super() call in a NestJS JWT Strategy constructor initializes the parent PassportStrategy class with the configuration object passed as an argument.
        // 'super' must be called before accessing 'this'.
        super({
            // Extract token from "Authorization: Bearer <token>" header
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Reject expired tokens automatically
            ignoreExpiration: false,
            // Secret used to verify the token's signature
            secretOrKey: secret,
        });
    }
    // Called automatically by Passport after the token's signature and expiration are verified
    // Payload = decoded JWT contents (what was signed in authService.login())
    async validate(payload) {
        return {
            userId: payload.sub,
            username: payload.username,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map