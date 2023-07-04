import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightModule } from '../fight/fight.module';

import { RoundService } from './round.service';
import { RoundQueries } from './roundQueries';
import { Round, RoundSchema } from './round.model';
import { RoundRepository } from './round.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Round.name, schema: RoundSchema }]),
    FightModule,
  ],
  providers: [RoundService, RoundRepository],
  controllers: [RoundQueries],
  exports: [RoundService],
})
export class RoundModule {}
