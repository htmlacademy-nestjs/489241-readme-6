import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigurationModule } from '@project/account-configuration';
import { getMongooseOptions } from '@project/data-access';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigurationModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
