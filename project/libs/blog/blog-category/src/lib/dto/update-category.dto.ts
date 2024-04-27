import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CategoryPropertiesDescription, CategoryPropertiesValidationMessages } from '../blog-category.constants';

export class UpdateCategoryDto {
  @ApiProperty({
    description: CategoryPropertiesDescription.Title,
    example: 'Movies',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: CategoryPropertiesValidationMessages.TitleIsEmpty })
  public title: string;
}
