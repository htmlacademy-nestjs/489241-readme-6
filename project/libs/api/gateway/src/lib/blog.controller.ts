import { Inject, Body, Controller, Post, UseFilters, UseGuards, UseInterceptors, ParseUUIDPipe, Param, HttpStatus, HttpCode, Patch, Query, Get, Req } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { apiConfig, BlogEndpoints } from '@project/api-configuration';
import { InjectUserIdInterceptor } from '@project/shared-interceptors';
import { BlogPostWithPaginationRdo, BlogPostQuery } from '@project/blog-post';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { BlogPostOperationDescription, BlogPostPropertiesDescription, BlogPostResponseError, BlogPostResponseMessage } from './blog.constants';
import { RequestWithUser } from '@project/authentication';

@ApiTags('blog')
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    @Inject(apiConfig.KEY)
    private readonly config: ConfigType<typeof apiConfig>,
    private readonly httpService: HttpService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: BlogPostOperationDescription.CreateBlogPost })
  @ApiCreatedResponse({
    description: BlogPostResponseMessage.CreatedBlogPost,
    type: AddNewPostDto,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async create(@Body() dto: AddNewPostDto) {
    const createBlogUrl = this.config.getBlogUrl(BlogEndpoints.RootPosts);
    const { data } = await this.httpService.axiosRef.post(createBlogUrl, dto);
    return data;
  }

  @Get('/')
  @ApiOperation({ summary: BlogPostOperationDescription.SearchBlogPosts })
  @ApiOkResponse({
    description: BlogPostResponseMessage.SearchBlogPosts,
    type: BlogPostWithPaginationRdo,
  })
  public async index(@Query() query: BlogPostQuery) {
    const queryBlogPostsUrl = this.config.getBlogUrl(BlogEndpoints.RootPosts);
    console.log('query', query);
    const { data } = await this.httpService.axiosRef.get(queryBlogPostsUrl,
      {
        params: query
      }
    );
    return data;
  }

  @Patch('/:postId/like')
  @ApiOperation({ summary: BlogPostOperationDescription.AddLikeToBlogPost })
  @ApiParam({ name: "postId", required: true, description: BlogPostPropertiesDescription.Id })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogPostResponseError.BlogNotFound })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: BlogPostResponseError.UnauthorizedRequest })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async like(@Req() { user }: RequestWithUser, @Param('postId', ParseUUIDPipe) postId: string
  ) {
    const rootBlogPostUrl = this.config.getBlogUrl(BlogEndpoints.RootPosts);
    await this.httpService.axiosRef.patch(`${rootBlogPostUrl}/${postId}/${BlogEndpoints.LikeBlogPost}/${user.id}`);
  }

  @Patch('/:postId/publish')
  @ApiOperation({ summary: BlogPostOperationDescription.PublishBlogPost })
  @ApiParam({ name: "postId", required: true, description: BlogPostPropertiesDescription.Id })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogPostResponseError.BlogNotFound })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: BlogPostResponseError.UnauthorizedRequest })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async publish(@Req() { user }: RequestWithUser, @Param('postId', ParseUUIDPipe) postId: string
  ) {
    const rootBlogPostUrl = this.config.getBlogUrl(BlogEndpoints.RootPosts);
    const url = `${rootBlogPostUrl}/${postId}/${BlogEndpoints.PublishBlogPost}/${user.id}`;
    console.log('PATCH', url);
    await this.httpService.axiosRef.patch(url);
  }
}
