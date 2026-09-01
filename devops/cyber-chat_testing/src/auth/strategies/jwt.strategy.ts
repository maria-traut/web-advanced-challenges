import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // Read JWT secret from environment via ConfigService, not hardcoded
    const secret = config.get<string>("JWT_SECRET");
    if (!secret) {
      // Fail fast at startup if secret is missing, instead of failing later at runtime
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    // The super() call in a NestJS JWT Strategy constructor initializes the parent PassportStrategy class with the configuration object passed as an argument.
    // 'super' must be called before accessing 'this'.
    super({
      // Extract token from "Authorization: Bearer <token>" header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject expired tokens automatically
      ignoreExpiration: false,
      // Secret used to verify the token's signature
      secretOrKey: secret,
    });
  }

  // Called automatically by Passport after the token's signature and expiration are verified
  // Payload = decoded JWT contents (what was signed in authService.login())
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
