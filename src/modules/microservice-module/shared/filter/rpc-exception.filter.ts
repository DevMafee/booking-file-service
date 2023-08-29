import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { ParamValidationException } from '../exceptions/paramValidationException';
import { CustomInternalServerException } from '../exceptions/customInternalServerException';
import { RpcCustomException } from '../exceptions/rpcCustomException';

@Catch(RpcException)
export class RpcExceptionFilter extends BaseRpcExceptionFilter<RpcException> {
  constructor() {
    super();
  }
  catch(exception: any, host: ArgumentsHost) {
    const body = host.switchToHttp().getRequest();
    const _request_id = body['_request_id'];

    //console.log('HELLO ERROR',JSON.stringify(exception));
    const systemError = [];
    let errors = [];
    const internalServerError = JSON.stringify(exception);
    const exceptionGetError = exception.getError();
    let statusCode = 500;
    if (exceptionGetError?.error?.isRpcCustomException) {
      statusCode = exceptionGetError.error.status;
      systemError.push({
        message: exceptionGetError.error.error,
      });
    } else if (exception instanceof ParamValidationException) {
      exception.getError()['errors'].forEach((ele) => {
        systemError.push({
          message: `${ele}`,
        });
      });
    } else if (exception instanceof RpcCustomException) {
      errors = exception.getError()?.['errors'] ?? [];
    } else if (exception instanceof CustomInternalServerException) {
      systemError.push({
        message: 'Failed. Please try again!',
      });
    } else {
      systemError.push({
        message: exception.message || 'Internal error',
      });
    }
    const response = {
      status: false,
      statusCode: statusCode,
      message: `error`,
      error: {
        fields: {
          count: errors.length,
          errors: errors,
        },
        systems: {
          count: systemError.length,
          errors: systemError,
        },
      },
    };
    return throwError(response);
  }
}
