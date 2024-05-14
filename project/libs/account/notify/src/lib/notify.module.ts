import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/shared-core';

import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('message-queue')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
