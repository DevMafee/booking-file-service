import { RpcException } from '@nestjs/microservices';

export interface IValidationError {
  field: string;
  message: string;
}
export class ValidationException extends RpcException {
  constructor(errors: IValidationError[]) {
    super({
      error: {
        fields: {
          count: errors.length,
          errors: errors.map((error) => ({ message: error })),
        },
        systems: { count: 0, errors: [] },
      },
      status: 400,
    });
  }
}
