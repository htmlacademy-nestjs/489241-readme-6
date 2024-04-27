import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CategoryPropertiesDescription } from '../blog-category.constants';

export class CategoryRdo {
  @Expose()
  @ApiProperty({
    description: CategoryPropertiesDescription.CategoryId,
    example: '79cc980c-3e48-4598-8607-0a29f0a837cf'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: CategoryPropertiesDescription.Title,
    example: 'Movies'
  })
  public title: string;
}
