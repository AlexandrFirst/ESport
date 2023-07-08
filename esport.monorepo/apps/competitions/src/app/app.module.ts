import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from '../config/rmq.config';

import { PrismaModule } from './database/prisma.module';
import { CompetitionModule } from './competition/competition.module';
import { OrganisationModule } from './organisation/organisation.module';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';
import { CompetitorModule } from './competitor/competitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RMQModule.forRootAsync(getRmqConfig()),
    PrismaModule,
    CompetitionModule,
    OrganisationModule,
    UserModule,
    RequestModule,
    CompetitorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
