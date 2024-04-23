import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CommentPropertiesDescription } from '../blog-comment.constants';

export class CommentRdo {
  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.PostId,
    example: '79cc980c-3e48-4598-8607-0a29f0a837cf'
  })
  public postId: string;

  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.Message,
    example: 'Nice blog!'
  })
  public message: string;

  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.UserId,
    example: '661d57550ef8e7344a0a3d67'
  })
  public userId: string;

  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.CreatedAt,
    required: true,
    example: '1981-01-30'
  })
  public createdAt: Date;
}
