import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { ApiConfigurationRegistrationKey, ApiConfigurationPorts } from '@project/api-configuration'

import { AppModule } from './app/app.module';

// Constants
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
      .setTitle('API Gateway Application')
      .setDescription('Provides public API')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX + '/swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get(ApiConfigurationRegistrationKey + '.port') || ApiConfigurationPorts.DEFAULT_API_PORT;

  Logger.verbose("envs", configService["internalConfig"]);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
