import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token not found.');
    }

    try {
      // TODO: Move secret to a configuration file
      const payload = await this.authService.verifyToken(token);
      const user = await this.usersService.getUserByID(payload.userId, true);

      if (!user) {
        throw new NotFoundException(
          "Couldn't find your account, please create an account",
        );
      }

      request['user'] = user;
    } catch (err) {
      throw new UnauthorizedException(
        "Couldn't verify your identity, please try logging in again",
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (authHeader && typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}
