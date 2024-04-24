export enum AuthenticationErrors {
  AuthUserExists = 'User with the email already exists',
  UserNotFound = 'User not found',
  WrongPassword = 'User password is wrong'
}

export enum AuthenticationResponseMessage {
  LoggedSuccess = 'User has been successfully logged',
  LoggedError = 'Password or Login is wrong',
  UserFound = 'User found and user details returned in body',
  UserCreated = 'The new user has been successfully created',
  PasswordUpdated = 'User password was updated'
}

export enum AuthenticationOperationDescription {
  Login = 'Verifies user password',
  GetById = 'Gets user details by id',
  Register = 'Registers user',
  ChangeUserPassword = 'Changes user password'
}
