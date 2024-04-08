import { getMongoConnectionString } from '@project/shared-helpers';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('mongodb.user'),
          password: config.get<string>('mongodb.password'),
          host: config.get<string>('mongodb.host'),
          port: config.get<string>('mongodb.port'),
          authDatabase: config.get<string>('mongodb.authBase'),
          databaseName: config.get<string>('mongodb.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
