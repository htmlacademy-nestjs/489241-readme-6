import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { CategoryRdo } from '@project/blog-category';

import { BlogPostPropertiesDescription, BlogPostValidationMessages } from '../blog-post.constants';
import { IsMongoId } from 'class-validator';

export class BlogPostRdo {

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.Id,
    example: '79cc980c-3e48-4598-8607-0a29f0a837cf'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.Title,
    example: 'Vacation in Paris'
  })
  public title: string;

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.Description,
    example: 'Indulge in the timeless allure of Paris with a dreamy vacation. Stroll along the Seine, where the Eiffel Tower casts its enchanting shadow.'
  })
  public description: string;

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.Content,
    example: '# Vacation in Paris bla-bla-bla'
  })
  public content: string;

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.CreateAt,
    example: '1981-01-30'
  })
  public createdAt: string;

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.UserId,
    example: '661d57550ef8e7344a0a3d67'
  })
  @IsMongoId({ message: BlogPostValidationMessages.InvalidUserId })
  public userId: string;

  @Expose()
  @Type(() => CategoryRdo)
  @ApiProperty({
    description: BlogPostPropertiesDescription.Categories,
    example: [],
    isArray: true
  })
  public categories: CategoryRdo[];

  @Expose()
  @ApiProperty({
    description: BlogPostPropertiesDescription.Comments,
    example: [],
    isArray: true
  })
  public comments: Comment[]
}
