import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  HttpException,
  CallHandler,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { JwtPayload } from '@api/auth/auth';
import { Logger } from '@api/common';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor() {
    const logLabel = 'HttpInterceptor';
    this.logger = new Logger(logLabel);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, path } = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const { statusCode } = context.switchToHttp().getResponse();
        const user: JwtPayload | undefined = context
          .switchToHttp()
          .getRequest().user;
        const userStr = user ? `{user:${user.email}}` : '';
        this.logger.http(`(${statusCode}) [${method} ${path}] ${userStr}`);
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          this.logger.http(`${method} ${path} (${err.getStatus()})`);
          throw err;
        }

        this.logger.warn(`Unhandled error - ${err}`);
        throw new HttpException(
          { message: 'Internal server error' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
