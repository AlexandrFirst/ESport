import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoundService } from './round.service';
import { RoundQueries } from './roundQueries';
import { Round, RoundSchema } from './round.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Round.name, schema: RoundSchema }]),
  ],
  providers: [RoundService],
  controllers: [RoundQueries],
  exports: [RoundService],
})
export class RoundModule {}
