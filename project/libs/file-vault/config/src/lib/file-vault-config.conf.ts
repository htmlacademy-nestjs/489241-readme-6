import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { FileVaultConfigurationPorts, FileVaultConfigurationRegistrationKey } from './file-vault-config.const';
import { FileVaultEnvironmentConfiguration } from './file-vault-config.env'

export interface AccountConfiguration {
  environment: string;
  port: number;
  uploadDirectory: string;
}

async function getAccountConfig(): Promise<FileVaultEnvironmentConfiguration> {
  const config = plainToClass(FileVaultEnvironmentConfiguration, {
    environment: process.env.FILE_VAULT_ENVIRONMENT,
    port: process.env.FILE_VAULT_PORT ? parseInt(process.env.FILE_VAULT_PORT, 10) : FileVaultConfigurationPorts.DEFAULT_FILE_VAULT_PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH
  });

  await config.validate();

  return config;
}

export default registerAs(FileVaultConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getAccountConfig>> => {
  return getAccountConfig();
});
