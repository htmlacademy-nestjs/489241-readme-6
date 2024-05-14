import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploaderModule } from '@project/file-uploader';
import { FileVaultConfigModule } from '@project/file-vault-config';
import { getMongooseOptions } from '@project/data-access';

@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
