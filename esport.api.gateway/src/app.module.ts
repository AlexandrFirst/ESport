import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRMQConfig } from './configs';

import { CompetitionsController } from './controllers/competition-service/competitions.controller';
import { CategoriesController } from './controllers/competition-service/categories.controller';
import { FightsController } from './controllers/competition-service/fight.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    // JwtModule.registerAsync(getJWTConfig()),
    // PassportModule,
  ],
  controllers: [CompetitionsController, CategoriesController, FightsController],
  providers: [],
})
export class AppModule {}
