export enum UserPropertiesDescription {
  UserId = 'User unique Id',
  Email = 'User email',
  AccessToken = 'Access token',
  FirstName = 'User first name',
  LastName = 'User last name',
  DateOfBirth = 'User data of birth (ISO format)',
  Avatar = 'User avatar',
  Password = 'User password'
}

export enum UserPropertiesValidationErrors {
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  MinLength = 'At least two characters are required'
}
