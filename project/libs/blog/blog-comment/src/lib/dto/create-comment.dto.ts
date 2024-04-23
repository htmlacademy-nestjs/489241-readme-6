import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidationMessages } from '../blog-comment.constants';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidationMessages.TextIsEmpty })
  public text: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidationMessages.InvalidID })
  public userId: string;
}
