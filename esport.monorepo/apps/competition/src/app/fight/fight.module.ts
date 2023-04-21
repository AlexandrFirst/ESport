import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Fight, FightSchema } from './fight.model';

import { FightService } from './fight.service';
import { FightQueries } from './fightQueries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  controllers: [FightQueries],
  providers: [FightService],
  exports: [FightService],
})
export class FightModule {}
