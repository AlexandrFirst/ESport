import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightService } from './fight.service';
import { Fight, FightSchema } from './fight.model';
import { FightRepository } from './fight.repository';
import { FightCommands } from './fight.commands';
import { FightQueries } from './fight.queries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  providers: [FightService, FightRepository],
  controllers: [FightCommands, FightQueries],
  exports: [FightService],
})
export class FightModule {}
