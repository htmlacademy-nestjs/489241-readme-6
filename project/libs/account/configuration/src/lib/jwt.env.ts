import { IsString, validateOrReject } from 'class-validator';

import { AccountConfigurationErrors } from './account-configuration.const';

export class JwtEnvironmentConfiguration {
  @IsString({ message: AccountConfigurationErrors.AccessTokenSecretRequired })
  public accessTokenSecret: string;

  @IsString({ message: AccountConfigurationErrors.AccessTokenExpiresInIsRequired })
  public accessTokenExpiresIn: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
