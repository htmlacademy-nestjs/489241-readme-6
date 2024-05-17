export const ApiConfigurationRegistrationKey = 'api-configuration';
export const ApiConfigurationEnvFilePath = 'apps/api/api.env';

export enum ApiConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_API_PORT = 3000
}

export enum ApiConfigurationErrors {
  EnvironmentRequired = 'Account environment is required',
  EnvironmentIsIncorrect = 'Account environment is not correct',
  PortRequired = 'Account port is required',
  BlogBaseUrlRequired = 'Blog service base URL is required',
  AccountBaseUrlRequired = 'Account service base URL is required',
}

export enum BlogEndpoints {
  CreateBlogPost = 'posts',
}

export enum AccountEndpoints {
  AuthenticateUser = 'auth',
}
