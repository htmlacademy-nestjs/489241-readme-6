import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt-configuration.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt-configuration.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}
