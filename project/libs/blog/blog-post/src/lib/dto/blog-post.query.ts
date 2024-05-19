import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PostType, PostTypeValues, SortDirection } from '@project/shared-core';

import { BlogPostPropertiesDescription, BlogPostQueryDefaults } from '../blog-post.constants';
import { BlogPostSortByType } from '../blog-port-sort-type.enum';

export class BlogPostQuery {
  @Transform(({ value }) => +value || BlogPostQueryDefaults.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryLimit,
    example: 10,
    required: true,
  })
  public limit = BlogPostQueryDefaults.DefaultCountLimit;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryCategories,
    example: [],
    required: false,
    isArray: true
  })
  @Transform(({ value }) => value.split(','))
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QuerySortDirection,
    example: SortDirection.Desc,
    type: SortDirection,
    required: false,
  })
  public sortDirection: SortDirection = SortDirection.Desc;

  @IsIn(Object.values(BlogPostSortByType))
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QuerySortProperty,
    example: BlogPostSortByType.CreatedBy,
    type: BlogPostSortByType,
    required: false,
  })
  public sortProperty: BlogPostSortByType = BlogPostSortByType.CreatedBy;

  @Transform(({ value }) => +value || BlogPostQueryDefaults.DefaultPageCount)
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryPageNumber,
    example: 1,
  })
  public page: number = BlogPostQueryDefaults.DefaultPageCount;

  @IsOptional()
  @IsString()
  @IsEnum(PostType)
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryPostType,
    example: PostType.Text,
    required: false,
  })
  public type: PostTypeValues;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryPostAuthor,
    required: false,
  })
  public authorId: string;
}
