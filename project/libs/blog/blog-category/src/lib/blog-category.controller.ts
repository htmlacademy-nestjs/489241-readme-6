import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';

import { BlogCategoryService } from './blog-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRdo } from './rdo/category.rdo';
import { BlogCategoryOperationDescription, BlogCategoryResponseError, BlogCategoryResponseMessage } from './blog-category.constants';

@ApiTags('blog')
@Controller('categories')
export class BlogCategoryController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: BlogCategoryOperationDescription.ShowCategoryById })
  @ApiOkResponse({
    description: BlogCategoryResponseMessage.ShowCategoryById,
    type: CategoryRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogCategoryResponseError.CategoryNotFound })
  public async show(@Param('id') id: string) {
    const categoryEntity = await this.blogCategoryService.getCategory(id);
    return fillDto(CategoryRdo, categoryEntity.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: BlogCategoryOperationDescription.ShowAllCategories })
  @ApiOkResponse({
    description: BlogCategoryResponseMessage.ShowAllCategories,
    type: CategoryRdo,
    isArray: true
  })
  public async index() {
    const blogCategoryEntities = await this.blogCategoryService.getAllCategories();
    const categories = blogCategoryEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDto(CategoryRdo, categories);
  }

  @Post('/')
  @ApiOperation({ summary: BlogCategoryOperationDescription.CreateCategory })
  @ApiCreatedResponse({
    description: BlogCategoryResponseMessage.CategoryCreated,
    type: CategoryRdo
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: BlogCategoryResponseError.CategoryExists })
  public async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.blogCategoryService.createCategory(dto);
    return fillDto(CategoryRdo, newCategory.toPOJO());
  }

  @Delete('/:id')
  @ApiOperation({ summary: BlogCategoryOperationDescription.DeleteCategoryById })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogCategoryResponseError.CategoryNotFound })
  public async destroy(@Param('id') id: string) {
    await this.blogCategoryService.deleteCategory(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: BlogCategoryOperationDescription.UpdateCategory })
  @ApiNoContentResponse({ description: BlogCategoryResponseMessage.CategoryUpdated })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BlogCategoryResponseError.CategoryNotFound })
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
    return fillDto(CategoryRdo, updatedCategory.toPOJO());
  }
}
