import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import apiApplicationConfig from './api-configuration.config'
import { ApiConfigurationEnvFilePath } from './api-configuration.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [apiApplicationConfig],
      envFilePath: ApiConfigurationEnvFilePath
    }),
  ]
})
export class ApiConfigurationModule {}
