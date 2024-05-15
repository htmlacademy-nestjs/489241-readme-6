import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { FileVaultConfigurationPorts, FileVaultConfigurationRegistrationKey } from './file-vault-config.const';
import { FileVaultEnvironmentConfiguration } from './file-vault-config.env'

export interface FileVaultConfiguration {
  environment: string;
  port: number;
  uploadDirectory: string;
}

async function getFileVaultConfig(): Promise<FileVaultEnvironmentConfiguration> {
  const config = plainToClass(FileVaultEnvironmentConfiguration, {
    environment: process.env.FILE_VAULT_ENVIRONMENT,
    port: process.env.FILE_VAULT_PORT ? parseInt(process.env.FILE_VAULT_PORT, 10) : FileVaultConfigurationPorts.DEFAULT_FILE_VAULT_PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    staticRoot: process.env.STATIC_ROOT,
  });

  await config.validate();

  return config;
}

export default registerAs(FileVaultConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getFileVaultConfig>> => {
  return getFileVaultConfig();
});
