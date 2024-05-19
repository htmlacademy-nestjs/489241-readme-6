import { Injectable } from '@nestjs/common';

import { EntityFactory, Post, PostState } from '@project/shared-core';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogCategoryEntity } from '@project/blog-category';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto, categories: BlogCategoryEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.id = crypto.randomUUID();
    entity.categories = categories;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.comments = [];
    entity.state = PostState.Draft;
    entity.type = dto.type;
    entity.likes = [];
    entity.likesCount = 0;
    entity.originalPostId = null;

    return entity;
  }
}
