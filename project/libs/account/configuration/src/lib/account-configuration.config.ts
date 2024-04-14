import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { AccountConfigurationPorts } from './account-configuration.const';
import { AccountEnvironmentConfiguration } from './account-configuration.env';

export interface AccountConfiguration {
  environment: string;
  port: number;
}

async function getAccountConfig(): Promise<AccountEnvironmentConfiguration> {
  const config = plainToClass(AccountEnvironmentConfiguration, {
    environment: process.env.ACCOUNT_ENVIRONMENT,
    port: process.env.ACCOUNT_PORT ? parseInt(process.env.ACCOUNT_PORT, 10) : AccountConfigurationPorts.DEFAULT_ACCOUNT_PORT
  });

  await config.validate();

  return config;
}

export default registerAs('account-configuration', async (): Promise<ConfigType<typeof getAccountConfig>> => {
  return getAccountConfig();
});
