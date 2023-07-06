import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRmqConfig } from './configs/rmq.config';

import { CategoriesController } from './controllers/categories.controller';
import { CompetitionsController } from './controllers/competitions.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.api.env',
    }),
    RMQModule.forRootAsync(getRmqConfig()),
  ],
  controllers: [CompetitionsController, CategoriesController, UserController],
})
export class AppModule {}