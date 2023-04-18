import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from './configs/rmq.config';

import { CompetitionsController } from './controllers/competitions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.api.env',
    }),
    RMQModule.forRootAsync(getRmqConfig()),
  ],
  controllers: [CompetitionsController],
})
export class AppModule {}
