import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { Environments } from '@project/shared-core';
import { BlogConfigurationPorts, BlogConfigurationErrors } from './blog-configuration.const';

export class BlogEnvironmentConfiguration {
  @IsString({ message: BlogConfigurationErrors.EnvironmentRequired })
  @IsEnum(Environments, { message: BlogConfigurationErrors.EnvironmentIsIncorrect })
  public environment: Environments;

  @IsNumber({}, { message: BlogConfigurationErrors.PortRequired })
  @Min(BlogConfigurationPorts.MIN_PORT)
  @Max(BlogConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = BlogConfigurationPorts.DEFAULT_BLOG_PORT;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
