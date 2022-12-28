import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from '@configs/rmq.config';
import { getMongoConfig } from '@configs/mongo.config';
import { CompetitionModule } from './competition/competition.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    CompetitionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
