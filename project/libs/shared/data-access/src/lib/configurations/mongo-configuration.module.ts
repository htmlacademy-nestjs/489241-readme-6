import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

import mongoConfig from './mongo.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class MongoConfigurationModule {}
