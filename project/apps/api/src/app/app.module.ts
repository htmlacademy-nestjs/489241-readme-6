import { Module } from '@nestjs/common';

import { ApiConfigurationModule } from '@project/api-configuration';

@Module({
  imports: [
    ApiConfigurationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
