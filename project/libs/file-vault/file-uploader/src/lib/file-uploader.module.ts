import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { FileVaultConfigurationRegistrationKey } from '@project/file-vault-config';

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
    })
  ],
  providers: [FileUploaderService],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
