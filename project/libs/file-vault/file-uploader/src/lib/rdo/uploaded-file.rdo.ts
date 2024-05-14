import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UploadedFilePropertiesDescription } from './uploaded-file.const';

export class UploadedFileRdo {
  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.FileId,
    example: '6643b88abf37157f6efdc95a'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.OriginalName,
    example: 'best-photo-ever.png'
  })
  public originalName: string;

  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.HashName,
    example: '81029ff5-d9a9-40b1-b4d1-47e5895c31fa.png'
  })
  public hashName: string;

  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.SubDirectory,
    example: '2024/05/14'
  })
  public subDirectory: string;

  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.MimeType,
    example: 'image/x-png'
  })
  public mimeType: string;

  @Expose()
  @ApiProperty({
    description: UploadedFilePropertiesDescription.Size,
    example: '310',
    type: Number
  })
  public size: number;
}
