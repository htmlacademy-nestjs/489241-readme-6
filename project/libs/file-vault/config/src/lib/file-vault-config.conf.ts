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
    environment: process.env.ACCOUNT_ENVIRONMENT,
    port: process.env.ACCOUNT_PORT ? parseInt(process.env.ACCOUNT_PORT, 10) : FileVaultConfigurationPorts.DEFAULT_ACCOUNT_PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH
  });

  await config.validate();

  return config;
}

export default registerAs(FileVaultConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getAccountConfig>> => {
  return getAccountConfig();
});
