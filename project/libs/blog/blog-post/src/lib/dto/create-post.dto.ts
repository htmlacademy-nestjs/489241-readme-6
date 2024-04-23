import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';
import { BlogPostPropertiesDescription, BlogPostValidationMessages } from '../blog-post.constants';

export class CreatePostDto {

  @ApiProperty({
    description: BlogPostPropertiesDescription.Title,
    example: 'Vacation in Paris',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.TitleIsEmpty })
  public title: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Description,
    example: 'Indulge in the timeless allure of Paris with a dreamy vacation. Stroll along the Seine, where the Eiffel Tower casts its enchanting shadow.',
    required: false,
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.DescriptionIsEmpty })
  public description: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Content,
    example: '# Vacation in Paris bla-bla-bla',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: BlogPostValidationMessages.ContentIsEmpty })
  public content: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.UserId,
    example: '661d57550ef8e7344a0a3d67',
    required: true,
  })
  @IsString()
  @IsMongoId({ message: BlogPostValidationMessages.InvalidUserId })
  public userId: string;

  @ApiProperty({
    description: BlogPostPropertiesDescription.Categories,
    example: '79cc980c-3e48-4598-8607-0a29f0a837cf',
    required: true,
  })
  @IsUUID('all', { each: true, message: BlogPostValidationMessages.InvalidUUID })
  @IsArray()
  @ArrayNotEmpty({ message: BlogPostValidationMessages.CategoriesNotSpecified })
  public categories: string[];
}
