import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckUserId implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    if (params.userId !== `${user.sub}`) {
      throw new UnauthorizedException('Invalid user ID');
    }

    return next.handle();
  }
}
