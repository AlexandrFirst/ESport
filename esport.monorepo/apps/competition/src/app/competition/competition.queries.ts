import { CompetitionsGetAll } from '@esport.monorepo/contracts';
import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CompetitionService } from './competition.service';

@Controller()
export class CompetitionQueries {
  constructor(private readonly competitionService: CompetitionService) {}

  @RMQRoute(CompetitionsGetAll.topic)
  async getAll() {
    return this.competitionService.getAll();
  }
}
