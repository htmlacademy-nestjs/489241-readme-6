import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { FileVaultConfigurationRegistrationKey } from 'libs/file-vault/config/src/lib/file-vault-config.const';

// Constants
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(GLOBAL_PREFIX);

    const config = new DocumentBuilder()
      .setTitle('File Vault Application')
      .setDescription('Helps to manage files')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(GLOBAL_PREFIX + '/swagger', app, document);

    const configService = app.get(ConfigService);
    const port = configService.get(FileVaultConfigurationRegistrationKey + '.port');

    await app.listen(port || 3000);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
    );
}

bootstrap();
