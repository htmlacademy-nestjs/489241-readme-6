import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FileVaultConfigurationRegistrationKey } from '@project/file-vault-config';

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { UploadedFileModel, FileSchema } from './models/uploaded-file.model';
import { UploadedFileFactory } from './entities/uploaded-file.factory';
import { UploadedFileRepository } from './entities/uploaded-file.repository';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(FileVaultConfigurationRegistrationKey + '.uploadDirectory');
        const staticPath = configService.get<string>(FileVaultConfigurationRegistrationKey + '.staticRoot');

        return [{
          rootPath,
          serveRoot: staticPath || SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: UploadedFileModel.name, schema: FileSchema }
    ])
  ],
  providers: [
    FileUploaderService,
    UploadedFileRepository,
    UploadedFileFactory,
  ],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
