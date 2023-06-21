/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory, repl} from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from "helmet";
import {loadConfigJson} from "@translations-config/service";
import {ServiceConfiguration} from "@translations-config/model";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const config: ServiceConfiguration = loadConfigJson();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = config.GLOBAL_API_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Translations')
    .setDescription('The translations API description')
    .setVersion('1.0')
    .addTag('translations')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(config.SWAGGER_PREFIX, app, document);
  const port = config.HTTP_PORT || process.env.HTTP_PORT || 9090;
  await repl(AppModule);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
