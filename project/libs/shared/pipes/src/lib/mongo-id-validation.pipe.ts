import { Types } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

import { MongoIdValidationPipeErrors, ValidationErrors } from './contants';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MongoIdValidationPipeErrors.ParamOnlyError)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ValidationErrors.MongoIdError);
    }

    return value;
  }
}
