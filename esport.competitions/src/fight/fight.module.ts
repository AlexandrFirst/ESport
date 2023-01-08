import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightService } from './fight.service';
import { Fight, FightSchema } from './fight.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  providers: [FightService],
})
export class FightModule {}
