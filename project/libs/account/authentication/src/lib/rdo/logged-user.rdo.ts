import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserPropertiesDescription } from './user.constants';

export class LoggedUserRdo {
  @ApiProperty({
    description: UserPropertiesDescription.UserId,
    example: 'guid'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: UserPropertiesDescription.Email,
    example: 'john.doe@noname.corp'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: UserPropertiesDescription.AccessToken,
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: UserPropertiesDescription.RefreshToken,
  })
  @Expose()
  public refreshToken: string;
}
