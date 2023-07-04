import { Module } from '@nestjs/common';
import { CompetitorService } from './competitor.service';

@Module({
  providers: [CompetitorService],
})
export class CompetitorModule {}
