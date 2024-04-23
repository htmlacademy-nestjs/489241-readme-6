import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SortDirection } from '@project/shared-core';

import { BlogPostPropertiesDescription, BlogPostQueryDefaults } from '../blog-post.constants';

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
    example: ['79cc980c-3e48-4598-8607-0a29f0a837cf'],
    required: false,
    isArray: true
  })
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QuerySortDirection,
    example: SortDirection.Desc,
    type: SortDirection
  })
  public sortDirection: SortDirection = SortDirection.Desc;

  @Transform(({ value }) => +value || BlogPostQueryDefaults.DefaultPageCount)
  @IsOptional()
  @ApiProperty({
    description: BlogPostPropertiesDescription.QueryPageNumber,
    example: SortDirection.Desc,
    type: SortDirection
  })
  public page: number = BlogPostQueryDefaults.DefaultPageCount;
}
