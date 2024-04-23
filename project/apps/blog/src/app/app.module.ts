import { Module } from '@nestjs/common';
import { BlogCategoryModule } from '@project/blog-category';
import { BlogCommentModule } from '@project/blog-comment'

@Module({
  imports: [BlogCategoryModule, BlogCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
