export const MessageQueueConfigurationRegistrationKey = 'message-queue';

export enum MessageQueueConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_MESSAGE_QUEUE_PORT = 5672
}

export enum MessageQueueConfigurationErrors {
  HostRequired = 'RabbitMQ host is required',
  QueueNameRequired = 'Queue name is required',
  PortRequired = 'MongoDB port is required',
  UserRequired = 'MongoDB user is required',
  PasswordRequired = 'MongoDB password is required',
  ExchangeNameRequired = 'Exchange name is required',
}
