import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule } from '@project/notify-config';
import { getMongooseOptions } from '@project/data-access';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
