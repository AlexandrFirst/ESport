import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Competition, CompetitionSchema } from './competition.model';

import { CompetitionService } from './competition.service';
import { CompetitionQueries } from './competition.queries';
import { CompetitionCommands } from './competition.commands';
import { CompetitionRepository } from './competition.repository';
import { CompetitionEventEmitter } from './competition.event-emitter';

@Module({
  controllers: [CompetitionQueries, CompetitionCommands],
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionSchema },
    ]),
  ],
  providers: [
    CompetitionRepository,
    CompetitionService,
    CompetitionEventEmitter,
  ],
})
export class CompetitionModule {}
