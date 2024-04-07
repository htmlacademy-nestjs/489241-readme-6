import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { MIN_PORT, MAX_PORT, DEFAULT_ACCOUNT_PORT, AccountConfigurationErrors } from './account-configuration.const';

export class AccountEnvironmentConfiguration {
  @IsString({ message: AccountConfigurationErrors.EnvironmentRequired })
  public environment: string;

  @IsNumber({}, { message: AccountConfigurationErrors.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_ACCOUNT_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
