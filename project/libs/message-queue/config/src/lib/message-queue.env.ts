import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { MessageQueueConfigurationPorts, MessageQueueConfigurationErrors } from './message-queue.const';

export class MessageQueueEnvironmentConfiguration {
  @IsString({ message: MessageQueueConfigurationErrors.HostRequired })
  public host: string;

  @IsNumber({}, { message: MessageQueueConfigurationErrors.PortRequired })
  @Min(MessageQueueConfigurationPorts.MIN_PORT)
  @Max(MessageQueueConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = MessageQueueConfigurationPorts.DEFAULT_MESSAGE_QUEUE_PORT;

  @IsString({ message: MessageQueueConfigurationErrors.UserRequired })
  public user: string;

  @IsString({ message: MessageQueueConfigurationErrors.PasswordRequired })
  public password: string;

  @IsString({ message: MessageQueueConfigurationErrors.QueueNameRequired })
  public queue: string;

  @IsString({ message: MessageQueueConfigurationErrors.ExchangeNameRequired })
  public exchange: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
