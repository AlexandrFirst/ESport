import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Fight, FightSchema } from './fight.model';
import { FightService } from './fight.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fight.name, schema: FightSchema }]),
  ],
  providers: [FightService],
})
export class FightModule {}
