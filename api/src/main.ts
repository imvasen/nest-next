import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@api/app.module';
import * as config from '@api/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.setGlobalPrefix('api');
  await app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

  // Should be the last thing to execute
  await app.listen(config.PORT);
}

bootstrap();
