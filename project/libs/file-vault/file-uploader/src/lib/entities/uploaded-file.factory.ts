import { Injectable } from '@nestjs/common';

import { File, EntityFactory } from '@project/shared-core';
import { UploadedFileEntity } from './uploaded-file.entity';

@Injectable()
export class UploadedFileFactory implements EntityFactory<UploadedFileEntity> {
  public create(entityPlainData: File): UploadedFileEntity {
    return new UploadedFileEntity(entityPlainData);
  }
}
