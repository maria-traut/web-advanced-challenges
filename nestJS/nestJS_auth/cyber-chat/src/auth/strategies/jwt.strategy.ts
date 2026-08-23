import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // read JWT secret from environment via ConfigService, not hardcoded
    const secret = config.get<string>("JWT_SECRET");
    if (!secret) {
      // fail fast at startup if secret is missing, instead of failing later at runtime
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    super({
      // extract token from "Authorization: Bearer <token>" header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // reject expired tokens automatically
      ignoreExpiration: false,
      // secret used to verify the token's signature
      secretOrKey: secret,
    });
  }

  // called automatically by Passport after the token's signature and expiration are verified
  // payload = decoded JWT contents (what was signed in authService.login())
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
