export const FileVaultConfigurationRegistrationKey = 'file-vault-config';
export const FileVaultConfigurationEnvFilePath = 'apps/file-vault/file-vault.env';

export enum FileVaultConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_FILE_VAULT_PORT = 3000
}

export enum FileVaultConfigurationErrors {
  EnvironmentRequired = 'File Vault environment is required',
  EnvironmentIsIncorrect = 'File Vault environment is not correct',
  PortRequired = 'File Vault port is required',
  UploadFolderIsRequired = 'Upload folder is required',
}
