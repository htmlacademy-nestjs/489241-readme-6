import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { Environments } from '@project/shared-core';
import { NotifyConfigurationPorts, NotifyConfigurationErrors } from './notify.const'

export class NotifyEnvironmentConfiguration {
  @IsString({ message: NotifyConfigurationErrors.EnvironmentRequired })
  @IsEnum(Environments, { message: NotifyConfigurationErrors.EnvironmentIsIncorrect })
  public environment: Environments;

  @IsNumber({}, { message: NotifyConfigurationErrors.PortRequired })
  @Min(NotifyConfigurationPorts.MIN_PORT)
  @Max(NotifyConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = NotifyConfigurationPorts.DEFAULT_NOTIFY_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
