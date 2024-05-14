export const FileVaultConfigurationRegistrationKey = "file-vault-config";
export const FileVaultConfigurationEnvFilePath = 'apps/file-vault/file-vault.env';
export enum FileVaultConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_ACCOUNT_PORT = 3000
}

export enum FileVaultConfigurationErrors {
  EnvironmentRequired = 'Account environment is required',
  EnvironmentIsIncorrect = 'Account environment is not correct',
  PortRequired = 'Account port is required',
  UploadFolderIsRequired = 'Upload folder is required',
}
