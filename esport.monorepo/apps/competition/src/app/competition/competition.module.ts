import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompetitionEventEmitter } from './competition.event-emitter';
import { CompetitionQueries } from './competition.queries';
import { CompetitionRepository } from './competition.repository';
import { CompetitionService } from './competition.service';

import { Competition, CompetitionSchema } from './models/competition.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionSchema },
    ]),
  ],
  controllers: [CompetitionQueries],
  providers: [
    CompetitionRepository,
    CompetitionService,
    CompetitionEventEmitter,
  ],
})
export class CompetitionModule {}
