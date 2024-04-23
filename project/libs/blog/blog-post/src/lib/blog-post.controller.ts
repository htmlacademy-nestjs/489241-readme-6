import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';

import { BlogPostService } from './blog-post.service';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostQuery } from './dto/blog-post.query';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostOperationDescription, BlogPostResponseError, BlogPostResponseMessage } from './blog-post.constants';

@ApiTags('blog')
@Controller('posts')
export class BlogPostController {
  constructor (
    private readonly blogPostService: BlogPostService,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: BlogPostOperationDescription.ShowBlogPostById })
  @ApiOkResponse({
    description: BlogPostResponseMessage.ShowBlogPostById,
    type: BlogPostRdo,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogPostResponseError.BlogNotFound })
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: BlogPostOperationDescription.SearchBlogPosts })
  @ApiOkResponse({
    description: BlogPostResponseMessage.SearchBlogPosts,
    type: BlogPostWithPaginationRdo,
  })
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @Post('/')
  @ApiOperation({ summary: BlogPostOperationDescription.CreateBlogPost })
  @ApiCreatedResponse({
    description: BlogPostResponseMessage.CreatedBlogPost,
    type: CreatePostDto,
  })
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @ApiOperation({ summary: BlogPostOperationDescription.DeleteBlogPostById })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogPostResponseError.BlogNotFound })
  public async destroy(@Param('id', ParseUUIDPipe) id: string) {
    await this.blogPostService.deletePost(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: BlogPostOperationDescription.UpdateBlogPostById })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogPostResponseError.BlogNotFound })
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }
}
