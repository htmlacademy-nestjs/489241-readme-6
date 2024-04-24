import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserPropertiesDescription } from './user.constants';

export class UserRdo {
  @ApiProperty({
    description: UserPropertiesDescription.UserId,
    example: 'guid'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: UserPropertiesDescription.Avatar,
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: UserPropertiesDescription.DateOfBirth,
    example: '1981-01-30'
  })
  @Expose()
  public dateOfBirth: string;

  @ApiProperty({
    description: UserPropertiesDescription.RegistrationDate,
    example: '1981-01-30'
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: UserPropertiesDescription.Email,
    example: 'john.doe@noname.corp'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.FirstName,
    example: 'John'
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: UserPropertiesDescription.LastName,
    example: 'Doe'
  })
  @Expose()
  public lastName: string;
}
