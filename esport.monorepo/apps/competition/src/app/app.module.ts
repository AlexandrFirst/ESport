import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { getMongoConfig } from './configs/mongo.config';
import { getRmqConfig } from './configs/rmq.config';

import { CompetitionModule } from './competition/competition.module';
import { CategoryModule } from './category/category.module';
import { FightModule } from './fight/fight.module';
import { CompetitorModule } from './competitor/competitor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.competition.env',
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    RMQModule.forRootAsync(getRmqConfig()),
    CompetitionModule,
    CategoryModule,
    FightModule,
    CompetitorModule,
    UserModule,
  ],
})
export class AppModule {}
