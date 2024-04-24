export enum UserPropertiesDescription {
  UserId = 'User unique Id',
  Email = 'User email',
  AccessToken = 'Access token',
  FirstName = 'User first name',
  LastName = 'User last name',
  DateOfBirth = 'User data of birth (ISO format)',
  Avatar = 'User avatar',
  Password = 'User password',
  NewPassword = 'New user password',
  RegistrationDate = 'User registration date (ISO format)'
}

export enum UserPropertiesValidationErrors {
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  MinNameLength = 'At least three characters are required',
  MaxNameLength = 'Max length is 50 symbols',
  MinPasswordLength = 'Password should be at least 6 symbols',
  MaxPasswordLength = 'Max length for password is 12 symbols'
}
