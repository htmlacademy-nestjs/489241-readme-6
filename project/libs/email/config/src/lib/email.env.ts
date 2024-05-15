import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EmailConfigurationPorts, EmailConfigurationErrors } from './email.const';

export class EmailEnvironmentConfiguration {
  @IsString({ message: EmailConfigurationErrors.HostRequired })
  public host: string;

  @IsNumber({}, { message: EmailConfigurationErrors.PortRequired })
  @Min(EmailConfigurationPorts.MIN_PORT)
  @Max(EmailConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = EmailConfigurationPorts.DEFAULT_SMTP_PORT;

  @IsString({ message: EmailConfigurationErrors.UserRequired })
  public user: string;

  @IsString({ message: EmailConfigurationErrors.PasswordRequired })
  public password: string;

  @IsString({ message: EmailConfigurationErrors.FromRequired })
  public from: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
