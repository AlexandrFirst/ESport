import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { Competition } from '@prisma/client';

import { CompetitionService } from './competition.service';
import { CompetitionCreateCommand } from '@esport.monorepo/contracts';

@Controller()
export class CompetitionCommands {
  constructor(private readonly competitionService: CompetitionService) {}

  @RMQRoute(CompetitionCreateCommand.topic)
  async create({ competition }: CompetitionCreateCommand.Request) {
    return this.competitionService.create(competition);
  }
}
