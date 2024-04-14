export enum MongoConfigurationPorts {
  MIN_PORT = 0,
  MAX_PORT = 65535,
  DEFAULT_MONGO_PORT = 27017
}

export enum MongoConfigurationErrors {
  HostRequired = 'MongoDB host is required',
  DatabaseNameRequired = 'Database name is required',
  PortRequired = 'MongoDB port is required',
  UserRequired = 'MongoDB user is required',
  PasswordRequired = 'MongoDB password is required',
  BaseAuthRequired = 'MongoDB authentication base is required',
}
