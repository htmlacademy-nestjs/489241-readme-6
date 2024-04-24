import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsISO8601, IsString, MinLength } from 'class-validator';

import { UserPropertiesDescription, UserPropertiesValidationErrors } from "../rdo/user.constants";

export class CreateUserDto {
  @ApiProperty({
    description: UserPropertiesDescription.Email,
    required: true,
    example: 'john.doe@noname.corp'
  })
  @IsEmail({}, { message: UserPropertiesValidationErrors.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.DateOfBirth,
    required: true,
    example: '1981-01-30'
  })
  @IsISO8601({}, { message: UserPropertiesValidationErrors.DateBirthNotValid })
  public dateBirth: string;

  @ApiProperty({
    description: UserPropertiesDescription.FirstName,
    required: true,
    example: 'John'
  })
  @IsString()
  @MinLength(2, { message: UserPropertiesValidationErrors.MinLength })
  public firstName: string;

  @ApiProperty({
    description: UserPropertiesDescription.LastName,
    required: true,
    example: 'Doe'
  })
  @IsString()
  @MinLength(2, { message: UserPropertiesValidationErrors.MinLength })
  public lastName: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  @IsString()
  public password: string;
}
