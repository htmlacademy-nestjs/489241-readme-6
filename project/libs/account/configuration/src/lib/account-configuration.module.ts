import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { mongoConfig } from '@project/data-access';
import { messageQueueConfig } from '@project/message-queue';

import accountApplicationConfig from './account-configuration.config'
import jwtConfig from './jwt.config'

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [accountApplicationConfig, jwtConfig, mongoConfig, messageQueueConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class AccountConfigurationModule {}
