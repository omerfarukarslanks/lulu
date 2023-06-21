/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from "helmet";
import {loadConfigJson} from "@translations-config/service";
import {ServiceConfiguration} from "@translations-config/model";

const config: ServiceConfiguration = loadConfigJson();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = config.GLOBAL_API_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = config.HTTP_PORT || process.env.HTTP_PORT || 9090;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
