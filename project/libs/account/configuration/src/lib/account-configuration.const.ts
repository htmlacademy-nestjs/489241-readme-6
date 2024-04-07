export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_ACCOUNT_PORT = 3000;

export enum AccountConfigurationErrors {
  EnvironmentRequired = 'Account environment is required',
  PortRequired = 'Account port is required',
}
