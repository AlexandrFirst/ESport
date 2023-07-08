import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from './config/rmq.config';
import { CompetitionsController } from './controllers/competitions.controller';
import { RequestController } from './controllers/request.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RMQModule.forRootAsync(getRmqConfig()),
  ],
  controllers: [CompetitionsController, RequestController],
  providers: [],
})
export class AppModule {}
