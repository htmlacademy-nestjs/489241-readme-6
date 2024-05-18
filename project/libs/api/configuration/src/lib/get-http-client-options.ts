import { ConfigService } from '@nestjs/config';
import { HttpModuleOptions } from '@nestjs/axios';
import { ApiConfigurationRegistrationKey } from './api-configuration.const';

export async function getHttpClientOptions(configService: ConfigService): Promise<HttpModuleOptions> {
  return {
    timeout: configService.get<number>(ApiConfigurationRegistrationKey + '.httpClientTimeout'),
    maxRedirects: configService.get<number>(ApiConfigurationRegistrationKey + '.httpClientMaxRedirects'),
  }
}
