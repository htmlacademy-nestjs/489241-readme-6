import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { NotifyConfigurationRegistrationKey, NotifyConfigurationPorts } from '@project/notify-config'

import { AppModule } from './app/app.module';

// Constants
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
      .setTitle('Notify Application')
      .setDescription('Helps to manage notifications')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX + '/swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get(NotifyConfigurationRegistrationKey + '.port')
    || NotifyConfigurationPorts.DEFAULT_NOTIFY_PORT;

  Logger.verbose("envs", configService["internalConfig"]);

  await app.listen(port);
  Logger.log(`🚀 Notify is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
