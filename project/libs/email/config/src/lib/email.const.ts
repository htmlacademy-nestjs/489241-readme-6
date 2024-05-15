export const EmailConfigurationRegistrationKey = 'email-config';

export enum EmailConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_SMTP_PORT = 25
}

export enum EmailConfigurationErrors {
  HostRequired = 'SMTP host is required',
  FromRequired = 'From email is required',
  PortRequired = 'SMTP port is required',
  UserRequired = 'SMTP user is required',
  PasswordRequired = 'SMTP password is required',
}
