import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BlogUserFactory } from './entities/blog-user.factory';
import { BlogUserRepository } from './entities/blog-user.repository';
import { BlogUserModel, BlogUserSchema } from './models/blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService, BlogUserFactory, BlogUserRepository],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
