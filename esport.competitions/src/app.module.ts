import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from '@configs/rmq.config';
import { getMongoConfig } from '@configs/mongo.config';
import { CompetitionModule } from './competition/competition.module';
import { CategoryModule } from './category/category.module';
import { FightModule } from './fight/fight.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    CompetitionModule,
    CategoryModule,
    FightModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    Logger.log(process.env.NODE_ENV);
  }
}
