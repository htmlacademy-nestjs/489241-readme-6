import 'multer';
import dayjs from 'dayjs';
import { extension } from 'mime-types';
import { randomUUID } from 'node:crypto';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { FileVaultConfig } from '@project/file-vault-config';
import { FileUploaderResponseError } from './file-uploader.const';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month, day] = dayjs().format('YYYY MM DD').split(' ');
    return join(this.config.uploadDirectory, year, month, day);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);

      const destinationFile = this.getDestinationFilePath(`${filename}.${fileExtension}`);

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(FileUploaderResponseError.FailedToUploadFile);
    }
  }
}
