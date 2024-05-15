export const NotifyConfigurationRegistrationKey = 'notify-config';
export const NotifyConfigurationEnvFilePath = 'apps/notify/notify.env';

export enum NotifyConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_NOTIFY_PORT = 3000
}

export enum NotifyConfigurationErrors {
  EnvironmentRequired = 'Notify service environment is required',
  EnvironmentIsIncorrect = 'Notify service environment is not correct',
  PortRequired = 'Notify service port is required',
}
