import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidationMessages, CommentPropertiesDescription } from '../blog-comment.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: CommentPropertiesDescription.Message,
    example: 'Great post!',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidationMessages.TextIsEmpty })
  public message: string;

  @ApiProperty({
    description: CommentPropertiesDescription.UserId,
    example: '661d57550ef8e7344a0a3d67',
    required: true,
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidationMessages.InvalidId })
  public userId: string;
}
