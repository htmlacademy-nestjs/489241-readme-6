export const BlogConfigurationRegistrationKey = 'blog-configuration';
export const BlogConfigurationEnvFilePath = 'apps/blog/blog.env';

export enum BlogConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_BLOG_PORT = 3000
}

export enum BlogConfigurationErrors {
  EnvironmentRequired = 'Blog environment is required',
  EnvironmentIsIncorrect = 'Blog environment is not correct',
  PortRequired = 'Blog port is required',
}
