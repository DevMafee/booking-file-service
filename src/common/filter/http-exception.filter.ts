import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../exceptions/validationException';
import { CustomInternalServerException } from '../exceptions/customInternalServerException';
import { ParamValidationException } from '../exceptions/paramValidationException';

/**
 * HttpExceptionFilter user for All error payload responce format
 *
 * @example add to app.module
 * @date 2020-10-09T12:11:13.305Z
 * @class HttpExceptionFilter
 * @since 1.0.0
 * @version 1.0.0
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  /**
   * `catch` override method
   *
   * @date 2020-10-08T12:11:13.305Z
   * @since 1.0.0
   * @version 1.0.0
   * @override
   * @param  {HttpException} exception
   * @param  {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let errors = [];
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus() || 500;
    let errMsg = '';
    const { url } = request;
    const systemError = [];
    const internalServerError = JSON.stringify(exception);
    if (exception instanceof ParamValidationException) {
      exception.getResponse()['errors'].forEach((ele) => {
        systemError.push({
          domain: 'url',
          value: `${url}`,
          message: `${ele}`,
        });
      });
    } else if (exception instanceof ValidationException) {
      errors = exception.getResponse()?.['errors'] ?? [];
    } else if (exception instanceof CustomInternalServerException) {
      errMsg = 'Failed. Please try again!';
      systemError.push({
        domain: 'url',
        value: `${url}`,
        message: `${errMsg}`,
      });
    } else {
      errMsg = exception.message || 'Internal error';
      systemError.push({
        domain: 'url',
        value: `${url}`,
        message: `${errMsg}`,
      });
    }

    const payload = {
      nonce: Date.now(),
      message: `error`,
      status: status,
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
    response.status(status).json(payload);
  }
}
