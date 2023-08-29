import 'dotenv/config';
import { MicroserviceModule } from '../modules/microservice-module/microservice.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export async function fileServiceMicroserviceBootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroserviceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: String(process.env.RMQ_URLS).split(','),
        queue: process.env.RMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
  Logger.log(`File Microservice is Running(🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥)`);
}
