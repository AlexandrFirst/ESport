import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from './config/rmq.config';
import { CompetitionsController } from './controllers/competitions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RMQModule.forRootAsync(getRmqConfig()),
  ],
  controllers: [CompetitionsController],
  providers: [],
})
export class AppModule {}
