import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Uniq blog category name',
    example: 'Movies'
  })
  public title: string;
}
