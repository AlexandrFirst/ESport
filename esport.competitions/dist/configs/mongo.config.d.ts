import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
export declare const getMongoConfig: () => MongooseModuleAsyncOptions;
export declare const getMongoFactory: (configService: ConfigService) => Promise<MongooseModuleFactoryOptions>;
