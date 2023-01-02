import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Competition, CompetitionSchema } from './models/competition.model';
import { CompetitionService } from './competition.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionSchema },
      // { name: Category.name, schema: CategorySchema },
      // { name: Competitor.name, schema: CompetitorSchema },
    ]),
  ],
  providers: [CompetitionService],
})
export class CompetitionModule {}