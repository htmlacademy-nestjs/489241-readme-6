import { Module } from '@nestjs/common';

import { ApiGatewayModule } from '@project/api-gateway';

@Module({
  imports: [
    ApiGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
