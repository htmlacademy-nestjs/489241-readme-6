import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

// Constants
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Account Application')
    .setDescription('Helps to manage users and handle authentication')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX + '/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const configService = app.get(ConfigService);
  const port = configService.get('account-configuration.port');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
