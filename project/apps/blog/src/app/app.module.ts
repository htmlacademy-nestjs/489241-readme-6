import { Module } from '@nestjs/common';
import { BlogCategoryModule } from '@project/blog-category';

@Module({
  imports: [BlogCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
