import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoryPropertiesDescription } from '../blog-category.constants';

export class CategoryRdo {
  @Expose()
  @ApiProperty({
    description: CategoryPropertiesDescription.CategoryId,
    example: 'guid'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: CategoryPropertiesDescription.Title,
    example: 'Movies'
  })
  public title: string;
}
