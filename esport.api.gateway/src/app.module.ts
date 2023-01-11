import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRMQConfig } from './configs';

import { CompetitionsController } from './controllers/competition-service/competitions.controller';
import { CategoriesController } from './controllers/competition-service/categories.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    // JwtModule.registerAsync(getJWTConfig()),
    // PassportModule,
  ],
  controllers: [CompetitionsController, CategoriesController],
  providers: [],
})
export class AppModule {}
