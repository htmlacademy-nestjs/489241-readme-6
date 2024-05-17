import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigurationModule, getHttpClientOptions } from '@project/api-configuration';

@Module({
  imports: [
    ApiConfigurationModule,
    HttpModule.registerAsync({
      imports: [ApiConfigurationModule],
      useFactory: getHttpClientOptions,
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
