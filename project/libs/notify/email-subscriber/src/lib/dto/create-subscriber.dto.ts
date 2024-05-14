import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { SubscriberPropertiesDescription, SubscriberValidationMessages, } from '../email-subscriber.const';

export class CreateSubscriberDto {
  @ApiProperty({
    description: SubscriberPropertiesDescription.Email,
    example: 'john.doe@noname.com',
    required: true,
  })
  @IsEmail({}, { message: SubscriberValidationMessages.EmailIsNotValid })
  public email: string;

  @ApiProperty({
    description: SubscriberPropertiesDescription.FirstName,
    example: 'John',
    required: true,
  })
  @IsNotEmpty({ message: SubscriberValidationMessages.FirstNameIsRequired })
  public firstName: string;

  @ApiProperty({
    description: SubscriberPropertiesDescription.LastName,
    example: 'Doe',
    required: true,
  })
  @IsNotEmpty({ message: SubscriberValidationMessages.LastNameIsRequired })
  public lastName: string;
}
