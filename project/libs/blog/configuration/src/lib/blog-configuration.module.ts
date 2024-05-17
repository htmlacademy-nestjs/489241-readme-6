import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import blogApplicationConfig from './blog-configuration.config'
import { BlogConfigurationEnvFilePath } from './blog-configuration.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [blogApplicationConfig],
      envFilePath: BlogConfigurationEnvFilePath
    }),
  ]
})
export class BlogConfigurationModule {}
