import { Module } from '@nestjs/common';
import { CompetitionQueries } from './competition.queries';
import { CompetitionService } from './competition.service';

@Module({
  controllers: [CompetitionQueries],
  providers: [CompetitionService],
})
export class CompetitionModule {}
