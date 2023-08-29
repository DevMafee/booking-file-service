import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataTransformGlobalPipe } from '../common/pipes/dataTransformGlobalPipe';
import { ReadAppModule } from '../modules/read-module/read-app.module';

export async function readServerBootstrap() {
  const port = process.env.READ_PORT;
  const host = process.env.SYSTEM_HOST;
  const app = await NestFactory.create(ReadAppModule);
  app.useGlobalPipes(new DataTransformGlobalPipe());
  const globalPrefix = 'file-read';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Booking App FILE READ SERVER')
    .setDescription('The Booking App FILE READ SERVER description')
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
    'Booking App',
  );
}
