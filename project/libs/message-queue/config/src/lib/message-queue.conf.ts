import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { MessageQueueConfigurationPorts, MessageQueueConfigurationRegistrationKey } from './message-queue.const';
import { MessageQueueEnvironmentConfiguration } from './message-queue.env'

export interface MessageQueueConfiguration {
  host: string;
  port: number;
  user: string;
  password: string;
  queue: string;
  exchange: string;
}

async function getMessageQueueConfig(): Promise<MessageQueueEnvironmentConfiguration> {
  const config = plainToClass(MessageQueueEnvironmentConfiguration, {
    host: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT ? parseInt(process.env.RABBIT_PORT, 10) : MessageQueueConfigurationPorts.DEFAULT_MESSAGE_QUEUE_PORT,
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  });

  await config.validate();

  return config;
}

export default registerAs(MessageQueueConfigurationRegistrationKey, async (): Promise<ConfigType<typeof getMessageQueueConfig>> => {
  return getMessageQueueConfig();
});
