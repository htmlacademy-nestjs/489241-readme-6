import { IsEnum, IsNumber, IsNotEmpty, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { Environments } from '@project/shared-core';
import { MIN_PORT, MAX_PORT, DEFAULT_ACCOUNT_PORT, AccountConfigurationErrors } from './account-configuration.const';

export class AccountEnvironmentConfiguration {
  @IsString({ message: AccountConfigurationErrors.EnvironmentRequired })
  @IsEnum(Environments, { message: AccountConfigurationErrors.EnvironmentIsIncorrect })
  public environment: Environments;

  @IsNumber({}, { message: AccountConfigurationErrors.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_ACCOUNT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
