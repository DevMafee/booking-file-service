import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PayloadLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const body = context.switchToHttp().getRequest();
    const request_id = uuidv4();
    body['_new_request_id'] = request_id;

    const now = Date.now();
    return next.handle().pipe(
      tap((s) => {
        console.log(`After... ${Date.now() - now}ms ${s}`);
      }),
      map((payload) => {
        const statusCode = payload.statusCode || 200;
        const responseObject = {
          statusCode: statusCode,
          status: payload.status,
          message: payload.message,
        };
        if (payload.metaData) {
          responseObject['metadata'] = payload.metaData;
        }
        responseObject['payload'] = payload.data;
        return responseObject;
      }),
      catchError((err) => {
        err['processTime'] = `${Date.now() - now}`;
        err['context'] = `${className}/${methodName}`;
        return throwError(err);
      }),
    );
  }
}
