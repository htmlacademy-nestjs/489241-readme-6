import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { ApiConfigurationPorts, ApiConfigurationRegistrationKey } from './api-configuration.const';
import { ApiEnvironmentConfiguration } from './api-configuration.env';

async function getApiConfig(): Promise<ApiEnvironmentConfiguration> {
  const config = plainToClass(ApiEnvironmentConfiguration, {
    environment: process.env.API_ENVIRONMENT,
    port: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : ApiConfigurationPorts.DEFAULT_API_PORT,
    baseBlogUrl: process.env.BASE_BLOG_URL,
    baseAccountUrl: process.env.BASE_ACCOUNT_URL,
  });

  await config.validate();

  return config;
}

export default registerAs(ApiConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getApiConfig>> => {
  return getApiConfig();
});
