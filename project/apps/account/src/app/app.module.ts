import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigurationModule } from '@project/account-configuration';
import { getMongooseOptions } from '@project/data-access';
import { NotifyModule } from '@project/account-notify';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigurationModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
