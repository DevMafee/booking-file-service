import { RpcException } from '@nestjs/microservices';

export class CustomInternalServerException extends RpcException {
  constructor(error) {
    super({
      error: {
        fields: { count: 0, errors: [] },
        systems: {
          count: 1,
          errors: [{ message: 'Failed. Please try again!' }],
        },
      },
      status: 500,
      rawError: error.message,
    });
  }
}
