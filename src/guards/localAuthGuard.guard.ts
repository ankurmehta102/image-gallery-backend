import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RolesEnum } from 'src/users/entities/user.entity';

export interface JwtPayloadReceived {
  username: string;
  sub: number;
  role: string;
  iat: number;
  exp: number;
}

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private excludedRoutes = ['/users/signup'];
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const { url, params, method } = request;
    if (this.excludedRoutes.includes(url)) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayloadReceived = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('jwt').secret,
        },
      );
      if (
        url === `/users/${params.userId}` &&
        payload.role !== RolesEnum.ADMIN &&
        `${payload.sub}` !== params.userId
      ) {
        const errMsg =
          method === 'PATCH'
            ? 'You can only update your account.'
            : 'You can only delete your account.';
        throw new UnauthorizedException(errMsg);
      }
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error?.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
