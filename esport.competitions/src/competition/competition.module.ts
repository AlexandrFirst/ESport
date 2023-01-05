import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Competition, CompetitionSchema } from './models/competition.model';

import { CompetitionService } from './competition.service';
import { CompetitionQueries } from './competition.queries';
import { CompetitionCommands } from './competition.commands';
import { CompetitionRepository } from './repositories/competition.repository';

@Module({
  controllers: [CompetitionQueries, CompetitionCommands],
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionSchema },
      // { name: Category.name, schema: CategorySchema },
      // { name: Competitor.name, schema: CompetitorSchema },
    ]),
  ],
  providers: [CompetitionRepository, CompetitionService],
})
export class CompetitionModule {}
