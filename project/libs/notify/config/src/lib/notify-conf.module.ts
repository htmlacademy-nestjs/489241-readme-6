import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { mongoConfig } from '@project/data-access';
import { messageQueueConfig } from '@project/message-queue';
import { emailConfig } from '@project/email-config';

import notifyConfig from './notify.conf';
import { NotifyConfigurationEnvFilePath } from './notify.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig, mongoConfig, messageQueueConfig, emailConfig],
      envFilePath: NotifyConfigurationEnvFilePath
    }),
  ]
})
export class NotifyConfigModule {}
