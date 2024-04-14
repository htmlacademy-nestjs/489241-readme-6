import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { Environments } from '@project/shared-core';
import { AccountConfigurationPorts, AccountConfigurationErrors } from './account-configuration.const';

export class AccountEnvironmentConfiguration {
  @IsString({ message: AccountConfigurationErrors.EnvironmentRequired })
  @IsEnum(Environments, { message: AccountConfigurationErrors.EnvironmentIsIncorrect })
  public environment: Environments;

  @IsNumber({}, { message: AccountConfigurationErrors.PortRequired })
  @Min(AccountConfigurationPorts.MIN_PORT)
  @Max(AccountConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = AccountConfigurationPorts.DEFAULT_ACCOUNT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
