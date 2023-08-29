import { CustomInternalServerException } from './customInternalServerException';
import { ValidationException } from './validationException';
import { ParamValidationException } from './paramValidationException';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomException } from './rpcCustomException';

export class CustomException extends RpcException {
  constructor(error) {
    if (error instanceof RpcException === false) {
      throw new CustomInternalServerException(error);
    } else if (error instanceof CustomInternalServerException) {
      throw error;
    } else if (error instanceof RpcCustomException) {
      throw error;
    } else if (error instanceof ValidationException) {
      throw error;
    } else if (error instanceof ParamValidationException) {
      throw error;
    }
    super(error);
  }
}
