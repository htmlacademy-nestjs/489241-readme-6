import 'multer';
import dayjs from 'dayjs';
import { extension } from 'mime-types';
import { randomUUID } from 'node:crypto';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { FileVaultConfig } from '@project/file-vault-config';
import { StoredFile } from '@project/shared-core';

import { UploadedFileRepository } from './entities/uploaded-file.repository';
import { UploadedFileEntity } from './entities/uploaded-file.entity';
import { UploadedFileFactory } from './entities/uploaded-file.factory';
import { FileUploaderResponseError } from './file-uploader.const';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM DD';

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
    private readonly fileRepository: UploadedFileRepository,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month, date] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month, date);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;

      const path = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        filename,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while uploading file: ${error.message}`);
      throw new Error(FileUploaderResponseError.FailedToUploadFile);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<UploadedFileEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new UploadedFileFactory().create({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
      updatedAt: undefined,
    });

    await this.fileRepository.save(fileEntity);
    return fileEntity;
  }

  public async getFile(fileId: string): Promise<UploadedFileEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (! existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
