import 'multer';
import { Express } from 'express';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared-helpers'

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderOperationDescription, FileUploaderResponseError, FileUploaderResponseMessage } from './file-uploader.const';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@ApiTags('files')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: FileUploaderOperationDescription.UploadFile })
  @ApiConsumes("multipart/form-data")
  @ApiOkResponse({
    description: FileUploaderResponseMessage.FileUploaded,
    type: UploadedFileRdo
  })
  @ApiBody({
    required: true,
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: FileUploaderResponseError.FailedToUploadFile })
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  @ApiOperation({ summary: FileUploaderOperationDescription.UploadFile })
  @ApiOkResponse({
    description: FileUploaderResponseMessage.GetFileMetadata,
    type: UploadedFileRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: FileUploaderResponseError.FileNotFound })
  public async getFile(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile);
  }
}
