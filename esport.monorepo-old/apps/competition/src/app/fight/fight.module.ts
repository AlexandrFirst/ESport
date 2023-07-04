import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Fight, FightSchema } from './fight.model';

import { FightService } from './fight.service';
import { FightRepository } from './fight.repository';

import { FightQueries } from './fight.queries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  controllers: [FightQueries],
  providers: [FightService, FightRepository],
  exports: [FightService],
})
export class FightModule {}
