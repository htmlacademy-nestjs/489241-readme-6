import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtConfigurationRegistrationKey } from './account-configuration.const';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(JwtConfigurationRegistrationKey + '.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>(JwtConfigurationRegistrationKey + '.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}
