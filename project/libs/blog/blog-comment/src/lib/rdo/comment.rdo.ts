import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CommentPropertiesDescription } from '../blog-comment.constants';

export class CommentRdo {
  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.PostId,
    example: 'guid'
  })
  public postId: string;

  @Expose()
  @ApiProperty({
    description: CommentPropertiesDescription.Text,
    example: 'Nice blog!'
  })
  public text: string;

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
