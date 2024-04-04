import { ApiProperty } from "@nestjs/swagger";
import { UserPropertiesDescription } from "../rdo/user.constants";

export class LoginUserDto {
  @ApiProperty({
    description: UserPropertiesDescription.Email,
    required: true,
    example: 'john.doe@noname.corp'
  })
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.Password,
    required: true,
    example: 'secret password!'
  })
  public password: string;
}
