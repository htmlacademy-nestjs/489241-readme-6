import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty,IsOptional, IsString, IsUUID } from 'class-validator';

import { BlogPostPropertiesDescription, BlogPostValidationMessages } from '../blog-post.constants';

export class UpdatePostDto {

  @ApiProperty({
    description: BlogPostPropertiesDescription.Title,
    example: 'Vacation in Paris',
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.TitleIsEmpty })
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Description,
    example: 'Indulge in the timeless allure of Paris with a dreamy vacation. Stroll along the Seine, where the Eiffel Tower casts its enchanting shadow.',
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.DescriptionIsEmpty })
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Content,
    example: '# Vacation in Paris bla-bla-bla',
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.ContentIsEmpty })
  @IsOptional()
  public content?: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Categories,
    example: ['79cc980c-3e48-4598-8607-0a29f0a837cf'],
    isArray: true
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty({ message: BlogPostValidationMessages.CategoriesNotSpecified })
  @IsOptional()
  public categories?: string[];
}
