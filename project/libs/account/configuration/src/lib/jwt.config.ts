import { ConfigType, registerAs } from '@nestjs/config';
import { JwtEnvironmentConfiguration } from './jwt.env';
import { plainToClass } from 'class-transformer';
import { JwtConfigurationRegistrationKey } from './account-configuration.const';

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

async function getJwtConfig(): Promise<JwtEnvironmentConfiguration> {
  const config = plainToClass(JwtEnvironmentConfiguration, {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  });

  await config.validate();

  return config;
}

export default registerAs(JwtConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getJwtConfig>> => {
  return getJwtConfig();
});
