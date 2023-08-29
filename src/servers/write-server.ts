import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { WriteAppModule } from '../modules/write-module/write-app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataTransformGlobalPipe } from '../common/pipes/dataTransformGlobalPipe';

export async function writeServerBootstrap() {
  const port = process.env.WRITE_PORT;
  const host = process.env.SYSTEM_HOST;
  const app = await NestFactory.create(WriteAppModule);
  app.useGlobalPipes(new DataTransformGlobalPipe());
  const globalPrefix = 'file-write';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('BookingApp FILE WRITE SERVER')
    .setDescription('The BookingApp FILE WRITE SERVER description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(port);
  Logger.log(
    `Server is Running(🔥) on http://${host}:${port}/${globalPrefix}/v1/`,
    'BookingApp',
  );
}
