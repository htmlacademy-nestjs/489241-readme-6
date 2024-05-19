import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    console.log('UserId Interceptor -> BEGIN');
    const request = context.switchToHttp().getRequest();
    console.log('UserId Interceptor -> user', request.user);
    request.body['userId'] = request.user.id;

    return next.handle();
  }
}
