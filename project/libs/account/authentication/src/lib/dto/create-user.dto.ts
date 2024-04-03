import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'User Email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    description: 'User Date of Birth',
    required: true,
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User First Name',
    required: true,
  })
  public firstName: string;

  @ApiProperty({
    description: 'User Last Name',
    required: true,
  })
  public lastName: string;

  @ApiProperty({
    description: 'User Password',
    required: true,
  })
  public password: string;
}
