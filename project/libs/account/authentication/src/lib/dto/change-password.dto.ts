import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from 'class-validator';

import { UserPropertiesDescription, UserPropertiesValidationErrors } from "../rdo/user.constants";

export class ChangePasswordDto {
  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  @MinLength(6, { message: UserPropertiesValidationErrors.MinPasswordLength })
  @MaxLength(12, { message: UserPropertiesValidationErrors.MaxPasswordLength })
  public password: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  @MinLength(6, { message: UserPropertiesValidationErrors.MinPasswordLength })
  @MaxLength(12, { message: UserPropertiesValidationErrors.MaxPasswordLength })
  public newPassword: string;
}
