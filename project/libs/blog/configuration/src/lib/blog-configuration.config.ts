import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { BlogConfigurationPorts, BlogConfigurationRegistrationKey } from './blog-configuration.const';
import { BlogEnvironmentConfiguration } from './blog-configuration.env';

async function getBlogConfig(): Promise<BlogEnvironmentConfiguration> {
  const config = plainToClass(BlogEnvironmentConfiguration, {
    environment: process.env.BLOG_ENVIRONMENT,
    port: process.env.BLOG_PORT ? parseInt(process.env.BLOG_PORT, 10) : BlogConfigurationPorts.DEFAULT_BLOG_PORT,
  });

  await config.validate();

  return config;
}

export default registerAs(BlogConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getBlogConfig>> => {
  return getBlogConfig();
});
