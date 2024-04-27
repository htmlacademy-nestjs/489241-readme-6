import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';

import { UserPropertiesDescription, UserPropertiesValidationErrors } from "../rdo/user.constants";

export class LoginUserDto {
  @ApiProperty({
    description: UserPropertiesDescription.Email,
    required: true,
    example: 'john.doe@noname.corp'
  })
  @IsEmail({}, { message: UserPropertiesValidationErrors.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  public password: string;
}
