import { Inject, Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { apiConfig, BlogEndpoints } from '@project/api-configuration';
import { InjectUserIdInterceptor } from '@project/shared-interceptors';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { BlogPostOperationDescription, BlogPostResponseMessage } from './blog.constants';

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
    const createBlogUrl = this.config.getBlogUrl(BlogEndpoints.CreateBlogPost);
    const { data } = await this.httpService.axiosRef.post(createBlogUrl, dto);
    return data;
  }
}
