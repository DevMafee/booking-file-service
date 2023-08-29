import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PayloadLoggingInterceptor } from './shared/interceptors/payload-logging.interceptor';
import { MicroserviceLoggerMiddleware } from './shared/logger/logger.middleware';
import { FileHandleModule } from './file-handle-module/file-handle.module';
import { ExceptionFilter } from './shared/filter/rpc-exception-v2.filter';

@Module({
  imports: [FileHandleModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PayloadLoggingInterceptor,
    },
  ],
})
export class MicroserviceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MicroserviceLoggerMiddleware);
  }
}
