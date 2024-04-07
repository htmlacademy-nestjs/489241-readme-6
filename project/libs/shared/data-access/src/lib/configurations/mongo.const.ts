export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_MONGO_PORT = 27017;

export enum MongoConfigurationErrors {
  HostRequired = 'MongoDB host is required',
  DatabaseNameRequired = 'Database name is required',
  PortRequired = 'MongoDB port is required',
  UserRequired = 'MongoDB user is required',
  PasswordRequired = 'MongoDB password is required',
  BaseAuthRequired = 'MongoDB authentication base is required',
}
