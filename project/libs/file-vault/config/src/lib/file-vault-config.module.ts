import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileVaultConfig from './file-vault-config.conf';
import { FileVaultConfigurationEnvFilePath } from './file-vault-config.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig],
      envFilePath: FileVaultConfigurationEnvFilePath
    }),
  ]
})
export class FileVaultConfigModule {}
