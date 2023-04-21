import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Fight, FightSchema } from './fight.model';

import { FightService } from './fight.service';
import { FightQueries } from './fightQueries';
import { FightRepository } from './fight.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  controllers: [FightQueries],
  providers: [FightService, FightRepository],
  exports: [FightService],
})
export class FightModule {}
