import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../../common/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    // Initialize the parent Passport AuthGuard.
    super();
  }
  canActivate(context: ExecutionContext) {
    // Check whether the current route or controller is marked as public.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Allow public routes without requiring JWT authentication.
    if (isPublic) {
      return true;
    }

    // For protected routes, let Passport's JWT strategy authenticate the request.
    return super.canActivate(context);
  }
}
