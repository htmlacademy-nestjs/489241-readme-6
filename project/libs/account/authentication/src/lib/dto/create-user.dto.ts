import { ApiProperty } from "@nestjs/swagger";
import { UserPropertiesDescription } from "../rdo/user.constants";

export class CreateUserDto {
  @ApiProperty({
    description: UserPropertiesDescription.Email,
    required: true,
    example: 'john.doe@noname.corp'
  })
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.DateOfBirth,
    required: true,
    example: '1981-01-30'
  })
  public dateBirth: string;

  @ApiProperty({
    description: UserPropertiesDescription.FirstName,
    required: true,
    example: 'John'
  })
  public firstName: string;

  @ApiProperty({
    description: UserPropertiesDescription.LastName,
    required: true,
    example: 'Doe'
  })
  public lastName: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
  })
  public password: string;
}
