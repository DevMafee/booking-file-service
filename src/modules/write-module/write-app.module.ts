import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { PayloadLoggingInterceptor } from '../../common/interceptors/payload-logging.interceptor';
import { WriteModuleList } from './write-module-list';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './task-module/tasks.module';

@Module({
  imports: [ScheduleModule.forRoot(), ...WriteModuleList, TasksModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PayloadLoggingInterceptor,
    },
  ],
})
export class WriteAppModule {}
