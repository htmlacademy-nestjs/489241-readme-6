import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'User Email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    description: 'User Password',
    required: true,
  })
  public password: string;
}
