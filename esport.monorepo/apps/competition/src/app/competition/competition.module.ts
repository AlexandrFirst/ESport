import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetitionCommands } from './controllers/competition.commands';

import { CompetitionEventEmitter } from './controllers/competition.event-emitter';
import { CompetitionQueries } from './controllers/competition.queries';
import { CompetitionRepository } from './competition.repository';
import { CompetitionService } from './service/competition.service';

import { Competition, CompetitionSchema } from './models/competition.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionSchema },
    ]),
  ],
  controllers: [CompetitionQueries, CompetitionCommands],
  providers: [
    CompetitionRepository,
    CompetitionService,
    CompetitionEventEmitter,
  ],
})
export class CompetitionModule {}