import 'multer';
import { Express } from 'express';
import { Controller, Post, UploadedFile, UseInterceptors, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderOperationDescription, FileUploaderResponseError, FileUploaderResponseMessage } from './file-uploader.const';

@ApiTags('files')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: FileUploaderOperationDescription.UploadFile })
  @ApiOkResponse({
    description: FileUploaderResponseMessage.FileUploaded,
  })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: FileUploaderResponseError.FailedToUploadFile })
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploaderService.saveFile(file);
  }
}
