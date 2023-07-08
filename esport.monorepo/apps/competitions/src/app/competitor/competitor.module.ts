import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { CompetitorService } from './competitor.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CompetitorService],
  exports: [CompetitorService],
})
export class CompetitorModule {}
