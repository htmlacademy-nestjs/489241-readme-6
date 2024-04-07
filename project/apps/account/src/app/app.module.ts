import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigurationModule } from '@project/account-configuration';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigurationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
