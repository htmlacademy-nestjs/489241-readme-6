import { ApiProperty } from '@nestjs/swagger';

import { CategoryPropertiesDescription, CategoryPropertiesValidationMessages } from '../blog-category.constants';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: CategoryPropertiesDescription.Title,
    example: 'Movies',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: CategoryPropertiesValidationMessages.TitleIsEmpty })
  public title: string;
}
