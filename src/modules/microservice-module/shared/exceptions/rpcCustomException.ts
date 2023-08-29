import { RpcException } from '@nestjs/microservices';

export class RpcCustomException extends RpcException {
  constructor(error: string, status: number) {
    super({
      error: {
        fields: { count: 0, errors: [] },
        systems: { count: 1, errors: [{ message: error }] },
      },
      status: status,
    });
  }
}
