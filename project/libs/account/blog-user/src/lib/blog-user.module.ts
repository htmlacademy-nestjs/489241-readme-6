import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BlogUserFactory } from './entities/blog-user.factory';
import { BlogUserRepository } from './entities/blog-user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, BlogUserFactory, BlogUserRepository],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
