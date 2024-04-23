import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentOperationDescription, BlogCommentResponseError, BlogCommentResponseMessage } from './blog-comment.constants';


@ApiTags('blog')
@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: BlogCommentOperationDescription.ShowCommentsByBlogId })
  @ApiOkResponse({
    description: BlogCommentResponseMessage.ShowCommentsByBlogId,
    type: CommentRdo,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogCommentResponseError.BlogNotFound })
  public async show(@Param('postId', ParseUUIDPipe) postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  @ApiOperation({ summary: BlogCommentOperationDescription.CreateCommentForBlogId })
  @ApiCreatedResponse({
    description: BlogCommentResponseMessage.CreateCommentForBlogId,
    type: CommentRdo,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogCommentResponseError.BlogNotFound })
  public async create(@Param('postId', ParseUUIDPipe) postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
