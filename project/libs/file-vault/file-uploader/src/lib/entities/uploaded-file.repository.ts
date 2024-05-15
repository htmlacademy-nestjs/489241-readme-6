import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { UploadedFileEntity } from './uploaded-file.entity';
import { UploadedFileFactory } from './uploaded-file.factory';
import { UploadedFileModel } from '../models/uploaded-file.model';

@Injectable()
export class UploadedFileRepository extends BaseMongoRepository<UploadedFileEntity, UploadedFileModel> {
  constructor(
    entityFactory: UploadedFileFactory,
    @InjectModel(UploadedFileModel.name) fileModel: Model<UploadedFileModel>
    ) {
    super(entityFactory, fileModel);
  }
}
