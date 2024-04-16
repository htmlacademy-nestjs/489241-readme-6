import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Uniq blog category name',
    example: 'Movies'
  })
  public title: string;
}
