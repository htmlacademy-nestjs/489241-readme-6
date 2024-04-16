import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { MongoConfigurationPorts, MongoConfigurationErrors } from './mongo.const';

export class MongoEnvironmentConfiguration {
  @IsString({ message: MongoConfigurationErrors.DatabaseNameRequired })
  public name: string;

  @IsString({ message: MongoConfigurationErrors.HostRequired })
  public host: string;

  @IsNumber({}, { message: MongoConfigurationErrors.PortRequired })
  @Min(MongoConfigurationPorts.MIN_PORT)
  @Max(MongoConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = MongoConfigurationPorts.DEFAULT_MONGO_PORT;

  @IsString({ message: MongoConfigurationErrors.UserRequired })
  public user: string;

  @IsString({ message: MongoConfigurationErrors.PasswordRequired })
  public password: string;

  @IsString({ message: MongoConfigurationErrors.BaseAuthRequired })
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
