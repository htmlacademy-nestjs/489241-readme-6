import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { BlogConfigurationRegistrationKey, BlogConfigurationPorts } from '@project/blog-configuration'
import { RequestIdInterceptor } from '@project/shared-interceptors';

import { AppModule } from './app/app.module';

// Constants
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Blog Application')
    .setDescription('Helps to manage blog posts and categories')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX + '/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const port = configService.get(BlogConfigurationRegistrationKey + '.port')
    || BlogConfigurationPorts.DEFAULT_BLOG_PORT;

  Logger.verbose("envs", configService["internalConfig"]);

  await app.listen(port);
  Logger.log(`🚀 Blog is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
