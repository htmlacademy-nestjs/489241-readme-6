export const AuthenticationErrors = {
  AuthUserExists: 'User with the email already exists',
  UserNotFound: 'User not found',
  WrongPassword: 'User password is wrong'
} as const;

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged',
  LoggedError: 'Password or Login is wrong',
  UserFound: 'User found and user details returned in body',
  UserCreated: 'The new user has been successfully created',
} as const;

export const AuthenticationOperationDescription = {
  Login: 'Verifies user password',
  GetById: 'Gets user details by id',
  Register: 'Registers user'
} as const;
