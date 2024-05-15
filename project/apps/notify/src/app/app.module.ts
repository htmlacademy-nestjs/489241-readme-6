import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule } from '@project/notify-config';
import { getMongooseOptions } from '@project/data-access';
import { EmailSubscriberModule } from '@project/email-subscriber';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
