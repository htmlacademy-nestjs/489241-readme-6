import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { FileVaultConfigurationRegistrationKey, FileVaultConfigurationPorts } from '@project/file-vault-config'

import { AppModule } from './app/app.module';

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

    Logger.verbose("envs", configService["internalConfig"]);

    await app.listen(port || FileVaultConfigurationPorts.DEFAULT_FILE_VAULT_PORT);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
    );
}

bootstrap();
