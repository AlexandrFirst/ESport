import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';
import { OrganisationModule } from '../organisation/organisation.module';

import { CompetitionRepository } from './competition.repository';
import { CompetitionQuery } from './competition.queries';
import { CompetitionService } from './competition.service';
import { CompetitionCommands } from './competition.commands';
import { CompetitionEventEmitter } from './competition.event-emitter';

@Module({
  imports: [PrismaModule, OrganisationModule],
  controllers: [CompetitionQuery, CompetitionCommands],
  providers: [
    CompetitionRepository,
    CompetitionService,
    CompetitionEventEmitter,
  ],
})
export class CompetitionModule {}
