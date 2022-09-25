import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { HttpFilter, HttpInterceptor, Logger } from '@api/common';
import { AppModule } from '@api/app.module';
import * as config from '@api/config';

async function bootstrap() {
  const logLabel = 'Nest';
  const logger = new Logger(logLabel);
  const app = await NestFactory.create(AppModule, { logger });

  // Add a couple of configurations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpFilter());
  app.enableCors();

  // All endpoints reachable at /api/v1/*
  app.setGlobalPrefix('api');
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

  // Should be the last thing to execute
  await app.listen(config.PORT);
}

bootstrap();
