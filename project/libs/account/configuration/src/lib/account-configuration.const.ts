export enum AccountConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_ACCOUNT_PORT = 3000
}

export enum AccountConfigurationErrors {
  EnvironmentRequired = 'Account environment is required',
  EnvironmentIsIncorrect = 'Account environment is not correct',
  PortRequired = 'Account port is required',
  AccessTokenSecretRequired = 'Access Token Secret is required',
  AccessTokenExpiresInIsRequired = 'Access Token expiration is required'
}
