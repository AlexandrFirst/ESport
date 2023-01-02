import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { getRMQConfig } from './configs';

import { CompetitionsController } from './controllers/competitions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    // JwtModule.registerAsync(getJWTConfig()),
    // PassportModule,
  ],
  controllers: [CompetitionsController],
  providers: [],
})
export class AppModule {}
