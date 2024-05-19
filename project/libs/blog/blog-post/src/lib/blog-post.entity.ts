import { BlogCategoryEntity, BlogCategoryFactory } from '@project/blog-category';
import { Entity, Post, PostState, PostStateValues, PostTypeValues, StorableEntity } from '@project/shared-core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public title: string;
  public categories: BlogCategoryEntity[]
  public description: string;
  public content: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public comments: BlogCommentEntity[];
  public state: PostStateValues;
  public type: PostTypeValues;
  public likes?: string[];
  public likesCount?: number;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (! post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.description = post.description;
    this.state = post.state;
    this.type = post.type;
    this.categories = [];
    this.comments = [];
    this.likes = post.likes;
    this.likesCount = post.likesCount;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogCategoryFactory = new BlogCategoryFactory();
    for (const category of post.categories) {
      const blogCategoryEntity = blogCategoryFactory.create(category);
      this.categories.push(blogCategoryEntity);
    }
  }

  toggleLike(userId: string) {
    if (this.likes.includes(userId)) {
      this.likes = this.likes.filter(id => id !== userId);
    } else {
      this.likes.push(userId);
    }

    this.likesCount = this.likes.length;
  }

  togglePublish() {
    if (this.state === PostState.Draft) {
      this.state = PostState.Published;
    } else {
      this.state = PostState.Draft;
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      title: this.title,
      content: this.content,
      userId: this.userId,
      categories: this.categories.map((categoryEntity) => categoryEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      state: this.state,
      type: this.type,
      likes: this.likes,
      likesCount: this.likesCount
    }
  }
}
