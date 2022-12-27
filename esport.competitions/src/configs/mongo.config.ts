import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: getMongoFactory,
});

export const getMongoFactory = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: configService.get('MONGO_DIRECT_URL') || getMongoUrl(configService),
  };
};

const getMongoUrl = (configService: ConfigService): string =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTHDATABASE');
