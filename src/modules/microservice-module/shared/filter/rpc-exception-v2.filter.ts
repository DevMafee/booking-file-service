import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const body = host.switchToHttp().getRequest();
    const _request_id = body['_request_id'];
    const getError: any = exception.getError();
    const status = getError?.status || 500;
    const response = {
      status: false,
      statusCode: status,
      message: `error`,
      error: getError.error,
    };
    let host_internal_error_json = JSON.stringify(getError.error);
    if (getError.rawError) {
      host_internal_error_json = getError.rawError;
    }
    return throwError(response);
  }
}
