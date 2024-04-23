import { Expose } from 'class-transformer';

import { BlogPostRdo } from './blog-post.rdo';
import { BlogPostsWithPagingPropertiesDescription } from '../blog-post.constants';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostWithPaginationRdo {
  @Expose()
  @ApiProperty({
    description: BlogPostsWithPagingPropertiesDescription.Entities,
  })
  public entities: BlogPostRdo[];

  @Expose()
  @ApiProperty({
    description: BlogPostsWithPagingPropertiesDescription.TotalPages,
    example: 10
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: BlogPostsWithPagingPropertiesDescription.TotalItems,
    example: 100
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: BlogPostsWithPagingPropertiesDescription.CurrentPage,
    example: 3
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: BlogPostsWithPagingPropertiesDescription.ItemsPerPage,
    example: 10
  })
  public itemsPerPage: number;
}
