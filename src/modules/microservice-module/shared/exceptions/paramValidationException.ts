import { RpcException } from '@nestjs/microservices';
export class ParamValidationException extends RpcException {
  constructor(errors: string[]) {
    super({ errors });
  }
}
