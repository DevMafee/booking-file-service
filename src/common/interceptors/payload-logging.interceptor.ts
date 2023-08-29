import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class PayloadLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const ctx = context.switchToHttp();
    const statusCode = context.switchToHttp().getResponse()['statusCode'];
    const request = ctx.getRequest();
    console.log(
      '\x1b[36m%s\x1b[0m',
      `${className}@${methodName} -> ${request.originalUrl}`,
    );
    const now = Date.now();
    // console.log(`${now} - before`);

    return next.handle().pipe(
      tap(),
      map((payload) => {
        const _request_id = request['_request_id'];
        context.switchToHttp().getResponse()['statusCode'] = payload.statusCode;
        const statusCode = payload.statusCode || 200;
        const responseObject = {
          nonce: new Date().getTime(),
          status: statusCode,
          message: payload.message,
        };
        if (payload.metadata) {
          responseObject['metadata'] = payload.metadata;
        }
        responseObject['payload'] = payload.data;
        return responseObject;
      }),
      catchError((err) => {
        // console.log(`${now} - after`);
        err['processTime'] = `${Date.now() - now}`;
        err['context'] = `${className}/${methodName}`;
        return throwError(err);
      }),
    );
  }
}
