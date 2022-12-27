import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from '@configs/rmq.config';
import { getMongoConfig } from '@configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
