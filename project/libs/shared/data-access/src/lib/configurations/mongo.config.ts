import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { MongoConfigurationPorts, MongoConfigurationRegistrationKey } from './mongo.const';
import { MongoEnvironmentConfiguration } from './mongo.env';

export interface MongoConfiguration {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

async function getDbConfig(): Promise<MongoEnvironmentConfiguration> {
  const config = plainToClass(MongoEnvironmentConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : MongoConfigurationPorts.DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE
  });

  await config.validate();

  return config;
}

export default registerAs(MongoConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getDbConfig>> => {
  return getDbConfig();
});
