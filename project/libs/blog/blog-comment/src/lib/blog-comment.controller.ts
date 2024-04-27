import { Controller, Get, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
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
}
