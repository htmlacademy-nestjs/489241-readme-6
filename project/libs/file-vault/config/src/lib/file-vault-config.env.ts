import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { Environments } from '@project/shared-core';
import { FileVaultConfigurationPorts, FileVaultConfigurationErrors } from './file-vault-config.const'

export class FileVaultEnvironmentConfiguration {
  @IsString({ message: FileVaultConfigurationErrors.EnvironmentRequired })
  @IsEnum(Environments, { message: FileVaultConfigurationErrors.EnvironmentIsIncorrect })
  public environment: Environments;

  @IsNumber({}, { message: FileVaultConfigurationErrors.PortRequired })
  @Min(FileVaultConfigurationPorts.MIN_PORT)
  @Max(FileVaultConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = FileVaultConfigurationPorts.DEFAULT_FILE_VAULT_PORT;

  @IsString({ message: FileVaultConfigurationErrors.UploadFolderIsRequired })
  public uploadDirectory: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
