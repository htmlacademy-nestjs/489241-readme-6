import { Module } from '@nestjs/common';
import { BlogCategoryModule } from '@project/blog-category';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';
import { BlogConfigurationModule } from '@project/blog-configuration';

@Module({
  imports: [
    BlogCategoryModule,
    BlogCommentModule,
    BlogPostModule,
    BlogConfigurationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
