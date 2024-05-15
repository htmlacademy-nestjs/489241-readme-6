import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { mongoConfig } from '@project/data-access';

import fileVaultConfig from './file-vault-config.conf';
import { FileVaultConfigurationEnvFilePath } from './file-vault-config.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig, mongoConfig],
      envFilePath: FileVaultConfigurationEnvFilePath
    }),
  ]
})
export class FileVaultConfigModule {}
