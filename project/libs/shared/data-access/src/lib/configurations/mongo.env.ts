import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { MIN_PORT, MAX_PORT, DEFAULT_MONGO_PORT, MongoConfigurationErrors } from './mongo.const';

export class MongoEnvironmentConfiguration {
  @IsString({ message: MongoConfigurationErrors.DatabaseNameRequired })
  public name: string;

  @IsString({ message: MongoConfigurationErrors.HostRequired })
  public host: string;

  @IsNumber({}, { message: MongoConfigurationErrors.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

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
