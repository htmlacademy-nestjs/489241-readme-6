import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

import { UserPropertiesDescription } from "../rdo/user.constants";

export class ChangePasswordDto {
  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  public newPassword: string;
}
