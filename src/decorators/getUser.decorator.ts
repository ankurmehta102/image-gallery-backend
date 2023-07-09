import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadReceived } from 'src/guards/localAuthGuard.guard';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadReceived => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
