import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnum } from '../users/entities/user.entity';
import { JwtPayloadReceived } from './localAuthGuard.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflactor.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: JwtPayloadReceived } = context
      .switchToHttp()
      .getRequest();
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
